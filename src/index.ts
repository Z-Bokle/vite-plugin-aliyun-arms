import type { Plugin } from 'vite'
import { asyncLoader, syncLoader } from './loadMethod'

export interface AliyunARMSPluginOptions {
  /**
   * 是否启动插件，该选项优先级最高
   * 
   * @default true
   */
  enable?: boolean
  /**
   * 插件启动的场景
   * 
   * @see https://cn.vitejs.dev/guide/api-plugin.html#conditional-application
   */
  apply?: Plugin['apply']
  /**
   * 加载方式
   * 
   * @default 'async'
   * 
   * @description npm方式暂不可用
   */
  loadMethod?: 'async' | 'sync'
  /**
   * ARMS实例设置
   * 
   * @see https://help.aliyun.com/document_detail/58655.htm
   */
  configs: any

}



export default function plugin(options: AliyunARMSPluginOptions): Plugin {

  const { enable = true, apply, loadMethod = 'async', configs } = options

  if (!enable) {
    return {
      name: 'vite-plugin-aliyun-arms'
    }
  }

  return {
    name: 'vite-plugin-aliyun-arms',
    enforce: 'pre',
    apply: apply,
    transformIndexHtml(html) {
      switch (loadMethod) {
        case 'async':
          return asyncLoader(configs)
        case 'sync':
          return syncLoader(configs)
        default:
          return html
      }
    }
  }
}

