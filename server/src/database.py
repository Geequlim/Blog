import peewee
import json
import utils
from dateutil import parser as dateparser
from datetime import datetime, date
from playhouse.shortcuts import model_to_dict

# 最多字符串长度
LARGE_TEXT_LENGTH=1024*100

# 表
TABLES = []
def add_table(table):
    if table not in TABLES:
        TABLES.append(table)

# 数据库文件
DATABASE = "data/blog.db"
database = peewee.SqliteDatabase(DATABASE)

def model_to_json(model):
    '''对象转为json'''
    return json.dumps(model_to_dict(model), default=utils.json_serial, ensure_ascii = False)

class BaseModel(peewee.Model):
    '''数据表基类'''
    object_id  = peewee.CharField(default=utils.uid32())
    updated_at = peewee.DateTimeField(default=datetime.now())
    created_at = peewee.DateTimeField(default=datetime.now())

    def __init__(self, *args,**kwargs):
        super().__init__(*args,**kwargs)
        self.object_id  = utils.uid32()
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def load_dict(self, data):
        '''读取json对象中的数据'''
        for key in data:
            value = data[key]
            if key == 'object_id': self.object_id = value
            # update_at会在保存时更新,故不需要
            # elif key == 'updated_at': self.updated_at = dateparser.parse(value)
            # 不应改修对象的创建时间
            # elif key == 'created_at': self.created_at = dateparser.parse(value)
        return self

    def save(self, **kwargs):
        self.updated_at = datetime.now()
        super().save()

    class Meta:
        database = database
        order_by = ('-updated_at', )

def create_tables():
    '''创建表'''
    database.create_tables(TABLES)

def connect():
    '''连接数据库'''
    if database.is_closed():
        database.connect()

def close():
    '''关闭连接'''
    if not database.is_closed():
        database.close()

def get_object_by_id(Table, uid):
    '''通过id获取对象'''
    if not Table:
        return None
    q = Table.select().where(Table.object_id == uid)
    if q.exists():
        return q.get()
    return None


class Config(BaseModel):
    '''数据表基类'''
    key   = peewee.CharField()
    value = peewee.CharField(default = "", max_length = LARGE_TEXT_LENGTH)
    def load_dict(self, data):
        '''读取json对象中的数据'''
        super().load_dict(data)
        for key in data:
            value = data[key]
            if key == 'key': self.key = value
            elif key == 'value': self.value = value
        return self
add_table(Config)

def get_config(key):
    '''获取配置'''
    q = Config.select().where(Config.key == key)
    if q.exists():
        return q.get()
    return None

class User(BaseModel):
    '''漫画基础信息'''
    name     = peewee.CharField(default    = "")
    nick     = peewee.CharField(default    = "")
    avatar   = peewee.CharField(default    = "")
    email    = peewee.CharField(default    = "")
    password = peewee.CharField(default    = "")
    actived  = peewee.BooleanField(default =  False)

    def load_dict(self, data):
        '''读取json对象中的数据'''
        super().load_dict(data)
        for key in data:
            value = data[key]
            if key == 'name': self.name = value
            elif key == 'nick': self.nick = value
            elif key == 'avatar': self.avatar = value
            elif key == 'email': self.email = value
            elif key == 'password': self.password = value
            elif key == 'actived': self.actived = value
        return self
add_table(User)

class Post(BaseModel):
    '''文章基础信息'''
    author   = peewee.CharField(default = "")
    title    = peewee.CharField(default = "")
    content  = peewee.CharField(default = "")
    tags     = peewee.CharField(default = "")
    comments = peewee.CharField(default = "")

    def load_dict(self, data):
        '''读取json对象中的数据'''
        super().load_dict(data)
        for key in data:
            value = data[key]
            if key == 'author': self.author = value
            elif key == 'title': self.title = value
            elif key == 'content': self.content = value
            elif key == 'tags': self.tags = value
            elif key == 'comments': self.comments = value
        return self
add_table(Post)

class Comment(BaseModel):
    '''漫画基础信息'''
    author   = peewee.CharField(default = "")
    target   = peewee.CharField(default = "")
    content  = peewee.CharField(default = "")

    def load_dict(self, data):
        '''读取json对象中的数据'''
        super().load_dict(data)
        for key in data:
            value = data[key]
            if key == 'author': self.author = value
            elif key == 'target': self.target = value
            elif key == 'content': self.content = value
        return self
add_table(Comment)
