
const h = require('hyperscript')

const translations = {

	anonymous: { tr: 'Anonim', en: 'Anonymous' },

	archive: { tr: 'Arşiv', en: 'Archive' },

	by_tag_comma: { tr: 'Etikete göre: ', en: 'By tag: ' },

	footer_message: {
		tr: `
			<p> Bu sitedeki tüm tarih/saatler UTC+03 zaman dilimindedir (aksi
			belirtilmediğinde)
			<p> Bu site <a href="//11ty.dev">Eleventy</a> ile yapılmış olup <a
			href="//netlify.com">Netlify</a> tarafından sunulmaktadır.`,
		en: `
			<p> All dates/times on this page are UTC+03 unless otherwise specified.
			<p> This website is made with <a href="//11ty.dev">Eleventy</a> and hosted
			on <a href="//netlify.com">Netlify</a>.`,
	},

	sign_your_comment: {
		tr: 'Yorumunuzu istediğiniz gibi imzalayın.',
		en: 'Sign your comment however you want.',
	},

	this_website_accepts_webmentions: {
		tr: (aboutWm, $commentparade) => [
			'Bu site ', h('a', { href: aboutWm }, 'Webmention'), ' kabul eder. ',
			'Kendi sitenizden ya da anonim olarak ', $commentparade, 'üzerinden ',
			'yorum ya da beğeni gönderebilirsiniz.'
		],
		en: (aboutWm, $commentparade) => [
			'This website accepts ', h('a', { href: aboutWm }, 'Webmentions'), '. ',
			'You can send a reply or like either from your site, or anonymously from ',
			$commentparade, '.'
		],
	},

}

module.exports.for = lang => Object.fromEntries(
		Object.entries(translations).map(([k, v]) => [k, v[lang]])
	)
