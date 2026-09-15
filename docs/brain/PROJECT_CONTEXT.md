# Contexto del Proyecto: Sitio Web Bienek

Este documento es la **Fuente Única de Verdad (Single Source of Truth)** para el desarrollo y mantenimiento del sitio web de Bienek. Consolida toda la información técnica, estratégica y operativa del proyecto.

---

## 🏗️ Stack Tecnológico (Actual)

| Componente | Tecnología | Notas |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 + React 19 | Arquitectura de **Static Export** (`output: 'export'`). |
| **Estilos** | Tailwind CSS 4 | Basado en variables CSS modernas. |
| **Backend/DB** | Supabase Cloud | PostgreSQL + RLS + Storage. Uso de clave anónima en cliente. |
| **Hosting** | Mundo Hosting (cPanel) | Despliegue estático en carpeta `public_html`. |
| **Email** | PHP Bridge + SMTP | Bridge en `/api-bienek/email.php` para bypass de CORS. Apuntando a despliegue final en **bienek.cl** (Mundo Hosting). |
| **Anti-Spam** | Cloudflare Turnstile | Integrado en todos los formularios públicos. |
| **Imágenes** | Sharp + Canvas | Optimización a WebP en build y compresión client-side en Admin. |

### ⚠️ Limitaciones Críticas
- **Supabase Free Plan**:
    - **Base de Datos (500MB)**: Límite estricto. Se requiere optimización constante de datos y evitar logs excesivos.
    - **Storage (1GB)**: Crítico para imágenes de productos. Se usa compresión agresiva (WebP + Resize) antes de subir.
    - **Pausado por Inactividad**: El proyecto se detiene tras 1 semana sin uso. Se requiere un "ping" periódico o upgrade para producción continua.
- **NO Server Actions**: Al ser un sitio estático, `'use server'` no funciona. Todo debe ser client-side services (`src/services/`).
- **Dynamic Routes**: No se soportan rutas dinámicas en runtime. Se utiliza **GenerateStaticParams** para pre-renderizar las páginas de soluciones y productos en el build.

---

## 🛡️ Seguridad

1.  **Supabase RLS**: Todas las tablas tienen políticas de *Row Level Security*. El cliente usa la clave `anon`, por lo que las políticas deben habilitar explícitamente `SELECT`, `INSERT`, etc., según el rol o permisos públicos.
2.  **Autenticación**: Manejada vía Supabase Auth. El acceso de Clientes redirecciona a su perfil (`/mi-cuenta`), mientras que la gestión interna se realiza en `/admin`.
3.  **Prevención de Spam**: Cloudflare Turnstile valida cada envío de formulario. El PHP Bridge verifica el token contra la API de Cloudflare antes de procesar cualquier correo.
4.  **Validación de Datos**:
    - Frontend: Regex estricto para emails y validación de tipos de archivos (.xlsx, .csv).
    - PHP Bridge: Sanitización de inputs y validación de formato de correo en el servidor.

---

## 🚀 Rendimiento (Performance)

1.  **Static Site Generation (SSG)**: Carga instantánea al servir archivos HTML pre-renderizados.
2.  **Optimización de Imágenes**:
    - **Build Time**: Uso de `next/image` con `unoptimized: true` (Mundo Hosting no soporta Image Optimization de Next.js), pero las imágenes se procesan a **WebP** mediante scripts (`scripts/optimize-images.mjs`).
    - **Runtime (Admin)**: El servicio de productos comprime y redimensiona imágenes vía Canvas antes de subirlas a Supabase Storage para ahorrar ancho de banda.
3.  **Fuentes**: Uso de `next/font/google` (Outfit) para evitar layout shift y descargas externas.

---

## 🔍 SEO (Search Engine Optimization)

- **Estrategia**: SEO "On-Page" integrado en el build.
- **Implementación Actual**:
    - Metadatos base en `src/app/layout.tsx`.
    - Metadatos dinámicos generados en build-time para cada página de solución mediante `generateMetadata` en `src/app/(public)/soluciones/[slug]/page.tsx`.
    - Estructura semántica de encabezados (H1-H3).
- **Pendiente**: Generación de `sitemap.xml` dinámico basado en productos de la DB y `robots.txt` optimizado.

---

## 👤 Experiencia de Usuario (Exploración)

### 🌐 Sitio Público (Cliente)
- **Home**: Contiene la grilla de soluciones industriales que redirige a las páginas específicas de cada sector.
- **Páginas de Soluciones**: Existen 12 páginas de soluciones basadas en una plantilla dinámica (`[slug]`) que muestra productos y familias filtradas por sector.
- **Productos**: Cada producto tiene su propia página pre-renderizada (`/productos/[id]`).
- **Mi Cuenta**: Área de cliente (`/mi-cuenta`) donde usuarios autenticados pueden gestionar sus datos y solicitudes/órdenes.
- **Contacto**: Formulario con soporte para adjuntar "Listados de Compra" (.xlsx).

### 🔐 Panel de Administración (Gestión Interna)
- **Dashboard**: Resumen operativo del estado del catálogo.
- **Gestión de Productos**: CRUD completo con carga de múltiples imágenes.
- **Gestión de Etiquetas**: Control total de Sectores, Familias, Marcas y Badges.
- **Gestión de Clientes (CRM Light)**: 
    - **Conversión de Leads**: Permite generar credenciales temporales para un Lead. El sistema envía un email automático y **fuerza el cambio de contraseña** en el primer inicio de sesión del cliente.
    - Control de acceso y edición de perfiles.

---

## 🗺️ Sitemap (Páginas)

- `/` - Inicio (Home con Grilla de Soluciones)
- `/empresa` - Quiénes somos
- `/soluciones/[slug]` - Plantilla de Páginas de Soluciones (12 sectores)
- `/productos/[id]` - Ficha de producto individual
- `/blog` - Artículos técnicos
- `/contacto` - Formulario de contacto
- `/trabaja-con-nosotros` - Postulaciones laborales
- `/login` - Acceso para clientes
- `/admin/*` - Panel administrativo interno (Dashboard, Productos, Etiquetas, Clientes)

---

## � Registro de Cambios

Todos los cambios significativos, nuevas funcionalidades y sesiones de desarrollo se registran detalladamente en:
- **[changelog.md](file:///c:/Github/Sitio%20web%20Bienek/Sitio-web-Bienek/docs/brain/changelog.md)**

---

## �🛠️ Backlog y Próximos Pasos

1.  **i18n**: Traducir faltantes y asegurar persistencia de idioma.
2.  **Sincronización CRM**: Integrar leads de Supabase con herramientas externas de ventas.
3.  **Importador Masivo**: Herramienta en el admin para subir miles de productos vía Excel/CSV.
4.  **Sitemap Automático**: Script para generar sitemap basado en los productos reales de la DB.
5.  **Refactor Mock-to-DB**: Reemplazar los últimos archivos `mock*.ts` por queries reales.

---
*Última actualización: 2026-02-11*
