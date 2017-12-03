## API

地址: `http://118.31.69.207:5000/`

所有请求头部都需要带一个用户密码对，否则无访问权限 `x-api-key`: `密码的hash256值`

#### /api/v1/status
获取数据库统计数据
```json
{
    "comic": 16600,
    "chapter": 248320
}
```

#### /api/v1/function/\<func\>
调用在线函数，`<func>`支持下列格式
* `time`: 获取服务器时间，用于防止客户端作弊行为
返回值例子 `2017-11-09T22:26:16.605414`

#### /api/v1/\<tableName\>/\<uid\>
通过对象的 `object_id` 获取、修改、添加对象  
* GET  
从 `tableName` 表中获取 `object_id` 字段为 `uid` 的对象  
* POST  
从 `tableName` 中修改 `object_id` 字段为 `uid` 的对象, 不存在则创建对象  
请求Body对象的键名必须与表中的字段相同, `body`中存在但表中不存在的字段将被忽略  

* `tableName` 均为小写格式, 可以是下列参数
  `comic`: 漫画信息
  `detail`: 漫画描述信息
  `chapter`: 章节信息

示例：
`/api/v1/detail/8589235419685d79b443ee034195e3aa` 返回如下结果
```json
{
    "id": 16280,
    "object_id": "8589235419685d79b443ee034195e3aa",
    "updated_at": "2017-11-06T12:24:41.254279",
    "created_at": "2017-11-06T12:24:41.251158",
    "name": "异世界建国记",
    "src": "http://www.bbhou.com//manhua/yishijiejianguoji/",
    "chapters": "[{\"第04话\": \"7a29c5325de65edb9b727cdcb1dc8fa2\"}, {\"第03话\": \"2a0ac9e5d70b5fe6991d36e691240c10\"}, {\"第02话\": \"b823ec99a5fe5be89bc340d98c7b5f3d\"}, {\"第01话\": \"839cd215b33956589216771c356c5a0d\"}]",
    "description": " ，某个男人因为严重交通事故而被转生到异世界之中，徬徨在异世界的他变成了连自己都不知道的少年姿态，还突然遇见了神兽“狮鹫”并被依赖了某件事情。从此之后，他开始活用前世的记忆教导异世界小孩们耕作及生活，并率领他们面对邻国的侵略，这就是被后人称为“神帝”的冒险英雄谭！！"
}
```


###$ /api/v1/comics
查询漫画, 查询参数可选如下，不穿参数表示不对该项进行筛选
* page: 页码
* page_size: 每页数据长度
* name: 名称筛选
* name: 作者筛选
* keyword: 关键字筛选
* tag: 标签（分类）筛选
* end: 连载状态筛选

`/api/v1/comics?page_size=2`返回如下所示的结果
```json
{
    "comics": [
        {
            "id": 16538,
            "object_id": "4f0808a34b0657dfb40ffac64fdcbbb5",
            "updated_at": "2017-11-06T14:37:53.363788",
            "created_at": "2017-11-06T14:37:53.267021",
            "name": "夕张与由良",
            "author": "ぐり～ん",
            "brief": " ，夕张与由良之间的萌萌四格",
            "cover": "http://hicomic.bbhou.com/comic/cover/34/16520.jpg",
            "banner": "",
            "tags": "[\"欢乐向\"]",
            "detail": "6747404d05345dd69fa0ed9d6763a8d0",
            "end": true,
            "latest_chapter": "古鹰与青叶的假日"
        },
        {
            "id": 16537,
            "object_id": "3715c52e17825504be1980f2d394d84c",
            "updated_at": "2017-11-06T14:37:50.643916",
            "created_at": "2017-11-06T14:37:50.613263",
            "name": "智酱是女生！",
            "author": "柳田史太",
            "brief": " ，升入高中的相泽智鼓足勇气向青梅竹马告白，没想到对方竟然一直把她当做好兄弟看待… 作者Pixiv：id1774701",
            "cover": "http://hicomic.bbhou.com/comic/cover/22/10756.jpg",
            "banner": "",
            "tags": "[]",
            "detail": "7c400118b5bf5f959150c6df22803b8f",
            "end": false,
            "latest_chapter": "560-568"
        }
    ],
    "total": 16538,
    "page": 1,
    "page_size": 2,
    "page_count": 8269
}
```

#### /api/v1/config/\<key\>
获取(GET)、设置(POST)在线配置，在线配置是为应用上线后做出调整的可控变量，均为合法json对象格式

示例：
`/api/v1/config/2222`
返回事先存在服务器的配置`2222`
```json
{
    "hello2": "world233"
}
```