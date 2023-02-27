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

if [ $( docker ps -a | grep 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest | wc -l ) -gt 0 ]; then
    docker rm $(docker stop $(docker ps -a -q --filter ancestor=090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest --format="{{.ID}}"))
    docker rmi 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest -f
fi

# if docker container inspect my-website-docker-server:latest; then
#     docker stop my-website-docker-server:latest
# fi
