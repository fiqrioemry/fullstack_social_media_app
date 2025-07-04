#!/bin/bash

echo "Build and run docker container in background..."
docker-compose -p socialmedia_app down -v
docker-compose -p socialmedia_app up -d --build

echo "generating database..."
docker exec socialmedia_app node init-mysql.js
docker exec socialmedia_app node init-mongodb.js



echo "Deployment complete! "
echo " server is running on port 5000"
