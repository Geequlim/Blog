#!/usr/bin/env zsh
cd $(cd "$(dirname "$0")"; pwd)
source ENV/bin/activate
python3 app.py &
