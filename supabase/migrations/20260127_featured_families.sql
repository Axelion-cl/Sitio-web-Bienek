-- Add featured_families column to sectors
ALTER TABLE public.sectors ADD COLUMN IF NOT EXISTS featured_families text[] DEFAULT '{}';

-- Fix policies for Sectors
-- Allow Admins to UPDATE sectors (was missing or restrictive)

DROP POLICY IF EXISTS "Enable insert for admins only" ON public.sectors;

CREATE POLICY "Admins can insert sectors" 
ON public.sectors
FOR INSERT
WITH CHECK (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

CREATE POLICY "Admins can update sectors" 
ON public.sectors
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

CREATE POLICY "Admins can delete sectors" 
ON public.sectors
FOR DELETE
USING (
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);
