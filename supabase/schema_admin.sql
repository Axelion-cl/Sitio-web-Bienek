-- =====================================================
-- SCHEMA ADICIONAL: Tablas para Admin Panel
-- Ejecutar en Supabase SQL Editor DESPUÉS de schema.sql
-- =====================================================

-- BRANDS (Marcas)
create table if not exists public.brands (
  id text primary key,
  name text not null,
  logo text
);

alter table public.brands enable row level security;

create policy "Enable read access for all users" on public.brands
  for select using (true);

create policy "Enable write for service role" on public.brands
  for all using (auth.role() = 'service_role');

-- BADGES (Distintivos)
create table if not exists public.badges (
  id text primary key,
  name text not null,
  color text default 'bg-black',
  last_edited timestamp with time zone default timezone('utc'::text, now())
);

alter table public.badges enable row level security;

create policy "Enable read access for all users" on public.badges
  for select using (true);

create policy "Enable write for service role" on public.badges
  for all using (auth.role() = 'service_role');

-- SECTORS: Add featured_families column if missing
alter table public.sectors 
  add column if not exists featured_families text[];

-- CLIENTS SIMPLIFICADO (sin auth.users)
-- Eliminamos y recreamos para simplicidad
drop table if exists public.clients cascade;

create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  company text,
  phone text,
  status text default 'active',
  registration_date timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.clients enable row level security;

create policy "Enable read for service role" on public.clients
  for select using (auth.role() = 'service_role');

create policy "Enable write for service role" on public.clients
  for all using (auth.role() = 'service_role');

-- =====================================================
-- DONE! Now brands, badges and clients are ready.
-- =====================================================
