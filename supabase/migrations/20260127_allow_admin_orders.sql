-- Allow Admins to manage Orders and Order Items
-- This is necessary for the Admin Panel to edit client orders using the Frontend Client

-- 1. Policies for ORDERS table
-- Drop existing specific policies if needed or just add new permisive ones for admins
create policy "Admins can manage all orders" 
on public.orders
for all
using (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

-- 2. Policies for ORDER_ITEMS table
create policy "Admins can manage all order items" 
on public.order_items
for all
using (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);
