
param ([switch]$prod)

$commands = 
"cd ~/www",
"git pull",
"npm run build",
"ntl deploy $($prod ? '--prod' : '')"

ssh dza@p.dz4k.com ($commands -join ' && ')
