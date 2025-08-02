# 后端 nodejs 提供的oss图片上传接口
```sh
# 安装依赖
pnpm i

# 配置.env 文件，去阿里云oss控制台里面找粘贴到.env 文件里面
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
```json
{
    "success": true,
    "message": "图片上传成功",
    "data": {
			// 返回私有临时图片url  
        "url": "https://my-personal-oss-2025-07-10.oss-cn-wuhan-lr.aliyuncs.com/private/images/1754095624703_5h5l0frizvq.png?OSSAccessKeyId=LTAI5tDy5t6Y6VBsTykyj8D2&Expires=1754700425&Signature=kE3BtvBui5dDj752IILUuv7F8Fo%3D",
				// 返回公共图片url，需要阿里云对应 Bucket 设置为公共读
        "originalUrl": "https://my-personal-oss-2025-07-10.oss-cn-wuhan-lr.aliyuncs.com/private/images/1754095624703_5h5l0frizvq.png",
        "name": "private/images/1754095624703_5h5l0frizvq.png",
        "size": 1881,
        "accessType": "private",
        "expires": "7天"
    }
}
```