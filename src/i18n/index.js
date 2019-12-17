import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookie from 'js-cookie'
import locale from 'element-ui/src/locale'
import localeLib from 'element-ui/lib/locale'

import ja from '@/i18n/ja'
import en from '@/i18n/en'
import zh from '@/i18n/zh-CN'

// import ja from '../../constant/i18n/ja'
// import en from '../../constant/i18n/en'
// import zh from '../../constant/i18n/zh-CN'

Vue.use(VueI18n)
var lang = Cookie.get('lang') || navigator.language || navigator.userLanguage
lang = lang === 'en-US' ? 'en' : lang
Vue.config.lang = lang
const i18n = new VueI18n({
  locale: Vue.config.lang, // 语言标识
  fallbackLocale: 'zh-CN',
  messages: {
    ja: ja,
    en: en,
    'zh-CN': zh
  }
})

// 设置语言
locale.i18n((key, value) => i18n.t(key, value))
localeLib.i18n((key, value) => i18n.t(key, value))

export default i18n
