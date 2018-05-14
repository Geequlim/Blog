#! /usr/sbin/env python3
import os
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from src.api import api, config, database

def main():
	debug = True if os.getenv("SERVER_DEBUG") != None else False
	host = '0.0.0.0'if not debug else '127.0.0.1'
	port = int(os.getenv("SERVER_PORT")) if os.getenv("SERVER_PORT") != None else 5000
	ssl_key = 'cert/server.key'
	ssl_cert = 'cert/server.crt'
	protocal = 'http' if debug else 'https'

	print('Starting debug server at {0}://{1}:{2}'.format(protocal, host, port))
	print(config)

	if debug:
		api.app.run(host=host, port=port, debug=debug)
	else:
		http_server = HTTPServer(WSGIContainer(api.app), ssl_options={"certfile": ssl_cert, "keyfile": ssl_key})
		http_server.listen(address=host, port=port)
		IOLoop.instance().start()

if __name__ == '__main__':
	# api.db.database.create_table(database.Fragment)
	# api.db.database.
	main()
