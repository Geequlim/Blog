#! /usr/sbin/env python3
import os
from gevent import monkey
monkey.patch_all()
from src.api import api, config, database
from gevent.pywsgi import WSGIServer

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
		WSGIServer((host, port), api.app, keyfile=ssl_key, certfile=ssl_cert).serve_forever()

if __name__ == '__main__':
	# import_posts("/home/geequlim/Documents/Workspace/Develop/Web/Blog/v1", "3641a55bf8e94f9fb5238d26f1911a52")
	# api.db.database.create_table(database.Fragment)
	main()

# def import_posts(root, author):
# 	import yaml
# 	from dateutil import parser as dateparser
# 	from datetime import datetime, date
# 	from src.database import Post
# 	from utils import uid32
# 	import json
# 	for rp in yaml.load(open(root + "/assets/posts.yaml")):
# 		print("import post:", rp['title'])
# 		p = Post.create()
# 		p.object_id = uid32(rp['id'])
# 		p.created_at = dateparser.parse(str(rp['publishAt']))
# 		p.title = rp['title']
# 		p.content = open(root + rp['file']).read()
# 		tags = list(set(rp['categories'] + rp['tags']))
# 		if 'C++' in tags and 'C/C++' in tags:
# 			tags.remove('C++')
# 		p.tags = json.dumps(tags, ensure_ascii=False)
# 		p.save()
