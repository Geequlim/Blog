#!/usr/bin/env zsh
cd $(cd "$(dirname "$0")"; pwd)
source ENV/bin/activate
export SSL_CERT="cert/server.crt"
export SSL_KEY="cert/server.key"
python3 app.py &
