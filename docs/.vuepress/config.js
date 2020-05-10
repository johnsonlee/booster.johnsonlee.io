module.exports = ctx => ({
  base: '/',
  dest: './dist',
  title: '深入理解 Booster',
  description: '全面剖析 Booster 的设计思路与实现原理',
  locales: {
    //'/en/': {
    //  lang: 'en-US',
    //  title: 'Booster Inside',
    //  description: 'Comprehensive explaination of Booster\'s design ideas and realization principles',
    //},
    '/': {
      lang: 'zh-CN',
      title: '深入理解 Booster',
      description: '全面剖析 Booster 的设计思路与实现原理',
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['script', { src: 'https://hm.baidu.com/hm.js?7c44326578f78c601cc7e5fa06017333' }]
  ],
  themeConfig: {
    repo: 'didi/booster',
    smoothScroll: true,
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        nav: require('./nav/zh'),
        sidebar: {
          '/preface/': [
            {
              title: '前言',
              collapsable: false,
              children: [
                '',
                'overview',
                'getting-started',
              ]
            },
          ],
          '/feature/': [
            {
              title: '性能优化',
              collapsable: false,
              children: [
                'performance/static-analysis',
                'performance/multithreading-optimization',
                'performance/shared-preferences-optimization',
                'performance/webview-preloading',
              ],
            },
            {
              title: '包体积瘦身',
              collapsable: false,
              children: [
                'shrink/png-compression',
                'shrink/webp-compression',
                'shrink/zip-compression',
                'shrink/res-index-inline',
                'shrink/res-deredundancy',
              ],
            },
            {
              title: '系统 bug 修复',
              collapsable: false,
              children: [
                'bugfix/prevent-crash-from-system-bug',
                'bugfix/finalizer-timeout-exception',
                'bugfix/null-resource-assets',
                'bugfix/toast-crash-on-android-25',
              ],
            },
            {
              title: '其它',
              collapsable: false,
              children: [
                'misc/dependencies-check-on-release-build',
                'misc/android-permission-list',
                'misc/shared-library-list',
                'misc/build-artifact-list',
              ],
            },
          ],
          '/developer/': [
            {
              title: 'Booster 插件开发',
              collapsable: false,
              children: [
                'javassist-or-asm',
                'first-class-transformer',
                'first-variant-processor',
                'class-transformer-plus-variant-processor',
                'using-transformer-in-task',
                'standalone-transformer',
                'debug-gradle-plugin',
              ],
            },
          ],
          '/architecture/': [
            {
              title: 'Booster 架构剖析',
              collapsable: false,
              children: [
                'overview',
                'dynamic-discovery-and-dependency-injection',
                'transformer-pipeline',
                'high-performance-io',
                'aapt2-output-reversing',
                'incremental-build-and-build-cache',
              ],
            },
          ],
        }
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-154930895-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
    ['flowchart']
  ],
  extraWatchFiles: [
    '.vuepress/nav/en.js',
    '.vuepress/nav/zh.js'
  ]
})
