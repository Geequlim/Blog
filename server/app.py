import os
from src.api import api, config

def main():
    debug = False
    host  = '0.0.0.0'
    if os.getenv("SERVER_DEBUG") != None:
        debug = True
        host = '127.0.0.1'
        print(config)
    api.app.run(host=host, debug=debug)

if __name__ == '__main__':
    main()
