const fs = require('fs')
    , path = require('path')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

module.exports = function() {
  return [].concat(Object.entries(pkg.dependencies || {}))
  .concat(Object.entries(pkg.devDependencies || {}))
  .some(([k, v, i]) =>
    !fs.existsSync(path.join('node_modules', k)) ||
    (v.match(/[^/]/) && JSON.parse(fs.readFileSync(path.join('node_modules', k, 'package.json'), 'utf8')).version !== v)
  )
}
