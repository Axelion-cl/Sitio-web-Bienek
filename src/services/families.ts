import { supabase } from '@/lib/supabase';

export interface Family {
    id: string;
    name: string;
    description?: string;
}

/**
 * Fetch all families from Supabase
 */
export async function getAllFamilies(): Promise<Family[]> {
    const { data, error } = await supabase
        .from('families')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching families:', error);
        return [];
    }

    return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description
    }));
}
