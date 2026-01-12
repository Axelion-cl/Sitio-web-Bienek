# Implementación de Página de Detalle de Producto

El objetivo es crear una página dinámica para mostrar la información detallada de cada producto, siguiendo el diseño del PRD y asegurando una buena experiencia de usuario con carga rápida (ISR) y datos ricos.

## Revisión del Usuario Requerida
> [!IMPORTANT]
> Se modificará la estructura de `mockProducts.ts` para soportar galerías y especificaciones. Esto podría afectar a componentes existentes que dependan de la propiedad `image` (singular). Se actualizarán esos componentes para usar la primera imagen del array `images`.

## Cambios Propuestos

### Datos (`src/data`)
#### [MODIFY] [mockProducts.ts](file:///d:/2.%20Otros/Github/Prueba%20Sitio%20web%20Bienek/src/data/mockProducts.ts)
- Actualizar interfaz `Product`:
    - `image: string` -> `images: string[]`
    - Agregar `description: string` (texto detallado)
    - Agregar `specs: Record<string, string>` (especificaciones técnicas)
    - Agregar `relatedProducts: string[]` (IDs de productos relacionados)
- Estructura de generación de datos mock actualizada para incluir estos campos de forma rica y realista.

### Componentes UI (`src/components/products`)
#### [NEW] [ProductGallery.tsx](file:///d:/2.%20Otros/Github/Prueba%20Sitio%20web%20Bienek/src/components/products/ProductGallery.tsx)
- Componente para mostrar la galería de imágenes (imagen principal grande + miniaturas).

#### [NEW] [ProductInfo.tsx](file:///d:/2.%20Otros/Github/Prueba%20Sitio%20web%20Bienek/src/components/products/ProductInfo.tsx)
- Columna derecha con información crítica: Marca, Título, SKU, Badges, Precio (si aplica), Botón Cotizar/Agregar.

#### [NEW] [RelatedProducts.tsx](file:///d:/2.%20Otros/Github/Prueba%20Sitio%20web%20Bienek/src/components/products/RelatedProducts.tsx)
- Carrusel de productos relacionados al final de la página.

### Página (`src/app`)
#### [NEW] [page.tsx](file:///d:/2.%20Otros/Github/Prueba%20Sitio%20web%20Bienek/src/app/productos/[id]/page.tsx)
- Implementación de la ruta dinámica `src/app/productos/[id]/page.tsx`.
- Uso de `generateStaticParams` para generar estáticamente las páginas de todos los productos mock.
- Layout:
    - Hero: 2 columnas (Galería | Info)
    - Cuerpo: Descripción detallada + Especificaciones
    - Footer: Productos relacionados

## Plan de Verificación

### Verificación Automática
- `npm run build` para asegurar que `generateStaticParams` funciona correctamente y no hay errores de tipo con los nuevos campos.

### Verificación Manual
- Navegar a un producto específico (ej. `/productos/PROD-1000`)
- Verificar que la galería carga y permite cambiar imágenes.
- Verificar que la información (Título, Marca, Specs) corresponde al producto.
- Verificar que el botón "Agregar" es funcional (o visualmente correcto por ahora).
- Verificar que el carrusel de productos relacionados muestra items y permite navegación.
- Verificar responsive en móvil.
