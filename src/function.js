const fs = require('fs').promises;
const path = require('path');

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

        fs.access(absolutePath, fs.constants.F_OK)
            .then(() => {
                resolve(absolutePath);
            })
            .catch((error) => {
                reject(new Error(`The path '${absolutePath}' does not exist.`));
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
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(new Error(`Error reading the file '${filePath}'.`));
            });
    });
}

module.exports = { checkPath, checkExtension, readFile };