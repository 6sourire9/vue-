const path=require("path")
var HtmlWebpackPlugin=require("html-webpack-plugin")
var webpack = require("webpack")
var VueLoaderPlugin=require("vue-loader/lib/plugin")
module.exports={
    entry:"./src/main.js",
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"dist")
    },
    plugins:[new HtmlWebpackPlugin({
        template:"src/index.html",
        filename:"index.html"
    }),new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:'jquery'
    }),new VueLoaderPlugin()],
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:"url-loader?limit=3450&name=[hash:8][name].[ext]"
            },
            {
                test:/\.(ttf|eot|svg|woff|woff2)$/,
                use:"url-loader"
            },
            {
                test:/\.(vue)$/,
                use:"vue-loader"
            },
            /* {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    } 
                }
            }, */

        ]
    },
    /* devServer:{
        open:true,
        port:4000,
        contentBase:"src",
        hot:true
    },  */
    // 用运行版本时，要起别名
    /* resolve:{
        alias:{
            vue$:"vue/dist/vue.js"
        }
    }, */
    mode:'development'
}