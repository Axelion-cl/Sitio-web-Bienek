-- =======================================================
-- SOLUCIÓN DEFINITIVA Y ROBUSTA
-- Ejecutar TODO este script en el SQL Editor de Supabase
-- =======================================================

-- 1. Habilitar extensiones necesarias (pgcrypto para gen_random_uuid si no es nativo)
create extension if not exists "pgcrypto";

-- 2. Limpiar tablas para evitar conflictos de datos sucios previos
truncate table public.brands cascade;
truncate table public.badges cascade;

-- 3. ARREGLAR TABLA BRANDS
-- Asegurar que la columna ID tenga un valor por defecto (Soluciona error "null value in column id")
alter table public.brands alter column id set default gen_random_uuid();

-- Asegurar restricción UNIQUE en nombre (Soluciona error "no unique constraint matching ON CONFLICT")
-- Primero borramos la restricción si existe con otro nombre o está corrupta
alter table public.brands drop constraint if exists brands_name_key;
-- Añadimos la restricción explícitamente
alter table public.brands add constraint brands_name_key unique (name);

-- Asegurar políticas RLS
alter table public.brands enable row level security;
drop policy if exists "Enable read access for all users" on public.brands;
create policy "Enable read access for all users" on public.brands for select using (true);
drop policy if exists "Enable insert for service role" on public.brands;
create policy "Enable insert for service role" on public.brands for insert with check (auth.role() = 'service_role');
drop policy if exists "Enable update for service role" on public.brands;
create policy "Enable update for service role" on public.brands for update using (auth.role() = 'service_role');


-- 4. ARREGLAR TABLA BADGES
-- Asegurar ID por defecto
alter table public.badges alter column id set default gen_random_uuid();

-- Asegurar UNIQUE
alter table public.badges drop constraint if exists badges_name_key;
alter table public.badges add constraint badges_name_key unique (name);

-- Asegurar políticas RLS
alter table public.badges enable row level security;
drop policy if exists "Enable read access for all users" on public.badges;
create policy "Enable read access for all users" on public.badges for select using (true);
drop policy if exists "Enable insert for service role" on public.badges;
create policy "Enable insert for service role" on public.badges for insert with check (auth.role() = 'service_role');


-- 5. INSERTAR DATOS (Ahora seguro)
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
set logo = excluded.logo;

insert into public.badges (name) values
('Nuevo'),
('En Promoción'),
('Más Vendidos'),
('Ecológico'),
('Uso Rudo'),
('Certificado'),
('Premium')
on conflict (name) do nothing;
