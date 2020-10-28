const url = "https://checkvist.com/checklists/778325/export.html?export_notes_md=true"
module.exports = require('node-fetch')(url).then(res => res.text())