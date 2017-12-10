#!/bin/zsh
cd $(cd "$(dirname "$0")"; pwd)
server/start.sh
cd $(cd "$(dirname "$0")"; pwd)
cd client
node start.js &
