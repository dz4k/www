
param ([switch]$Production, [switch]$NoBuild)

$commands = & { 
    if (-not $NoBuild) {
        "cd ~/www"
        "git pull"
        "npm run build"
    }
    "ntl deploy $($Production ? '--prod' : '')"
}

ssh dza@p.dz4k.com ($commands -join ' && ')
