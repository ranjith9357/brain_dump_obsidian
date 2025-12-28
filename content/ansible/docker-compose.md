Ansible is an automation tool used to configure servers, install software, and manage infrastructure automatically — without logging into servers manually.

In simple words:

Ansible = do server work automatically instead of typing commands again and again

<span style="color:#FF9800; font-size:2em;">Why Ansible is used</span>

Imagine you have:

- 1 server → easy to manage
    
- 10 servers → painful
    
- 100 servers → impossible manually
    

Ansible solves this.

Using a script

You can write a  bash script or PowerShell script to automate tasks:

Example: `install-docker-compose.sh`

```
#!/bin/bash
wget https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64 -O /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/local/bin/d
```


<span style="color:#FF9800; font-size:1.5em;">You can copy it to each server and run:</span>

`bash install-docker-compose.sh`

✅ Works fine  
❌ But you have to  manually copy and run on every serve

<span style="color:#FF9800; font-size:1.5em;">Using Ansible</span>

With Ansible:
``` 
hosts: all   
gather_facts: yes   
tasks:     
  - name: Download docker-compose       
    get_url:         
    url: https://github.com/docker/compose/releases/download/v2.29.7/docker-compose-linux-x86_64       
    dest: /usr/local/bin/docker-compose         
    mode: '0755'
```

<span style="color:#FF9800; font-size:1.2em;">Run one command on your control machine:</span>

`ansible-playbook install-compose.yml`

- Ansible automatically executes tasks on all servers listed in your inventory.
    
- No need to copy scripts manually.
    
- Idempotent: running again doesn’t break anything.

<span style="color:#FF9800; font-size:1.2em;">What is a control machine?</span>

- It’s the machine where you run Ansible commands.
    
- It connects to your target servers over SSH (Linux/macOS) or WinRM (Windows).
    
- It does not need Docker Compose installed itself.
    
So your control machine is usually your laptop or a central server.

<span style="color:#FF9800; font-size:1.2em;">Prepare an inventory file</span>

Ansible needs to know **which servers** to manage.

Example `inventory.ini`:

```
[servers]
server1 ansible_host=192.168.1.101 ansible_user=ubuntu
server2 ansible_host=192.168.1.102 ansible_user=ubuntu
server3 ansible_host=192.168.1.103 ansible_user=ubuntu
```

- `ansible_host` → IP of the server

- `ansible_user` → SSH user

- Make sure your SSH key is set up, or you’ll need a password prompt

<span style="color:#FF9800; font-size:1.2em;">Create a playbook</span>

Example `install-docker-compose.yml`:

```
- name: Install Docker Compose on all servers
  hosts: servers
  gather_facts: yes
  become: yes

  vars:
    version: "v2.29.7"
    binary_name: "docker-compose"
    download_url: "https://github.com/docker/compose/releases/download/{{ version }}/{{ binary_name }}-linux-x86_64"
    dest_path: "/usr/local/bin/{{ binary_name }}"
    link_path: "/usr/local/bin/d"

  tasks:
    - name: Download docker-compose binary
      get_url:
        url: "{{ download_url }}"
        dest: "{{ dest_path }}"
        mode: '0755'

    - name: Create symlink 'd'
      file:
        src: "{{ dest_path }}"
        dest: "{{ link_path }}"
        state: link
```

<span style="color:#FF9800; font-size:1.2em;">Run the playbook from control machine:</span>

`ansible-playbook -i inventory.ini install-docker-compose.yml`

- Ansible will connect to all 3 servers in `[servers]`
    
- Download Docker Compose
    
- Create shortcut `d`
    
- All with one command

<span style="color:#FF9800; font-size:1.2em;">Verify on each server</span>

SSH into any server:

`d --version`

or

`docker-compose --version`

You should see:

`Docker Compose version v2.29.7`

<span style="color:#FF9800; font-size:1.2em;">Notes / tips</span>

- Ensure SSH key login works for all servers → avoids password prompts
    
- You can add more servers to inventory and rerun the same playbook
    
- Ansible is idempotent → running again won’t overwrite existing correct versions


<span style="color:#FF9800; font-size:1.2em;">Key difference</span>

|Feature|Script|Ansible|
|---|---|---|
|Run on multiple servers|Must manually copy/run|Run once on all servers|
|Error handling|Manual|Built-in, can stop if error|
|Idempotency|Hard|Built-in (won’t repeat unnecessary steps)|
|Scalability|Low|High|
|Readability|Varies|YAML is structured & readable|
