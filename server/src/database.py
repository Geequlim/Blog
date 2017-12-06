import peewee
from .core.database import BaseModel, LARGE_TEXT_LENGTH, DBServer

# ============================== 在线配置 =======================================
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


# ================================= 用户 =======================================
class User(BaseModel):
    '''用户基础信息'''
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

def query_users(keyword=''):
    '''
    查询用户，参数留空保留该类所有用户
    author: 文章作者
    keyword: 关键字
    target: 目标
    '''
    q = User.select()
    if len(keyword):
        q = q.where(User.name.contains(keyword)|User.nick.contains(keyword))
    else:
        # TODO: 其他用户查询条件
        pass
    return q

# ================================= 文章 =======================================
class Post(BaseModel):
    '''文章基础信息'''
    author   = peewee.CharField(default = "")
    title    = peewee.CharField(default = "")
    content  = peewee.CharField(default = "")
    tags     = peewee.CharField(default = "")

    def load_dict(self, data):
        '''读取json对象中的数据'''
        super().load_dict(data)
        for key in data:
            value = data[key]
            if key == 'author': self.author = value
            elif key == 'title': self.title = value
            elif key == 'content': self.content = value
            elif key == 'tags': self.tags = value
        return self

def query_posts(title='', author='', tag='', keyword=''):
    '''
    查询文章，参数留空保留该类所有文章
    title: 文章标题
    author: 文章作者
    tag: 标签
    keyword: 关键字
    '''
    q = Post.select()
    if len(keyword):
        q = q.where(Post.title.contains(keyword)|Post.tags.contains(keyword)|Post.content.contains(keyword))
    if len(title):
        q = q.where(Post.title.contains(title))
    if len(author):
        # FIXME: 通过作者发表
        q = q.where(Post.author.contains(author))
    if len(tag):
        q = q.where(Post.tags.contains(tag))
    return q

# ================================= 评论 =======================================
class Comment(BaseModel):
    '''评论信息'''
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

def query_comments(target='', author='', keyword=''):
    '''
    查询评论，参数留空保留该类所有评论
    author: 文章作者
    keyword: 关键字
    target: 目标
    '''
    q = Comment.select()
    if len(keyword):
        q = q.where(Comment.content.contains(keyword))
    if len(target):
        q = q.where(Comment.target == target)
    if len(author):
        # FIXME: 通过作者发表
        q = q.where(Comment.author.contains(author))
    return q
