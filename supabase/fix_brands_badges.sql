-- =======================================================
-- FIX: Tablas Brands y Badges (Idempotente)
-- Ejecutar este script completo en el SQL Editor de Supabase
-- =======================================================

-- 1. Crear tabla BRANDS si no existe
create table if not exists public.brands (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  logo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en brands
alter table public.brands enable row level security;

-- Limpiar políticas antiguas de brands para evitar conflictos
drop policy if exists "Enable read access for all users" on public.brands;
drop policy if exists "Enable insert for service role" on public.brands;
drop policy if exists "Enable update for service role" on public.brands;

-- Crear políticas de brands
create policy "Enable read access for all users" on public.brands
  for select using (true);
  
create policy "Enable insert for service role" on public.brands
  for insert with check (auth.role() = 'service_role');
  
create policy "Enable update for service role" on public.brands
  for update using (auth.role() = 'service_role');


-- 2. Crear tabla BADGES si no existe
create table if not exists public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  color text, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en badges
alter table public.badges enable row level security;

-- Limpiar políticas antiguas de badges
drop policy if exists "Enable read access for all users" on public.badges;
drop policy if exists "Enable insert for service role" on public.badges;

-- Crear políticas de badges
create policy "Enable read access for all users" on public.badges
  for select using (true);

create policy "Enable insert for service role" on public.badges
  for insert with check (auth.role() = 'service_role');


-- 3. INSERTAR DATOS (Marcas)
insert into public.brands (name, logo) values
('3M', '/assets/images/brands/3m.png'),
('Kimberly-Clark', '/assets/images/brands/kimberly.png'),
('Tork', '/assets/images/brands/tork.png'),
('Diversey', '/assets/images/brands/diversey.png'),
('Ecolab', '/assets/images/brands/ecolab.png'),
('Elite', '/assets/images/brands/elite.png'),
('Spartan', '/assets/images/brands/spartan.png'),
('Rubbermaid', '/assets/images/brands/rubbermaid.png'),
('Karcher', '/assets/images/brands/karcher.png'),
('Nilfisk', '/assets/images/brands/nilfisk.png')
on conflict (name) do update 
set logo = excluded.logo; -- Actualizar logo si ya existe

-- 4. INSERTAR DATOS (Distintivos)
insert into public.badges (name) values
('Nuevo'),
('En Promoción'),
('Más Vendidos'),
('Ecológico'),
('Uso Rudo'),
('Certificado'),
('Premium')
on conflict (name) do nothing;
