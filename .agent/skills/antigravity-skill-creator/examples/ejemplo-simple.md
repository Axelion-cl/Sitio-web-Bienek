# Ejemplo: Skill Simple para Formateo de Código

Este ejemplo muestra cómo crear un skill simple y directo sin necesidad de scripts o recursos adicionales.

## Estructura del Skill

```
formateando-codigo/
└── SKILL.md
```

## SKILL.md Completo

```markdown
---
name: formateando-codigo
description: Formatea código usando Prettier. Úsalo cuando el usuario mencione formateo, prettier, estilo de código o indentación.
---

# Formateador de Código

## Cuándo usar este skill
- Cuando se mencione "formatear código"
- Cuando se hable de Prettier
- Cuando se necesite estandarizar estilo de código
- Cuando se mencione indentación o espaciado

## Flujo de Trabajo

### Checklist Rápida
- [ ] Verificar que existe package.json
- [ ] Instalar Prettier si es necesario
- [ ] Ejecutar formateo
- [ ] Verificar resultados

## Instrucciones

### 1. Instalación (si es necesario)

```bash
npm install --save-dev prettier
```

### 2. Formatear Archivo Específico

```bash
npx prettier --write ruta/al/archivo.js
```

### 3. Formatear Todo el Proyecto

```bash
npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"
```

### 4. Solo Verificar (sin modificar)

```bash
npx prettier --check "**/*.{js,jsx,ts,tsx,json,css,md}"
```

## Configuración Recomendada

Si no existe `.prettierrc`, sugerir crear uno:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Archivos a Ignorar

Crear `.prettierignore` si no existe:

```
node_modules
dist
build
.next
coverage
```

## Notas

- Prettier es opinionado y no requiere mucha configuración
- Funciona con múltiples lenguajes automáticamente
- Se integra bien con ESLint usando `eslint-config-prettier`
```

## Características de Este Ejemplo

### ✅ Ventajas de un Skill Simple

1. **Directo al Punto**: No necesita scripts adicionales
2. **Fácil de Mantener**: Todo en un solo archivo
3. **Rápido de Crear**: Menos de 100 líneas
4. **Claro**: Instrucciones específicas y comandos exactos

### 📊 Comparación: Simple vs Complejo

| Aspecto | Skill Simple | Skill Complejo |
|---------|--------------|----------------|
| Archivos | Solo SKILL.md | SKILL.md + scripts + examples + resources |
| Líneas | < 100 | 200-500 |
| Casos de Uso | Tarea específica | Múltiples operaciones |
| Mantenimiento | Fácil | Requiere más atención |
| Ejemplos | En el mismo archivo | Archivos separados |

### 🎯 Cuándo Usar Cada Tipo

**Skill Simple** (como este ejemplo):
- Tarea única y directa
- Pocos comandos
- Sin lógica compleja
- No requiere validación elaborada

**Skill Complejo** (como el ejemplo de base de datos):
- Múltiples operaciones relacionadas
- Requiere scripts auxiliares
- Necesita validación y rollback
- Múltiples casos de uso

## Otro Ejemplo Simple: Validador de JSON

```markdown
---
name: validando-json
description: Valida sintaxis de archivos JSON usando jq. Úsalo cuando el usuario mencione JSON, validación de JSON o archivos .json.
---

# Validador de JSON

## Cuándo usar este skill
- Cuando se mencione "JSON"
- Cuando se necesite validar archivos .json
- Cuando se hable de sintaxis JSON

## Instrucciones

### Validar un Archivo

```bash
cat archivo.json | jq empty
```

Si no hay salida, el JSON es válido.

### Validar y Formatear

```bash
cat archivo.json | jq .
```

Muestra el JSON formateado si es válido.

### Validar Múltiples Archivos

```bash
find . -name "*.json" -exec sh -c 'echo "Validando: $1" && cat "$1" | jq empty' _ {} \;
```

## Notas

- Requiere `jq` instalado
- Para instalar jq: `npm install -g jq` o usar gestor de paquetes del sistema
```

## Plantilla para Skills Simples

```markdown
---
name: [gerundio-accion]
description: [Qué hace]. Úsalo cuando el usuario mencione [disparadores].
---

# [Título del Skill]

## Cuándo usar este skill
- [Disparador 1]
- [Disparador 2]

## Instrucciones

### [Operación Principal]

```bash
[comando específico]
```

[Explicación breve del resultado]

### [Operación Secundaria]

```bash
[comando específico]
```

[Explicación breve del resultado]

## Notas

- [Nota importante 1]
- [Nota importante 2]
```

## Consejos para Skills Simples

1. **Mantén el Foco**: Una tarea, bien hecha
2. **Comandos Exactos**: No dejes espacio para interpretación
3. **Explicaciones Breves**: Solo lo necesario
4. **Sin Archivos Extra**: Si no los necesitas, no los crees
5. **Validación Mínima**: Solo lo esencial

## Cuándo NO Crear un Skill Simple

❌ Si la tarea requiere:
- Múltiples pasos con validación entre ellos
- Scripts con lógica condicional
- Manejo de errores complejo
- Rollback o recuperación
- Múltiples configuraciones

En esos casos, usa la estructura completa con scripts y recursos.

---

**Recuerda**: La simplicidad es una virtud. No compliques un skill si no es necesario.
