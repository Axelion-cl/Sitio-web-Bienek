# Registro de Cambios - Sesión de Desarrollo

Este documento registra los cambios implementados durante las sesiones de desarrollo con el agente de código. Sirve como contexto detallado para el agente orquestador.

---

## Sesión: 2026-01-12 (Página de Producto)

### Página Detalle de Producto (`/productos/[id]`)
- **Ruta Dinámica**: `src/app/productos/[id]/page.tsx` con ISR.
- **Componentes Nuevos**:
    - `ProductGallery`: Galería interactiva.
    - `ProductInfo`: Info crítica (Marca, Título, SKU, Badges) y botón de acción (Agregar).
    - `RelatedProducts`: Grilla de productos relacionados.
- **Datos Mock**: Actualizado `mockProducts.ts` con arrays de imágenes, descripciones largas, especificaciones, badges y relaciones.
- **UI/UX Refinado**: 
    - Eliminado botón "Cotizar" y visualización de precios.
    - Eliminado texto legal de IVA.
    - Reordenado Brand debajo de Título.
    - **Reestructuración de Layout**: Descripción y Especificaciones movidas a la columna derecha debajo de la información crítica, optimizando el espacio vertical y eliminando los espacios vacíos.
    - Layout responsivo (Galería izquierda, Info derecha en desktop), transiciones suaves, cards clickeables.
- **Correcciones**:
    - `ProductCard` ahora usa imágenes reales y es totalmente clickeable.
    - Se corrigió la estructura HTML en `ProductPage` para asegurar contenedores cerrados correctamente.

## Sesión: 2026-01-09

### Página Empresa (`/empresa`)
- **Creada**: `src/app/empresa/page.tsx`
- **Diseño**: Z-pattern con bloques alternados (imagen-texto)
- **Secciones**: Trayectoria, Visión, Misión
- **Estilos**: Títulos `font-normal`, márgenes `px-8 lg:px-24`, imágenes `w-5/12`
- **Assets**: `/assets/images/empresa/trayectoria.png`, `vision.png`

### Página Contáctenos (`/contacto`)  
- **Creada**: `src/app/contacto/page.tsx`
- **Componente**: `src/components/contacto/ContactForm.tsx` (formulario con estado)
- **Layout**: Grid 12 columnas (7 form + 5 info), mapa full-width debajo
- **Mapa**: Google Maps iframe real (Juan Sebastián Elcano 1910, Hualpén)
- **Info Cards**: Dirección, Teléfono, Email, Horarios

### Componente PageTitle
- **Creado**: `src/components/ui/PageTitle.tsx`
- **Propósito**: Estilo unificado para títulos de página
- **Estilo**: Fuente Outfit 55px, barra amarilla 176px x 5px

### Header Actualizado
- **CTA Button**: Enlaza a `/contacto`, texto "CONTACTENOS"
- **Smart Sticky**: Se oculta al bajar, reaparece al subir (scroll direction detection)
- **Navegación**: Enlace "Empresa" actualizado a `/empresa`
- **Archivo**: `src/components/layout/Header.tsx`

### Footer Actualizado
- **Navegación**: Enlace "Empresa" actualizado a `/empresa`
- **Archivo**: `src/components/layout/Footer.tsx`

---

## Convenciones Establecidas
- **Títulos de página**: Usar `<PageTitle>` component
- **Márgenes de contenido**: `px-8 lg:px-24` para páginas internas
- **Imágenes generadas**: Consultar usuario antes de usar generate_image
- **Enlaces**: Verificar siempre que los enlaces `href` apunten a rutas reales y no `#`.
