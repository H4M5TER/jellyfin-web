const fs = require('fs')

const db = fs.readFileSync('fc-subs.db', 'utf16le').slice(8).split('\x00\n\x00\n').slice(0,-1).map(x=>x.split('\x00\n'))

let fontPath = ''
let result = {}

for (const font of db) {
  fontPath = font[0]
  font.slice(1).filter(line=>!line.startsWith('\t')).forEach(name=>{
    result[name] = fontPath
  })
}

fs.writeFileSync('db.json', JSON.stringify(db, null, 2), 'utf-8')
fs.writeFileSync('fontNameMap.json', JSON.stringify(result, Object.keys(result).sort()) , 'utf-8')
