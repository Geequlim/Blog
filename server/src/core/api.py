import os, json, yaml
from datetime import datetime
from flask import request, Flask
from flask_cors import CORS
from utils import hash256, jsonify_respose
from .database import DBServer

# 加载权限用户组配置
config = yaml.load(open('config.yaml'))
for group_name in config['users']:
    group = config['users'][group_name]
    for i in range(len(group)):
        group[i] = hash256(group[i])

# Flask 应用对象
application = Flask(__name__)
CORS(application)


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

class API(object):
    '''API'''
    def __init__(self, models = []):
        self.app = application
        self.db = DBServer(models)

PERMISSION_READ     = 1         # 读取权限
PERMISSION_WRITE    = 1 << 2    # 写入权限
PERMISSION_MASTER   = 1 << 3    # 管理员权限

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
