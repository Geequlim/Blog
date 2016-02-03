JsonPreference是一个类似Android SDK中SharedPreferences的数据操作助手。与SharedPreferences不同，是一个C++类，数据存储使用的是Json而不是XML。

支持将 布尔值、浮点数值、字符串、JsonPreference对象 以 键值对、数组、键值对表 的形式储存。
<!-- more -->
### 第三方库依赖库：

[jsonxx 轻量级的Json解析库，提供Json数据解析等Json基础数据操作功能。](https://github.com/hjiang/jsonxx)

### 操作方法

#### 1、 设置、获取值

```

/**
*  设置值
*设置键值对，键名不存在则新建键值对，键名已存在的，修改该键的值
*该方法将覆盖同级对象的同名键值对，即使是类型不同的同名键值对也会被覆盖
*  @param key   键名
*  @param value 值*/
void setXXX(const std::string& key, const XXX & value);

/**
*  通过键名获取值
*  @param key          键名
*  @param defaultValue 默认返回值
*  @return 返回查找到的值，如果没有找到名为key的键值对，将返回默认返回值*/
const bool getXXX(const std::string& key, const XXX & defaultValue)const;

```

#### 2、设置、获取数组

```

/**
*  设置列表（数组）
*  @param key   列表名
*  @param value 数据列表*/
void setXXXArray(const std::string& key, const std::vector<XXX>& value);

/**
*  通过列表名获取列表（数组）
*  @param key 列表名
*  @return 返回查找到的布尔值列表，如果未查找到则返回一个空的列表*/
std::vector<XXX> getXXXArray(const std::string & key)const;

```

#### 3、设置、获取数据表

```

/**
*  设置布尔值数据表
*  @param key                  表名称
*  @param map                  数据表*/
void setXXXMap(const std::string & key, const std::map<std::string, XXX>& map);

/**
*  获取布尔值数据表
*  @param key 表名称
*  @return 返回查找到的布尔值表，如果未找到怎返回一个空的数据表*/
std::map<std::string, XXX> getXXXMap(const std::string & key)const;
```

#### 4、设置、获取JsonPreference

```

/**
*  设置子配置对象
*  @param key        要设置的键名
*  @param preference 配置对象
*/
void setPreference(const std::string & key , const JsonPreference & preference);

/**
*  获取键名为key的配置对象，如果未找到则返回空的配置对象
*  @param key 键名
*  @return 查找到的配置对象*/
JsonPreference getPreference(const std::string & key)const;

```

#### 5、获取Json文本内容，至于怎么处理自己看着办咯

```

/**
*  获取配置内容
*  @return 返回json数据内容
*/
std::string jsonContent()const;

```

#### 6、以上方法还满足不了你? 那我只好把Json对象交给你处置了

```

    /**
    *  获取Json对象
    *  @return json对象
    */
    const jsonxx::Object&  getJsonObject() const;

    /**
    *  获取Json对象
    *  @return json对象
    */
    jsonxx::Object& getJsonObject();

```


### 使用示例

```

#include <iostream>
#include "JsonPreference.hpp"
using namespace std;

//设置值
bool testSetValues()
{
    //设置值
    testPreference.setBool("boolValue", true);
    testPreference.setNumber("numberValue", 3.1415926535957L);
    testPreference.setString("stringValue", "Hello World!\n哈哈哈~~");
    //设置数组
    testPreference.setNumberArray("numberArray", {1,2,3.1L,3.2});
    testPreference.setBoolArray("boolArray", {1,0,1,1});
    testPreference.setStringArray("stringArray", {"This" , "is" , "a","sentence","."});
    //设置数据表
    std::map<std::string,std::string> strMap;
    strMap["str1"] = "Hello";
    strMap["str2"] = "String";
    testPreference.setStringMap("stringMap", strMap);
    //设置JsonPreference
    Walnut::Extension::JsonPreference newJsonPre;
    newJsonPre.setStringMap("stringMap", strMap);
    testPreference.setPreference("childPreference", newJsonPre);

    return true;
}

//获取值
bool testGetValues()
{
    //获取值
    cout<<"boolValue = "<<testPreference.getBool("boolValue", false)<<endl;
    cout<<"NumberValue = "<<testPreference.getNumber("numberValue", 0.0L)<<endl;
    cout<<"NumberValue = "<<testPreference.getString("stringValue", "(null)")<<endl;
    //获取数组
    std::vector<std::string> sa = testPreference.getStringArray("stringArray");
    cout<< "numberArray = ";
    for (auto & curEle : sa )
        cout<<curEle<<" ";
    cout<<endl;
    //获取数据表
    cout<< "stringMap = "<<endl;
    std::map<std::string,std::string> strMap = testPreference.getStringMap("stringMap");
    for (auto & curIt : strMap)
        cout<<'\t'<<curIt.first<<':'<<curIt.second<<endl;
    //获取JsonPreference
    cout<<"childPreference:"<<endl;
    Walnut::Extension::JsonPreference childPreference = testPreference.getPreference("childPreference");
    cout<<childPreference.jsonContent()<<endl;
    return true;
}

int main(int argc, const char * argv[])
{
    testSetValues();
    testGetValues();
    return 0;
}

```

#### 测试输出

```bash
boolValue = 1
NumberValue = 3.14159
NumberValue = Hello World!
哈哈哈~~
numberArray = This is a sentence .
stringMap =
	str1:Hello
	str2:String
childPreference:
{
	"stringMap": {
		"str1": "Hello",
		"str2": "String"
	}
}
```
