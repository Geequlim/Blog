#!/usr/bin/env zsh
cd $(cd "$(dirname "$0")"; pwd)
source ENV/bin/activate
export SERVER_DEBUG="1"
export SERVER_PORT="5000"
python3 app.py
