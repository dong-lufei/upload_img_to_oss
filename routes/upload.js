import express from 'express';
import multer from 'multer';
import OSS from 'ali-oss';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// 配置阿里云OSS
const client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  bucket: process.env.OSS_BUCKET,
  secure: true // 启用HTTPS
});

// 配置multer用于处理文件上传
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('只支持图片格式 (jpeg, jpg, png, gif, webp)'));
    }
  }
});

// 图片上传接口 - 支持 * 张图片
router.post('/image', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: '请选择要上传的图片'
      });
    }

    const isLongTerm = req.query.longTerm === 'true';
    const uploadPromises = req.files.map(async (file) => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2);
      const ext = path.extname(file.originalname);
      
      const fileName = isLongTerm 
        ? `public/images/${timestamp}_${randomStr}${ext}`
        : `private/images/${timestamp}_${randomStr}${ext}`;

      const result = await client.put(fileName, file.buffer);
      
      if (isLongTerm) {
        return {
          url: result.url,
          name: result.name,
          size: file.size,
          originalName: file.originalname,
          accessType: 'public',
          expires: '永久'
        };
      } else {
        const signedUrl = client.signatureUrl(fileName, {
          expires: 7 * 24 * 60 * 60
        });
        return {
          url: signedUrl,
          originalUrl: result.url,
          name: result.name,
          size: file.size,
          originalName: file.originalname,
          accessType: 'private',
          expires: '7天'
        };
      }
    });

    const uploadResults = await Promise.all(uploadPromises);

    res.json({
      success: true,
      message: `成功上传 ${uploadResults.length} 张图片`,
      data: {
        count: uploadResults.length,
        images: uploadResults
      }
    });

  } catch (error) {
    console.error('上传失败:', error);
    res.status(500).json({
      success: false,
      message: '上传失败: ' + error.message
    });
  }
});

export default router;





