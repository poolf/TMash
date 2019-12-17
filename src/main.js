// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import i18n from '@/i18n'
import Bus from 'vue-bus'
import '@fouro/all-in-one/lib/utils/validate'
import '@fouro/elx/src/utils/element-loader'

import Components from '@/components'
import { convertI18nMessage } from '@fouro/all-in-one/src/utils/kit'
import '@/style/global.css'

Vue.config.productionTip = false
Vue.config.store = store
Vue.prototype.i18nConvert = function(category, source, translate = false, defaultValue) {
  if (!translate) return source
  if (typeof source == 'undefined' || source === null) {
    if (typeof defaultValue == 'undefined') return source
    return defaultValue
  }
  source = source.replace(/(\.|\:)/g, '_')
  return convertI18nMessage(category, source, defaultValue, this.$t)
}

Vue.use(Bus)
Vue.use(Components)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>',

  created() {
    this.$store.dispatch('GetLocaleList').then(res => {
      let langRequests = []
      res.forEach(locale => {
        this.supportLangs.push(locale.lang)
        langRequests.push(ajax({
          url: locale.src,
          method: 'GET'
        }))
      })
      return Promise.all(langRequests)
    }).then(langs => {
      if (process.env.NODE_ENV === 'production') {
        this.supportLangs.forEach((lang, index) => {
          this.$i18n.setLocaleMessage(lang, langs[index])
        })
      }
    }).finally(() => {
      this.$store.commit('SET_APP_STATUS', 'ok')
    })
  },
})
