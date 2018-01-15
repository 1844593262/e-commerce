module.exports = {
  async curlGet(url) {
    let ctx = this
    let logger = this.logger
    try {
      let result = await ctx.curl(url, {
        dataType: 'json'
      })

      return result
    } catch (e) {
      logger.error(e)
      return {}
    }
  }
}
