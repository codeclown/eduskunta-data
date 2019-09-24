# Deploy

**NOTE!** This process and document is WIP.

## Get a VM

The provisioning scripts have been tailored for ubuntu/xenial64, so it is recommended to use that as the base box.

E.g. in EC2 find a suitable AMI (use https://cloud-images.ubuntu.com/locator/ec2/).

## Make sure that box has ansible dependencies installed (python & pip)

See what [Vagrantfile](Vagrantfile) does, search for `config.vm.provision "shell"` lines.

## Create a env-file with the IP of the box

Write the correct details into `deploy/env/production`.

```bash
$ cat deploy/env/production
123.10.10.5 ansible_ssh_port=22 ansible_ssh_user=user ansible_ssh_private_key_file=/path/to/private/key ansible_ssh_common_args='-o StrictHostKeyChecking=no' ansible_python_interpreter=/usr/bin/python3
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
