const mdLinks = require('../src/index');
const axios = require('axios');

jest.mock('axios');

describe('mdLinks', () => {
  
  it('debería rechazar cuando el path no existe', () => { 
    return mdLinks('larutanoexiste/brigi.md').catch((error) => {
      const expectedErrorMessage = `Error: The path 'C:\\Users\\brigi\\DEV011-md-links\\larutanoexiste\\brigi.md' no existe.`;
      expect(error.message).toBe(expectedErrorMessage);
    });
  });

  describe ('mdLinks function', () => {
    it('mdLinks es una función', () => {
      expect(typeof mdLinks).toEqual('function');
    });

    it('debería retornar un array de objetos con href, text y file', () => {
      
      axios.get.mockResolvedValue({ status: 200, statusText: 'OK' });

      const markdownContent = '[Link 1](https://example.com) [Link 2](https://example2.com)';
      
     
      const expectedLinks = [
        { href: '../README.md#hito-5', text: 'recursos', file: 'C:\\Users\\brigi\\DEV011-md-links\\docs\\test_file.md' },
        { href: '../README.md#6-hitos', text: 'Todos los hitos', file: 'C:\\Users\\brigi\\DEV011-md-links\\docs\\test_file.md' },
      ];

      return mdLinks('docs//test_file.md').then((result) => {
        
        const resultWithoutExtraProps = result.map(({ ok, status, ...rest }) => rest);
        expect(resultWithoutExtraProps).toEqual(expectedLinks);
      });
    });
  });
});

