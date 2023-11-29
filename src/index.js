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

async function mdLinks(filePath) {
    try {
        const absolutePath = await checkPath(filePath);
        checkExtension(absolutePath);

        const content = await readFile(absolutePath);
        const links = extractLinksFromMarkdown(content, absolutePath);

        return links;
    } catch (error) {
        throw error; // Rechazar la promesa con el error
    }
}

module.exports = mdLinks;