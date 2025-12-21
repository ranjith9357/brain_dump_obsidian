
### On Linux (Ubuntu)

```
sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker
docker --version
```

### Run Docker without `sudo`

```
sudo usermod -aG docker $USER
newgrp docker
```
### On Windows / Mac

- Download Docker Desktop from https://www.docker.com/products/docker-desktop
    
- Install and run
    
- Enable WSL2 integration (for Windows)
    
### create file: `install-docker.sh`

```#!/bin/bash

# Simple Docker installation script

echo "Updating package lists..."
sudo apt update -y

echo "Installing Docker..."
sudo apt install docker.io -y

echo "Starting Docker service..."
sudo systemctl start docker

echo "Enabling Docker to start on boot..."
sudo systemctl enable docker

echo "Checking Docker version..."
docker --version

echo "Adding current user to docker group (optional)..."
sudo usermod -aG docker $USER
echo "You may need to log out and log back in to use Docker without sudo."

echo "Docker installation completed!"
```

### **How to run the script**

Make the script as executable

```
chmod +x install-docker.sh
```

Run it:

```
./install-docker.sh
```

<span style="color:#4FC3F7; font-size: 1.5em;">Docker vs docker.io</span>

- `docker.io` comes from Ubuntu/Debian default repos → may not be the latest version.
    
- Official Docker repo (`docker-ce`) has newest versions.
    
- For learning and basic projects, `docker.io` is fine.
### `docker-ce` (official Docker package)

- Comes from Docker’s official repository.
    
- Always the latest version.
    
- Better for production, latest features, and tutorials.
    
- Installation is slightly longer (requires adding Docker repo and GPG key).

<span style="color:#4FC3F7; font-size: 1.5em;">Docker service</span>

- Docker runs as a **system service** (`systemd`).
    
- Commands:

```
sudo systemctl status docker   # Check status
sudo systemctl start docker    # Start manually
sudo systemctl enable docker   # Start on boot
```

Certainly! To install Docker Engine (also known as Docker CE) on Ubuntu, you can follow the official Docker documentation. Here's the link to the step-by-step guide:

<span style="color: #FF9800; font-size: 1.5em;">🔗 Install Docker Engine on Ubuntu</span>

https://docs.docker.com/engine/install/ubuntu/?utm_source=chatgpt.com

This guide provides detailed instructions, including:

- **Setting up Docker's official GPG key and repository**: Ensures you get the latest Docker packages.
    
- **Installing Docker Engine and related components**: Covers the installation of Docker CE, Docker CLI, container, and Docker Compose plugin.
    
- **Starting and enabling Docker service**: Instructions to start Docker immediately and enable it to start on boot.
    
- **Post-installation steps**: Guidance on managing Docker as a non-root user and other optional configurations.

<span style="color: #FF9800; font-size: 1.5em;">Docker Compose</span>

Needed if you plan to run multi-container apps:

```
sudo apt install docker-compose -y   # For docker.io
# OR follow official Docker Compose installation for docker-ce
```

Install Docker Compose manually (latest version)

1.Download the Docker Compose binary

```
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2.Apply executable permissions

```
sudo chmod +x /usr/local/bin/docker-compose
```

3.Verify installation

```
docker-compose --version
```

4.Usage example

```
docker-compose up -d       # Start services in background
docker-compose ps           # List running containers
docker-compose down         # Stop containers
```

💡 **Tip:**

- `docker compose` (without dash) → newer plugin-style command
    
- `docker-compose` (with dash) → standalone binary
    
Both work, but Docker CE prefers the **plugin version (`docker compose`)**.

### create file: `install-docker-ce-compose.sh`


```

#!/bin/bash

# Beginner-friendly script to install Docker CE + Docker Compose

echo "=== Updating system packages ==="
sudo apt update -y
sudo apt upgrade -y

echo "=== Installing required packages ==="
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release -y

echo "=== Adding Docker GPG key ==="
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "=== Adding Docker repository ==="
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "=== Updating package lists ==="
sudo apt update -y

echo "=== Installing Docker CE ==="
sudo apt install docker-ce docker-ce-cli containerd.io -y

echo "=== Starting and enabling Docker service ==="
sudo systemctl start docker
sudo systemctl enable docker

echo "=== Checking Docker version ==="
docker --version

echo "=== Adding current user to Docker group (optional) ==="
sudo usermod -aG docker $USER
echo "You may need to log out and log back in to run Docker without sudo."

echo "=== Installing Docker Compose (latest version) ==="
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "=== Checking Docker Compose version ==="
docker-compose --version

echo "=== Testing Docker installation ==="
docker run hello-world

echo "=== Docker CE + Docker Compose installation completed! ==="

```

### **How to use the script**

1. Save it as `install-docker-ce-compose.sh`
    
2. Make it executable:
    
`chmod +x install-docker-ce-compose.sh`

1. Run it:

`./install-docker-ce-compose.sh`