const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const isAbsolutePath = (route) => path.isAbsolute(route);

const convertToAbsolute = (route) => {
    if (!isAbsolutePath(route)) {
        return path.resolve(route);
    }
    return route;
};

function checkPath(route) {
    return new Promise((resolve, reject) => {
        const absolutePath = convertToAbsolute(route);

        fs.stat(absolutePath)
            .then((stats) => {
                if (stats.isFile()) {
                    resolve(absolutePath);
                } else {
                    reject(new Error(`'${absolutePath}' is not a file.`));
                }
            })
            .catch((error) => {
                reject(new Error(`The path '${absolutePath}' no existe.`));
            });
    });
}

function checkExtension(filePath) {
    const fileExt = path.extname(filePath);
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];

    if (!validExtensions.includes(fileExt)) {
        throw new Error(`The file '${filePath}' is not a valid Markdown file.`);
    }
}

function readFile(filePath) {
    return fs.readFile(filePath, 'utf8');
}

function validateLink(link) {
    return axios.head(link.href)
        .then((response) => ({
            ...link,
            status: response.status,
            ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
        }))
        .catch((error) => ({
            ...link,
            status: error.response ? error.response.status : 'N/A',
            ok: 'fail',
        }));
}

module.exports = { checkPath, checkExtension, readFile, validateLink };