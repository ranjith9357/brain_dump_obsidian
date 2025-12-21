
<span style="color:#FF9800; font-size:2em;">rustpad</span>

<span style="color:#FF0000; font-size:2em;">Rustpad</span>

[Rustpad](https://rustpad.io/) is a lightweight collaborative text editor with sqlite backend.

Rustpads notes are persisted for 30 days. Note that there is no user authentication, so anyone with the link can edit the pad.

Existing Rustpads cannot be listed, you must know the URL to access it.

Deploy behind [traefik](https://notes.rsubr.in/self~hosting/traefik).

```yaml
# Filename: /srv/rustpad.example.com/docker-compose.yaml
# Deploy Rustpad behind traefik

name: rustpad-example-com

services:
  rustpad:
    image: ekzhang/rustpad
    container_name: rustpad.example.com
    restart: always

    mem_limit: 64M

    environment:
      - EXPIRY_DAYS=30
      - SQLITE_URI=/data/rustpad.sqlite

    volumes:
      - ./data:/data

    labels:
      - com.centurylinklabs.watchtower.enable=true
      - traefik.enable=true
      - traefik.http.routers.rustpad.rule=Host(`rustpad.example.com`)
      - traefik.http.routers.rustpad.tls=true
      - traefik.http.routers.rustpad.tls.certresolver=lets-encrypt
      - traefik.http.services.rustpad.loadbalancer.server.port=3030
```