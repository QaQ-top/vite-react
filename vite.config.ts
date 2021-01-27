import reactRefresh from '@vitejs/plugin-react-refresh'; // react 热更新
// import resolve from '@vitejs/plugin-node-resolve';

import { defineConfig, } from 'vite';
export default defineConfig({

  /**
   * 别名
   * 配合 tsconfig.json 的 compilerOptions.paths 使用
   */
  alias: [
    {
      find: '@src',
      replacement: process.cwd() + '\\src',
    },
    {
      find: '@route',
      replacement: process.cwd() + '\\src\\route',
    },
    {
      find: '@pages',
      replacement: process.cwd() + '\\src\\pages',
    }
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
    // 配置CSS模块行为，这些选项被传递给 postcss-modules
    /**
     * interface CSSModulesOptions {
     *    scopeBehaviour?: 'global' | 'local'
     *    globalModulePaths?: string[]
     *    generateScopedName?:
     *      | string
     *      | ((name: string, filename: string, css: string) => string)
     *    hashPrefix?: string
     *    default: 'camelCaseOnly'
     *    localsConvention?: 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
     *  }
     */
    modules: {
      scopeBehaviour: 'global'
    }
  }
  
});
