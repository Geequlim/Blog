#!/usr/bin/env zsh
cd $(cd "$(dirname "$0")"; pwd)
source ENV/bin/activate
export BLOG_SERVER_DEBUG="1"
python3 app.py
