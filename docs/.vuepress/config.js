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
          '/': [
            {
              title: '前言',
              collapsable: false,
              children: [
                'preface/',
                'preface/overview',
                'preface/getting-started',
              ]
            },
            {
              title: '性能优化',
              collapsable: false,
              children: [
                'feature/performance/static-analysis',
                'feature/performance/multithreading-optimization',
                'feature/performance/shared-preferences-optimization',
                'feature/performance/webview-preloading',
              ],
            },
            {
              title: '包体积瘦身',
              collapsable: false,
              children: [
                'feature/shrink/png-compression',
                'feature/shrink/webp-compression',
                'feature/shrink/zip-compression',
                'feature/shrink/res-index-inline',
                'feature/shrink/res-deredundancy',
              ],
            },
            {
              title: '系统 bug 修复',
              collapsable: false,
              children: [
                'feature/bugfix/prevent-crash-from-system-bug',
                'feature/bugfix/finalizer-timeout-exception',
                'feature/bugfix/null-resource-assets',
                'feature/bugfix/toast-crash-on-android-25',
              ],
            },
            {
              title: '其它特性',
              collapsable: false,
              children: [
                'feature/misc/dependencies-check-on-release-build',
                'feature/misc/android-permission-list',
                'feature/misc/shared-library-list',
                'feature/misc/build-artifact-list',
              ],
            },
            {
              title: 'Booster 插件开发',
              collapsable: false,
              children: [
                'developer/bytecode-transformer',
                'developer/bytecode-engineering-framework',
                'developer/first-class-transformer',
                'developer/first-variant-processor',
                'developer/class-transformer-plus-variant-processor',
                'developer/using-transformer-in-task',
                'developer/standalone-transformer',
                'developer/debug-gradle-plugin',
              ],
            },
            {
              title: 'Booster 架构剖析',
              collapsable: false,
              children: [
                'architecture/overview',
                'architecture/dynamic-discovery-and-dependency-injection',
                'architecture/transformer-pipeline',
                'architecture/high-performance-io',
                'architecture/aapt2-output-reversing',
                'architecture/incremental-build-and-build-cache',
              ],
            },
          ]
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
      ga: 'UA-166011311-1'
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
