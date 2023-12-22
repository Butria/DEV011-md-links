# md-links

## Descripción
`md-links` es una librería que analiza archivos Markdown (.md) en busca de enlaces y proporciona información sobre ellos.

## Instalación
Para utilizar `md-links`, necesitas tener Node.js y npm instalados en tu sistema. Si aún no los tienes, puedes descargarlos e instalarlos desde [nodejs.org](https://nodejs.org/).

A continuación, puedes instalar `md-links` globalmente utilizando npm:

```bash
npm install -g butria/md-links

Uso
Desde la línea de comandos (CLI)

md-links <path-to-file> [options]

Opciones disponibles:
--validate: Realiza una validación de los enlaces, mostrando su estado (ok o fail).
--stats: Muestra estadísticas sobre los enlaces encontrados (total y únicos).
--validate --stats: Combina la validación y las estadísticas, incluyendo el número de enlaces rotos.


Ejemplos de uso:

# Analizar un archivo y mostrar enlaces
md-links archivo.md

# Analizar un archivo, validar enlaces y mostrar estadísticas
md-links archivo.md --validate --stats

Contribuciones

Si encuentras algún problema o tienes alguna mejora, no dudes en abrir un problema o enviar un pull request.