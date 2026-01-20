-- Create a storage bucket for 'products' if it doesn't exist
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Drop existing policies to avoid name conflicts and ensure updated definitions
drop policy if exists "Public Access Products" on storage.objects;
drop policy if exists "Authenticated Insert Products" on storage.objects;
drop policy if exists "Authenticated Update Products" on storage.objects;
drop policy if exists "Authenticated Delete Products" on storage.objects;

-- Also drop generic names if they were created and are causing conflicts for this specific bucket logic
-- (This might fail if they belong to other buckets, so we'll use specific names for ours)
-- If the user has a global "Public Access" policy, we should leave it or ensure ours doesn't conflict.
-- The error 42710 indicates a name collision. We will use unique names for our policies.

-- Policy: Allow public read access to all files in 'products' bucket
create policy "Public Access Products"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Policy: Allow authenticated users (service_role or authenticated admins) to insert files
create policy "Authenticated Insert Products"
  on storage.objects for insert
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to update files
create policy "Authenticated Update Products"
  on storage.objects for update
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to delete files
create policy "Authenticated Delete Products"
  on storage.objects for delete
  using ( bucket_id = 'products' and auth.role() = 'authenticated' );
