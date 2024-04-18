
const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../controller/minio');

// تكوين Multer لمعالجة تحميل الملفات
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// تحديد مسار لرفع الصور
Router.post('/upload', upload.single('image'), uploadImage);

module.exports = Router;
