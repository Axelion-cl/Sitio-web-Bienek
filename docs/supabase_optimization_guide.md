# Guía de Optimización y Límites de Supabase - Proyecto Bienek

Este documento detalla las consideraciones técnicas y estrategias para gestionar un catálogo de hasta **5,000 productos** manteniendo el proyecto dentro de los límites del plan gratuito de Supabase.

## 1. Análisis de Límites del Plan Gratuito

Basado en la configuración actual de la cuenta, estos son los límites y sus implicancias:

| Recurso | Capacidad | Implicancia para Bienek |
| :--- | :--- | :--- |
| **File Storage** | **1 GB** | **Límite Crítico.** Es el espacio total para imágenes de productos. |
| **Database Size** | **500 MB** | **Suficiente.** Permite guardar el texto de miles de productos y pedidos. |
| **Egress (Ancho de Banda)** | **5 GB** | **Seguro.** Volumen de datos que los clientes descargan al navegar. |
| **Cached Egress** | **5 GB** | **Adicional.** Bono de transferencia para contenido popular/repetido. |
| **Monthly Active Users** | **50.000** | **Excedente.** Cubre de sobra cualquier registro de clientes B2B. |

---

## 2. El Desafío de las Imágenes (Los 5,000 Productos)

Para que el catálogo completo quepa en el **1 GB** de almacenamiento disponible, debemos aplicar la siguiente regla matemática:

> **Presupuesto por imagen:** 1.024 MB / 5.000 productos = **204 KB máximo por imagen.**

### Estrategia de Formato y Peso
*   **Formato:** Usar exclusivamente **WebP**. Es entre un 25% y 35% más ligero que JPEG/PNG.
*   **Resolución:** No exceder los **1000px** en su lado más largo.
*   **Calidad:** Comprimir entre un **75% y 80%**. Esto suele dejar las imágenes entre **60 KB y 120 KB**, dándonos margen para crecer incluso a 10.000 productos.

---

## 3. Estrategias de "Rendimiento" de Recursos

### Para el Almacenamiento (Storage)
1.  **Pre-Optimización obligatoria:** Supabase Free no transforma imágenes automáticamente. Las imágenes deben optimizarse **antes** de subirse al panel.
2.  **Eliminación de Huérfanos:** Si un producto se elimina, su imagen debe ser borrada del bucket para no "ensuciar" el GB disponible.

### Para el Ancho de Banda (Egress)
Con un tráfico combinado de **10 GB** (Egress + Cached), el sitio está bien protegido. No obstante, se recomienda:
1.  **Lazy Loading:** Implementado en el frontend para que las imágenes solo se descarguen cuando el usuario hace scroll hacia ellas.
2.  **Caché del Navegador:** Configurar headers de caché largos para que clientes recurrentes no consuman ancho de banda en imágenes que ya descargaron antes.

### Para la Base de Datos (DB)
*   **IDs Cortos:** Usar identificadores eficientes.
*   **Texto vs Archivos:** Puedes guardar descripciones muy detalladas sin miedo; el texto ocupa un espacio despreciable comparado con las imágenes.

---

## 4. Plan de Escalabilidad

Si en el futuro Bienek supera estos límites:
1.  **Opción A (Pago):** El plan Pro de Supabase expande estos límites significativamente por una tarifa mensual fija.
2.  **Opción B (Híbrida):** Usar **Cloudflare R2** para el almacenamiento de imágenes (ofrece 10 GB gratis y el ancho de banda es gratuito/ilimitado), manteniendo la base de datos en Supabase.

---
*Última actualización: Febrero 2026*
