#!/bin/bash
cd ..
docker build -t my-website-docker:latest .
docker run -p 8000:8000 my-website-docker:latest > /dev/null 2>&1