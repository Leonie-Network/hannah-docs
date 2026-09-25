(function () {
  "use strict";

  function randomHex(byteLength) {
    var arr = new Uint8Array(byteLength);
    window.crypto.getRandomValues(arr);
    var out = "";
    for (var i = 0; i < arr.length; i++) {
      out += arr[i].toString(16).padStart(2, "0");
    }
    return out;
  }

  // Alle Werte werden immer gequotet ausgegeben — konsistent mit dem Stil der
  // statischen docker-compose.yml weiter unten auf der Seite, und erspart die
  // Frage, welche Strings YAML-technisch quotet werden müssten (Ports, "true"-
  // artige Strings, führende Nullen, ...).
  function yq(value) {
    return '"' + String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function envBlock(indent, pairs) {
    if (pairs.length === 0) return [];
    var lines = [indent + "environment:"];
    pairs.forEach(function (p) {
      lines.push(indent + "  " + p[0] + ": " + yq(p[1]));
    });
    return lines;
  }

  function readSelection(root) {
    var sel = {};
    ["telegram", "proxy", "voiceid", "timer", "logcollector"].forEach(function (key) {
      sel[key] = root.querySelector('[data-hcb="component-' + key + '"]').checked;
    });

    sel.mqttMode = root.querySelector('[name="hcb-mqtt-mode"]:checked').value;
    sel.mqttHost = root.querySelector('[data-hcb="mqtt-host"]').value.trim();
    sel.mqttPort = root.querySelector('[data-hcb="mqtt-port"]').value.trim();
    sel.mqttUser = root.querySelector('[data-hcb="mqtt-user"]').value.trim();
    sel.mqttPass = root.querySelector('[data-hcb="mqtt-pass"]').value.trim();

    sel.activityLogEnabled = root.querySelector('[data-hcb="activity-log-enabled"]').checked;
    sel.activityLogMode = root.querySelector('[name="hcb-db-mode"]:checked').value;
    sel.dbHost = root.querySelector('[data-hcb="db-host"]').value.trim();
    sel.dbPort = root.querySelector('[data-hcb="db-port"]').value.trim();
    sel.dbUser = root.querySelector('[data-hcb="db-user"]').value.trim();
    sel.dbPass = root.querySelector('[data-hcb="db-pass"]').value.trim();
    sel.dbName = root.querySelector('[data-hcb="db-name"]').value.trim();

    sel.webuiTls = root.querySelector('[data-hcb="webui-tls"]').checked;

    sel.telegramToken = root.querySelector('[data-hcb="telegram-token"]').value.trim();
    sel.telegramWebuiUrl = root.querySelector('[data-hcb="telegram-webui-url"]').value.trim();
    sel.hostLanIp = root.querySelector('[data-hcb="host-lan-ip"]').value.trim();

    return sel;
  }

  function validate(sel) {
    var errors = [];
    if (!sel.hostLanIp) {
      errors.push(
        "IP-Adresse des Docker-Hosts fehlt — ohne sie finden deine Satelliten Hannah nicht " +
          "(egal ob mit oder ohne Proxy)."
      );
    }
    if (sel.mqttMode === "own" && !sel.mqttHost) {
      errors.push("MQTT: Adresse des eigenen Brokers fehlt.");
    }
    if (sel.activityLogEnabled && sel.activityLogMode === "own") {
      if (!sel.dbHost) errors.push("Aktivitäts-Log: Adresse der eigenen Datenbank fehlt.");
      if (!sel.dbUser) errors.push("Aktivitäts-Log: Benutzername der eigenen Datenbank fehlt.");
      if (!sel.dbPass) errors.push("Aktivitäts-Log: Passwort der eigenen Datenbank fehlt.");
      if (!sel.dbName) errors.push("Aktivitäts-Log: Name der eigenen Datenbank fehlt.");
    }
    if (sel.telegram && !sel.telegramToken) {
      errors.push("Telegram: Bot-Token fehlt (von @BotFather).");
    }
    return errors;
  }

  function buildCoreEnv(sel, secrets) {
    var env = [];

    if (sel.mqttMode === "bundled") {
      env.push(["HANNAH_CORE_MQTT__HOST", "mosquitto"]);
    } else {
      env.push(["HANNAH_CORE_MQTT__HOST", sel.mqttHost]);
      if (sel.mqttPort) env.push(["HANNAH_CORE_MQTT__PORT", sel.mqttPort]);
      if (sel.mqttUser) env.push(["HANNAH_CORE_MQTT__USERNAME", sel.mqttUser]);
      if (sel.mqttPass) env.push(["HANNAH_CORE_MQTT__PASSWORD", sel.mqttPass]);
    }

    if (sel.activityLogEnabled) {
      if (sel.activityLogMode === "bundled") {
        env.push(["HANNAH_CORE_ACTIVITY_LOG__HOST", "mysql-db"]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__PORT", "3306"]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__USER", "hannah_user"]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__PASSWORD", secrets.mysqlUserPassword]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__DATABASE", "hannah_db"]);
      } else {
        env.push(["HANNAH_CORE_ACTIVITY_LOG__HOST", sel.dbHost]);
        if (sel.dbPort) env.push(["HANNAH_CORE_ACTIVITY_LOG__PORT", sel.dbPort]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__USER", sel.dbUser]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__PASSWORD", sel.dbPass]);
        env.push(["HANNAH_CORE_ACTIVITY_LOG__DATABASE", sel.dbName]);
      }
    }

    if (sel.voiceid) {
      env.push(["HANNAH_CORE_VOICE_ID__ENABLED", "true"]);
      env.push(["HANNAH_CORE_VOICE_ID__BASE_URL", "http://hannah-voiceid:8080"]);
    }

    // Core übernimmt die UDP-Discovery nur, solange kein Proxy verbunden ist — sobald
    // Proxy läuft, deaktiviert Core seine eigene UDP-Verarbeitung automatisch (siehe
    // Architektur-Entscheidung 3), Proxy braucht dann selbst die advertise_host.
    if (!sel.proxy) {
      env.push(["HANNAH_CORE_UDP__ADVERTISE_HOST", sel.hostLanIp]);
    }

    return env;
  }

  function buildCompose(sel) {
    var secrets = {
      webuiSecretKey: randomHex(32),
      mysqlRootPassword: randomHex(16),
      mysqlUserPassword: randomHex(16),
    };

    var lines = [];
    var volumes = ["core_data", "core_activity_audio", "core_audio_dumps", "webui_data"];

    lines.push("services:");

    // --- hannah-core -------------------------------------------------------
    lines.push("  hannah-core:");
    lines.push("    image: quay.io/m1kad0/hannah-core:latest");
    lines.push("    container_name: hannah-core");
    lines.push("    restart: unless-stopped");
    lines.push("    pull_policy: always");
    var coreDeps = [];
    if (sel.activityLogEnabled && sel.activityLogMode === "bundled") coreDeps.push("mysql-db");
    if (sel.mqttMode === "bundled") coreDeps.push("mosquitto");
    if (coreDeps.length > 0) {
      lines.push("    depends_on:");
      coreDeps.forEach(function (dep) {
        lines.push("      " + dep + ":");
        lines.push("        condition: service_healthy");
      });
    }
    lines.push("    ports:");
    lines.push('      - "50051:50051"');
    if (!sel.proxy) {
      // Core übernimmt die UDP-Verarbeitung der Satelliten nur ohne Proxy — dann
      // braucht sie den veröffentlichten Port. Mit Proxy übernimmt der das.
      lines.push('      - "7775:7775/udp"');
    }
    lines.push("    networks:");
    lines.push("      - hannah_network");
    lines.push("    volumes:");
    lines.push("      - core_data:/app/data");
    lines.push("      - core_activity_audio:/app/activity_audio");
    lines.push("      - core_audio_dumps:/app/audio_dumps");
    lines = lines.concat(envBlock("    ", buildCoreEnv(sel, secrets)));

    // --- hannah-webui --------------------------------------------------------
    lines.push("  hannah-webui:");
    lines.push("    image: quay.io/m1kad0/hannah-webui:latest");
    lines.push("    container_name: hannah-webui");
    lines.push("    restart: unless-stopped");
    lines.push("    pull_policy: always");
    lines.push("    depends_on:");
    lines.push("      - hannah-core");
    lines.push("    networks:");
    lines.push("      - hannah_network");
    lines.push("    ports:");
    lines.push('      - "5000:5000"');
    lines.push("    volumes:");
    lines.push("      - webui_data:/data");
    var webuiEnv = [
      ["HANNAH_WEBUI_SECRET_KEY", secrets.webuiSecretKey],
      ["HANNAH_WEBUI_GRPC_HOST", "hannah-core"],
      ["HANNAH_WEBUI_GRPC_PORT", "50051"],
    ];
    if (sel.webuiTls) webuiEnv.push(["HANNAH_WEBUI_TLS_ENABLED", "true"]);
    lines = lines.concat(envBlock("    ", webuiEnv));

    // --- hannah-telegram -------------------------------------------------
    if (sel.telegram) {
      lines.push("  hannah-telegram:");
      lines.push("    image: quay.io/m1kad0/hannah-telegram:latest");
      lines.push("    container_name: hannah-telegram");
      lines.push("    restart: unless-stopped");
      lines.push("    pull_policy: always");
      lines.push("    depends_on:");
      lines.push("      - hannah-core");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      var telegramEnv = [
        ["HANNAH_TELEGRAM_TELEGRAM_TOKEN", sel.telegramToken],
        ["HANNAH_TELEGRAM_GRPC__HOST", "hannah-core"],
        ["HANNAH_TELEGRAM_GRPC__PORT", "50051"],
      ];
      if (sel.telegramWebuiUrl) telegramEnv.push(["HANNAH_TELEGRAM_WEBUI_URL", sel.telegramWebuiUrl]);
      lines = lines.concat(envBlock("    ", telegramEnv));
    }

    // --- hannah-proxy ------------------------------------------------------
    if (sel.proxy) {
      lines.push("  hannah-proxy:");
      lines.push("    image: quay.io/m1kad0/hannah-proxy:latest");
      lines.push("    container_name: hannah-proxy");
      lines.push("    restart: unless-stopped");
      lines.push("    pull_policy: always");
      lines.push("    depends_on:");
      lines.push("      - hannah-core");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    ports:");
      lines.push('      - "7775:7775/udp"');
      var proxyEnv = [
        ["HANNAH_PROXY_HANNAH__ADDRESS", "hannah-core:50051"],
        ["HANNAH_PROXY_UDP__ADVERTISE_HOST", sel.hostLanIp],
      ];
      lines = lines.concat(envBlock("    ", proxyEnv));
    }

    // --- hannah-voiceid ------------------------------------------------------
    if (sel.voiceid) {
      lines.push("  hannah-voiceid:");
      lines.push("    image: quay.io/m1kad0/hannah-voiceid:latest-cpu");
      lines.push("    container_name: hannah-voiceid");
      lines.push("    restart: unless-stopped");
      lines.push("    pull_policy: always");
      lines.push("    depends_on:");
      lines.push("      - hannah-core");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    volumes:");
      lines.push("      - hannah_mem:/mnt/hannah_mem");
      var voiceidEnv = [
        ["HANNAH_VOICEID_RECOGNITION__UNKNOWN_THRESHOLD", "0.25"],
        ["HANNAH_VOICEID_RECOGNITION__UNCERTAIN_THRESHOLD", "0.40"],
      ];
      if (sel.logcollector) voiceidEnv.unshift(["HANNAH_VOICEID_HANNAH__ADDRESS", "hannah-core:50051"]);
      lines = lines.concat(envBlock("    ", voiceidEnv));
      volumes.push("hannah_mem");
    }

    // --- hannah-logcollector -----------------------------------------------
    if (sel.logcollector) {
      lines.push("  hannah-logcollector:");
      lines.push("    image: quay.io/m1kad0/hannah-logcollector:latest");
      lines.push("    container_name: hannah-logcollector");
      lines.push("    restart: unless-stopped");
      lines.push("    pull_policy: always");
      lines.push("    depends_on:");
      lines.push("      - hannah-core");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    ports:");
      lines.push('      - "50060:50060"');
      lines.push("    volumes:");
      lines.push("      - logcollector_data:/app/data");
      lines = lines.concat(
        envBlock("    ", [
          ["HANNAH_LOGCOLLECTOR_HANNAH_ADDRESS", "hannah-core:50051"],
          ["HANNAH_LOGCOLLECTOR_SERVER_ADVERTISE_HOST", sel.hostLanIp],
        ])
      );
      volumes.push("logcollector_data");
    }

    // --- hannah-timer ------------------------------------------------------
    if (sel.timer) {
      lines.push("  hannah-timer:");
      lines.push("    image: quay.io/m1kad0/hannah-timer:latest");
      lines.push("    container_name: hannah-timer");
      lines.push("    restart: unless-stopped");
      lines.push("    pull_policy: always");
      lines.push("    depends_on:");
      lines.push("      - hannah-core");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    volumes:");
      lines.push("      - timer_data:/app/data");
      lines = lines.concat(
        envBlock("    ", [
          ["HANNAH_TIMER_HANNAH_ADDRESS", "hannah-core:50051"],
          ["HANNAH_TIMER_LOG_LEVEL", "info"],
        ])
      );
      volumes.push("timer_data");
    }

    // --- mysql-db (nur bei mitgelieferter Aktivitäts-Log-DB) ----------------
    if (sel.activityLogEnabled && sel.activityLogMode === "bundled") {
      lines.push("  mysql-db:");
      lines.push("    image: mysql:8.0");
      lines.push("    container_name: hannah-db");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    volumes:");
      lines.push("      - mysql_data:/var/lib/mysql");
      lines = lines.concat(
        envBlock("    ", [
          ["MYSQL_ROOT_PASSWORD", secrets.mysqlRootPassword],
          ["MYSQL_DATABASE", "hannah_db"],
          ["MYSQL_USER", "hannah_user"],
          ["MYSQL_PASSWORD", secrets.mysqlUserPassword],
        ])
      );
      lines.push("    healthcheck:");
      lines.push(
        '      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p' +
          secrets.mysqlRootPassword +
          '"]'
      );
      lines.push("      interval: 5s");
      lines.push("      timeout: 5s");
      lines.push("      retries: 5");
      volumes.push("mysql_data");
    }

    // --- mosquitto (nur bei mitgeliefertem Broker) --------------------------
    // Statt einer zweiten Datei zum Herunterladen: ein winziger Init-Container
    // (Standard-busybox-Image, kein eigenes Image zu pflegen) schreibt die
    // mosquitto.conf einmalig in ein geteiltes Volume, bevor Mosquitto startet.
    // Damit bleibt es bei genau einer Datei — weniger, was der Nutzer selbst
    // erledigen muss.
    if (sel.mqttMode === "bundled") {
      lines.push("  mosquitto-config:");
      lines.push("    image: busybox:latest");
      lines.push("    container_name: hannah-mosquitto-config");
      lines.push(
        '    command: ["sh", "-c", "echo listener 1883 > /mosquitto-conf/mosquitto.conf && echo allow_anonymous true >> /mosquitto-conf/mosquitto.conf"]'
      );
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    volumes:");
      lines.push("      - mosquitto_conf:/mosquitto-conf");

      lines.push("  mosquitto:");
      lines.push("    image: eclipse-mosquitto:2");
      lines.push("    container_name: hannah-mosquitto");
      lines.push("    restart: unless-stopped");
      lines.push("    depends_on:");
      lines.push("      mosquitto-config:");
      lines.push("        condition: service_completed_successfully");
      lines.push("    networks:");
      lines.push("      - hannah_network");
      lines.push("    ports:");
      lines.push('      - "1883:1883"');
      lines.push('      - "9001:9001"');
      lines.push("    volumes:");
      lines.push("      - mosquitto_data:/mosquitto/data");
      lines.push("      - mosquitto_log:/mosquitto/log");
      lines.push("      - mosquitto_conf:/mosquitto/config");
      lines.push("    healthcheck:");
      lines.push('      test: ["CMD-SHELL", "nc -z localhost 1883 || exit 1"]');
      lines.push("      interval: 5s");
      lines.push("      timeout: 3s");
      lines.push("      retries: 5");
      volumes.push("mosquitto_data", "mosquitto_log", "mosquitto_conf");
    }

    lines.push("");
    lines.push("volumes:");
    volumes.forEach(function (v) {
      lines.push("  " + v + ":");
    });

    lines.push("");
    lines.push("networks:");
    lines.push("  hannah_network:");
    lines.push("    driver: bridge");

    return { compose: lines.join("\n") + "\n" };
  }

  function download(filename, content) {
    var blob = new Blob([content], { type: "text/yaml" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Universeller Kopieren-Button — <button data-copy-target="CSS-Selektor"> kopiert
  // den Text des referenzierten Elements in die Zwischenablage. Unabhängig vom
  // Compose-Builder nutzbar, überall wo dieses Skript eingebunden ist (siehe
  // extra_javascript in mkdocs.yml, gilt für alle Seiten).
  function initCopyButtons() {
    document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
      var defaultLabel = btn.textContent;
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-copy-target"));
        if (!target) return;
        var text = "value" in target ? target.value : target.textContent;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Kopiert!";
          setTimeout(function () {
            btn.textContent = defaultLabel;
          }, 1500);
        });
      });
    });
  }

  function init() {
    var root = document.getElementById("hannah-compose-builder");
    if (!root) return;

    var dbGate = root.querySelector('[data-hcb="activity-log-enabled"]');
    var dbFields = root.querySelector('[data-hcb="db-fields"]');
    var dbOwnFields = root.querySelector('[data-hcb="db-own-fields"]');
    var mqttOwnFields = root.querySelector('[data-hcb="mqtt-own-fields"]');
    var telegramFields = root.querySelector('[data-hcb="telegram-fields"]');

    function syncVisibility() {
      dbFields.hidden = !dbGate.checked;
      var dbMode = root.querySelector('[name="hcb-db-mode"]:checked');
      dbOwnFields.hidden = !dbGate.checked || !dbMode || dbMode.value !== "own";

      var mqttMode = root.querySelector('[name="hcb-mqtt-mode"]:checked');
      mqttOwnFields.hidden = !mqttMode || mqttMode.value !== "own";

      telegramFields.hidden = !root.querySelector('[data-hcb="component-telegram"]').checked;
    }

    root.addEventListener("change", syncVisibility);
    syncVisibility();

    var errorBox = root.querySelector('[data-hcb="errors"]');
    var output = root.querySelector('[data-hcb="output"]');
    var yamlCode = root.querySelector('[data-hcb="yaml-code"]');
    var lastResult = null;

    root.querySelector('[data-hcb="generate"]').addEventListener("click", function () {
      var sel = readSelection(root);
      var errors = validate(sel);

      if (errors.length > 0) {
        errorBox.hidden = false;
        errorBox.innerHTML =
          "<strong>Bitte erst ausfüllen:</strong><ul>" +
          errors.map(function (e) { return "<li>" + e + "</li>"; }).join("") +
          "</ul>";
        output.hidden = true;
        return;
      }

      errorBox.hidden = true;
      lastResult = buildCompose(sel);
      yamlCode.textContent = lastResult.compose;
      output.hidden = false;
      output.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    root.querySelector('[data-hcb="download-compose"]').addEventListener("click", function () {
      if (lastResult) download("docker-compose.yml", lastResult.compose);
    });
  }

  function boot() {
    initCopyButtons();
    init();
  }

  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
})();
