/**
 * Image Conversion Script for Bienek Website
 * Converts PNG images to WebP format for better performance
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_PATHS = {
    hero: 'public/assets/images/home/hero.png',
    solutions: [
        'public/assets/images/solutions/adulto-mayor.png',
        'public/assets/images/solutions/aguas.png',
        'public/assets/images/solutions/educacion.png',
        'public/assets/images/solutions/embarcaciones.png',
        'public/assets/images/solutions/horeca.png',
        'public/assets/images/solutions/industria.png',
        'public/assets/images/solutions/jardines.png',
        'public/assets/images/solutions/limpieza-general.png',
        'public/assets/images/solutions/maquinaria.png',
        'public/assets/images/solutions/oficinas.png',
        'public/assets/images/solutions/salud.png',
        'public/assets/images/solutions/veterinaria.png',
    ]
};

async function convertToWebP(inputPath, quality = 85) {
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    try {
        const info = await sharp(inputPath)
            .webp({ quality })
            .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        console.log(`   ${(inputStats.size / 1024).toFixed(0)} KB → ${(outputStats.size / 1024).toFixed(0)} KB (${reduction}% reduction)\n`);

        return { success: true, inputPath, outputPath, reduction };
    } catch (error) {
        console.error(`❌ Error converting ${inputPath}:`, error.message);
        return { success: false, inputPath, error: error.message };
    }
}

async function main() {
    console.log('🖼️  Bienek Image Conversion to WebP\n');
    console.log('Converting hero image...');
    await convertToWebP(IMAGE_PATHS.hero);

    console.log('\nConverting solution images...');
    for (const imagePath of IMAGE_PATHS.solutions) {
        await convertToWebP(imagePath);
    }

    console.log('✨ Conversion complete!\n');
    console.log('Next steps:');
    console.log('1. Update HeroSection.tsx to use hero.webp');
    console.log('2. Update data files to reference .webp extensions');
    console.log('3. Run npm run build');
    console.log('4. Upload to cPanel\n');
}

main().catch(console.error);
