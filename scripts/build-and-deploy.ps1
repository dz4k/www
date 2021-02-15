
param ([switch]$prod)

ssh dza@p.dz4k.com "
	git pull && \
	npm run build && \
	ntl deploy $($prod ? '--prod' : '')"
