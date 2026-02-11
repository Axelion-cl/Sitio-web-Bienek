---
name: instanciando-agentes
description: Crea y configura nuevos agentes o roles especializados con contexto perfecto del proyecto. Analiza la estructura, documentación y estado actual para generar instrucciones de sistema precisas. Úsalo cuando el usuario quiera "nuevos agentes", "agentes expertos", "roles específicos" o "instanciar agentes".
---

# Instanciador de Agentes con Contexto Perfecto

## Cuándo usar este skill
- Cuando el usuario solicite "crear un nuevo agente" o "instanciar un agente".
- Cuando se necesite un rol especializado (ej: "Agente de QA", "Experto en Backend") con conocimiento profundo del proyecto.
- Cuando se quiera generar un prompt de sistema (System Prompt) que contenga todo el contexto del proyecto.

## Flujo de Trabajo

### 1. Análisis de Contexto
El agente debe ejecutar primero el script de análisis para entender el terreno:
- [ ] Identificar tecnologías (package.json, requirements.txt, etc.).
- [ ] Leer documentación clave (README.md, docs/, .agent/rules).
- [ ] Mapear estructura de carpetas.

### 2. Definición del Rol
Preguntar o deducir el rol necesario:
- **Arquitecto**: Visión global, patrones de diseño.
- **Desarrollador**: Implementación, código específico.
- **QA/Tester**: Pruebas, validación.
- **Documentador**: Mantenimiento de conocimientos.

### 3. Generación del Agente
- [ ] Crear archivo de definición del agente (simulado o configuración real).
- [ ] Inyectar el "Contexto Perfecto" en las instrucciones del agente.

## Instrucciones

### 1. Generar Contexto del Proyecto
Ejecuta el script para compilar la información vital del proyecto en un solo archivo de contexto.

```bash
# Analiza el proyecto y genera .agent/temp/CONTEXTO_PROYECTO.md
./scripts/analizar-contexto.sh
```

### 2. Crear Definición de Agente
Usa la plantilla para crear el prompt del nuevo agente. Reemplaza `[ROL]` por el rol deseado (ej: "Experto en React").

```bash
# Crea un archivo de definición para el nuevo agente
./scripts/crear-agente.sh --rol "Experto en React" --nombre "FrontEnd-Bot"
```

### 3. Salida Esperada
El skill generará un archivo en `.agent/instances/[nombre-agente].md` que contiene:
1.  **Identidad**: Quién es el agente.
2.  **Contexto**: Resumen técnico generado del proyecto.
3.  **Reglas**: Reglas específicas del proyecto (leídas de `.agent/rules` si existen).
4.  **Misión**: El objetivo específico de este agente.

## Recursos
- [Script de Análisis](scripts/analizar-contexto.sh)
- [Script de Creación](scripts/crear-agente.sh)
- [Plantilla de Agente](templates/agente-base.md)
