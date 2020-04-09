module.exports = [
  {
    path: '/api',
    rule: {
      target: 'https://repozitar.cesnet.cz/',
      ws: true,
      secure: true,
      changeOrigin: true,
      logLevel: 'info'
    }
  }
]
