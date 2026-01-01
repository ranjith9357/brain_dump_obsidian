
<span style="color:#FF9800; font-size:1.4em;">Create LXC Container in Proxmox</span>

- Create a new Ubuntu LXC container for Gitea.
    
<span style="color:#FF9800; font-size:1.4em;">Install Required Packages</span>

- Purpose: Gitea needs Git, curl, wget, unzip, etc.
    
- Commands (run inside container):

```
apt update && apt upgrade -y
apt install -y git curl wget unzip 
```

<span style="color:#FF9800; font-size:1.4em;">Setup docker-compose.yaml</span>

`root@gitea:/srv/gitea.local# nano docker-compose.yaml`

Filename: /srv/gitea.local/docker-compose.yaml

```
name: gitea-local
services:
  gitea:
    image: gitea/gitea:1-rootless
    container_name: gitea.local
    hostname: gitea
    restart: always
    user: nobody

    mem_limit: 2G

    ports:
      - 3000:3000
      - 2222:2222

    volumes:
      - ./data:/var/lib/gitea
      - ./config:/etc/gitea
      - /etc/timezone:/etc/timezone:ro

    labels:
      - com.centurylinklabs.watchtower.enable=true
```

<span style="color:#FF9800; font-size:1.4em;">Configure app.ini</span>

`root@gitea:/srv/gitea.local/config# cat app.ini`

```
; Filename: app.ini
; Gitea configuration file
; 
; Ref: https://docs.gitea.io/en-us/config-cheat-sheet/
APP_NAME = Gitea: CRI IIOT Private
RUN_USER = nobody
RUN_MODE = prod
WORK_PATH = /var/lib/gitea

[repository]
ROOT = /var/lib/gitea/git/repositories

[repository.local]
LOCAL_COPY_PATH = /tmp/gitea/local-repo

[repository.upload]
TEMP_PATH = /tmp/gitea/uploads

[server]
APP_DATA_PATH = /var/lib/gitea
SSH_DOMAIN = 172.31.31.31
HTTP_PORT = 3000
ROOT_URL = http://172.31.31.31:3000
DISABLE_SSH = false
; In rootless gitea container only internal ssh server is supported
START_SSH_SERVER = true
SSH_PORT = 2222
SSH_LISTEN_PORT = 2222
BUILTIN_SSH_SERVER_USER = git
LFS_START_SERVER = true
DOMAIN = 172.31.31.31
LFS_JWT_SECRET = BZx38ttyq6rNFrFh38HcnKQkx9JncTKLi-CxjqwQT-Q
OFFLINE_MODE = false

[lfs]
PATH = /var/lib/gitea/git/lfs

[database]
PATH = /var/lib/gitea/data/gitea.db
DB_TYPE = sqlite3
LOG_SQL = false

[session]
PROVIDER_CONFIG = /var/lib/gitea/data/sessions
PROVIDER = file

[picture]
AVATAR_UPLOAD_PATH = /var/lib/gitea/data/avatars
REPOSITORY_AVATAR_UPLOAD_PATH = /var/lib/gitea/data/gitea/repo-avatars
DISABLE_GRAVATAR = false
ENABLE_FEDERATED_AVATAR = true

[attachment]
PATH = /var/lib/gitea/data/attachments

[log]
ROOT_PATH = %(GITEA_WORK_DIR)/log
MODE = console
LEVEL = Warn
STACKTRACE_LEVEL = None
logger.router.MODE = ,
logger.xorm.MODE = ,
logger.access.MODE = 

; this is the config options of "console" mode (used by MODE=console above)
[log.console]
MODE = console
FLAGS = stdflags
PREFIX = 
COLORIZE = true

[security]
INSTALL_LOCK = true
SECRET_KEY = ***********
INTERNAL_TOKEN = **********

[service]
DISABLE_REGISTRATION = false
REQUIRE_SIGNIN_VIEW = false
REGISTER_EMAIL_CONFIRM = false
ENABLE_NOTIFY_MAIL = false
ALLOW_ONLY_EXTERNAL_REGISTRATION = false
ENABLE_CAPTCHA = false
DEFAULT_KEEP_EMAIL_PRIVATE = false
DEFAULT_ALLOW_CREATE_ORGANIZATION = false
DEFAULT_ENABLE_TIMETRACKING = false
NO_REPLY_ADDRESS = 
EMAIL_DOMAIN_ALLOWLIST = ******

; Auto create Google SSO users from @domain.com
; Gitea username will be the username part of the email (eg {username}@domain.com)
[oauth2_client]
ENABLE_AUTO_REGISTRATION = false
ACCOUNT_LINKING = disabled
REGISTER_EMAIL_CONFIRM = false
UPDATE_AVATAR = true
USERNAME = email

[oauth2]
JWT_SECRET = **************
[ui]
#DEFAULT_THEME = gitea
#THEMES = gitea,arc-green

[mailer]
ENABLED = true
FROM = noreply-gitea@example.com
PROTOCOL = smtp+starttls
SMTP_ADDR = in-v3.mailjet.com
SMTP_PORT = 587
USER = TODO_USER
PASSWD = TODO_PASSWORD

[openid]
ENABLE_OPENID_SIGNIN = false
ENABLE_OPENID_SIGNUP = false

[webhook]
ALLOWED_HOST_LIST = *
```

<span style="color:#FF9800; font-size:1.4em;">Setup Admin User</span>

- Open `http://<LXC-IP>:3000` in browser.
    
- Fill in admin username, email, password.
    
- Log in and configure organization / repos.

<span style="color:#FF9800; font-size:1.4em;">Verify Repository Creation</span>

- Create a test repo via web UI.
    
- Clone a repo from container:
    
`git clone http://<LXC-IP>:3000/<user>/<repo>.git`

- Check that repo exists inside `data/git/` folder in container.

<span style="color:#FF9800; font-size:1.4em;">Backup</span>

- Files to backup:
    
    - SQLite DB: `/srv/gitea.local/data/gitea.db`
        
    - Git repositories: `/srv/gitea.local/data/git/`

<span style="color:#FF9800; font-size:1.4em;">Notes</span>

> [!tip] Pro Tip
> SQLite is fine for small setups; for medium/large teams, consider PostgreSQL.
> Proxmox LXC container resources should be sized based on team/repo usage.
> If using reverse proxy, ensure firewall rules on Proxmox host allow traffic to container.
