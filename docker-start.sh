#!/bin/bash
# docker build -t my-website-docker:latest .
# docker run -p 8000:8000 my-website-docker:latest > /dev/null 2>&1

echo "Logging in..."
$(aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 090413310302.dkr.ecr.us-east-2.amazonaws.com)

echo "Logged in..."
echo "Pulling image"

docker pull 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest

echo "Running image"
docker run -p 8000:8000 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest