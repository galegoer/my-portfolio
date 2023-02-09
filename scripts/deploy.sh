echo "Pre-Build Steps:"
echo "authenticating with AWS ECR..."
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 090413310302.dkr.ecr.us-east-2.amazonaws.com

echo "Build Steps:"
echo "building image..."
docker build -t 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest .

echo "Post-Build Steps:"
echo "pushing image to AWS ECR..."
docker push 090413310302.dkr.ecr.us-east-2.amazonaws.com/my-website-docker:latest