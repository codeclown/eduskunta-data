# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"

  config.vm.network "private_network", ip: "192.168.50.5"

  config.vm.synced_folder ".", "/app"

  # Ensure python is installed
  config.vm.provision "shell", inline: "sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get -y install python3-pip && pip3 install setuptools"

  # CD automatically to project folder upon login
  config.vm.provision "shell", inline: "echo \"cd /app\" >> /home/vagrant/.bashrc"

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048

    # https://superuser.com/a/1395394/23393
    # disables the ubuntu-xenial-16.04-cloudimg-console.log file upon startup
    v.customize [ "modifyvm", :id, "--uartmode1", "disconnected" ]
  end
end
