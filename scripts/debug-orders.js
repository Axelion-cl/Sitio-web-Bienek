
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    console.log('Parsed env:', env);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    console.log('Testing fetch orders with ANON key...');

    // Attempt to fetch orders just like the client code
    const { data: orders, error } = await supabase
        .from('orders')
        .select('user_id, created_at, status')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
    } else {
        console.log(`Fetched ${orders ? orders.length : 0} orders.`);
        if (orders && orders.length > 0) {
            console.log('First 5 orders:', orders.slice(0, 5));

            // Check specifically for Martin Haas's user ID if known
            // Assuming I got the IDs from my SQL earlier
        }
    }
}

test();
