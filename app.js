import express from 'express';
import multer from 'multer';
import uploadRouter from './routes/upload.js';

const app = express();

app.use('/api/upload', uploadRouter);

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '文件大小超过限制'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

