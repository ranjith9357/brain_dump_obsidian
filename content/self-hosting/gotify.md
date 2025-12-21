
<span style="color:#FF0000; font-size:2em;">Gotify</span>

[Gotify](https://gotify.net/) is a self-hosted push notification service for Android and web. iOS users no joy.

Fully self contained, uses sqlite. Use with self hosted Node Red, n8n, and other projects.

Deploy behind [traefik](https://notes.rsubr.in/self~hosting/traefik).

## Docker Compose

```yaml
# Filename: /srv/gotify.example.com/docker-compose.yaml

name: gotify-example-com

services:
  gotify:
    image: ghcr.io/gotify/server-arm64
    container_name: gotify.example.com

    mem_limit: 256M

    environment:
      - GOTIFY_DEFAULTUSER_PASS=supersecret

    volumes:
      - ./data:/app/data

    labels:
      - com.centurylinklabs.watchtower.enable=true
      - traefik.enable=true
      - traefik.http.routers.gotify.rule=Host(`gotify.example.com`)
      - traefik.http.routers.gotify.tls=true
      - traefik.http.routers.gotify.tls.certresolver=lets-encrypt
```