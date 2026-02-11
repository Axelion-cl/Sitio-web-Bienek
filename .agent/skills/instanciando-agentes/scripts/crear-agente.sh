#!/bin/bash
# Script de Creación de Agente
# Descripción: Instancia un nuevo agente con el contexto y rol especificados.

ROL="Agente Genérico"
NOMBRE="NuevoAgente"
CONTEXTO_FILE=".agent/temp/CONTEXTO_PROYECTO.md"
PLANTILLA=".agent/skills/instanciando-agentes/templates/agente-base.md"
INSTANCES_DIR=".agent/instances"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --rol) ROL="$2"; shift ;;
        --nombre) NOMBRE="$2"; shift ;;
        *) echo "Uso: ./crear-agente.sh --rol <rol> --nombre <nombre>"; exit 1 ;;
    esac
    shift
done

echo "🚀 Iniciando creación de agente: $NOMBRE ($ROL)"

# 1. Generar contexto si no existe o es antiguo
if [ ! -f "$CONTEXTO_FILE" ]; then
    echo "⚠️ Contexto no encontrado. Generando..."
    ./.agent/skills/instanciando-agentes/scripts/analizar-contexto.sh
fi

# 2. Leer contexto
CONTEXTO_CONTENT=$(cat "$CONTEXTO_FILE")

# 3. Leer plantilla
if [ ! -f "$PLANTILLA" ]; then
    echo "❌ Error: Plantilla no encontrada en $PLANTILLA"
    exit 1
fi
TEMPLATE_CONTENT=$(cat "$PLANTILLA")

# 4. Crear archivo de instancia
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
INSTANCE_FILE="${INSTANCES_DIR}/${TIMESTAMP}_${NOMBRE}.md"

if [ ! -d "$INSTANCES_DIR" ]; then
    mkdir -p "$INSTANCES_DIR"
fi

# 5. Reemplazar placeholders e inyectar contexto
echo "$TEMPLATE_CONTENT" | \
    sed "s/\[ROL_AGENTE\]/$ROL/g" | \
    sed "s/\[NOMBRE_AGENTE\]/$NOMBRE/g" | \
    sed "s/\[CONTEXTO_PROYECTO\]/${TIMESTAMP}/g" > "$INSTANCE_FILE"

# Inyectar el contexto real al final (versión simple)
echo "" >> "$INSTANCE_FILE"
echo "---" >> "$INSTANCE_FILE"
echo "## CONTEXTO INYECTADO AUTOMÁTICAMENTE" >> "$INSTANCE_FILE"
cat "$CONTEXTO_FILE" >> "$INSTANCE_FILE"

echo "✅ Agente creado exitosamente en: $INSTANCE_FILE"
echo "📝 Instrucciones para usar este agente:"
echo "   Copia el contenido de $INSTANCE_FILE y úsalo como System Prompt para tu nueva instancia."
