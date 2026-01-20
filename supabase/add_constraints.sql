-- =======================================================
-- FIX FINAL: Añadir Restricciones UNIQUE
-- Ejecutar este script COMPLETO en Supabase SQL Editor
-- =======================================================

-- 1. Asegurar que las tablas estén limpias para evitar errores de duplicados al crear la restricción
truncate table public.brands cascade;
truncate table public.badges cascade;

-- 2. Añadir restricción UNIQUE a BRANDS (si no existe, fallará, pero intentaremos continuar)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'brands_name_key') then
    alter table public.brands add constraint brands_name_key unique (name);
  end if;
end $$;

-- 3. Añadir restricción UNIQUE a BADGES
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'badges_name_key') then
    alter table public.badges add constraint badges_name_key unique (name);
  end if;
end $$;

-- 4. INSERTAR DATOS (Ahora sí funcionará el ON CONFLICT)
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
