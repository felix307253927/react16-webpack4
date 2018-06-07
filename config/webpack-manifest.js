/**
 * @author Created by felix on 17-11-7.
 * @email   307253927@qq.com
 */
'use strict';
const path = require('path')

function ManifestPlugin(opts) {
  this.opts = Object.assign({
    name   : 'manifest.manifest',
    version: '0.0.1'
  }, opts)
}

ManifestPlugin.prototype.apply = function (compiler) {
  let moduleAssets = {}
  compiler.plugin("compilation", (compilation) => {
    compilation.plugin("module-asset", (module, file) => {
      moduleAssets[file] = path.join(
        path.dirname(file),
        path.basename(module.userRequest)
      );
    })
    
  })
  compiler.plugin('emit', (compilation, compileCallback) => {
    let now      = new Date();
    let manifest = `CACHE MANIFEST
#${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}
#version: ${this.opts.version}
`
    compilation.chunks.forEach(chunk => {
      chunk.files.forEach(path => {
        manifest += `/${path}\n`
      })
    })
    manifest += `
NETWORK:
*
FALLBACK:
`
    compilation.assets[this.opts.name] = {
      source() {
        return manifest
      },
      size() {
        return manifest.length
      }
    }
    compileCallback()
  })
}

module.exports = ManifestPlugin