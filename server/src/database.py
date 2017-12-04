import peewee
from .core.database import BaseModel, LARGE_TEXT_LENGTH, DBServer

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
