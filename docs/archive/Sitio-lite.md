# Prompt – Google Antigravity  
## Rama: Sitio web Bienek Lite

---

## Contexto inicial
Estás trabajando sobre un repositorio con control de versiones.  
**Antes de realizar cualquier cambio**, crea una **nueva rama** llamada:

**`Sitio-web-bienek-lite`** y pasa a ella.

---

## Objetivo de la rama
Esta rama debe contener una versión del sitio web llamada **“Sitio web Bienek Lite”**, lista para despliegue, cuyo único propósito es:

- Mostrar información institucional.
- Servir como punto de contacto con la empresa.

Esta versión **NO debe utilizar Supabase**, **NO debe usar bases de datos** y **NO debe implementar ningún backend de persistencia**.

---

## Alcance funcional permitido
Las únicas interacciones permitidas son:

- Formulario de contacto (página **Contacto**).
- Formulario de postulación (página **Trabaja con nosotros**).

El envío de información desde estos formularios **debe mantenerse operativo exactamente igual que en el sitio actual**.

---

## Administración (CRÍTICO — NO EXISTE)
- Este sitio **NO cuenta con Admin Panel**.
- **No se debe crear**:
  - Panel administrativo
  - Dashboard
  - Backoffice
  - CRUDs
  - Gestión o visualización de datos
- El motivo es que **el sitio no almacena información entrante de ningún tipo**.

---

## Envío de correos (CRÍTICO — NO MODIFICAR SALVO INDICACIÓN EXPLÍCITA)
- El sitio envía correos utilizando el archivo **`email.php`**, ubicado en `html_public`.
- Este mecanismo debe mantenerse **sin cambios**, **a menos que el usuario lo indique explícitamente**:
  - No reemplazar `email.php`.
  - No refactorizar ni alterar su lógica interna.
  - No modificar el flujo de envío de correos.
- Los formularios deben seguir apuntando a `email.php`.

---

## Seguridad de formularios (CRÍTICO — NO MODIFICAR SALVO INDICACIÓN EXPLÍCITA)
- El sitio utiliza **Cloudflare** para proteger los formularios.
- Esta protección debe mantenerse activa **sin cambios**, **a menos que el usuario lo indique explícitamente**:
  - No eliminar scripts, tokens, headers ni configuraciones asociadas.
  - No alterar la integración con Cloudflare.

---

## Páginas permitidas
En esta rama **solo deben existir** las siguientes páginas:

- Inicio
- Empresa
- Contacto
- Trabaja con nosotros

Cualquier otra página (incluyendo páginas de sectores o soluciones) debe eliminarse **exclusivamente dentro de la rama `Sitio-web-bienek-lite`**.

---

## Restricciones visuales (CRÍTICO)
- **No modifiques ningún aspecto visual** del sitio:
  - Diseño
  - Estilos
  - Componentes
  - Layout

### Único cambio visual permitido
- En la página **Inicio**, dentro de la sección **“Nuestras Soluciones”**:
  - **Todas las tarjetas de sectores/soluciones** deben enlazar **exclusivamente** a la página **Contacto**.
  - No debe existir **ningún enlace** a páginas de sectores individuales, ya que **no existirán en esta versión**.

---

## Navegación (CRÍTICO)
- Eliminar del **Header** y del **Footer** cualquier enlace que apunte a páginas que no existan en esta versión Lite.
- No deben existir enlaces rotos ni referencias residuales.

---

## Backend y dependencias (CRÍTICO)
- Eliminar cualquier referencia a:
  - Supabase
  - Autenticación
  - Rutas protegidas
  - Persistencia de datos
- **No agregar nuevas dependencias** ni reemplazar flujos existentes.

---

## Control de versiones (CRÍTICO)
- No realizar cambios en la rama original ni en otras ramas existentes.
- Todos los cambios deben quedar contenidos **únicamente** en la rama `Sitio-web-bienek-lite`.
- Eliminar archivos en esta rama **no afecta** a otras ramas.

---

## Validación final obligatoria
Antes de finalizar, verifica que:

1. La rama `Sitio-web-bienek-lite` existe y es independiente.
2. El sitio carga correctamente.
3. Solo existen las páginas permitidas.
4. No hay referencias activas a Supabase.
5. El diseño visual es idéntico al original.
6. Todas las tarjetas de la sección **“Nuestras Soluciones”** apuntan a **Contacto**.
7. Header y Footer solo contienen enlaces válidos.
8. Los formularios envían correos correctamente vía `email.php`.
9. La protección de Cloudflare sigue activa.
10. No existe ningún Admin Panel ni lógica administrativa.
