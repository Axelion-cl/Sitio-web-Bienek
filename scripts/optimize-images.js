
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '../public');
const extensions = ['.jpg', '.jpeg', '.png'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

async function optimizeImages() {
    console.log('Scanning for images in public/ ...');
    const files = getAllFiles(publicDir);
    const imageFiles = files.filter(file => extensions.includes(path.extname(file).toLowerCase()));

    console.log(`Found ${imageFiles.length} images to optimize.`);

    let savedBytes = 0;
    let processedCount = 0;

    for (const file of imageFiles) {
        const ext = path.extname(file);
        const filename = path.basename(file, ext);
        const dir = path.dirname(file);
        const webpPath = path.join(dir, `${filename}.webp`);

        try {
            const originalStats = fs.statSync(file);

            // Initial Sharp instance
            let pipeline = sharp(file);
            const metadata = await pipeline.metadata();

            // Resize if too large (e.g. > 1920px width)
            if (metadata.width > 1920) {
                pipeline = pipeline.resize({ width: 1920 });
            }

            // Convert to WebP
            // quality 80 is usually a good balance
            await pipeline
                .webp({ quality: 80, effort: 4 }) // effort 4 is default, 6 is max (slower but better)
                .toFile(webpPath);

            const newStats = fs.statSync(webpPath);
            const savings = originalStats.size - newStats.size;

            if (savings > 0) {
                savedBytes += savings;
                console.log(`Optimized: ${path.relative(publicDir, file)} -> .webp (${(savings / 1024).toFixed(2)} KB saved)`);
            } else {
                console.log(`Converted: ${path.relative(publicDir, file)} -> .webp (Size increased by ${Math.abs(savings / 1024).toFixed(2)} KB - keeping WebP for consistency/features)`);
            }

            processedCount++;

        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log('------------------------------------------------');
    console.log(`Optimization complete.`);
    console.log(`Processed ${processedCount} images.`);
    console.log(`Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
