#!/bin/bash
# Script de Validación Interna
# Descripción: Crea un agente de prueba para verificar que el skill funciona.

echo "🧪 Iniciando prueba de instanciación..."

# 1. Crear directorio temporal si no existe
mkdir -p .agent/temp .agent/instances

# 2. Ejecutar análisis
./scripts/analizar-contexto.sh
if [ $? -ne 0 ]; then
    echo "❌ Falló el análisis de contexto."
    exit 1
fi

# 3. Crear agente de prueba
./scripts/crear-agente.sh --rol "Tester" --nombre "TestBot"
if [ $? -ne 0 ]; then
    echo "❌ Falló la creación del agente."
    exit 1
fi

echo "✅ Prueba completada exitosamente."
echo "   Verifica .agent/instances/TestBot_*.md"
