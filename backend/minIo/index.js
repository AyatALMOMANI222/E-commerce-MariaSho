const Minio = require('minio');

// Instantiate a new Minio client with the endpoint, access key, and secret key
const minioClient = new Minio.Client({
  endPoint: 'your-minio-server-address',
  port: 9000, // default MinIO port
  useSSL: false, // Change to true if your server uses SSL
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
});

// Ensure that the bucket exists, if not, create it
const bucketName = 'your-bucket-name';
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    return console.log('Error checking bucket existence:', err);
  }
  if (!exists) {
    // Bucket doesn't exist, create it
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) {
        return console.log('Error creating bucket:', err);
      }
      console.log('Bucket created successfully:', bucketName);
    });
  } else {
    console.log('Bucket already exists:', bucketName);
  }
});

// Upload an image to the bucket
const imagePath = '/path/to/your/image.jpg';
const objectName = 'image.jpg';
minioClient.fPutObject(bucketName, objectName, imagePath, (err, etag) => {
  if (err) {
    return console.log('Error uploading image:', err);
  }
  console.log('Image uploaded successfully:', etag);
});

// Download an image from the bucket
const downloadPath = '/path/to/save/downloaded/image.jpg';
const downloadObjectName = 'image.jpg';
minioClient.fGetObject(bucketName, downloadObjectName, downloadPath, (err) => {
  if (err) {
    return console.log('Error downloading image:', err);
  }
  console.log('Image downloaded successfully');
});
