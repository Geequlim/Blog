"""
博客服务器的Restful API服务
"""
import os, json, yaml
from datetime import datetime
from flask import request, Flask
from flask_cors import CORS
from . import database as db
from utils import hash256, jsonify_respose

PERMISSION_READ     = 1         # 读取权限
PERMISSION_WRITE    = 1 << 2    # 写入权限
PERMISSION_MASTER   = 1 << 3    # 管理员权限


# Flask 应用对象
application = Flask(__name__)
CORS(application)

# 加载权限用户组配置
config = yaml.load(open('config.yaml'))
for group_name in config['users']:
    group = config['users'][group_name]
    for i in range(len(group)):
        group[i] = hash256(group[i])
print(config)

# 创建数据库
if not os.path.isfile(db.DATABASE):
    dir = os.path.dirname(db.DATABASE)
    if not os.path.isdir(dir):
        os.makedirs(dir)
    db.create_tables()

def check_permission_for(key, permistion):
    '''
    检查key是否拥有配置的权限
    key: api请求的身份标记（一个权限密码的hash256值）
    permistion: 检查的权限
    '''
    value = 0
    if key in config['users']['clients']:
        value |= PERMISSION_READ
    if key in config['users']['writers']:
        value |= PERMISSION_READ
        value |= PERMISSION_WRITE
    if key in config['users']['marsters']:
        value |= PERMISSION_READ
        value |= PERMISSION_WRITE
        value |= PERMISSION_MASTER
    return (value & permistion) != 0

def check_permission(p_request, permistion):
    '''检查请求权限'''
    api_key = p_request.headers['x-api-key'] if 'x-api-key' in p_request.headers else ''
    return check_permission_for(api_key, permistion)

@application.before_request
def _connect_database():
    db.connect()

@application.teardown_request
def _close_database(exc):
    db.close()

@application.errorhandler(404)
def not_found(e):
    '''找不到对象'''
    return jsonify_respose({
        "error": "Not Found",
        "code": 404,
        "url": request.url
    })

@application.errorhandler(403)
def no_permission(e):
    '''没有权限'''
    return jsonify_respose({
        "error": "No Permission",
        "code": 403,
        "url": request.url
    })

# ================================ API =========================================

@application.route('/api/v1/function/<func>', methods=['GET'])
def call_func(func):
    '''执行动作'''
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    if func == "time":
        return datetime.now().isoformat()
    return not_found(None)

@application.route('/api/v1/<tableName>/<uid>', methods=['GET', 'POST'])
def get_object(tableName, uid):
    '''
    通过对象的 `object_id` 获取、修改、添加对象
    GET
        从 `tableName` 表中获取 `object_id` 字段为 `uid` 的对象
    POST
        从 `tableName` 中修改 `object_id` 字段为 `uid` 的对象, 不存在则创建对象
        请求Body对象的键名必须与表中的字段相同, `body` 中存在但表中不存在的字段将被忽略
    `tableName` 均为小写格式
    '''
    obj = None
    table = None
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    if len(uid) != 32: return not_found(None)
    if tableName == "user":
        table = db.User
    elif tableName == "post":
        table = db.Post
    elif tableName == "comment":
        table = db.Comment
    elif tableName == "config":
        return get_config(uid)
    obj = db.get_object_by_id(table, uid)
    if request.method == "POST":
        if not check_permission(request, PERMISSION_WRITE): return no_permission(None)
        if table and request.json:
            data = request.json
            data['object_id'] = uid
            obj = obj if obj else table.create()
            obj.load_dict(data).save()
    return jsonify_respose(db.model_to_dict(obj)) if obj else not_found(None)

@application.route('/api/v1/config/<key>', methods=['GET', 'POST'])
def get_config(key):
    '''在线配置存取'''
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    obj = db.get_config(key)
    if request.method == "POST":
        if not check_permission(request, PERMISSION_MASTER): return no_permission(None)
        if not obj:
            obj = db.Config.create(key=key)
        obj.value = json.dumps(request.json, ensure_ascii=False)
        obj.save()
    return jsonify_respose(obj.value) if obj else not_found(None)
