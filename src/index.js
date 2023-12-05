const axios = require('axios');
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

function validateLinks(links) {
    const requests = links.map((link) =>
        axios.head(link.href)
            .then((response) => ({
                ...link,
                status: response.status,
                ok: response.status >= 200 && response.status < 400,
            }))
            .catch((error) => ({
                ...link,
                status: error.response ? error.response.status : 'N/A',
                ok: false,
            }))
    );

    return Promise.all(requests);
}

function mdLinks(filePath, validate = false) {
    let absolutePath;

    return checkPath(filePath)
        .then((resolvedPath) => {
            absolutePath = resolvedPath;
            checkExtension(absolutePath);
            return readFile(absolutePath);
        })
        .then((content) => {
            const links = extractLinksFromMarkdown(content, absolutePath);

            if (validate) {
                return validateLinks(links);
            }

            return links;
        })
        .catch((error) => {
            throw new Error(`Error: ${error.message}`);
        });
}

module.exports = mdLinks;