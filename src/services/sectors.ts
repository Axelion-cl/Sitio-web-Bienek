import { supabase } from '@/lib/supabase';

export interface Sector {
    id: string;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    icon: string;
    image: string;
    featuredFamilies?: string[];
}

/**
 * Fetch all sectors from Supabase
 */
export async function getAllSectors(): Promise<Sector[]> {
    const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .order('title');

    if (error) {
        console.error('Error fetching sectors:', error);
        return [];
    }

    return data.map(mapSupabaseToSector);
}

/**
 * Fetch a sector by its slug
 */
export async function getSectorBySlug(slug: string): Promise<Sector | undefined> {
    const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error(`Error fetching sector ${slug}:`, error);
        return undefined;
    }

    return mapSupabaseToSector(data);
}

/**
 * Fetch a sector by its ID
 */
export async function getSectorById(id: string): Promise<Sector | undefined> {
    const { data, error } = await supabase
        .from('sectors')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`Error fetching sector ${id}:`, error);
        return undefined;
    }

    return mapSupabaseToSector(data);
}

// --- Helper: Map DB Row to Frontend Type ---
function mapSupabaseToSector(row: any): Sector {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description || '',
        fullDescription: row.full_description || '',
        icon: row.icon || '',
        image: row.image || '',
        featuredFamilies: row.featured_families || []
    };
}
