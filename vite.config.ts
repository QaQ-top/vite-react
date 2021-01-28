import reactRefresh from '@vitejs/plugin-react-refresh'; // react 热更新
// import resolve from '@vitejs/plugin-node-resolve';

import { defineConfig, } from 'vite';

// Alias 配置参数
const root = process.cwd();
const ceratePath = (path = '') => {
  return `${root}\\src${path ? `\\${path}` : ''}`;
}


export default defineConfig({

  /**
   * 别名
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
   * 在开发或生产中服务时的基本公共路径
   * 根据项目部署的路径配置
   * 默认 '/'
   * 配合 tsconfig.json 的 compilerOptions.baseUrl 使用
   */
  base: '/',

  /**
   * 全局变量
   * define 这个对象将挂载到 window 上
   * 
   */
  define: {
    global: '全局变量'
  },

  // 插件  rollup 一样的用法 
  plugins: [
    reactRefresh(),
  ],
  
  // 项目根目录，可以是绝对路径，一个相对于配置文件本身位置的路径。
  // 默认： process.cwd()
  root: 'C:\\test\\initvite',

  

  // 在 config 中指定这个值将是服务 的 构建的模式。可以通过命令行 --mode 选项来覆盖。
  // 默认：development, production
  mode: 'development',

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

  json: {
    namedExports: true,
    stringify: true,
  },
  /**
   * esbuild 集成 "esbuild transform api"。最常见的用例是定制 JSX
   */
  esbuild: {
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

  // devServer
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
    /**
     *> 配置 HTTPS
    */
    https: false, // 或者 ServerOptions
  },

  build: {
    
  }

});
