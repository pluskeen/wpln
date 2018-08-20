const path = require("path"); // node 的 path 模块
const UglifyPlugin = require("uglifyjs-webpack-plugin"); // 压缩 JS 代码
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成 HTML 文件 https://github.com/jantimon/html-webpack-plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 为每个页面定义一个 ExtractTextPlugin
// const fooExtractCss = new ExtractTextPlugin('foo/[name].[hash].css')
// const indexExtractCss = new ExtractTextPlugin('index/[name].[hash].css')


//__dirname  获得当前执行文件的 带有完整绝对路径的 所在目录的 完整目录名
//__filename 获得当前执行文件的 带有完整绝对路径的 文件名

//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。http://nodejs.cn/api/path.html#path_path_resolve_paths

//loader 理解为转换器，负责把某种文件格式的内容转换成 webpack 可以支持打包的模块。
//style-loader 将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效
//css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明

module.exports = {
  entry: {
    foo: "./src/views/foo/foo.js",
    index: "./src/views/index/index.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // 匹配文件路径的正则表达式，通常我们都是匹配文件类型后缀
        use: "babel-loader", // 指定使用的 loader
        include: [
          path.resolve(__dirname, "src") // 指定哪些路径下的文件需要经过 loader 处理
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
      // 每个页面的 ExtractTextPlugin 只处理这个页面的样式文件
      // {
      //   test: /views(\\|\/)foo(\\|\/).*\.(css|less)$/,
      //   use: fooExtractCss.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', "less-loader"]
      //   })
      // },
      // {
      //   test: /views(\\|\/)index(\\|\/).*\.(css|less)$/,
      //   use: indexExtractCss.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', "less-loader"]
      //   })
      // },

    ]
  },
  plugins: [
    new UglifyPlugin(), // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    // 使用 HtmlWebpackPlugin 生成 HTML
    // 默认生成的 HTML 不满足需要，通常传递写好的 HTML 模板
    new HtmlWebpackPlugin({
      title: "webpack-index", // 配置生成的 HTML 文档的标题
      filename: "index.html", // 配置输出文件名和路径
      template: "./src/views/index/index.html", // 配置文件模板
      inject: true,
      minify: {
        removeComments: true, // 删除 HTML 中的注释
        collapseWhitespace: true // 删除 HTML 中的空格
      }
    }),
    new HtmlWebpackPlugin({
      title: "webpack-foo", // 配置生成的 HTML 文档的标题
      filename: "foo.html", // 配置输出文件名和路径
      template: "./src/views/foo/foo.html", // 配置文件模板
      inject: true
    }),
    // 使用 [contenthash] 会报错，改用 [hash] 正常
    new ExtractTextPlugin("css/[name].[hash].css")
    // fooExtractCss,
    // indexExtractCss
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  }
};
