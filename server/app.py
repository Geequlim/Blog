import os
from src import api, db

def main():
    debug = False
    host  = '0.0.0.0'
    if os.getenv("BLOG_SERVER_DEBUG") != None:
        debug = True
        host = '127.0.0.1'
    api.application.run(host=host, debug=debug)

if __name__ == '__main__':
    main()
