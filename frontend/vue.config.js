const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Orbiter maker backend'
      return args
    })
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
  },
  // devServer: {
  //   disableHostCheck: true,
  //   open: true,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   hot: true,
  //   proxy: {
  //     '/subgraphs/name/kakui-lau/orbiter-subgraph-testnet/graphql': {
  //       target: 'http://192.168.1.8:8000',
  //       secure: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/subgraphs/name/kakui-lau/orbiter-subgraph-testnet/graphql': '',
  //       },
  //     },
  //   }
  // }
}
