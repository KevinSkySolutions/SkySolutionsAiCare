#!/usr/bin/env bash

# Run client build
npm run devBuild

# Transpile server code
npm run transpile-server

# install forever globally
npm i forever -g

# run forever with a config file 
forever -a -l ./AICare.log -e ./AICareError.log -t  --uid "AICareApp" start ./dist/spawn-server/server.js

# list running scripts with forever list
forever list

# checks logs with following command
forever logs

#restart all scripts should you need to
#forever restart all

# stop running script with stop or stopall
# forever stopall

# foever stop AICareApp