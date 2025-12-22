
<span style="color:#FF0000; font-size:1.5em;">proxmox-installation</span>

Installation process for Proxmox 8.x.

<span style="color:#FF9800; font-size:2em;">Overview</span>

Host machine config:

1. For primary storage, the host must have 2 x SSD/NVMe of same size to host all CT/VMs.
2. Recommended to have 2 x HDD of same size for storing local backups.
3. Recommendation is to have 1:4 ratio of SSD:HDD, eg. 2 x 1TB NVMe for primary store and 2 x 4TB HDD for backup store.
4. All disks will have `zfs RAID1` to protect against disk failures. Eg. 2 x 1TB NVMe in zfs RAID1 set and 2 x 4TB SATA in another zfs RAID1 set.
5. zfs is the preferred filesystem for local storage as it offer the [best storage features](https://pve.proxmox.com/pve-docs/chapter-pvesm.html) like snapshots, clone, replication, data protection, performance, etc.

<span style="color:#FF9800; font-size:1.8em;">Installation Steps</span>

Create Bootable USB Using <span style="color:#FF9800; font-size:1em;">"Ventoy"</span>

<span style="color:#FF9800; font-size:1em;">"Ventoy"</span>  allows you to boot directly from ISO files without flashing them.

 <span style="color:#FF9800; font-size:1.5em;">"Download Ventoy"</span>

- [https://www.ventoy.net/en/download.html](https://www.ventoy.net/en/download.html)

 <span style="color:#FF9800; font-size:1.5em;">"Install Ventoy on USB"</span>

1. Insert your USB drive
    
2. Open **Ventoy2Disk** exe
    
3. Select your USB device
    
4. Click **Install**
    
5. Confirm (⚠️ all data will be erased)
    
<span style="color:#FF9800; font-size:1em;">"Ventoy"</span> needs to be installed **only once** on the USB.
### 📝 Notes

- Supports **UEFI & Legacy BIOS**
    
- You can keep **multiple ISOs** on the same USB
    
- Faster and safer than repeated flashing tools
    
- Ideal for homelab & Proxmox testing

 <span style="color:#FF9800; font-size:1.5em;">Proxmox VE Installation Steps</span>
 
After booting the system using <span style="color:#FF9800; font-size:1em;">"Ventoy"</span>  and selecting the **Proxmox VE ISO**, follow these steps:

🔗 Official <span style="color:#FF9800; font-size:1em;">"Proxmox"</span> VE downloads page: [https://www.proxmox.com/en/downloads/proxmox-virtual-environment](https://www.proxmox.com/en/downloads/proxmox-virtual-environment?utm_source=chatgpt.com)
### Start Installer

- In the Proxmox boot menu, select:  
    **Install Proxmox VE (Graphical)**
- Press **Enter**
### Accept License Agreement

- Read the license terms
- Click **I Agree** to continue
### Select Target Disk

- Choose the disk where Proxmox will be installed
- Recommended:
    - **SSD / NVMe** for best performance
### Set Location & Time

- **Country**
- **Country**
- **Time zone**
- **Keyboard layout**  
    Click **Next**
### Set Administrator Password & Email

- Set **root password** (important for Web UI & SSH)
- Enter a valid **email address**
    - Used for system alerts
> ⚠️ Use a strong password – root is the main admin user
### Network Configuration

Configure the primary management network:
- **Management Interface**: (e.g., `eno1`, `eth0`)
- **Hostname**:  
    Example:
    `proxmox.local proxmox.lab pve01.lab.local`
- **IP Address**: Static IP (recommended)
- **Gateway**
- **DNS Server**

> ⚠️ Avoid DHCP for servers
### Confirm & Install

- Review configuration summary
- Click **Install**
- Wait for installation to complete (5–10 minutes)
### Reboot System

- After completion, click **Reboot**
- Remove USB drive when prompted

<span style="color:#FF9800; font-size:1.8em;">Access Proxmox Web Interface</span>

After reboot, access Proxmox from another machine:

`https://<Proxmox-IP>:8006`

<span style="color:#FF9800; font-size:1.8em;">References:</span>

https://youtu.be/5j0Zb6x_hOk?si=h-CQIXp11jyhnIeH

https://youtu.be/-7APoZzNPyU?si=mhDtqBN5w_IK5YQ9

https://pve.proxmox.com/pve-docs/


