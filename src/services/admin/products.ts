/**
 * Admin Products Service
 * Client-side Supabase operations for product CRUD
 * Replaces: src/app/actions/products.ts
 */

import { supabase } from '@/lib/supabase';

export interface ProductInput {
    id?: string;
    name: string;
    brand: string;
    brand_logo?: string;
    description?: string;
    sku?: string;
    images?: string[];
    specs?: Record<string, string>;
    badges?: string[];
    sectorIds?: string[];
    familyIds?: string[];
}

export async function createProduct(data: ProductInput) {
    const { sectorIds, familyIds, ...productData } = data;
    const productId = data.id || `PROD-${Date.now()}`;

    const { data: product, error } = await supabase
        .from('products')
        .insert({ ...productData, id: productId })
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        return { success: false, error: error.message };
    }

    // Insert sector relations
    if (sectorIds && sectorIds.length > 0) {
        await supabase.from('product_sectors').insert(
            sectorIds.map(sid => ({ product_id: productId, sector_id: sid }))
        );
    }

    // Insert family relations
    if (familyIds && familyIds.length > 0) {
        await supabase.from('product_families').insert(
            familyIds.map(fid => ({ product_id: productId, family_id: fid }))
        );
    }

    return { success: true, data: product };
}

export async function updateProduct(id: string, data: ProductInput) {
    const { sectorIds, familyIds, ...productData } = data;

    const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }

    // Update sector relations
    if (sectorIds) {
        await supabase.from('product_sectors').delete().eq('product_id', id);
        if (sectorIds.length > 0) {
            await supabase.from('product_sectors').insert(
                sectorIds.map(sid => ({ product_id: id, sector_id: sid }))
            );
        }
    }

    // Update family relations
    if (familyIds) {
        await supabase.from('product_families').delete().eq('product_id', id);
        if (familyIds.length > 0) {
            await supabase.from('product_families').insert(
                familyIds.map(fid => ({ product_id: id, family_id: fid }))
            );
        }
    }

    return { success: true };
}

export async function deleteProduct(id: string) {
    // Delete relations first
    await supabase.from('product_sectors').delete().eq('product_id', id);
    await supabase.from('product_families').delete().eq('product_id', id);

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

// Helper: Compress image before upload using Canvas
async function compressImage(file: File, targetFormat: 'image/jpeg' | 'image/png' | 'image/webp'): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Optimization Goal: Max 1000px for products to keep size low (<200KB)
                const MAX_WIDTH = (targetFormat === 'image/png' || targetFormat === 'image/webp') ? 1000 : 1200;
                let width = img.width;
                let height = img.height;

                // Resize logic
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context not available'));
                    return;
                }

                if (targetFormat === 'image/jpeg') {
                    // Draw white background for transparent PNGs converted to JPEG
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                } else {
                    // Clear for transparency (PNG/WebP)
                    ctx.clearRect(0, 0, width, height);
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Compress
                // WebP at 0.8 quality offers excellent size reduction while maintaining visual fidelity
                const quality = targetFormat === 'image/png' ? 1.0 : 0.8;

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Compression failed'));
                        }
                    },
                    targetFormat,
                    quality
                );
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
}

export async function uploadProductImage(
    file: File,
    options: { isLogo?: boolean } = {}
): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
        // Optimize image before upload

        let fileToUpload: File | Blob = file;
        let fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        let contentType = file.type;

        // Skip SVGs
        if (file.type.startsWith('image/') && !file.type.includes('svg')) {
            console.log(`Original size: ${(file.size / 1024).toFixed(2)} KB`);

            // Determine target format
            // If it's a logo AND original is PNG, keep PNG (for email compatibility).
            // For ALL products, force WebP to save space (Supabase Storage Limit).
            const isPng = file.type === 'image/png';
            const targetFormat = (options.isLogo && isPng) ? 'image/png' : 'image/webp';

            try {
                const compressedBlob = await compressImage(file, targetFormat);
                console.log(`Compressed size: ${(compressedBlob.size / 1024).toFixed(2)} KB`);

                fileToUpload = compressedBlob;

                // Update extension and content type based on result
                if (targetFormat === 'image/png') {
                    fileExt = 'png';
                    contentType = 'image/png';
                } else if (targetFormat === 'image/webp') {
                    fileExt = 'webp';
                    contentType = 'image/webp';
                } else {
                    fileExt = 'jpg';
                    contentType = 'image/jpeg';
                }

            } catch (optErr) {
                console.warn("Optimization failed, using original file", optErr);
            }
        }

        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, fileToUpload, {
                contentType: contentType,
                upsert: false
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return { success: false, error: uploadError.message };
        }

        const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Upload Error:', error);
        return { success: false, error: error.message };
    }
}
