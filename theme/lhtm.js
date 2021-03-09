
module.exports = text => text
	.split(/\n\n+/)
	.map(blk => {
		const blkTrim = blk.trim()
		
		const m_open = /^\t*<(\w+).*>/.exec(blk)
		const m_close = /<\/(\w+)>$/.exec(blkTrim)

		if ((m_open && m_open[0] === blkTrim)
			|| (m_close && m_close[0] === blkTrim)
		) {
			return blk
		}

		if (m_open && (!m_close || m_open[1] !== m_close[1])) {
			return `${blk}</${m_open[1]}>`
		}

		if (!m_open) {
			return `<p>${blk}</p>`
		}

		return blk
	})
	.join('\n\n')

	.replace(/---/, '&mdash;');
