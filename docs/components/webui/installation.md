# Installation

Am schnellsten über [Docker Compose](../../manual/installation.md) — `hannah-webui` ist
standardmäßig mit dabei (zusammen mit Core).

Verbindet sich per gRPC mit Core (`HANNAH_WEBUI_GRPC_HOST` / `HANNAH_WEBUI_GRPC_PORT`) und
braucht einen eigenen `HANNAH_WEBUI_SECRET_KEY` (zufälliger String, siehe
[Hinweis zur Compose-Datei](../../manual/installation.md)).

*(Native Installation ohne Docker folgt.)*
