# Guía de Referencia Rápida: Creación de Skills

## Estructura Básica

```
nombre-del-skill/
├── SKILL.md          ← Obligatorio
├── scripts/          ← Opcional
├── examples/         ← Opcional
└── resources/        ← Opcional
```

## Frontmatter YAML

```yaml
---
name: nombre-en-gerundio
description: Descripción en tercera persona. Úsalo cuando [disparadores].
---
```

### Reglas del Nombre
- ✅ Gerundio: `creando-`, `gestionando-`, `validando-`
- ✅ Solo: `a-z`, `0-9`, `-`
- ✅ Max 64 caracteres
- ❌ No: `claude`, `anthropic`, `gemini`

### Reglas de la Descripción
- ✅ Tercera persona
- ✅ Incluir disparadores
- ✅ Max 1024 caracteres
- ✅ Ejemplo: "Úsalo cuando el usuario mencione X, Y o Z"

## Secciones Requeridas

```markdown
## Cuándo usar este skill
- [Disparador 1]
- [Disparador 2]

## Flujo de Trabajo
[Checklist o pasos]

## Instrucciones
[Lógica específica]
```

## Grados de Libertad

| Libertad | Formato | Uso |
|----------|---------|-----|
| Alta | Viñetas | Heurísticas, análisis |
| Media | Bloques de código | Plantillas, estructuras |
| Baja | Comandos bash | Operaciones frágiles |

## Ejemplo Mínimo

```markdown
---
name: validando-json
description: Valida archivos JSON. Úsalo cuando el usuario mencione validación JSON o archivos .json.
---

# Validador de JSON

## Cuándo usar este skill
- Cuando se mencione "JSON"
- Cuando se necesite validar archivos .json

## Instrucciones

### Validar archivo
```bash
cat archivo.json | jq empty
```

Si el comando no retorna error, el JSON es válido.
```

## Checklist de Calidad

- [ ] Frontmatter YAML válido
- [ ] Nombre en gerundio
- [ ] Descripción con disparadores
- [ ] Todo en español
- [ ] Rutas con `/`
- [ ] < 500 líneas
- [ ] Ejemplos claros

## Comandos Útiles

```bash
# Validar skill
./scripts/validar-skill.sh .agent/skills/mi-skill

# Contar líneas
wc -l SKILL.md

# Buscar backslashes
grep '\\' SKILL.md
```

## Errores Comunes

❌ **Nombre incorrecto**
```yaml
name: ValidateCode  # Debe ser: validando-codigo
```

❌ **Descripción sin disparadores**
```yaml
description: Valida código.  # Falta: "Úsalo cuando..."
```

❌ **Rutas con backslash**
```markdown
C:\Users\...  # Debe ser: C:/Users/...
```

❌ **Demasiado largo**
```markdown
# SKILL.md con 800 líneas
# Debe ser < 500, dividir en archivos secundarios
```

## Plantilla Rápida

```markdown
---
name: [gerundio-descriptivo]
description: [Qué hace]. Úsalo cuando el usuario mencione [disparadores].
---

# [Título del Skill]

## Cuándo usar este skill
- [Disparador 1]
- [Disparador 2]

## Flujo de Trabajo
- [ ] Paso 1
- [ ] Paso 2
- [ ] Paso 3

## Instrucciones

### [Sección 1]
[Contenido]

### [Sección 2]
[Contenido]

## Recursos
- [Enlace a scripts o resources]
```

---

**Recuerda**: Este skill es la fuente de verdad para crear skills. Consúltalo siempre antes de generar uno nuevo.
