# Deploy

## Prerequisites

Eduskunta-data runs on a single Ubuntu xenial VM, including the database. Due to the nature of the project there is currently no need to persist data in outside locations, as the entire service can be created via provisioning and deploying a new server (all data is downloaded and aggregated identically).

In the future there might be reason to push (a) images and (b) database dumps into an external service such as S3.

The node process serving the web app is managed by a systemd service.

The web app is exposed to the public via nginx.

## Deploying eduskunta-data

### Get a VM

The provisioning scripts have been tailored for ubuntu/xenial64, so it is recommended to use that as the base box.

E.g. in EC2 find a suitable AMI (use https://cloud-images.ubuntu.com/locator/ec2/).

In a nutshell:
1. Create new EC2 instance
2. AMI: `ami-7dd85203` if in `eu-north-1` (Stockholm)
3. `t3.micro` should be enough
4. Make sure that HTTP traffic is allowed in the security group!

### Make sure that the box has ansible dependencies installed (python & pip)

See what [Vagrantfile](Vagrantfile) does, search for `config.vm.provision "shell"` lines.

E.g. SSH into your VM and run the same commands (`sudo apt-get update && ...`).

### Create a env-file with the IP of the box

Write the correct details into `deploy/env/production`.

Example:

```bash
$ cat deploy/env/production
123.11.11.5 ansible_ssh_user=ubuntu ansible_ssh_private_key_file=/path/to/private/key.pem ansible_python_interpreter=/usr/bin/python3
```

### Provision VM via ansible

```bash
ansible-playbook -i deploy/env/production deploy/playbooks/provision.yml
```

### Deploy the application via ansible

The playbook pulls master from git and runs migrations, schedules cron workers, etc.

```bash
ansible-playbook -i deploy/env/production deploy/playbooks/deploy.yml
```
