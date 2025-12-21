
<span style="color:#FF0000; font-size:2em;">SSH - Web Client</span>

[sshwifty](https://github.com/nirui/sshwifty) is a web based ssh client that can be used to access remote servers via a web browser. It is a simple and easy to use tool that can be used to access remote servers without the need to install a ssh client on your local machine.

For best results, ensure the docker host is connected to a [tailscale](https://tailscale.com/) network. This will allow the entire tailnet to be accessed via sshwifty.

Deploy behind [traefik](https://notes.rsubr.in/self~hosting/traefik).

```yaml
# Filename: /srv/ssh.example.com/docker-compose.yml
# Run sshwifty behind traefik
# Note: if this docker host is connected to tailscale then the entire
# tailnet can be accessed via sshwifty

name: ssh-example-com

services:
  ssh:
    image:  niruix/sshwifty:latest
    container_name: ssh.example.com
    restart: always

    mem_limit: 265M

    labels:
      - com.centurylinklabs.watchtower.enable=true
      - traefik.enable=true
      - traefik.http.routers.ssh.rule=Host(`ssh.example.com`)
      - traefik.http.routers.ssh.tls=true
      - traefik.http.routers.ssh.tls.certresolver=lets-encrypt
```