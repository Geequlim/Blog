#!/usr/bin/env zsh
cd $(cd "$(dirname "$0")"; pwd)
virtualenv ENV
source ENV/bin/activate
pip install -r requirements.txt
echo "Done."
