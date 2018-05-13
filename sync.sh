#!/bin/zsh
cd $(cd "$(dirname "$0")"; pwd)
rsync -av client/dist/ bandwagon:servers/web/blog/client
# rsync -av server/data server/src server/utils server/app.py server/install.sh server/start.sh server/config.yaml server/requirements.txt cert bandwagon:servers/web/blog/server
rsync -av server/src server/utils server/app.py server/install.sh server/start.sh server/config.yaml server/requirements.txt cert bandwagon:servers/web/blog/server
rsync -av start.sh bandwagon:servers/web/blog
