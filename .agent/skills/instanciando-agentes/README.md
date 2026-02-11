# Instanciador de Agentes

## Descripción
Este skill permite **instanciar nuevos agentes** con un conocimiento inmediato y profundo del proyecto actual. Analiza automáticamente la estructura, configuraciones y documentación para proveer un contexto perfecto.

## Cómo Utilizar
1.  **Ejecuta el análisis**: Genera el "Contexto Maestro".
2.  **Define el Rol**: Especifica qué tipo de agente necesitas (Frontend, Backend, QA).
3.  **Obtén el Prompt**: Copia el System Prompt generado y úsalo para inicializar tu nuevo agente.

## Estructura
- `SKILL.md`: Instrucciones y flujos.
- `scripts/`: Herramientas de análisis e instanciación.
- `templates/`: Plantillas para prompts de sistema.

## Ejemplo
```bash
# Quiero un experto en React
./scripts/crear-agente.sh --rol "Experto React" --nombre "ReactBot"
```
Salida: `.agent/instances/ReactBot_CONTEXTO.md`
