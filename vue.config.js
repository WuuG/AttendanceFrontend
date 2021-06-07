const path = require('path');//引入path模块

function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

LOCALURL = 'http://ad.keepdev.top:8080'
REMOTEURL = 'http://attendance.keepdev.top/api'
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
            '/api': {
                target: LOCALURL,  //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true,  //允许跨域 pathRewrite: {
                /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                  实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                 */
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
    }
}
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
// }