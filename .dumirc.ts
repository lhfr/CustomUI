import { defineConfig } from 'dumi';

export default defineConfig({
  // outputPath: 'docs-dist',
  base: '/CustomUI/',
  publicPath: '/CustomUI/',
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  ],
  themeConfig: {
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    footer: 'Copyright © 2023 | Powered by CustomUI',
    name: 'CustomUI',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '组件', link: '/components/tree' },
    ],
    // theme: {
    //   '@dumi-primary': '#1DA57A'
    // }
  },
  // 取消打包静态单个组件库和函数工具
  exportStatic: {},
  // styles: [
  //   `.dumi-default-header-left {
  //     width: 250px !important;
  //   }`,
  // ],
});
