
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 服务器端口号
   devServer: {
    port: 8088,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/pdf': {
        
        // target: `http://192.168.43.160:10800/pdf/`,
        // target: `http://39.100.124.168:9997/pdf/`,  //上线 ip
        target: `http://124.207.242.89:9997/pdf/`,  //上线 ip
        // target: `http://192.168.4.82:8089/pdf/`,  //张青ip
        changeOrigin: true,
        pathRewrite: {
          ['^/pdf']: ''
        }
      }
    }
  },
 }