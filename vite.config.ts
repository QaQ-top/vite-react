import reactRefresh from '@vitejs/plugin-react-refresh'; // react 热更新
import legacy from '@vitejs/plugin-legacy'; // 代码兼容性

import path from 'path';

import { defineConfig, } from 'vite';


// Alias 配置参数
const root = process.cwd();
const ceratePath = (pathName = '') => {
  // `${root}\\src${pathName ? `\\${pathName}` : ''}`;
  return path.resolve(__dirname, `./src${pathName ? `/${pathName}` : ''}`);
}

console.log(process.env.NODE_ENV)

export default defineConfig({
  /**
   * >——————————————————————————————开发资源路径别名—————————————————————————————
   * 配合 tsconfig.json 的 compilerOptions.paths 使用
   */
  alias: [
    {
      find: '@src',
      replacement: ceratePath(),
    },
    {
      find: '@route',
      replacement: ceratePath('route'),
    },
    {
      find: '@pages',
      replacement: ceratePath('pages'),
    },
    {
      find: '@assets',
      replacement: ceratePath('assets'),
    },
    {
      find: '@models',
      replacement: ceratePath('models'),
    },
    {
      find: '@themes',
      replacement: ceratePath('themes'),
    },
    {
      find: '@utils',
      replacement: ceratePath('utils'),
    },
  ],
  
  /**
   * >——————————————————————————————决定引入资源的路径—————————————————————————————
   * 在开发或生产中服务时的基本公共路径
   * 根据项目部署的路径配置
   * 默认 '/'
   * 配合 tsconfig.json 的 compilerOptions.baseUrl 使用
   */
  base: '/',

  /**
   * >——————————————————————————————全局变量—————————————————————————————
   * define 这个对象将挂载到 window 上
   * !全局变量名称 会在 build 时跟 node_modules 内部变量冲突
   * !构建的时候必须保证 key 全局内是唯一的 （保证全局不会出现该单词）
   * !window.v_global 在开发的时候可以用，生产 build 时 v_global 会被直接替换成 v_global的值 （window.全局变量）
   * !件夹地址也会被替换了
   */
  define: {
    __GLOBAL__meaning: '全局变量',
  },

  /**
   * >——————————————————————————————Rollup 插件—————————————————————————————
   * 插件  rollup 一样的用法
   */
  plugins: [
    reactRefresh(),
    legacy({
      targets: ["defaults", "not ie <= 7"],
    })
  ],
  
  /**
   * >——————————————————————————————root 目录—————————————————————————————
   * 项目根目录，可以是绝对路径，一个相对于配置文件本身位置的路径。
   * 默认： process.cwd()
   */
  root: process.cwd(),

  
  /**
   * >——————————————————————————————程序模式—————————————————————————————
   * 在 config 中指定这个值将是服务 的 构建的模式。可以通过命令行 --mode 选项来覆盖。
   * 默认：development, production
   */
  mode: 'development',

  /**
   * >——————————————————————————————CSS 模块化—————————————————————————————
   */
  css: {
    
    /**
     * 配置CSS模块行为，这些选项被传递给 postcss-modules
     * 单独的 css 文件引入，只有 *.module.* 的文件被编译成 模块
     * 默认的 vue 文件 <style></style> 被编译成 模块
     * interface CSSModulesOptions {
     *    默认情况下，该插件假设所有的类都是本地的。你可以使用 scopeBehaviour 选项来改变这种行为
     *    scopeBehaviour?: 'global' | 'local'
     * 
     *    要定义全局模块的路径，请使用 globalModulePaths 选项。它是一个包含定义路径的正则表达式的数组。
     *    globalModulePaths?: string[]
     * 
     *    要生成自定义类，请使用 generateScopedName 回调 或者 是字符串
     *    generateScopedName?:
     *      | string
     *      | ((name: string, filename: string, css: string) => string)
     *    可以使用hashPrefix选项添加自定义哈希来生成更多独特的类（就像在css-loader中一样）
     *    hashPrefix?: string
     *    
     *    默认: 'camelCaseOnly'
     *    css文件的类名被编译后的 名称格式 
     *    localsConvention?: 'camelCase'(原名称+驼峰) | 'camelCaseOnly(驼峰)' | 'dashes'(原名称) | 'dashesOnly'(原名称)
     *  }
     */
    modules: {
      scopeBehaviour: "local",
      // 函数写法
      // generateScopedName: function (name, filename, css) {
      //   var path = require("path");
      //   var i = css.indexOf("." + name);
      //   var line = css.substr(0, i).split(/[\r\n]/).length;
      //   var file = path.basename(filename, ".css");
  
      //   return file + "_" + line + "_" + name;
      // },
      generateScopedName: "[name]_[local]_[hash:base64:5]",
      localsConvention: "camelCase"
    },
    /**
     * 内联 PostCSS 配置(与postcss.config.js格式相同)，或者自定义路径来搜索 PostCSS 配置(默认是项目根目录)。搜索是通过postcss-load-config完成的。
     * 注意，如果提供了内联配置，Vite将不会搜索其他PostCSS配置源
     */
    // postcss: {
    //   // 会覆盖 .postcssrc.js 配置内容与 .postcssrc.js 抛出的对象相同
    // }

    /**
     * 配置 预处理器
     */
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      },
      less: {
        // 添加全局变量
        additionalData: `@Color: orange;`
      }
    }
  },
  /**
   * >——————————————————————————————JSON 模块化—————————————————————————————
   */
  json: {
    namedExports: true,
    stringify: false, // stringify: true 无法使用 import { age, name} from './index.json'; 这种 key 导入的方式。
  },
  /**
   * >——————————————————————————————代码转换—————————————————————————————
   * esbuild 集成 "esbuild transform api"。最常见的用例是定制 JSX
   */
  esbuild: {
    target: 'es2020',
    jsxFactory: 'React.createElement', // dom 标签转换
    jsxFragment: 'React.Fragment',  // <></> 空标签转换
    /**
     * vue jsx
     * jsxFactory: 'h', // dom 标签转换
     * jsxFragment: 'Fragment',  // <></> 空标签转换
     */
    // 默认情况下，ESBuild应用于ts、jsx和tsx文件
    // 你可以通过esbuild.include和esbuild.exclude来定制，这两个函数都期望类型为string | RegExp | (string | RegExp)[]。
    // include: [/(.tsx)+/, /(.ts)+/, ],
    // 您还可以使用esbuild.jsxInject为每一个被ESBuild转换的文件自动注入JSX助手导入
    // jsxInject: `import React from 'react'`
  },
  // 将静态资源以模块化的方式引入
  assetsInclude: [
    // images
    'png','jpe?g','gif','svg','ico','webp','avif',
  
    // media
    'mp4','webm','ogg','mp3','wav','flac','aac',
  
    // fonts
    'woff2?','eot','ttf','otf',
  
    // other
    'wasm'
  ],
  /**
   * 应用程序中有相同依赖关系的重复副本（很可能是由于吊装或联动包件在单体上的原因），请使用此选项强制 vite 总是将列出的依赖关系解析为相同的副本（从项目根部）。
   */
  dedupe: [
    'react',
    'react-dom'
  ], 

  // 日志等级
  // 默认 info
  logLevel: 'info',

  /**
   * >——————————————————————————————devServer—————————————————————————————
   */
  server: {
    // 将此文件夹预存到http请求中，以便在代理vite时作为子文件夹使用 
    base: '/',
    // 主机 ip 地址
    host:'localhost',
    // 端口号
    port: 9999,
    // 如果指定的端口已经在使用，vite将退出
    strictPort: true,
    // 创建Vite开发服务器，作为现有服务器的中间件使用。
    middlewareMode: false,
    // 立即打开浏览器
    open: false,
    // 为开发服务器配置自定义跨域代理规则 node-http-proxy
    proxy: {
      '/music': {
        target: 'http://39.108.182.125:3000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/music/, ''),
        
      }
    },
    // 为 开发服务器 配置CORS
    cors: {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    },
    // 配置 HTTPS
    https: false, // 或者 ServerOptions
  },

  build: {
    /**
     * 打包后最终 最终的兼容性，变换是通过 esbuild 进行的 和 esbuild.target 配置一样
     * "modules": 它的目标是支持本地ES模块的浏览器
     * "esnext": 它只执行最小的 trasnpiling (用于minification compat)，并假定支持本地动态导入。
     */
    target: 'es2020',
    
    /**
     * Vite 内部采用的就是原生 Dynamic imports (<script type="module" ></script>) 特性实现的，所以打包结果还是只能够支持现代浏览器
     * polyfillDynamicImport = true
     * 也就是说，只要你想，它也可以运行在相对低版本的浏览器中。
     * 默认 true (build.target === "esnext" 时 polyfillDynamicImport 为 false)
     */
    polyfillDynamicImport: true,

    /**
     * 指定打包输出的目录
     * 默认 dist
     */
    outDir: 'dist',

    /**
     * 指定打包后资源的输出的目录 ( 这是相对于 outDir )
     * 默认 assets
     */
    assetsDir: 'assets',
    
    /**
     * 小于 assetsInlineLimit 的内联资源 将转为 Base64
     * .wasm 文件 将转为字符串
     * 默认 4096
     */
    assetsInlineLimit: 4096,

    /**
     * 开启/关闭 CSS 代码分割。
     * 当启用时，以async chunk导入的CSS将被内联到async chunk本身，并在加载该chunk时插入。
     * 如果禁用，整个项目中的所有CSS将被提取到一个CSS文件中。
     * 默认 true
     */
    cssCodeSplit: true,

    /**
     * 生成生产源图
     * 默认 false
     */
    sourcemap: false,

    /**
     * >——————————————————————————————rollup.config.js——————————————————————————————
     * 直接自定义底层的 Rollup 绑定。这与可以从 Rollup 配置文件导出的选项相同，并将与Vite的内部Rollup选项合并。更多细节请参见Rollup选项文档。
     * rollup.config.js 的配置项 https://www.rollupjs.com/
     */
    // rollupOptions: {
    //   input: path.resolve(__dirname, 'src/main.tsx'),
    //   output: {
    //     dir: 'dist',
    //     // file: 'bundle.js',
    //     format: "es",
    //     // assetFileNames: 'assets',
    //     sourcemap: true,
    //     inlineDynamicImports: false,
    //   },
    // },

    /**
     * 传递给 @rollup/plugin-commonjs 的选项。这也适用于依赖性预捆绑。
     * (@rollup/plugin-commonjs 已经集成在了vite内部，不需要安装依赖)
     */ 
    // commonjsOptions: {
    //   exclude: ['./src/route']
    // }
    /**
     *  >——————————————————————————————开发库打包器——————————————————————————————
     * 开发库
     * 开发 工具库 组件库 推荐建立一个新的 仓库
     * 在 package.json 内添加 一下配置 （或者 阅读参考其它配置）
     * {
     *   "name": "my-lib",
     *   "files": ["dist"],
     *   "main": "./dist/my-lib.umd.js",
     *   "module": "./dist/my-lib.es.js",
     *   "exports": {
     *     ".": {
     *       "import": "./dist/my-lib.es.js",
     *       "require": "./dist/my-lib.umd.js"
     *     }
     *   }
     * }
     */
    
    // lib: {
    //   entry: path.resolve(__dirname, 'lib/index.ts'),
    //   name: 'MyLib',
    //   formats: ['es','cjs',"iife","umd"],
    // }
    /**
     * 当设置为 "true "时，构建过程中还会生成一个manifest.json文件，
     * 其中包含非哈希资产文件名到其哈希版本的映射，然后服务器框架可以使用该文件来渲染正确的资产链接。
     * 默认 false
     * 参考：https://vitejs.dev/guide/backend-integration.html
     */
    manifest: true,


    /**
     * >——————————————————————————————代码压缩——————————————————————————————
     * 代码压缩方式 使用的是 terser 和 esbuild
     * 默认 terser
     */
    minify: true, // 为 true时默认使用 terser
    /**
     * 配置 terser 自定义压缩配置
     * 参考：https://terser.org/docs/api-reference#compress-options
     */
    terserOptions: {
      ie8: true,
      safari10: true,
    },

    /**
     * css 代码压缩 配置
     * https://github.com/jakubpawlowicz/clean-css#constructor-options
     */
    cleanCssOptions: {
      compatibility: "ie9"
    },

    /**
     * 设置为false，禁止将bundle写入磁盘
     * 默认 true
     */
    write: true,

    /**
     * 如果 build 输出(outDir) 是在根目录，Vite会在构建时清空它。
     * 如果输出(outDir)在根目录之外，它会发出警告，以避免意外地删除重要文件
     * 你可以通过这个选项来消除警告，也可以在运行时通过 --emptyOutDir 来实现
     * 默认 true
     */
    emptyOutDir: true,

  },
});

