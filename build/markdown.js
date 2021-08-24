

const markdownLibrary = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    anchorPrefix: 'h-',
})

markdownLibrary.use(require("markdown-it-attrs"))
markdownLibrary.use(require('markdown-it-footnote'))

module.exports = eleventyConfig => {
    eleventyConfig.setLibrary("md", markdownLibrary)
}

module.exports.markdownLibrary = markdownLibrary;