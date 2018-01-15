const assets = require('./app/public/manifest.json')

module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext()

    app.locals = {
      title: '钜MAX线上商城 - 指尖上的首创奥莱',
      assets
    }
  })
}
