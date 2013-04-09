#!/bin/bash

PROJECT_DIR=/vagrant
USER_HOME=/home/vagrant

# TODO: nodejs is compiled and installed because the repository version is too old. When it reaches 0.8.x we can install it from apt.
# TODO: npm might need to be installed explicitely if using apt.
NODE_VERSION=0.10.3

##
#	Execute only the first time the virtual machine is started
##
if [ -f ${USER_HOME}/.vagrant_setup_executed ]; then
	echo "Skipping environment installation as it has already been setup."
	echo "starting nginx.."
	sudo service nginx restart	
	exit 0
	
fi

echo "Environment installation is beginning. This may take a few minutes.."

##
#	Install core components
##

echo "configuring apt"
# mongo db
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
sudo bash -c 'echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" >> /etc/apt/sources.list.d/10gen.list'


echo "Updating package repositories.."
apt-get update

echo "Installing required packages.."
apt-get -y install git nginx postgresql libpq-dev pkg-config make cmake flex build-essential g++ nfs-common mongodb-10gen htop iftop

##
#	Download, Build, and install Node.js
##

echo "Installing node.js from source. This may take a few minutes.."
wget --quiet http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz
cd node-v$NODE_VERSION
./configure
make
make install
cd ..

echo "Cleaning up node.js installation.."
rm --force $USER_HOME/node-v$NODE_VERSION.tar.gz
rm --force --recursive $USER_HOME/node-v$NODE_VERSION

echo "Installing node.js packages.."
# Sudo su to get a fresh environment when running command
sudo su - vagrant /bin/bash -c "cd ${PROJECT_DIR}/node; npm install;"

##
#	Populate mongodb
##
echo "restoring mongo"
for i in /vagrant/conf/dev/mongodb/*; do
	p=`expr $i : '\/vagrant\/conf/\dev\/mongodb\/\([^\/]*\)'`
	echo "restoring "$p
	mongorestore -d $p /vagrant/conf/dev/mongodb/$p
done

##
#	Install Symlinks
##
echo "Installing configuration files.."
rm --force /etc/nginx/sites-enabled/*
rm --force /etc/apache2/sites-enabled/*

if [ ! -e ${PROJECT_DIR}/conf/local ]; then
	mkdir ${PROJECT_DIR}/conf/local
fi

cd /etc/nginx/sites-available
ln --symbolic --force ${PROJECT_DIR}/conf/dev/etc/nginx/sites-available/highfin-dev.conf

cd /etc/nginx/sites-enabled
ln --symbolic --force ../sites-available/highfin-dev.conf

service nginx restart

# create upstart for smog
echo 'start on startup
stop on shutdown

script
    # We found $HOME is needed. Without it, we ran into problems
    export HOME="/vagrant"
    echo "Starting smog - available at 192.168.35.100:8080"
    smog
end script' > /etc/init/smog.conf
chmod u+x /etc/init/smog.conf
start smog

touch ${USER_HOME}/.vagrant_setup_executed
 
echo “starting mongodb...”
sudo mongod --fork --logpath /srv/logs/mongodb/default.og --logappend


##
#	Run custom post-install script.
##
echo "Looking for vagrant_setup_custom.sh in ${PROJECT_DIR}/conf/local.."
if [ -f ${PROJECT_DIR}/conf/local/vagrant_setup_custom.sh ]; then
	echo "Found vagrant_setup_custom.sh. Executing.."
	chmod +x ${PROJECT_DIR}/conf/local/vagrant_setup_custom.sh
	. ${PROJECT_DIR}/conf/local/vagrant_setup_custom.sh
else
	echo "Could not find vagrant_setup_custom.sh."
fi

echo ""
echo "HighFin project has been installed. You may close this window."
echo ""
echo "You need to ctrl-c a couple times to exit this script. This is due to a bug: https://github.com/mitchellh/vagrant/issues/861"
echo ""
echo "You can start the machine by doing: vagrant up"
echo "You can ssh to the machine by typing: vagrant ssh"
echo "You can stop the machine by doing: vagrant halt"
echo "You can delete the machine by doing: vagrant destroy"
echo ""
echo "This is your first time so you should ssh into the machine (vagrant ssh) and run: sudo ${USER_HOME}/postinstall.sh"
echo ""
echo ""
echo "Also, you probably want to create a ${PROJECT_DIR}/conf/local/vagrant_setup_custom.sh to be automatically executed next time."

exit 0
