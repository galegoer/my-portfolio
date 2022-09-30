#!/bin/bash

#give permission for everything in the node-app directory
sudo chmod -R 777 /home/ec2-user/node-app

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

sudo npm install pm2 -g

#navigate into our working directory where we have all our github files
cd /home/ec2-user/node-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)
export HOME="/home/ec2-user/"
sudo PM2_HOME=/home/ec2-user/.pm2 pm2 list

#install node modules
which pm2
which node
ls /usr/local/bin/
ls /home
ls /home/ec2-user/

cd my-website/server
npm install
cd ../client/
npm install
cd /home/ec2-user/node-app/scripts

pm2 start ecosystem.config.js