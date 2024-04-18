// imageController.js

const Minio = require('minio');

// تكوين معلومات الاتصال بخادم Minio
const minioClient = new Minio.Client({
  endPoint: 'localhost', // استبدله بعنوان خادم Minio الفعلي
  port: 5000,
  useSSL: false, // تعيينها إلى true إذا كنت تستخدم HTTPS
  accessKey: 'YOUR_ACCESS_KEY', // استبدلها بمفتاح الوصول الخاص بك
  secretKey: 'MARIA', // استبدلها بالمفتاح السري الخاص بك
});

const uploadImage = async (req, res) => {
  try {
    const file = req.file; // الحصول على الملف المحمل

    // احفظ الملف في Minio
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };

    const uploadStream = minioClient.putObject('bucketName', file.originalname, file.buffer, file.size, metaData);
  
    uploadStream.on('error', (err) => {
      console.log(err);
      res.status(500).json({ error: 'Failed to upload file' });
    });

    uploadStream.on('end', () => {
      console.log('File uploaded successfully');
      res.status(200).json({ message: 'File uploaded successfully' });
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

module.exports = { uploadImage };
