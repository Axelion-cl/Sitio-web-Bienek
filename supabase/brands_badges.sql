-- Create BRANDS table
create table public.brands (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  logo text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.brands enable row level security;

create policy "Enable read access for all users" on public.brands
  for select using (true);
  
create policy "Enable insert for service role" on public.brands
  for insert with check (auth.role() = 'service_role');
  
create policy "Enable update for service role" on public.brands
  for update using (auth.role() = 'service_role');

-- Create BADGES table
create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  color text, -- Optional: for UI styling
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.badges enable row level security;

create policy "Enable read access for all users" on public.badges
  for select using (true);

create policy "Enable insert for service role" on public.badges
  for insert with check (auth.role() = 'service_role');

-- SEED DATA for BRANDS
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
on conflict (name) do nothing;

-- SEED DATA for BADGES
insert into public.badges (name) values
('Nuevo'),
('En Promoción'),
('Más Vendidos'),
('Ecológico'),
('Uso Rudo'),
('Certificado'),
('Premium')
on conflict (name) do nothing;
