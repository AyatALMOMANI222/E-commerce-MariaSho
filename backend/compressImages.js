const sharp = require('sharp');
// قم بتحميل الصورة
const inputPath = './image/istockphoto-1932000263-612x612.jpg';
// قم بتحديد مسار حفظ الصورة المضغوطة
const outputPath = '../backend/compressedImage/compressedImage.jpg';

// استخدم Sharp لضغط الصورة
const targetSizeInBytes = 62 * 1024; // 100 كيلو بايت

// استخدم Sharp لضغط الصورة
sharp(inputPath)
    .resize(800) // قم بتغيير الحجم إلى 800 بكسل في العرض
    .toBuffer((err, buffer) => {
        if (err) {
            console.error(err);
        } else {
            // ضبط جودة الصورة للحصول على حجم مقبول
            sharp(buffer)
                .jpeg({ quality: 70 }) // قم بضبط جودة الصورة
                .toBuffer((err, compressedBuffer) => {
                    if (err) {
                        console.error(err);
                    } else {
                        // التحقق من حجم الصورة المضغوطة
                        if (compressedBuffer.length > targetSizeInBytes) {
                            console.warn('الصورة المضغوطة تجاوزت الحجم المستهدف.');
                        } else {
                            // حفظ الصورة المضغوطة
                            require('fs').writeFileSync(outputPath, compressedBuffer);
                            console.log('تم ضغط الصورة بنجاح.');
                        }
                    }
                });
        }
    });
