#! /usr/sbin/env python3
import os
from src.api import api, config, database
from gevent.wsgi import WSGIServer
from gevent import monkey
monkey.patch_all()

def main():
	debug = False
	host  = '0.0.0.0'
	ssl_key = 'cert/server.key'
	ssl_cert = 'cert/server.crt'
	if os.getenv("SERVER_DEBUG") != None:
		debug = True
		host = '127.0.0.1'
		print(config)
		api.app.run(host=host, debug=debug, ssl_context=(ssl_cert, ssl_key))
	else:
		WSGIServer((host, 5000), api.app, keyfile=ssl_key, certfile=ssl_cert).serve_forever()

def import_posts(root, author):
	import yaml
	from dateutil import parser as dateparser
	from datetime import datetime, date
	from src.database import Post
	from utils import uid32
	import json
	for rp in yaml.load(open(root + "/assets/posts.yaml")):
		print("import post:", rp['title'])
		p = Post.create()
		p.object_id = uid32(rp['id'])
		p.created_at = dateparser.parse(str(rp['publishAt']))
		p.title = rp['title']
		p.content = open(root + rp['file']).read()
		tags = list(set(rp['categories'] + rp['tags']))
		if 'C++' in tags and 'C/C++' in tags:
			tags.remove('C++')
		p.tags = json.dumps(tags, ensure_ascii=False)
		p.save()


if __name__ == '__main__':
	# import_posts("/home/geequlim/Documents/Workspace/Develop/Web/Blog/v1", "3641a55bf8e94f9fb5238d26f1911a52")
	# api.db.database.create_table(database.Fragment)
	main()
