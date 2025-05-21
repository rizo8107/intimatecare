import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDir: path.resolve(__dirname, '../public'),
  outputDir: path.resolve(__dirname, '../public/optimized'),
  formats: ['jpg', 'jpeg', 'png', 'webp'],
  sizes: [
    { width: 1920, suffix: 'large' },
    { width: 1280, suffix: 'medium' },
    { width: 640, suffix: 'small' },
    { width: 320, suffix: 'thumbnail' }
  ],
  quality: 80,
  convertToWebP: true
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Find all images
const imageFiles = globSync(`${config.inputDir}/**/*.{${config.formats.join(',')}}`, { nodir: true });

// Process each image
async function processImages() {
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const imagePath of imageFiles) {
    const filename = path.basename(imagePath);
    const ext = path.extname(imagePath).toLowerCase().substring(1);
    const name = path.basename(imagePath, path.extname(imagePath));
    
    // Skip already optimized images
    if (imagePath.includes('/optimized/')) {
      continue;
    }
    
    console.log(`Processing: ${filename}`);
    
    try {
      // Load the image
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Create optimized versions in different sizes
      for (const size of config.sizes) {
        // Skip if the original is smaller than the target size
        if (metadata.width <= size.width) {
          continue;
        }
        
        const outputPath = path.join(config.outputDir, `${name}-${size.suffix}.${ext}`);
        
        // Resize and optimize
        await image
          .resize(size.width)
          .jpeg({ quality: config.quality, progressive: true })
          .toFile(outputPath);
        
        console.log(`Created: ${path.basename(outputPath)}`);
        
        // Create WebP version if enabled
        if (config.convertToWebP) {
          const webpPath = path.join(config.outputDir, `${name}-${size.suffix}.webp`);
          
          await image
            .resize(size.width)
            .webp({ quality: config.quality })
            .toFile(webpPath);
          
          console.log(`Created: ${path.basename(webpPath)}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  }
  
  console.log('Image optimization complete!');
}

processImages().catch(console.error);
