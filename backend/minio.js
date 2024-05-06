const Minio = require('minio');


const minioClient = new Minio.Client({
  endPoint: 'http://localhost:9000',
  port: 9000,
  useSSL: false, 
  accessKey: 'ameer',
  secretKey: 'maria',
});


const bucketName = 'images';

const objectName = 'pic.jpg';

// المسار إلى الملف المراد تحميله إلى MinIO
const filePath = '/path/to/your/file/example.jpg';

// تحميل الملف إلى MinIO
minioClient.fPutObject(bucketName, objectName, filePath, function(err, etag) {
  if (err) {
    return console.log('Error uploading file:', err);
  }
  console.log('File uploaded successfully. ETag:', etag);
});
