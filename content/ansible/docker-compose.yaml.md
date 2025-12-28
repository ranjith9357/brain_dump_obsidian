
<span style="color:#FF9800; font-size:1.5em;">All Docker Deployments</span>

services:

```
qds:
    image: rsubr/php-apache-ubuntu:noble
    container_name: qds-app.iotsignin.com
    restart: always

    ports:
      - "8080:80"

    volumes:
      - ./www:/var/www
      - ./www/public:/var/www/html

    depends_on:
      pgdb-qds:
        condition: service_healthy
```

```
  pgdb-qds:
    image: timescale/timescaledb:latest-pg17
    container_name: pgdb-qds.iotsignin.com
    restart: always
    environment:
      - POSTGRES_DB=qds
      - POSTGRES_USER=qds
      - POSTGRES_PASSWORD=*****

    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U qds -d qds"]
      interval: 10s
      timeout: 5s
      retries: 5

    volumes:
      - ./pg_data17:/var/lib/postgresql/data

    ports:
      - "5432:5432"
```

```
  qds-worker:
    image: rsubr/php-apache-ubuntu:noble
    container_name: qds-worker.iotsignin.com
    restart: always
    user: root

    volumes:
      - ./www:/var/www
      - ./www/public:/var/www/html

    depends_on:
      pgdb-qds:
        condition: service_healthy

    entrypoint: ["php", "/var/www/artisan", "queue:work"]
```

```
  go-client:
    image: golang:latest
    container_name: go-client.iotsignin.com
    restart: always

    volumes:
      - ./mqtt:/go
      
    depends_on:
      pgdb-qds:
        condition: service_healthy
        
    entrypoint: ["go", "run", "/go/mqtt_client.go"]
```

```
  rustpad:
    image: ekzhang/rustpad
    container_name: notes.iotsignin.com
    restart: always

    depends_on:
      pgdb-qds:
        condition: service_healthy

    environment:
      - DATABASE_URL=postgresql://notes:H0ZiUEB1syaSCdHy@pgdb-qds.iotsignin.com:5432/notes
      - RUST_LOG=info

    ports:
      - "3030:3030"
```

```
  openproject:
    image: openproject/openproject:16
    container_name: openproject
    restart: always

    ports:
      - "8089:80"

    depends_on:
      pgdb-qds:
        condition: service_healthy

    environment:
      - PGVERSION=17
      - DATABASE_URL=postgresql://openproject:H0ZiUEB1syaSCdHy@pgdb-qds.iotsignin.com:5432/openproject

      - OPENPROJECT_EMAIL_DELIVERY_METHOD:smtp
      - OPENPROJECT_SMTP_ADDRESS:smtp.office365.com
      - OPENPROJECT_SMTP_PORT:587
      - OPENPROJECT_SMTP_DOMAIN:iotsignin.com
      - OPENPROJECT_SMTP_AUTHENTICATION:login
      - OPENPROJECT_SMTP_USER_NAME:noreply.iotsignin@cripumps.com
      - OPENPROJECT_SMTP_PASSWORD:hJ5pfrY78SYu*
      - OPENPROJECT_SMTP_ENABLE_STARTTLS_AUTO=true
      - OPENPROJECT_HOST__NAME=workspace.iotsignin.com 

    volumes:
      - ./openproject_data:/var/openproject/assets
```

```
  cups:
    image: olbat/cupsd
    container_name: cups_server
    restart: always

    ports:
      - "631:631"

    volumes:
      - ./cups-spool:/var/spool/cups
```

```
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped

    environment:
      WEBSOCKET_ENABLED: "true"
      SIGNUPS_ALLOWED: "true"

    volumes:
      - ./vaultdata:/data

    ports:
      - "8090:80"
```

```
  excalidraw:
    image: excalidraw/excalidraw
    container_name: excalidraw
    restart: always

    ports:
      - "8095:80"

    mem_limit: 64M
```

```
  gotify:
    image: ghcr.io/gotify/server-arm64
    container_name: gotify

    mem_limit: 256M

    environment:
      - GOTIFY_DEFAULTUSER_PASS=admin

    volumes:
      - ./data:/app/data

    ports:
      - "8096:80"
```

```
  ssh:
    image:  niruix/sshwifty:latest
    container_name: ssh.example.com
    restart: always

    mem_limit: 265M

    ports:
      - "8097:8182"
```