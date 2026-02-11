# 📑 Índice de Instanciando Agentes

## Estructura

- **`SKILL.md`**: Instrucciones principales y flujo de trabajo. ⭐
- **`README.md`**: Documentación y cómo usar.
- **`scripts/`**:
    - `analizar-contexto.sh`: Genera el contexto del proyecto.
    - `crear-agente.sh`: Instancia un nuevo agente.
    - `validar-agente.sh`: Prueba interna.
- **`templates/`**:
    - `agente-base.md`: Plantilla para System Prompt de nuevos agentes.

## Cómo Instanciar Agentes

1.  **Analizar**: Ejecuta `./scripts/analizar-contexto.sh`.
2.  **Definir**: Ejecuta `./scripts/crear-agente.sh --rol "Experto" --nombre "DevBot"`.
3.  **Usar**: Copia el System Prompt generado en `.agent/instances/`.

---
**Generado con:** Antigravity Skill Creator
