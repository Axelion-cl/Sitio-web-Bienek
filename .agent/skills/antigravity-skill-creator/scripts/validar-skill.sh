#!/bin/bash
# Script de Validación de Skills
# Descripción: Valida que un skill cumpla con los estándares de Antigravity
# Uso: ./validar-skill.sh <ruta-al-skill>

SKILL_PATH=$1

if [ -z "$SKILL_PATH" ]; then
    echo "❌ Error: Debes proporcionar la ruta al skill"
    echo "Uso: ./validar-skill.sh <ruta-al-skill>"
    exit 1
fi

if [ ! -f "$SKILL_PATH/SKILL.md" ]; then
    echo "❌ Error: No se encontró SKILL.md en $SKILL_PATH"
    exit 1
fi

echo "🔍 Validando skill en: $SKILL_PATH"
echo ""

# Validar frontmatter YAML
echo "📋 Verificando frontmatter YAML..."
if ! grep -q "^---$" "$SKILL_PATH/SKILL.md"; then
    echo "❌ Falta el frontmatter YAML"
    exit 1
fi

if ! grep -q "^name:" "$SKILL_PATH/SKILL.md"; then
    echo "❌ Falta el campo 'name' en el frontmatter"
    exit 1
fi

if ! grep -q "^description:" "$SKILL_PATH/SKILL.md"; then
    echo "❌ Falta el campo 'description' en el frontmatter"
    exit 1
fi

echo "✅ Frontmatter YAML válido"

# Validar nombre
NAME=$(grep "^name:" "$SKILL_PATH/SKILL.md" | cut -d':' -f2- | xargs)
if [[ ! $NAME =~ ^[a-z0-9-]+$ ]]; then
    echo "❌ El nombre '$NAME' contiene caracteres inválidos (solo minúsculas, números y guiones)"
    exit 1
fi

if [ ${#NAME} -gt 64 ]; then
    echo "❌ El nombre '$NAME' excede 64 caracteres"
    exit 1
fi

if [[ $NAME =~ (claude|anthropic|gemini) ]]; then
    echo "❌ El nombre no debe contener 'claude', 'anthropic' o 'gemini'"
    exit 1
fi

echo "✅ Nombre válido: $NAME"

# Validar descripción
DESC=$(grep "^description:" "$SKILL_PATH/SKILL.md" | cut -d':' -f2- | xargs)
if [ ${#DESC} -gt 1024 ]; then
    echo "❌ La descripción excede 1024 caracteres"
    exit 1
fi

echo "✅ Descripción válida"

# Validar tamaño del archivo
LINES=$(wc -l < "$SKILL_PATH/SKILL.md")
if [ $LINES -gt 500 ]; then
    echo "⚠️  Advertencia: SKILL.md tiene $LINES líneas (recomendado: < 500)"
fi

# Validar rutas con backslash
if grep -q '\\' "$SKILL_PATH/SKILL.md"; then
    echo "⚠️  Advertencia: Se encontraron backslashes (\\) en el archivo. Usa forward slashes (/)"
fi

# Validar secciones requeridas
echo ""
echo "📝 Verificando secciones requeridas..."

if ! grep -q "## Cuándo usar este skill" "$SKILL_PATH/SKILL.md"; then
    echo "⚠️  Advertencia: Falta la sección 'Cuándo usar este skill'"
fi

if ! grep -q "## Instrucciones" "$SKILL_PATH/SKILL.md"; then
    echo "⚠️  Advertencia: Falta la sección 'Instrucciones'"
fi

echo ""
echo "✅ Validación completada exitosamente"
echo "📊 Estadísticas:"
echo "   - Nombre: $NAME"
echo "   - Líneas: $LINES"
echo "   - Descripción: ${#DESC} caracteres"
