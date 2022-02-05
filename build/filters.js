
const markdownLibrary = require('./markdown').markdownLibrary;
const { DateTime } = require('luxon')
const path = require('path')
const fs = require('fs')

module.exports = eleventyConfig => {
    eleventyConfig.addFilter('markdown',
        str => markdownLibrary.render(str))

    const luxify = d =>
        (d instanceof Date ? DateTime.fromJSDate(d) :
            typeof d == 'string' ? DateTime.fromISO(d) :
    /* else */             DateTime.local()).setZone('UTC+03')

    eleventyConfig.addFilter('datefmt', (date, fmt) => luxify(date).toFormat(fmt))
    eleventyConfig.addFilter('isodate', date => luxify(date).toISODate())
    eleventyConfig.addFilter('isodatetime', date => luxify(date).toISO())
    eleventyConfig.addFilter('isotime', date => luxify(date).toISOTime())
    eleventyConfig.addFilter('dateid', date => luxify(date).toFormat('MMddHHmmss'))

    eleventyConfig.addFilter('interaction', function (ia) {
        return ia.interactionType
            ? ia[ia.interactionType]
            : ia.data[ia.data.interactionType]
    })

    eleventyConfig.addFilter('groupby', function (prop, coll) {
        if (typeof prop === 'string') {
            const temp = prop
            prop = e => e[temp]
        }
        const rv = new Map
        for (const e of coll || []) {
            const value = prop(e)
            rv.has(value) ? rv.get(value).push(e) : rv.set(value, [e])
        }
        return Array.from(rv.entries(), e => ({ key: e[0], values: e[1] }))
    })

    eleventyConfig.addFilter('reverse', e => (function* () {
        for (let i = e.length - 1; i >= 0; i--) yield e[i]
    }()))

    eleventyConfig.addFilter('limit', (i, e) => (function* () {
        let n = 0
        for (const v of e) {
            if (n++ == i) break
            yield v
        }
    }()))

    eleventyConfig.addFilter('eq', (a, b) => a === b)
    eleventyConfig.addFilter('gt', (a, b) => a > b)
    eleventyConfig.addFilter('ge', (a, b) => a >= b)
    eleventyConfig.addFilter('le', (a, b) => a <= b)
    eleventyConfig.addFilter('lt', (a, b) => a < b)

    eleventyConfig.addFilter('and', (...args) => args.slice(0, -1).reduce((a, b) => a && b))
    eleventyConfig.addFilter('or', (...args) => args.slice(0, -1).reduce((a, b) => a || b))
    eleventyConfig.addFilter('not', a => !a)

    eleventyConfig.addFilter('d', (...args) =>
        args.find(arg => arg !== undefined && arg !== null))

    eleventyConfig.addFilter('truncateUrl', url => {
        if (typeof url !== 'string') return url
        url = new URL(url)
        const path = url.pathname.split('/')
        const dotdotdot = path.length > 2 || url.query || url.hash
        if (path.length > 2) {
            url.pathname = `${path.slice(0, 2).join('/')}/`
        }
        url.query = null
        url.hash = ''
        return url.href + (dotdotdot ? '…' : '')
    })

    function reLast(haystack, needle) {
        let rv = null;
        while ((rv = needle.exec(haystack)) !== null) rv = rv.index;
        return rv;
    }

    eleventyConfig.addFilter('smartTruncate', (text, len = 50) => {
        if (text.length < len + 2) return len;
        let rv = text.slice(0, len)

        // Try to cut at a punctuation mark
        const punctIdx = reLast(rv, /\.,:;—/g)
        if (punctIdx > .6 * len) {
            return rv = rv.slice(0, punctIdx)
        }

        return rv = rv.slice(0, rv.lastIndexOf(' '))
    })

    eleventyConfig.addFilter('striptags', text => text.replace(/<\/?[^>]+(>|$)/g, ""))

    eleventyConfig.addPairedShortcode('fig', (body, caption, link) =>
        `

<figure><figcaption>${typeof link === 'string'
        ? `<a href="${link}">${markdownLibrary.renderInline(caption)}</a>`
        : markdownLibrary.renderInline(caption)
    }</figcaption>

${body}

</figure>

`) // `

    eleventyConfig.addShortcode('log', function (x) {
        console.log(x)
    })

    eleventyConfig.addShortcode('set', function ({ hash, data: { root } }) {
        Object.assign(root, hash)
    })

    eleventyConfig.addShortcode('eval', function (body) {
        return new Function('with (this) return ' + body).call(this)
    })

    eleventyConfig.addPairedShortcode('exec', function (body) {
        return new Function('with (this) { ' + body + ' }').call(this)
    })

    eleventyConfig.addShortcode('fread', function (pathname) {
        console.log(this.page.inputPath)
        const realpath = path.resolve(this.page.inputPath, '..', pathname)
        return fs.readFileSync(realpath, { encoding: 'utf-8' })
    })
}
