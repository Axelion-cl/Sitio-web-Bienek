'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

// ============================================
// LEADS CRUD
// ============================================

export interface LeadInput {
    name: string;
    email: string;
    message?: string;
    company?: string;
    phone?: string;
}

export async function createLead(data: LeadInput) {
    const { data: lead, error } = await supabaseAdmin
        .from('leads')
        .insert({
            ...data,
            status: 'new',
            created_at: new Date().toISOString()
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true, data: lead };
}

export async function deleteLead(id: string) {
    const { error } = await supabaseAdmin
        .from('leads')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting lead:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true };
}

// ============================================
// CLIENTS CRUD
// ============================================

export interface ClientInput {
    name: string;
    email: string;
    company?: string;
    phone?: string;
}

export async function convertLeadToClient(leadId: string) {
    // 1. Get lead data
    const { data: lead, error: leadError } = await supabaseAdmin
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

    if (leadError || !lead) {
        console.error('Error fetching lead:', leadError);
        return { success: false, error: 'Lead not found' };
    }

    // 2. Create client record
    const { data: client, error: clientError } = await supabaseAdmin
        .from('clients')
        .insert({
            name: lead.name,
            email: lead.email,
            company: lead.company,
            phone: lead.phone,
            status: 'active',
            registration_date: new Date().toISOString()
        })
        .select()
        .single();

    if (clientError) {
        console.error('Error creating client:', clientError);
        return { success: false, error: clientError.message };
    }

    // 3. Delete lead
    await supabaseAdmin.from('leads').delete().eq('id', leadId);

    // 4. Generate temporary password (for display purposes)
    const tempPassword = generateTempPassword();

    revalidatePath('/admin/clients');
    return {
        success: true,
        data: client,
        tempPassword
    };
}

export async function deleteClient(id: string) {
    const { error } = await supabaseAdmin
        .from('clients')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting client:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true };
}

export async function updateClientStatus(id: string, status: 'active' | 'inactive') {
    const { error } = await supabaseAdmin
        .from('clients')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating client status:', error);
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/clients');
    return { success: true };
}

// Helper
function generateTempPassword(): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ============================================
// FETCH FUNCTIONS (Read from DB)
// ============================================

export async function getLeads() {
    const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        return [];
    }

    return data;
}

export async function getClients() {
    const { data, error } = await supabaseAdmin
        .from('clients')
        .select('*')
        .order('registration_date', { ascending: false });

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }

    return data;
}
