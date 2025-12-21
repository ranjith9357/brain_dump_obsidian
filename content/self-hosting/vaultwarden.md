
<span style="color:#FF9800; font-size:2em;">vaultwarden</span>

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a compatible, open-source, and self-hosted password manager. It is a fork of Bitwarden_rs with additional features and fixes.

Use the [Bitwarden](https://bitwarden.com/download/) phone app and browser extension to connect to this vaultwarden server.

Deploy behind [traefik](https://notes.rsubr.in/self~hosting/traefik).

```yaml
# Filename: /srv/vaultwarden.example.com/docker-compose.yml
# Deploy vaultwarden behind Traefik

name: vaultwarden-example-com

services:
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vault.example.com
    restart: always

    mem_limit: 256M

    environment:
      - SIGNUPS_ALLOWED=false
      - DOMAIN=https://vaultwarden.example.com
      - ADMIN_TOKEN=TODO_CHANGE_THIS

    volumes:
      - ./data:/data

    labels:
      - com.centurylinklabs.watchtower.enable=true
      - traefik.enable=true
      - traefik.http.routers.vaultwarden.rule=Host(`vaultarden.example.com`)
      - traefik.http.routers.vaultwarden.tls=true
      - traefik.http.routers.vaultwarden.tls.certresolver=lets-encrypt
```