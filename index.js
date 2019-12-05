const fs = require('fs')
    , path = require('path')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

module.exports = function() {
  const result = {}
  ;[].concat(Object.entries(pkg.dependencies || {}))
  .concat(Object.entries(pkg.devDependencies || {}))
  .some(([k, v, i]) => {
    const pkg = fs.existsSync(path.join('node_modules', k)) && JSON.parse(fs.readFileSync(path.join('node_modules', k, 'package.json'), 'utf8'))
    if (!pkg || ((v.match(/[^/]/) && pkg.version !== v)))
      return Object.assign(result, { name: k, needed: v, installed: pkg ? pkg.version : 'not found' })
  })
  return result
}
