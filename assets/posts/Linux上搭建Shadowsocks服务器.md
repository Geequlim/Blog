Shadowsocks是一款方便的代理软件，本文将介绍如何在装有Linux的VPS中搭建Shadowsocks服务器，为科学上网提供安全通道。
<!-- more -->
## 准备工作

Shadowsocks是一个Python项目，因此您的机器中需要先安装Python，这里建议使用Python2.7，其兼容性要强一些，好在现在大多数VPS提供商中的Linux系统中已经安装了Python2.7，如果你的系统中没有的话，需要自行安装，请参考[Python的安装文档](https://docs.python.org/2.7/using/unix.html)。

执行`python --version`命令确认安装python2.7
```
$ python --version
$ Python 2.7.11
```
在安装Shadowsocks之前还需要安装Python的一个包管理工具**pip**，我们需要通过它来安装Shadowsocks，通过执行以下命令即可安装该软件。
```
$ wget https://bootstrap.pypa.io/get-pip.py
# python get-pip.py
```
注意，第二行命令需要使用root权限执行。

## Shadowsocks的安装和配置

安装完pip之后，主角Shadowsocks该出场了，使用pip安装Shadowsocks
```
# pip install shadowsocks
```
安装完成后，需要进进一步配置，但这些配置并不麻烦，和你在客户端的操作很类似。我们把配置操作都写入`/etc/shadowso.json`这个配置文件中，通过vi编辑器执行以下命令来创建该文件
```
# vi /etc/shadowsocks.json
```
向文件中填写如下内容并保存
```js
{
    "server":"VPS公网IP",
    "server_port":"Shadowsocks服务器端口号",
    "local_address": "127.0.0.1",
    "local_port":"本地端口号",
    "password":"链接密码",
    "timeout":600,
    "method":"aes-192-cfb",
    "fast_open": false,
}
```
你可以查看Shadowsocks的wiki了解更多[配置相关的信息](https://github.com/shadowsocks/shadowsocks/wiki/Configuration-via-Config-File)。

至此Shadowsocks配置完成，最后一步需要在系统中设置开机使用我们的配置文件启动Shadowsocks服务器。

## 设置开机启动

编辑 `/etc/rc.local`文件
```
# vi /etc/rc.local
```
在`exit 0`这一行的上边加入如下
```
/usr/local/bin/ssserver –c /etc/shadowsocks.json
```
到此Shadowsocks服务器搭建完毕，重启服务器后，会自动启动。
