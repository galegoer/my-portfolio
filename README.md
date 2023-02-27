# my-website
Portfolio website made with React, AWS (EC2, CodeDeploy, ECR), Docker, Node.JS / Express, Socket.IO, Python, and nginx. 

# How does it work?
First a Docker image of our current React and Node.JS application is created when there is a new commit to the master branch. The Docker image is then built and pushed to an AWS Elastic Container Registry. When this is completed the next step is to create an AWS CodeDeploy deployment that will run a script on our EC2 instance to pull the latest image that was just created and pushed to the ECR. Any current running Docker containers are stopped and removed, the new image is pulled and can then be run as a container. Finally using nginx as a reverse proxy we can access our application at the below URL without having to utilize ports in the URL.

Still under active development.

Hosted for now at http://ec2-3-128-207-4.us-east-2.compute.amazonaws.com/

# TODO: Add a diagram of the architecture