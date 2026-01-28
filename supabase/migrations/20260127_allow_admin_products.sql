-- Allow Admins to manage Products
-- Currently only Service Role can write. We need Admins to be able to CRUD products.

CREATE POLICY "Admins can insert products" 
ON public.products
FOR INSERT
WITH CHECK (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

CREATE POLICY "Admins can update products" 
ON public.products
FOR UPDATE
USING (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
)
WITH CHECK (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

CREATE POLICY "Admins can delete products" 
ON public.products
FOR DELETE
USING (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

-- Also need permissions on product_sectors and product_families relations
CREATE POLICY "Admins can manage product_sectors" 
ON public.product_sectors
FOR ALL
USING (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

CREATE POLICY "Admins can manage product_families" 
ON public.product_families
FOR ALL
USING (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);
