---
name: creando-skills-antigravity
description: Especializado en crear "Skills" de alta calidad para el entorno Antigravity. Úsalo cuando el usuario mencione crear, generar o diseñar un nuevo skill, capacidad, habilidad o extensión para el agente. Todos los skills generados deben estar completamente en español.
---

# Sistema de Creación de Skills para Antigravity

## Cuándo usar este skill
- Cuando el usuario solicite crear un nuevo skill
- Cuando se mencionen términos como "habilidad", "capacidad", "extensión" o "skill"
- Antes de generar cualquier archivo en `.agent/skills/`
- Cuando se necesite estandarizar la estructura de un skill existente

## 1. Requisitos Estructurales Fundamentales

Cada skill que generes DEBE seguir esta jerarquía de carpetas:

```
<nombre-del-skill>/
├── SKILL.md          (Obligatorio: Lógica e instrucciones principales)
├── scripts/          (Opcional: Scripts auxiliares)
├── examples/         (Opcional: Implementaciones de referencia)
└── resources/        (Opcional: Plantillas o recursos)
```

## 2. Estándares del Frontmatter YAML

El archivo `SKILL.md` DEBE comenzar con frontmatter YAML siguiendo estas reglas estrictas:

### name (nombre)
- **Formato**: Gerundio (ej: `probando-codigo`, `gestionando-bases-de-datos`)
- **Máximo**: 64 caracteres
- **Caracteres permitidos**: Minúsculas, números y guiones solamente
- **Prohibido**: No usar "claude", "anthropic" o "gemini" en el nombre

### description (descripción)
- **Perspectiva**: Tercera persona
- **Contenido**: DEBE incluir disparadores/palabras clave específicas
- **Máximo**: 1024 caracteres
- **Ejemplo**: "Extrae texto de archivos PDF. Úsalo cuando el usuario mencione procesamiento de documentos o archivos PDF."

## 3. Principios de Redacción (El "Método Antigravity")

Al escribir el cuerpo de `SKILL.md`, adhiérete a estas mejores prácticas:

### Concisión
- Asume que el agente es inteligente
- NO expliques conceptos básicos (qué es un PDF, Git, etc.)
- Enfócate SOLO en la lógica única del skill

### Divulgación Progresiva
- Mantén `SKILL.md` bajo 500 líneas
- Si necesitas más detalle, enlaza a archivos secundarios: `[Ver AVANZADO.md](AVANZADO.md)`
- Máximo un nivel de profundidad en enlaces

### Rutas de Archivos
- **SIEMPRE** usa `/` para rutas
- **NUNCA** uses `\`

### Grados de Libertad

Usa el formato apropiado según el nivel de libertad que el agente necesite:

1. **Viñetas (Bullets)**: Para tareas de alta libertad (heurísticas)
   ```markdown
   - Analiza el código
   - Identifica patrones comunes
   - Sugiere mejoras
   ```

2. **Bloques de Código**: Para libertad media (plantillas)
   ```markdown
   ```javascript
   function ejemplo() {
     // Plantilla base
     return resultado;
   }
   ```
   ```

3. **Comandos Bash Específicos**: Para baja libertad (operaciones frágiles)
   ```markdown
   ```bash
   git commit -m "mensaje específico"
   npm install --save-exact paquete@1.2.3
   ```
   ```

## 4. Flujos de Trabajo y Bucles de Retroalimentación

Para tareas complejas, incluye:

### 1. Listas de Verificación
Proporciona una checklist en markdown que el agente pueda copiar y actualizar:

```markdown
## Checklist de Progreso
- [ ] Paso 1: Analizar requisitos
- [ ] Paso 2: Diseñar estructura
- [ ] Paso 3: Implementar lógica
- [ ] Paso 4: Validar resultados
```

### 2. Bucles de Validación
Usa el patrón "Planificar-Validar-Ejecutar":

```markdown
## Flujo de Validación
1. **Planificar**: Define qué cambios hacer
2. **Validar**: Ejecuta `script-validacion.sh` para verificar
3. **Ejecutar**: Solo si la validación pasa, aplica cambios
```

### 3. Manejo de Errores
- Los scripts deben ser "cajas negras"
- Instruye al agente a ejecutar `--help` si no está seguro
- Proporciona mensajes de error claros y accionables

## 5. Plantilla de Salida

Cuando se te pida crear un skill, genera el resultado en este formato:

```markdown
### Nombre de la Carpeta
**Ruta:** `.agent/skills/[nombre-del-skill]/`

### SKILL.md
---
name: [nombre-en-gerundio]
description: [descripción en tercera persona con disparadores]
---

# [Título del Skill]

## Cuándo usar este skill
- [Disparador 1]
- [Disparador 2]
- [Disparador 3]

## Flujo de Trabajo
[Inserta checklist o guía paso a paso aquí]

## Instrucciones
[Lógica específica, fragmentos de código o reglas]

## Recursos
- [Enlace a scripts/ o resources/]
```

## 6. Archivos de Soporte

Si el skill requiere scripts o recursos adicionales, créalos en las carpetas apropiadas:

### scripts/
```bash
#!/bin/bash
# Script de ejemplo
# Descripción: [qué hace este script]
# Uso: ./script-ejemplo.sh [argumentos]
```

### examples/
```markdown
# Ejemplo de Uso

## Escenario
[Descripción del caso de uso]

## Implementación
[Código o pasos específicos]
```

### resources/
```
plantilla-config.json
template-archivo.md
recurso-referencia.pdf
```

## 7. Checklist de Calidad

Antes de entregar un skill, verifica:

- [ ] El frontmatter YAML es válido y cumple las reglas
- [ ] El nombre está en gerundio y es descriptivo
- [ ] La descripción incluye disparadores claros
- [ ] El contenido está completamente en español
- [ ] Las rutas usan `/` en lugar de `\`
- [ ] El archivo SKILL.md tiene menos de 500 líneas
- [ ] Los grados de libertad están correctamente aplicados
- [ ] Hay ejemplos claros de cuándo usar el skill
- [ ] Los scripts tienen instrucciones de uso
- [ ] No hay referencias a "Claude" o "Anthropic"

## 8. Ejemplo Completo

### Skill de Ejemplo: Validador de Código

```markdown
---
name: validando-codigo-javascript
description: Valida código JavaScript usando ESLint y Prettier. Úsalo cuando el usuario mencione linting, formateo, validación de código o estándares de JavaScript.
---

# Validador de Código JavaScript

## Cuándo usar este skill
- Cuando se mencione "lint", "linting" o "ESLint"
- Cuando se hable de formateo de código o Prettier
- Cuando se necesite validar estándares de código
- Cuando se solicite revisar la calidad del código JavaScript

## Flujo de Trabajo

### Checklist de Validación
- [ ] Verificar que exista package.json
- [ ] Instalar dependencias de linting
- [ ] Ejecutar ESLint
- [ ] Ejecutar Prettier
- [ ] Reportar resultados

## Instrucciones

### 1. Verificación Inicial
Antes de ejecutar cualquier validación:
- Confirma que el proyecto tiene `package.json`
- Verifica la presencia de archivos de configuración (`.eslintrc`, `.prettierrc`)

### 2. Instalación de Dependencias
```bash
npm install --save-dev eslint prettier eslint-config-prettier
```

### 3. Ejecución de Validación
```bash
# Ejecutar ESLint
npx eslint . --ext .js,.jsx

# Ejecutar Prettier
npx prettier --check "**/*.{js,jsx}"
```

### 4. Corrección Automática
Si el usuario lo solicita:
```bash
# Auto-fix con ESLint
npx eslint . --ext .js,.jsx --fix

# Auto-format con Prettier
npx prettier --write "**/*.{js,jsx}"
```

## Recursos
- [Script de validación](scripts/validar.sh)
- [Configuración de ejemplo](resources/eslintrc-ejemplo.json)
```

## Instrucciones de Uso del Skill Creator

1. **Referencia este skill** cada vez que necesites crear un nuevo skill
2. **Sigue estrictamente** la estructura y estándares definidos
3. **Escribe todo en español**, incluyendo comentarios y documentación
4. **Valida** que el skill generado cumpla con la checklist de calidad
5. **Pregunta al usuario** si necesitas aclaraciones sobre requisitos específicos

## Notas Importantes

- Este skill es la **fuente de verdad** para la creación de skills
- Todos los skills deben ser **predecibles y eficientes**
- La **consistencia** es clave para que el agente los use correctamente
- **Actualiza este skill** si descubres mejores prácticas

---

**Versión**: 1.0  
**Última actualización**: 2026-02-11  
**Idioma**: Español (ES)
