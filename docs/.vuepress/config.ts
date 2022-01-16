import chokidar = require('chokidar')
import { logger, path } from '@vuepress/utils';
import type { DefaultThemeOptions } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { navbar, sidebar } from './configuration';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  dest: './dist',
  title: 'Booster',
  description: 'Booster Deep Dive',
  locales: {
    '/en/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Booster',
      description: '深入理解 Booster',
    },
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
  bundler: process.env.DOCS_BUNDLER ?? '@vuepress/vite',
  themeConfig: {
    repo: 'didi/booster',
    docsRepo: 'johnsonlee/booster.johnsonlee.io',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    logo: '/logo.png',
    locales: {
      '/': {
        navbar: navbar.en,
        sidebar: sidebar.en,

        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
      },
      '/en/': {
        navbar: navbar.en,
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Languages',

        sidebar: sidebar.en,

        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
      },
      '/zh/': {
        navbar: navbar.zh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        sidebar: sidebar.zh,

        editLinkText: '在 GitHub 编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        tip: '提示',
        warning: '注意',
        danger: '警告',

        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
      },
    },
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      skipWaiting: true,
    }],
    ['@vuepress/plugin-google-analytics', {
      id: 'UA-166011311-1'
    }],
    ['@vuepress/container', {
      type: 'right',
      defaultTitle: '',
    }],
    ['@vuepress/container', {
      type: 'theorem',
      before: (info) => `<div class="theorem"><p class="title">${info}</p>`,
      after: '</div>'
    }],
    ['@vuepress/git'],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/toc'],
    ['@vuepress/plugin-docsearch', {
      apiKey: 'e1d2965c5919d6b9f28d54cc7cff0495',
      indexName: 'booster-johnsonlee',
      locales: {
        '/zh/': {
          placeholder: '搜索文档'
        },
      },
    }],
    ['@vuepress/plugin-register-components', {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],

  onWatched: (_, watchers, restart) => {
    const confWatcher = chokidar.watch([
      './configuration/**/*.ts',
      '../en/**/*.md',
      '../zh/**/*.md',
    ], {
      cwd: __dirname,
      ignoreInitial: true,
    });

    confWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    watchers.push(confWatcher);
  },
})
