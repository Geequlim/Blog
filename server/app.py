#! /usr/bin/env python3
import os
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from src.api import api, config, database

def main():
	debug = True if os.getenv("SERVER_DEBUG") != None else False
	host = '0.0.0.0'if not debug else '127.0.0.1'
	port = int(os.getenv("SERVER_PORT")) if os.getenv("SERVER_PORT") != None else 5000
	ssl_key = os.getenv("SSL_KEY") if os.getenv("SSL_KEY") != None else None
	ssl_cert = os.getenv("SSL_CERT") if os.getenv("SSL_CERT") != None else None
	protocal = 'http' if debug else 'https'
	protocal = 'http' if None == ssl_key or ssl_cert == None else protocal

	print('Starting debug server at {0}://{1}:{2}'.format(protocal, host, port))
	print(config)

	if debug:
		api.app.run(host=host, port=port, debug=debug)
	else:
		ssl_options= {"certfile": ssl_cert, "keyfile": ssl_key} if protocal == 'https' else None
		http_server = HTTPServer(WSGIContainer(api.app), ssl_options=ssl_options)
		http_server.listen(address=host, port=port)
		IOLoop.instance().start()

if __name__ == '__main__':
	main()
