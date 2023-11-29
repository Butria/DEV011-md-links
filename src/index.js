const { checkPath, checkExtension, readFile } = require('./function');

function extractLinksFromMarkdown(content, file) {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        matches.push({
            text: match[1],
            href: match[2],
            file,
        });
    }

    return matches;
}

function mdLinks(filePath) {
    let absolutePath;

    return checkPath(filePath)
        .then((resolvedPath) => {
            absolutePath = resolvedPath;
            checkExtension(absolutePath);
            return readFile(absolutePath);
        })
        .then((content) => extractLinksFromMarkdown(content, absolutePath))
        .catch((error) => {
            throw new Error(`Error: ${error.message}`);
        });
}

module.exports = mdLinks;