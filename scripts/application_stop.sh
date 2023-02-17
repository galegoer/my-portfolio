#!/bin/bash

# delete existing not sure if necessary
# echo "Stopping any existing pm2 apps"
# ls
# ls /usr/local/bin/
# sudo /usr/local/bin/pm2 delete scripts/ecosystem.config.js
# which pm2
# echo "node"
# which node
# echo "npm"
# which npm

#Stopping existing node servers
# echo "Stopping any existing node servers"
# pkill node

docker stop my-website-docker:latest
docker stop my-website-docker-server:latest
