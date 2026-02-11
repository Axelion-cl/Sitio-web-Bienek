# Ejemplo: Skill para Gestión de Base de Datos

Este ejemplo muestra cómo crear un skill completo para gestionar operaciones de base de datos.

## Estructura del Skill

```
gestionando-base-de-datos/
├── SKILL.md
├── scripts/
│   ├── migrar.sh
│   └── backup.sh
├── examples/
│   └── migracion-ejemplo.md
└── resources/
    └── plantilla-migracion.sql
```

## SKILL.md

```markdown
---
name: gestionando-base-de-datos
description: Gestiona operaciones de base de datos incluyendo migraciones, backups y consultas. Úsalo cuando el usuario mencione base de datos, SQL, migraciones, backups o esquemas de datos.
---

# Gestor de Base de Datos

## Cuándo usar este skill
- Cuando se mencione "base de datos", "database" o "DB"
- Cuando se hable de migraciones o cambios de esquema
- Cuando se necesite crear backups
- Cuando se soliciten consultas SQL complejas

## Flujo de Trabajo

### Checklist de Migración
- [ ] Crear archivo de migración
- [ ] Revisar cambios de esquema
- [ ] Ejecutar en entorno de desarrollo
- [ ] Validar resultados
- [ ] Aplicar en producción

## Instrucciones

### 1. Crear Nueva Migración

```bash
# Generar archivo de migración con timestamp
./scripts/migrar.sh create "nombre_descriptivo"
```

### 2. Ejecutar Migración

```bash
# Desarrollo
./scripts/migrar.sh up --env dev

# Producción (requiere confirmación)
./scripts/migrar.sh up --env prod
```

### 3. Crear Backup

```bash
# Backup automático con timestamp
./scripts/backup.sh create

# Backup con nombre específico
./scripts/backup.sh create --name "pre-migracion-importante"
```

## Recursos
- [Script de migración](scripts/migrar.sh)
- [Script de backup](scripts/backup.sh)
- [Ejemplo de migración](examples/migracion-ejemplo.md)
- [Plantilla SQL](resources/plantilla-migracion.sql)
```

## scripts/migrar.sh

```bash
#!/bin/bash
# Script de Migración de Base de Datos
# Uso: ./migrar.sh [create|up|down] [opciones]

COMMAND=$1
shift

case $COMMAND in
    create)
        TIMESTAMP=$(date +%Y%m%d%H%M%S)
        NAME=$1
        FILENAME="migrations/${TIMESTAMP}_${NAME}.sql"
        cp resources/plantilla-migracion.sql "$FILENAME"
        echo "✅ Migración creada: $FILENAME"
        ;;
    up)
        echo "🚀 Ejecutando migraciones..."
        # Lógica de migración
        ;;
    down)
        echo "⏪ Revirtiendo última migración..."
        # Lógica de rollback
        ;;
    *)
        echo "Uso: ./migrar.sh [create|up|down] [opciones]"
        exit 1
        ;;
esac
```

## examples/migracion-ejemplo.md

```markdown
# Ejemplo: Agregar Tabla de Usuarios

## Escenario
Necesitamos agregar una tabla de usuarios con autenticación.

## Migración

```sql
-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por email
CREATE INDEX idx_usuarios_email ON usuarios(email);
```

## Rollback

```sql
DROP TABLE IF EXISTS usuarios;
```
```

## resources/plantilla-migracion.sql

```sql
-- Migración: [DESCRIPCIÓN]
-- Fecha: [FECHA]
-- Autor: [AUTOR]

-- ============================================
-- MIGRACIÓN (UP)
-- ============================================

-- Escribe aquí los cambios de esquema


-- ============================================
-- ROLLBACK (DOWN)
-- ============================================

-- Escribe aquí cómo revertir los cambios
```

## Notas de Implementación

1. **Validación**: El script de migración valida la conexión antes de ejecutar
2. **Backups**: Siempre crea un backup automático antes de migrar
3. **Logs**: Todas las operaciones se registran en `logs/migraciones.log`
4. **Seguridad**: Las credenciales se leen de variables de entorno

## Uso del Ejemplo

Para usar este ejemplo como base:

1. Copia la estructura de carpetas
2. Adapta los scripts a tu sistema de base de datos específico
3. Modifica las plantillas según tus necesidades
4. Agrega validaciones específicas de tu proyecto
