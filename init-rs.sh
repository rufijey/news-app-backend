#!/bin/bash
mongod --replSet rs0 --bind_ip_all &
sleep 5

mongo --eval "rs.initiate({_id:'rs0', members:[{_id:0, host:'localhost:27017'}]})"

fg
