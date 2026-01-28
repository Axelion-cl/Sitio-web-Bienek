-- ==========================================================
-- FIX AUTH PROFILES
-- Este script crea la tabla necesaria para manejar roles (admin/client)
-- y configura las políticas de seguridad.
-- ==========================================================

-- 1. Crear tabla user_profiles si no existe
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text default 'client' check (role in ('client', 'admin')),
  company text,
  phone text,
  must_change_password boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar RLS (Row Level Security)
alter table public.user_profiles enable row level security;

-- 3. Definir Políticas (Policies)

-- Permitir a usuarios ver su propio perfil
drop policy if exists "Users can view own profile" on public.user_profiles;
create policy "Users can view own profile" on public.user_profiles
  for select using (auth.uid() = id);

-- Permitir a usuarios actualizar su propio perfil
drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile" on public.user_profiles
  for update using (auth.uid() = id);

-- Permitir a usuarios insertar su propio perfil (Necesario para el primer login/auto-creación)
drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);

-- Permitir a administradores ver TODOS los perfiles (Para el CRM/Admin Panel)
-- Esta política usa una subquery para verificar si el usuario actual es admin
drop policy if exists "Admins can view all profiles" on public.user_profiles;
create policy "Admins can view all profiles" on public.user_profiles
  for select using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Permitir al Service Role (API/Backend) acceso total
drop policy if exists "Service role full access" on public.user_profiles;
create policy "Service role full access" on public.user_profiles
  for all using (auth.role() = 'service_role');

-- ==========================================================
-- INSTRUCCIONES PARA PROMOVER A ADMIN
-- ==========================================================
-- Una vez creada la tabla, ejecuta el siguiente comando reemplazando el email:
-- 
-- UPDATE public.user_profiles 
-- SET role = 'admin' 
-- WHERE email = 'tu-email@ejemplo.com';
