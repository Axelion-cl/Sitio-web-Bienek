-- Storage Policies for 'products' bucket
-- Ensure the bucket exists and public access is on
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies to reset clean
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete" ON storage.objects;

-- 1. Public Read Access
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- 2. Admin Insert Access
CREATE POLICY "Admin Insert Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' AND
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

-- 3. Admin Update Access
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' AND
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);

-- 4. Admin Delete Access
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' AND
  exists (
    select 1 from public.user_profiles 
    where id = auth.uid() and role = 'admin'
  )
);
