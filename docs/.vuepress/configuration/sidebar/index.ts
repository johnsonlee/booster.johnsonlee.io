import type { SidebarConfig } from "@vuepress/theme-default";

import * as en_US from './en'
import * as zh_CN from './zh'

const langs = {
  en: en_US.default,
  zh: zh_CN.default,
}

const getSidebar = (lang: string): SidebarConfig => {
  const strings = langs[lang]
  const $ = (key: string) => strings[key] ?? key

  return {
    [`/${lang}/`]: [],
    [`/${lang}/guide/`]: [
      {
        text: $('sidebar.guide'),
        children: [
          `/${lang}/guide/`,
          `/${lang}/guide/introduction`,
          `/${lang}/guide/getting-started`,
          `/${lang}/guide/getting-started-advanced`,
        ],
      },
      {
        text: $('sidebar.guide.performance'),
        children: [
          `/${lang}/guide/performance/static-analysis`,
          `/${lang}/guide/performance/multithreading-optimization`,
          `/${lang}/guide/performance/shared-preferences-optimization`,
          `/${lang}/guide/performance/webview-preloading`,
        ],
      },
      {
        text: $('sidebar.guide.shrinking'),
        children: [
          `/${lang}/guide/shrinking/png-compression`,
          `/${lang}/guide/shrinking/webp-compression`,
          `/${lang}/guide/shrinking/zip-compression`,
          `/${lang}/guide/shrinking/res-index-inlining`,
          `/${lang}/guide/shrinking/res-deredundancy`,
        ],
      },
      {
        text: $('sidebar.guide.bugfixing'),
        children: [
          `/${lang}/guide/bugfixing/prevent-crash-from-system-bug`,
          `/${lang}/guide/bugfixing/finalizer-timeout-exception`,
          `/${lang}/guide/bugfixing/null-resource-assets`,
          `/${lang}/guide/bugfixing/toast-crash-on-android-25`,
        ],
      },
    ],
    [`/${lang}/developer/`]: [
      {
        text: $('sidebar.developer'),
        children: [
          `/${lang}/developer/bytecode-manipulation`,
          `/${lang}/developer/bytecode-manipulation-framework`,
          `/${lang}/developer/first-class-transformer`,
          `/${lang}/developer/first-variant-processor`,
          `/${lang}/developer/library-instrumentation`,
          `/${lang}/developer/using-class-transformer-in-task`,
          `/${lang}/developer/standalone-transformer`,
        ],
      },
    ],
    [`/${lang}/architecture/`]: [
      {
        text: $('sidebar.architecture'),
        children: [
          `/${lang}/architecture/overview`,
          `/${lang}/architecture/dynamic-discovery-and-dependency-inversion`,
          `/${lang}/architecture/transformer-pipeline`,
          `/${lang}/architecture/high-performance-io`,
          `/${lang}/architecture/aapt2-output-reversing`,
          `/${lang}/architecture/incremental-build-and-build-cache`,
        ],
      },
    ],
  } as SidebarConfig
}

export const en = getSidebar('en')
export const zh = getSidebar('zh')
