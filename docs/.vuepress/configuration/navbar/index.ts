import type { NavbarConfig } from "@vuepress/theme-default";
import * as en_US from './en'
import * as zh_CN from './zh'

const langs = {
  en: en_US.default,
  zh: zh_CN.default,
}

const getNavbar = (lang: string): NavbarConfig => {
  const strings = langs[lang]
  const $ = (key: string) => strings[key] ?? key

  return [
    {
      text: $('navbar.guide'),
      link: `/${lang}/guide/`,
    },
    {
      text: $('navbar.developer'),
      link: `/${lang}/developer/`,
    },
    {
      text: $('navbar.architecture'),
      link: `/${lang}/architecture/`,
    },
    {
      text: $('navbar.faq'),
      link: `/${lang}/faq/`,
    },
    {
      text: $('navbar.contributors'),
      link: `/${lang}/contributors/`
    },
    {
      text: $('navbar.donate'),
      link: `/${lang}/donate/`
    },
  ]
}

export const en = getNavbar('en')
export const zh = getNavbar('zh')
