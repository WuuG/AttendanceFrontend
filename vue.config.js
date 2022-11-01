const path = require('path');//引入path模块

function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

// LOCALURL = 'http://ad.keepdev.top:8080'
// REMOTEURL = 'http://attendance.keepdev.top/api'


REMOTEURL = "http://120.78.228.248:8080/";
// REMOTEURL = "http://120.78.228.248:8080/api"; // buildUse


module.exports = {
    // publicPath:'.'
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias.set('pages', resolve('./src/pages'))
            .set('assets', resolve('./src/assets'))
            .set('img', resolve('./src/assets/img'))
            .set('network', resolve('./src/network'))
            .set('utils', resolve('./src/utils'))
            .set('components', resolve('./src/components'))
        // //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    devServer: {
        proxy: {  //配置跨域
            // 将api修改为target url 也就是将 localhost:8080/api -> http://120.78.228:8080/
            '/api': {
                target: REMOTEURL,  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域 pathRewrite: {
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
    }
}
