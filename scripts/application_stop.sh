#!/bin/bash

# delete existing not sure if necessary
echo "Stopping any existing pm2 apps"
ls
ls /usr/local/bin/
sudo /usr/local/bin/pm2 delete scripts/ecosystem.config.js

#Stopping existing node servers
# echo "Stopping any existing node servers"
# pkill node