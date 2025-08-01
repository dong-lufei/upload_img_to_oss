# 后端 nodejs 提供的oss图片上传接口
```sh
# 安装依赖
pnpm i
```
```sh
# 启动nodejs后端服务
node app
```
# 前端使用方法：
```
POST 请求到 http://localhost:3000/api/upload/image
请求体使用 multipart/form-data 格式
字段名为 image，字段值为图片文件
```