# Vite Plugin Aliyun ARMS
通过Vite插件快速接入阿里云ARMS前端监控

# 使用方式
## 编译
```shell
git clone https://github.com/Z-Bokle/vite-plugin-aliyun-arms.git

cd vite-plugin-aliyun-arms

pnpm i

pnpm build
```

## 引入
将dist目录的产物移动到要接入的项目中，如放在`plugin`目录下

```ts
// vite.config.ts

import aliyunARMS from './plugins/vite-plugin-aliyun-arms'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    aliyunARMS({
      loadMethod: 'async',
      apply(config, { command }) {
        // 只在production环境下上报数据
        return command === 'build' && config.mode === 'production'
      },
      configs: {
        pid: '你的key'
        ...
        // 你的其他ARMS设置
      }
    })
  ],
  ...
})
```

## 参数配置
| 参数       | 是否必填 | 含义                           | 默认值  | 备注                                                                |
| ---------- | :------- | :----------------------------- | :------ | :------------------------------------------------------------------ |
| enable     | false    | 是否启动插件，该选项优先级最高 | true    |                                                                     |
| apply      | false    | 插件启动的场景                 | -       | https://cn.vitejs.dev/guide/api-plugin.html#conditional-application |
| loadMethod | false    | 加载方式                       | 'async' |                                                                     |
| configs    | true     | ARMS实例设置                   | -       | https://help.aliyun.com/document_detail/58655.htm                   |