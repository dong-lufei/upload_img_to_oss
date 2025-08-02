# 后端 nodejs 提供的 oss 图片上传接口

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
> 支持批量上传
```
POST 请求到 http://localhost:3000/api/upload/image
请求体使用 multipart/form-data 格式
字段名为 images，字段值为图片文件
```

```json
{
    "success": true,
    "message": "成功上传 1 张图片",
    "data": {
        "count": 1,
        "images": [
            {
                "url": "https://my-personal-oss-2025-07-10.oss-cn-wuhan-lr.aliyuncs.com/private/images/1754100268460_4vs6cf93633.png?OSSAccessKeyId=LTAI5tDy5t6Y6VBsTykyj8D2&Expires=1754705072&Signature=kkK33CywPgeHLIVyKwvcRv925%2F8%3D",
                "originalUrl": "https://my-personal-oss-2025-07-10.oss-cn-wuhan-lr.aliyuncs.com/private/images/1754100268460_4vs6cf93633.png",
                "name": "private/images/1754100268460_4vs6cf93633.png",
                "size": 1881,
                "originalName": "wechat_2025-08-01_214634_022.png",
                "accessType": "private",
                "expires": "7天"
            }
        ]
    }
}
```
