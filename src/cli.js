const mdLinks = require('./index');

const filePath = './README.md';
const validateOption = process.argv.includes('--validate');

mdLinks(filePath, validateOption)
  .then((links) => {
    console.log('Links encontrados:', links);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
 

 