#!/bin/bash

#give permission for everything in the node-app directory
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


docker-compose build

# client
docker run -p 3000:80 my-website-docker:latest
# server
docker run -p 8000:8000 my-website-docker-server:latest



# Added

# echo "Pre-Build Steps:"
# echo "authenticating with AWS ECR..."
# aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 090413310302.dkr.ecr.us-east-2.amazonaws.com

# echo "Build Steps:"
# echo "building image..."
# docker build -t 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest .

# echo "Post-Build Steps:"
# echo "pushing image to AWS ECR..."
# docker push 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest
