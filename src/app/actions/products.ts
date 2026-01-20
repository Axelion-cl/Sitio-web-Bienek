'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

// ============================================
// PRODUCTS CRUD
// ============================================

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

    // Generate ID if not provided
    const productId = data.id || `PROD-${Date.now()}`;

    const { data: product, error } = await supabaseAdmin
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
        await supabaseAdmin.from('product_sectors').insert(
            sectorIds.map(sid => ({ product_id: productId, sector_id: sid }))
        );
    }

    // Insert family relations
    if (familyIds && familyIds.length > 0) {
        await supabaseAdmin.from('product_families').insert(
            familyIds.map(fid => ({ product_id: productId, family_id: fid }))
        );
    }

    revalidatePath('/admin/products');
    revalidatePath('/promociones');
    return { success: true, data: product };
}

export async function updateProduct(id: string, data: ProductInput) {
    const { sectorIds, familyIds, ...productData } = data;

    const { error } = await supabaseAdmin
        .from('products')
        .update(productData)
        .eq('id', id);

    if (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }

    // Update sector relations (delete old, insert new)
    if (sectorIds) {
        await supabaseAdmin.from('product_sectors').delete().eq('product_id', id);
        if (sectorIds.length > 0) {
            await supabaseAdmin.from('product_sectors').insert(
                sectorIds.map(sid => ({ product_id: id, sector_id: sid }))
            );
        }
    }

    // Update family relations
    if (familyIds) {
        await supabaseAdmin.from('product_families').delete().eq('product_id', id);
        if (familyIds.length > 0) {
            await supabaseAdmin.from('product_families').insert(
                familyIds.map(fid => ({ product_id: id, family_id: fid }))
            );
        }
    }

    revalidatePath('/admin/products');
    revalidatePath(`/productos/${id}`);
    revalidatePath('/promociones');
    return { success: true };
}

export async function deleteProduct(id: string) {
    // Relations will be deleted by CASCADE (if configured) or manually
    await supabaseAdmin.from('product_sectors').delete().eq('product_id', id);
    await supabaseAdmin.from('product_families').delete().eq('product_id', id);

    const { error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/products');
    revalidatePath('/promociones');
    return { success: true };
}

export async function uploadProductImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert file to ArrayBuffer for supabase-js upload in Node environment
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabaseAdmin.storage
            .from('products')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return { success: false, error: uploadError.message };
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('products')
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (error: any) {
        console.error('Server Upload Error:', error);
        return { success: false, error: error.message };
    }
}
