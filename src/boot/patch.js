const rfc6902 = require('rfc6902')

export default async ({ Vue }) => {
  Vue.prototype.$jsonpatch = rfc6902
}
