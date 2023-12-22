const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { checkPath, checkExtension, readFile, convertToAbsolute } = require('./function');

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

function calculateStats(links) {
    const totalLinks = links.length;
    const uniqueLinks = [...new Set(links.map(link => link.href))].length;

    return {
        total: totalLinks,
        unique: uniqueLinks,
    };
}

function mdLinks(filePath, { validate, stats } = {}) {
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
        .then((result) => {
            if (stats) {
                if (validate) {
                    const statistics = calculateStats(result);
                    const brokenLinks = result.filter(link => link.ok === false).length;
                    statistics.broken = brokenLinks;
                    return statistics;
                } else {
                    const statistics = calculateStats(result);
                    return statistics;
                }
            }

            return result;
        })
        .catch((error) => {
            throw new Error(`Error: ${error.message}`);
        });
}

module.exports = mdLinks;