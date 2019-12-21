#!/bin/bash

echo "Removing old Docker images..."
docker rmi -f boilerplate

echo "Building a new Docker image..."
docker build -t boilerplate .

clear
echo "Docker image has been built."
echo "Run the Docker image by running ./scripts/start.sh"