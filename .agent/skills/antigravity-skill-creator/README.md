# 🎯 Antigravity Skill Creator

**Versión**: 1.0  
**Idioma**: Español (ES)  
**Última actualización**: 2026-02-11

## 📋 Descripción

Este es el **skill maestro** para la creación de todos los demás skills en el entorno Antigravity. Proporciona estándares, plantillas, ejemplos y herramientas de validación para garantizar que todos los skills generados sean de alta calidad, predecibles y eficientes.

## 🎯 Propósito

- **Estandarización**: Define reglas claras para la estructura y formato de skills
- **Calidad**: Asegura que todos los skills cumplan con las mejores prácticas
- **Consistencia**: Mantiene un formato uniforme en todos los skills
- **Eficiencia**: Proporciona plantillas y ejemplos para acelerar la creación
- **Idioma**: Garantiza que todo el contenido esté en español

## 📁 Estructura del Skill

```
antigravity-skill-creator/
├── SKILL.md                           # Instrucciones principales del skill
├── README.md                          # Este archivo
├── scripts/
│   └── validar-skill.sh              # Script de validación de skills
├── examples/
│   └── ejemplo-completo.md           # Ejemplo de skill completo
└── resources/
    ├── plantilla-skill.json          # Plantilla JSON de referencia
    └── referencia-rapida.md          # Guía de consulta rápida
```

## 🚀 Uso

### Para el Agente Antigravity

El agente debe referenciar este skill automáticamente cuando:
- El usuario mencione crear un "skill", "habilidad" o "capacidad"
- Se necesite estandarizar un skill existente
- Se requiera validar la estructura de un skill

### Para Desarrolladores

1. **Leer el SKILL.md**: Contiene todas las instrucciones detalladas
2. **Consultar la referencia rápida**: Para recordatorios rápidos de reglas
3. **Usar el ejemplo completo**: Como plantilla para skills complejos
4. **Validar con el script**: Ejecutar `validar-skill.sh` antes de finalizar

## 📚 Archivos Incluidos

### SKILL.md
El archivo principal con todas las instrucciones, incluyendo:
- Requisitos estructurales
- Estándares de frontmatter YAML
- Principios de redacción
- Flujos de trabajo
- Plantillas de salida
- Checklist de calidad

### scripts/validar-skill.sh
Script bash que valida:
- ✅ Frontmatter YAML correcto
- ✅ Nombre válido (gerundio, caracteres permitidos)
- ✅ Descripción dentro del límite
- ✅ Tamaño del archivo (< 500 líneas recomendado)
- ✅ Uso correcto de rutas (/)
- ✅ Presencia de secciones requeridas

**Uso**:
```bash
./scripts/validar-skill.sh .agent/skills/mi-nuevo-skill
```

### examples/ejemplo-completo.md
Ejemplo completo de un skill de gestión de base de datos que muestra:
- Estructura completa de carpetas
- SKILL.md bien formado
- Scripts auxiliares
- Ejemplos de uso
- Recursos y plantillas

### resources/plantilla-skill.json
Plantilla en formato JSON con:
- Estructura de datos del skill
- Reglas de frontmatter
- Mejores prácticas
- Checklist de calidad

### resources/referencia-rapida.md
Guía concisa para consulta rápida con:
- Estructura básica
- Reglas de frontmatter
- Secciones requeridas
- Grados de libertad
- Errores comunes
- Plantilla rápida

## ✨ Características Principales

### 1. Estándares Estrictos
- Nombres en gerundio (ej: `creando-`, `gestionando-`)
- Descripciones en tercera persona con disparadores
- Límites de caracteres definidos
- Validación de caracteres permitidos

### 2. Grados de Libertad
El skill enseña a usar el formato correcto según el nivel de libertad:
- **Alta**: Viñetas para heurísticas
- **Media**: Bloques de código para plantillas
- **Baja**: Comandos específicos para operaciones frágiles

### 3. Validación Automatizada
Script que verifica automáticamente:
- Formato YAML
- Reglas de nomenclatura
- Límites de tamaño
- Secciones requeridas

### 4. Ejemplos Prácticos
Incluye ejemplos completos y funcionales que sirven como referencia

## 🎓 Mejores Prácticas

1. **Concisión**: Asumir inteligencia del agente, no explicar conceptos básicos
2. **Divulgación Progresiva**: Mantener SKILL.md bajo 500 líneas
3. **Rutas Correctas**: Siempre usar `/` nunca `\`
4. **Idioma**: Todo en español, incluyendo comentarios y documentación
5. **Validación**: Usar el script de validación antes de finalizar

## 📋 Checklist de Calidad

Antes de considerar un skill completo, verificar:

- [ ] Frontmatter YAML válido y completo
- [ ] Nombre en gerundio y descriptivo
- [ ] Descripción incluye disparadores claros
- [ ] Todo el contenido está en español
- [ ] Rutas usan `/` en lugar de `\`
- [ ] SKILL.md tiene menos de 500 líneas
- [ ] Grados de libertad correctamente aplicados
- [ ] Ejemplos claros de cuándo usar el skill
- [ ] Scripts tienen instrucciones de uso
- [ ] Sin referencias a "Claude", "Anthropic" o "Gemini"

## 🔄 Flujo de Trabajo Recomendado

1. **Entender Requisitos**: Clarificar qué debe hacer el skill
2. **Consultar Referencia**: Revisar `referencia-rapida.md`
3. **Crear Estructura**: Generar carpetas y SKILL.md
4. **Escribir Contenido**: Seguir los estándares del SKILL.md principal
5. **Agregar Recursos**: Crear scripts, ejemplos o recursos si es necesario
6. **Validar**: Ejecutar `validar-skill.sh`
7. **Revisar Checklist**: Verificar todos los puntos de calidad
8. **Finalizar**: Documentar y entregar

## 🌍 Disponibilidad Global

Este skill está diseñado para ser **global** y estar disponible en todos los proyectos. Para lograrlo:

1. El skill se encuentra en `.agent/skills/antigravity-skill-creator/`
2. El agente debe poder acceder a él desde cualquier proyecto
3. Debe ser referenciado automáticamente al crear nuevos skills

## 📝 Notas Importantes

- Este skill es la **fuente de verdad** para la creación de skills
- Todos los skills deben seguir estos estándares sin excepción
- La **consistencia** es clave para que el agente los use correctamente
- Actualizar este skill si se descubren mejores prácticas

## 🔗 Referencias

- **SKILL.md**: Instrucciones completas y detalladas
- **referencia-rapida.md**: Guía de consulta rápida
- **ejemplo-completo.md**: Ejemplo práctico de skill complejo
- **plantilla-skill.json**: Estructura de datos de referencia

## 📞 Soporte

Para preguntas o mejoras:
1. Consultar primero el SKILL.md y la referencia rápida
2. Revisar el ejemplo completo para casos de uso similares
3. Validar con el script antes de reportar problemas

---

**Creado por**: Sistema Antigravity  
**Mantenido por**: Equipo de Desarrollo  
**Licencia**: Uso interno
