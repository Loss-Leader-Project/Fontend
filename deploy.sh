#!/bin/bash

docker rm -f react-deploy
docker build --no-cache -t react_nginx:latest .
docker run -d --name react-deploy -p 3000:80 react_nginx:latest
