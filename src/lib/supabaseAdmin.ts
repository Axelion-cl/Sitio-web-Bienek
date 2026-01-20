import { createClient } from '@supabase/supabase-js';

// Este cliente usa la SERVICE ROLE KEY que tiene permisos totales.
// SOLO debe usarse en Server Actions o Route Handlers, NUNCA en el navegador.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.warn(
        '⚠️ Supabase Admin credentials missing. Server-side writes will fail.'
    );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
