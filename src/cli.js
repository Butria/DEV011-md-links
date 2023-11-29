const mdLinks = require('.');

mdLinks('./README.md')
  .then((links) => {
    console.log('Links encontrados:', links);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

 

 