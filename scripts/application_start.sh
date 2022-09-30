#!/bin/bash

#give permission for everything in the node-app directory
sudo chmod -R 777 /home/ec2-user/node-app

#navigate into our working directory where we have all our github files
cd /home/ec2-user/node-app

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
cd my-website/server
sudo ~/.nvm/versions/node/v16.17.1/bin/npm install
cd ../client/
sudo ~/.nvm/versions/node/v16.17.1/bin/npm install
cd /home/ec2-user/node-app/scripts

# delete existing not sure if necessary
sudo ~/.nvm/versions/node/v16.17.1/bin/pm2 delete ecosystem.config.js
# start both client and server
sudo ~/.nvm/versions/node/v16.17.1/bin/pm2 start ecosystem.config.js

#start our node app in the background
# node app.js > app.out.log 2> app.err.log < /dev/null &