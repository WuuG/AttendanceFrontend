const path = require('path');//引入path模块

function resolve(dir) {

    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径

}

module.exports = {
    // publicPath:'.'
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias.set('pages', resolve('./src/pages'))
            .set('assets', resolve('./src/assets'))
            .set('img', resolve('./src/assets/img'))
        // //set第一个参数：设置的别名，第二个参数：设置的路径
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
}