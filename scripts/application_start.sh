#!/bin/bash

#give permission for everything in the node-app directory
# might be unnecessary now
sudo chmod -R 777 /home/ec2-user/node-app

# have to keep installing doesn't really work otherwise
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install node

# sudo npm install pm2 -g

#navigate into our working directory where we have all our github files
cd /home/ec2-user/node-app

#add npm and node to path
# export NVM_DIR="$HOME/.nvm"	
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)
# export HOME="/home/ec2-user/"
# sudo PM2_HOME=/home/ec2-user/.pm2 pm2 list

# cd server
# npm install
# cd ../client/
# npm install
# npm run build
# cd /home/ec2-user/node-app/scripts

# pm2 kill # in case of existing
# pm2 start ecosystem.config.js


# docker-compose build
docker-start.sh > /dev/null 2> /dev/null < /dev/null &

# docker build -t my-website-docker:latest .
# docker run -p 8000:8000 my-website-docker:latest > /dev/null 2>&1

# client
# docker run -p 3000:80 my-website-docker:latest & docker run -p 8000:8000 my-website-docker-server:latest
