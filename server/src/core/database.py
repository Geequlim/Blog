import peewee, json, yaml, os
import utils
from dateutil import parser as dateparser
from datetime import datetime, date
from playhouse.shortcuts import model_to_dict

# 最多字符串长度
LARGE_TEXT_LENGTH = 1024 * 100

# 数据库目录
_path = yaml.load(open('config.yaml'))['database']['sqlite']['file']
if not os.path.isfile(_path):
    dir = os.path.dirname(_path)
    if not os.path.isdir(dir):
        os.makedirs(dir)
# 创建数据库对象
_DB_ = peewee.SqliteDatabase(_path)

def model_to_json(model):
    '''对象转为json'''
    return json.dumps(model_to_dict(model), default=utils.json_serial, ensure_ascii = False)

class DBServer(object):
    '''数据库操作类'''
    def __init__(self, tables):
        self.database = _DB_
        self.tables = tables
        self._create_tables()
        self._connect()

    def __del__(self):
        self._close()

    def _create_tables(self):
        '''创建表'''
        if not os.path.isfile(_path):
            self.database.create_tables(self.tables)

    def _connect(self):
        '''连接数据库'''
        if self.database.is_closed():
            self.database.connect()

    def _close(self):
        '''关闭连接'''
        if not self.database.is_closed():
            self.database.close()

    def get_object_by_id(self, table, uid):
        '''通过id获取对象'''
        if not table:
            return None
        q = table.select().where(table.object_id == uid)
        if q.exists():
            return q.get()
        return None

    def model_to_json(self, model):
        '''对象转为json'''
        return model_to_json(model)

    def model_to_dict(self, model):
        '''对象转为dict'''
        return model_to_dict(model)

class BaseModel(peewee.Model):
    '''数据表基类'''
    object_id  = peewee.CharField(default=utils.uid32())
    updated_at = peewee.DateTimeField(default=datetime.now())
    created_at = peewee.DateTimeField(default=datetime.now())

    def __init__(self, *args,**kwargs):
        super().__init__(*args,**kwargs)

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
        '''保存数据模型'''
        self.updated_at = datetime.now()
        super().save()

    class Meta:
        database = _DB_
        order_by = ('-updated_at', )
