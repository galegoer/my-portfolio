#!/bin/bash

#give permission for everything in the node-app directory
sudo chmod -R 777 /home/ec2-user/node-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/node-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)
export HOME="/home/ubuntu/"
sudo PM2_HOME=/home/ubuntu/.pm2 pm2 list

#install node modules
which pm2
which node
ls /usr/local/bin/
ls /home
ls /home/ubuntu/

cd my-website/server
npm install
cd ../client/
npm install
cd /home/ec2-user/node-app/scripts

# start both client and server
pm2 start ecosystem.config.js

#start our node app in the background
# node app.js > app.out.log 2> app.err.log < /dev/null &