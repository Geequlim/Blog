要设计这样一个函数：**传入一个目录，获取到该目录下的所有文件路径。并且让这个函数支持尽可能多的平台。**

根据以上需求，可声明函数如下

```c++
/**获取指定目录内的文件路径
@param basePath 要搜索的目录路径
@param files 用于储存搜索结果的向量
@param searchSubDir 是否递归搜索子目录
*/
void getFiles(const std::string &basePath, std::vector<std::string > &files,const bool searchSubDir = true);
```
<!-- more -->

<h4>实现这个函数的功能需要如下步骤：</h4>

* 验证输入参数的合法性
* 验证通过继续,验证不通过 返回
* 打开输入的目录文件
* 打开成功继续,打开失败 返回
* 循环获取到输入目录下的文件路径 curFilePath
* 如果传入参数searchSubDir为真，则递归搜索当前目录调用getFiles(curFilePath, files, searchSubDir)
* 添加当前文件路径curFilePath到容器中
* 关闭输入目录文件
* 结束 返回

----

有了这样的思路就可以很容易实现getFiles函数了

```c++
  #include <vector>
  #include <string>
  #include <cstring>
  #include "FileHelper.h"
  #ifdef WIN32
    #include <fstream>
    #include <io.h>
    #include <direct.h>
  #else
    #include <dirent.h>
    #include <unistd.h>
  #endif

  void getFiles(const std::string &basePath, std::vector<std::string> &files,const bool searchSubDir)
  {
  //验证basePath路径
  #ifdef WIN32
  	long   hFile = 0;//windows文件句柄
  	struct _finddata_t fileinfo;//文件信息
  	if ((hFile = _findfirst((basePath + "/*").c_str(), &fileinfo)) == -1)
  	return;
#else
    DIR *dir;
    struct dirent *ptr;
    if ((dir = opendir(basePath.c_str())) == NULL)
        return;
#endif
      //丢弃“.”和“..”
  #ifdef WIN32
  	do{
  		if (strcmp(fileinfo.name, ".") == 0 || strcmp(fileinfo.name, "..") == 0)
  		    continue;
  #else
      while ((ptr = readdir(dir)))
      {
      	if (strcmp(ptr->d_name, ".") == 0 || strcmp(ptr->d_name, "..") == 0)
	    continue;
#endif
  	    //获取文件列表
  	    std::string curFilePath;//当前路径
  	    //如果当前子路径是目录，并且需要递归
#ifdef WIN32
  		curFilePath = basePath + "/" + fileinfo.name;
  		if ((fileinfo.attrib &  _A_SUBDIR) && searchSubDir)
#else
  		curFilePath = basePath + "/" + ptr->d_name;
  		if (ptr->d_type == 4 && searchSubDir)
#endif
  	    //递归获取子文件夹
  		getFiles(curFilePath, files, searchSubDir);
  		//当前路径加入列表
  		files.push_back(curFilePath);
  //关闭文件
#ifdef WIN32
    }while( _findnext(hFile, &fileinfo)==0);
    _findclose(hFile);
#else
	}
	closedir(dir);
#endif
}
```

---

最后写一个main函数来测试一下，改程序将执行以下操作

* 输入程序的第一个参数作为搜索目录 将获取到的目录存放到事先定义好的容器（vector<std::string>对象）中
* 将获取到的容器元素输入到标准输出流

```c++
#include <vector>
#include <iostream>
#include "FileHelper.h"
using namespace std;

int main(int argc, char* argv[])
{
	if (argc > 1)
	{
		vector<string> files;
		getFiles(argv[1], files,true);
        //对files进行排序
        sort(files.begin(),files.end());
        //输出文件名
		for (int i = 0; i != files.size(); ++i)
			cout << files.at(i).c_str() << endl;
	}
	return 0;
}
```

编译运行测试一下（此处只显示Mac OSX的示例）

```bash
$ c++ FileHelper.cpp main.cpp -o listDir
$ ./listDir .
```

Mac OSX下输出结果显示出所在目录"."下的所有文件，包含了隐藏文件。

```bash
$ ./._FileHelper.cpp
$ ./FileHelper.cpp
$ ./FileHelper.h
$ ./listDir
$ ./main.cpp
```

通过测试显示：getFiles函数在Mac OSX 、Win32、Linux(仅在Linux Mint 17中测试过)、 Android[^1]、 iOS[^2]均可获取到指定目录的文件路径。

---

[^1]:Android系统通过getFiles获取到容器中的文件路径顺序是不确定的，所以需要自行对结果容器进行排序。
[^2]:iOS下仅可获取到程序有读取权限的文件路径；
