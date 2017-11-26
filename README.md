# React网站工程

一个创建好的React WEB项目，配置好下列环境
* React
* Redux
* React-Router
* TypeScript

## 构建

### 安装依赖
```
yarn install
```

### 开发构建，热编译支持
```
yarn start
```

### 构建发布版
```
yarn build
```

## 调试

### Chrome 调试插件
* React Developer Tools
* Redux DevTools

### VSCode调试

启动配置如下
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [

        {
            "type": "chrome",
            "request": "launch",
            "name": "Debug",
            "runtimeExecutable": "/usr/sbin/google-chrome-stable",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceRoot}/src",
            "sourceMaps": true,
            "trace": true
        }
    ]
}
```

## 发布

将构建结果`dist`目录传到服务器执行
```bash
npm install -g express
cd dist && node server.js
```