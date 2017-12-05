"""
博客服务器的Restful API服务
"""
import os, json, yaml
from datetime import datetime
from flask import request, Flask
from flask_cors import CORS
from . import database
from .core.api import API, PERMISSION_READ, PERMISSION_WRITE, PERMISSION_MASTER
from .core.api import config, application, no_permission, not_found, check_permission
from utils import hash256, jsonify_respose

api = API([
    database.Config,
    database.User,
    database.Post,
    database.Comment
])

# ============================== 通用模板 =======================================

@application.route('/api/v1/function/<func>', methods=['GET'])
def call_func(func):
    '''执行动作'''
    if not check_permission(request, PERMISSION_READ):
        return no_permission(None)
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
    if not check_permission(request, PERMISSION_READ):
        return no_permission(None)
    if len(uid) != 32:
        return not_found(None)
    if tableName == "user":
        table = database.User
    elif tableName == "post":
        table = database.Post
    elif tableName == "comment":
        table = database.Comment
    elif tableName == "config":
        return get_config(uid)
    obj = api.db.get_object_by_id(table, uid)
    if request.method == "POST":
        if not check_permission(request, PERMISSION_WRITE):
            return no_permission(None)
        if table and request.json:
            data = request.json
            data['object_id'] = uid
            obj = obj if obj else table.create()
            obj.load_dict(data).save()
    return jsonify_respose(api.db.model_to_dict(obj)) if obj else not_found(None)

def resolve_query_result(table, query, page, pageSize):
    '''解析查询结果用于返回
        page: 当前页
        pageSize: 每页最大条目数
        table: 查询的模型类型
        query: 查询器
    '''
    models = []
    for m in query.order_by(table.updated_at.desc()).paginate(page, pageSize):
        models.append(api.db.model_to_dict(m))
    if len(models):
        total = query.count()
        return jsonify_respose({
            "data": models,
            "total":  total,
            "page": page,
            "page_size": pageSize,
            "page_count": int(total / pageSize) + (1 if total % pageSize else 0)
        })
    return not_found(None)

# ============================== 在线配置 =======================================
@application.route('/api/v1/config/<key>', methods=['GET', 'POST'])
def get_config(key):
    '''在线配置存取'''
    if not check_permission(request, PERMISSION_READ):
        return no_permission(None)
    obj = database.get_config(key)
    if request.method == "POST":
        if not check_permission(request, PERMISSION_MASTER):
            return no_permission(None)
        if not obj:
            obj = database.Config.create(key=key)
        obj.value = json.dumps(request.json, ensure_ascii=False)
        obj.save()
    return jsonify_respose(obj.value) if obj else not_found(None)


# ================================= 文章 =======================================
@application.route('/api/v1/posts', methods=['GET'])
def get_posts():
    '''查询文章
        page: 页码
        page_size: 每页数据长度
        title: 名称筛选
        author: 作者筛选
        tag: 标签（分类）筛选
        keyword: 关键字筛选
    '''
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    return resolve_query_result(
        database.Post,
        database.query_posts(
            title=str(request.args.get('title', '')),
            author=str(request.args.get('author', '')),
            tag=str(request.args.get('tag', '')),
            keyword=str(request.args.get('keyword', '')),
        ),
        int(request.args.get('page', 1)),
        int(request.args.get('page_size', 20))
    )

# ================================= 评论 =======================================
@application.route('/api/v1/comments', methods=['GET'])
def get_comments():
    '''查询评论
        page: 页码
        page_size: 每页数据长度
        target: 评论目标
        author: 评论作者
        keyword: 关键字筛选
    '''
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    return resolve_query_result(
        database.Comment,
        database.query_comments(
            target=str(request.args.get('target', '')),
            author=str(request.args.get('author', '')),
            keyword=str(request.args.get('keyword', '')),
        ),
        int(request.args.get('page', 1)),
        int(request.args.get('page_size', 20))
    )

# ================================= 用户 =======================================
@application.route('/api/v1/users', methods=['GET'])
def get_users():
    '''查询用户
        page: 页码
        page_size: 每页数据长度
        keyword: 关键字筛选
    '''
    if not check_permission(request, PERMISSION_READ): return no_permission(None)
    return resolve_query_result(
        database.User,
        database.query_users(
            keyword=str(request.args.get('keyword', '')),
        ),
        int(request.args.get('page', 1)),
        int(request.args.get('page_size', 20))
    )
