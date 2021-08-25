module.exports = eleventyConfig => {
    Array.prototype.flat = function () {
        return this.reduce((acc, cur) => acc.concat(cur), [])
    }
    eleventyConfig.addPlugin(require('eleventy-plugin-local-respimg'), {
        folders: { source: '.', output: '_site' },
        images: {
            resize: {
                min: 70,
            },
            sizes: '(max-width: 848px) calc(100vw - 64px), 784px',
            watch: { src: 'assets/**/*' },
            lazy: true,
        },
    })
}