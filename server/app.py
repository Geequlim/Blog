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
        p.tags = json.dumps(list(set(rp['categories'] + rp['tags'])), ensure_ascii=False)
        p.save()


if __name__ == '__main__':
    # import_posts("/home/geequlim/Documents/Workspace/Develop/Web/Blog/v1", "3641a55bf8e94f9fb5238d26f1911a52")
    main()
