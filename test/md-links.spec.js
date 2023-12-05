const mdLinks = require('../src/index');
const axios = require('axios');

jest.mock('axios');



describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  
  it('deberia rechazar cuando el path no existe', () => {
    return mdLinks('larutanoexiste/brigi.md').catch((error) => {
      const expectedErrorMessage = `Error: The path 'C:\\Users\\brigi\\DEV011-md-links\\larutanoexiste\\brigi.md' does not exist.`;
      expect(error.message).toBe(expectedErrorMessage);
    });
  }); 

});

// jest.mock('fs').mock('fs/promises');

describe('mdLinks function', () => {
  it(' mdLinks is a function', ()=>{
      expect(typeof mdLinks).toEqual('function')
  })
it('should return an array of objects with href, text, and file properties', () => {
  // const markdownContent = '[Link 1](https://example.com) [Link 2](https://example2.com)';
  const expectedLinks = [
    { href: '../README.md#hito-5', text: 'recursos', file: 'C:\\Users\\brigi\\DEV011-md-links\\docs\\test_file.md' },
    { href: '../README.md#6-hitos', text: 'Todos los hitos', file: 'C:\\Users\\brigi\\DEV011-md-links\\docs\\test_file.md' },
  ];

  return mdLinks('docs//test_file.md').then((result) => {
      console.log('Result', result)
    expect(result).toEqual(expectedLinks);
  });
});




});
