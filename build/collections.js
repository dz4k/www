
const interactionTypes = require('../data/interactionTypes.json')

module.exports = eleventyConfig => {

    /****************************************************************************
     COLLECTIONS
     ****************************************************************************/

    eleventyConfig.addCollection('entries', collectionApi => collectionApi
        .getFilteredByGlob('entries/*')
        .filter(entry => !entry.data.deleted))

    eleventyConfig.addCollection('posts', collectionApi => collectionApi
        .getFilteredByGlob('entries/*')
        .filter(entry => 'title' in entry.data))

    eleventyConfig.addCollection('interact', collectionApi => collectionApi
        .getFilteredByGlob('entries/*')
        .filter(entry => entry.data.interaction))

    eleventyConfig.addCollection('deleted', collectionApi => collectionApi
        .getAll()
        .filter(entry => entry.data.deleted))
}
