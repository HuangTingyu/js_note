## 启动项目

```
npm run dev
```

## 主要步骤

1.初始化npm环境

2.安装webpack，webpack-cli

3.安装 `webpack-dev-server`，`html-webpack-plugin`

4.安装 `babel`，相关插件

```json
"babel-core": "^6.26.3",

 "babel-loader": "^7.1.5",

 "babel-polyfill": "^6.26.0",

 "babel-preset-es2015": "^6.24.1",

 "babel-preset-latest": "^6.24.1",

```

### 注意

- Tips1

`webpack` 不要全局安装，因为不同项目依赖的webpack版本不一样。

卸载全局webpack的方法1(可能不奏效)

```
cnpm uninstall webpack webpack-cli -g
```

方法2进入到目录手动删除，npm 默认包下载目录

`C:\Users\lenovo\AppData\Roaming\npm\node_modules`

- Tips2

给`babel-loader` 降版本

```
cnpm install babel-loader@7.1.5 -D
```

## 添加配置文件

`webpack.dev.config.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './release/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './release'), // 根目录
        open: true, // 自动打开浏览器
        port: 9000
    }
}
```

package.json

```json
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
    },
```

