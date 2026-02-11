# Reglas del Agente: Proyecto Bienek

Este archivo define las reglas de comportamiento y restricciones técnicas para cualquier agente de IA que trabaje en este repositorio.

## 🛠️ Restricciones Técnicas

1.  **PROHIBIDO: Server Actions**:
    - El proyecto usa `output: 'export'` (Static Export).
    - **No utilices** `'use server'` o funciones de servidor de Next.js.
    - Toda la lógica debe residir en servicios del lado del cliente (`src/services/`) consumiendo la clave `anon` de Supabase.

2.  **Imágenes**:
    - Prioriza siempre el formato **WebP**.
    - Si agregas nuevas imágenes al catálogo vía código, asegúrate de que pasen por el proceso de optimización.
    - No uses imágenes de stock genéricas; solicita al usuario que las genere o use `generate_image`.

3.  **Tecnologías**:
    - React 19 + Next.js 16.
    - Tailwind CSS 4 (Usa variables CSS y sintaxis moderna).
    - Lucide React para iconografía.

4.  **Rutas y Autenticación**:
    - **`/login`** es para clientes (redirecciona a `/mi-cuenta`).
    - **`/admin`** es el panel interno exclusivo para staff.
    - Se usa **GenerateStaticParams** para rutas dinámicas (`[slug]`, `[id]`). No crees archivos de rutas estáticas si pueden ser manejados por la DB y el generador estático.

## 💬 Estilo y Comunicación

1.  **Idioma**: Toda la comunicación con el usuario, comentarios en el código y documentación DEBE ser en **Español**.
3.  **Documentación**: Consulta siempre `docs/brain/PROJECT_CONTEXT.md`. Mantén el `docs/brain/changelog.md` al día. **Regla de Oro**: Agrupa cambios pequeños (ej. colores, textos) en la sesión actual. Todo cambio que afecte al usuario debe quedar registrado.
4.  **Precisión**: Si encuentras archivos `.ts` o `.tsx` que usan datos "mock" y hay una tabla equivalente en Supabase, prioriza la migración a datos reales.

## 📁 Estructura de Archivos

- Mantén las rutas públicas en `src/app/(public)/`.
- Mantén la lógica administrativa en `src/app/admin/`.
- Los componentes UI reutilizables deben ir en `src/components/ui/` siguiendo el patrón de Shadcn/ui o similar.

---
*Cualquier violación a estas reglas puede causar fallos en la compilación estática o en la seguridad del sitio.*
