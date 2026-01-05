La página se estructura bajo un contenedor principal que mantiene un encabezado fijo y un área de contenido dinámico que cambia según el botón seleccionado en el componente de navegación superior.

### 1. Encabezado de Bienvenida

- **Título**: "Mi Cuenta:" en **Outfit Bold**.
- **Saludo Personalizado**: Un mensaje dinámico: *"Bienvenido de nuevo, [Nombre_Usuario]"* (ej: Pepito Perez).

### 2. El Componente de Navegación (Tabs)

Es un grupo de tres botones redondeados situados en la parte superior del contenido:

- **Estilo Visual**: Los botones tienen iconos a la izquierda y texto a la derecha.
- **Estado Activo**: El botón seleccionado se resalta en **Amarillo Primario (#ECEC00)**, mientras que los inactivos permanecen en blanco con borde gris.
- **Opciones**:
    1. **Mis Productos** (Icono de carrito).
    2. **Mis Ordenes** (Icono de documento).
    3. **Mi Perfil** (Icono de usuario).

---

### 3. Secciones Dinámicas (El elemento que cambia)

### A. Sección: "Mis Productos" (Carrito de Preferencias)

- **Funcionalidad**: Lista los productos que el cliente ha marcado para cotizar.
- **Buscador Interno**: Incluye una barra de búsqueda y filtros para gestionar la lista guardada.
- **Acción Global**: Un botón grande en **Amarillo Primario** que dice **"Cotizar"** para enviar todo el listado al equipo de ventas.
- **Grilla de Productos**:
    - Mantiene la formación de **5 columnas**.
    - **Cambio en la Tarjeta**: El botón de "Cotizar" individual es reemplazado por un botón rojo de **"Eliminar"** para gestionar el carrito.

### B. Sección: "Mis Ordenes"

- **Funcionalidad**: Historial de solicitudes de cotización enviadas.
- **Visualización**: Una lista vertical de tarjetas grises con scrollbar propio.
- **Datos por Orden**: Muestra el código de orden (ej: `COT-2025-001`) y la fecha de creación.

### C. Sección: "Mi Perfil" (Información Personal)

- **Funcionalidad**: Gestión de datos de contacto y empresa.
- **Formulario**: Presenta campos para **Nombre**, **Correo Electrónico**, **Empresa** y un segundo campo de correo o teléfono en una grilla de 2x2.
- **Acción**: Botón amarillo en la base: **"Editar informacion de contacto"** con icono de lápiz.