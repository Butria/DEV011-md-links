#!/usr/bin/env node

const mdLinks = require('./index');

const args = process.argv.slice(2); // Elimina los primeros dos elementos de argv (node y el nombre del script)

// Procesa las opciones de línea de comandos
const options = {
    validate: args.includes('--validate'),
    stats: args.includes('--stats'),
};

// Obtiene la ruta del archivo del primer argumento
const filePath = args[0];

mdLinks(filePath, options)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });