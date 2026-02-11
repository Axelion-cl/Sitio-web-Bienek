#!/bin/bash
# Script de Análisis de Contexto
# Descripción: Genera un resumen del contexto del proyecto actual para alimentar nuevos agentes.
# Uso: ./analizar-contexto.sh [salida]

OUTPUT_DIR=".agent/temp"
OUTPUT_FILE="${OUTPUT_DIR}/CONTEXTO_PROYECTO.md"

if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
fi

echo "# Contexto del Proyecto" > "$OUTPUT_FILE"
echo "**Generado el:** $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 1. Estructura del Proyecto (limitada a nivel 2 para no saturar)
echo "## Estructura de Carpetas (Nivel 2)" >> "$OUTPUT_FILE"
echo '```' >> "$OUTPUT_FILE"
if command -v tree &> /dev/null; then
    tree -L 2 -I "node_modules|.git|.agent/temp" >> "$OUTPUT_FILE"
else
    # Fallback si 'tree' no está disponible
    find . -maxdepth 2 -not -path '*/.*' >> "$OUTPUT_FILE"
fi
echo '```' >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 2. Archivos Clave de Configuración
echo "## Archivos Clave Detectados" >> "$OUTPUT_FILE"
CONFIG_FILES=("package.json" "requirements.txt" "composer.json" "Gemfile" "Cargo.toml" "README.md" ".agent/rules")

for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "- **$file**: Detectadó" >> "$OUTPUT_FILE"
        echo "  - Contenido (primeras 50 líneas):" >> "$OUTPUT_FILE"
        echo '  ```' >> "$OUTPUT_FILE"
        head -n 50 "$file" >> "$OUTPUT_FILE"
        echo '  ```' >> "$OUTPUT_FILE"
    fi
done

echo "" >> "$OUTPUT_FILE"

# 3. Documentación en .agent/
echo "## Documentación del Agente (.agent/)" >> "$OUTPUT_FILE"
if [ -d ".agent" ]; then
    echo "Archivos encontrados en .agent/:" >> "$OUTPUT_FILE"
    find .agent -maxdepth 2 -type f >> "$OUTPUT_FILE"
fi

echo "✅ Contexto generado en: $OUTPUT_FILE"
