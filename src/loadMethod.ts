import { HtmlTagDescriptor } from "vite";

export function asyncLoader(configs: Record<string, any>): HtmlTagDescriptor[] {
  return [
    {
      tag: 'script',
      injectTo: 'body-prepend',
      children: `
      !(function (c, b, d, a) {
        c[a] || (c[a] = {})
        c[a].config = ${JSON.stringify(configs)}
        with (b) with (body) with (insertBefore(createElement('script'), firstChild)) setAttribute('crossorigin', '', (src = d))
      })(window, document, 'https://retcode.alicdn.com/retcode/bl.js', '__bl')
      `
    }
  ]
}

export function syncLoader(configs: Record<string, any>): HtmlTagDescriptor[] {
  return [
    {
      tag: 'script',
      injectTo: 'body-prepend',
      children: `
      window.__bl = {
        config: ${JSON.stringify(configs)}
      }
      `
    },
    {
      tag: 'script',
      injectTo: 'body-prepend',
      attrs: {
        type: 'text/javascript',
        crossorigin: true,
        src: 'https://retcode.alicdn.com/retcode/bl.js'
      }
    }
  ]
}