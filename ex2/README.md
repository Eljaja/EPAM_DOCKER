#!/bin/bash


docker network create bridge_link -d bridge 

docker build -t backend:latest -f ./lib_catalog/Dockerfile_backend . 

docker build -t postgresql -f Dockerfile_postgresql .

docker run --name database --network bridge_link -d database:latest


docker run --name backend --network bridge_link -p 8000:8000 -d backend:latest 
