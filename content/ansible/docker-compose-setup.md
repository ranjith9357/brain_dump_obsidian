
<span style="color:#FF9800; font-size:2em;">Ansible Playbook to Download docker-compose</span>

Download `docker-compose` from GitHub [Releases](https://github.com/docker/compose/releases).

1. Specify the version to download, eg. `v2.29.7`.
2. If the docker-compose binary with the specified version already exists locally, then do nothing.
3. The OS architecture is auto detected (x86_64, aarch64, etc).
4. A symlink `d` is placed in `/usr/local/bin` as a shortcut for `docker-compose`.

Run using `ansible-playbook docker-compose-download.yml`

```yaml
# Filename: docker-compose-download.yml
# Ansible playbook to download the specified docker-compose binary from GitHub releases.
# Sets a shortcut "d" to point to the docker-compose binary.
# Run standalone: ansible-playbook docker-compose-download.yml

- name: Download docker-compose v2 binary from GitHub releases
  hosts: localhost
  gather_facts: yes
  vars:
    version: "v2.29.7"   # Set the version you want to download
    binary_name: "docker-compose"
    github_repo: "docker/compose"
    download_url: "https://github.com/{{ github_repo }}/releases/download/{{ version }}/{{ binary_name }}-linux-{{ansible_architecture }}"
    dest_path: "/usr/local/bin/{{ binary_name }}"
    link_path: "/usr/local/bin/d"

  tasks:
    - name: Check if the binary already exists
      stat:
        path: "{{ dest_path }}"
      register: binary_stat

    - name: Get current binary version if it exists
      when: binary_stat.stat.exists
      command: "{{ dest_path }} --version"
      register: current_version_output
      changed_when: false

    - name: Extract version number from command output
      set_fact:
        current_version: "{{ current_version_output.stdout | split(' ') | last }}"

    - name: Download the binary if it does not exist or version has changed
      when: not binary_stat.stat.exists or (current_version != version)
      get_url:
        url:  "{{ download_url }}"
        dest: "{{ dest_path }}"
        mode: '0755'

    - name: Check if symlink 'd' exists
      stat:
        path: "{{ link_path }}"
      register: symlink_stat

    - name: Create symlink for docker-compose
      when: not symlink_stat.stat.exists
      file:
        src:  "{{ dest_path }}"
        dest: "{{ link_path }}"
        state: link
```

## References

1. [docker-compose-download](https://notes.rsubr.in/ansible/ubuntu/docker~compose~download) using shell script