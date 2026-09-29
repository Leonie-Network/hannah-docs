(function () {
  "use strict";

  // Alle Werte folgen components/autodeploy/configuration.md und den
  // Installationsseiten der Komponenten — dort ist die Wahrheit, nicht in
  // autodeploy.yaml.example.
  //
  // kind "python": venv unter /opt/hannah/<name>, post_install per pip.
  // kind "binary": Go-Binary in /usr/local/bin, Channel mit Architektur-Suffix,
  //                kein post_install.
  var COMPONENTS = {
    autodeploy: { kind: "python", channel: "autodeploy-stable", service: { linux: "hannah-autodeploy", mac: "com.hannah.autodeploy" } },
    core: { kind: "python", channel: "core-stable", service: { linux: "hannah" } },
    webui: { kind: "python", channel: "webui-stable", service: { linux: "hannah-webui" } },
    telegram: { kind: "python", channel: "telegram-stable", service: { linux: "hannah-telegram" } },
    voiceid: { kind: "python", channel: "voiceid-stable", service: { linux: "hannah-voiceid", mac: "com.hannah.voiceid" } },
    proxy: { kind: "binary", channel: "proxy-stable", service: { linux: "hannah-proxy" } },
    logcollector: { kind: "binary", channel: "logcollector-stable", service: { linux: "hannah-logcollector" } },
  };

  // Reihenfolge der Einträge in der erzeugten Datei
  var ORDER = ["autodeploy", "core", "webui", "telegram", "voiceid", "proxy", "logcollector"];

  // Werte immer gequotet ausgeben — spart die Frage, welche Strings YAML-technisch
  // Quotes brauchen.
  function yq(value) {
    return '"' + String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }

  function readSelection(root) {
    var sel = {
      platform: root.querySelector('[name="had-platform"]:checked').value,
      arch: root.querySelector('[name="had-arch"]:checked').value,
      components: {},
    };
    ORDER.forEach(function (key) {
      var box = root.querySelector('[data-had="component-' + key + '"]');
      sel.components[key] = key === "autodeploy" || (box && box.checked);
    });
    return sel;
  }

  function buildEntry(name, sel) {
    var def = COMPONENTS[name];
    var mac = sel.platform === "mac";
    var lines = [];
    lines.push("  - name: " + name);

    var channel = def.channel;
    if (def.kind === "binary") channel += "-" + sel.arch;
    lines.push("    channel: " + channel);

    var dir = def.kind === "binary" ? "/usr/local/bin" : "/opt/hannah/" + name;
    lines.push("    install_dir: " + dir);
    lines.push("    service: " + def.service[mac ? "mac" : "linux"]);

    if (def.kind === "python") {
      var pip = dir + "/venv/bin/pip install --upgrade -q -r " + dir + "/requirements.txt";
      lines.push("    post_install: " + yq(pip));
    }
    return lines.join("\n");
  }

  function buildConfig(sel) {
    var mac = sel.platform === "mac";
    var selfService = COMPONENTS.autodeploy.service[mac ? "mac" : "linux"];
    var head = [
      "server_url: https://hannah-update.sgessinger.de",
      "#token: your-bearer-token-here",
      "poll_interval: 300  # seconds",
      "",
      "# Name of this agent's own service — triggers self-restart after self-update.",
      "self_service: " + selfService,
      "",
      "components:",
    ];
    var entries = ORDER.filter(function (k) { return sel.components[k]; }).map(function (k) {
      return buildEntry(k, sel);
    });
    return head.join("\n") + "\n" + entries.join("\n\n") + "\n";
  }

  function init() {
    var root = document.getElementById("hannah-autodeploy-builder");
    if (!root) return;

    var yamlCode = root.querySelector('[data-had="yaml-code"]');
    var pathNote = root.querySelector('[data-had="path"]');
    var archFields = root.querySelector('[data-had="arch-fields"]');
    var linuxOnly = root.querySelectorAll('[data-had-linux-only]');

    function render() {
      var sel = readSelection(root);
      var mac = sel.platform === "mac";

      // Auf macOS läuft nur VoiceID — alles andere ausblenden und abwählen.
      linuxOnly.forEach(function (el) {
        el.hidden = mac;
        var box = el.querySelector("input[type=checkbox]");
        if (mac && box) box.checked = false;
      });
      sel = readSelection(root);

      var needsArch = !mac && (sel.components.proxy || sel.components.logcollector);
      archFields.hidden = !needsArch;

      pathNote.textContent = mac ? "/opt/hannah/etc/autodeploy.yaml" : "/etc/hannah/autodeploy.yaml";
      yamlCode.textContent = buildConfig(sel);
    }

    root.addEventListener("change", render);
    render();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
