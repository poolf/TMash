import ajax from '@/utils/ajax'
const storeModule = {
  state: {
    loading: false,
    lang: navigator.language,
    localeList: [],
    appStatus: null
  },
  mutations: {
    SET_APP_STATUS: (state, data) => {
      state.appStatus = data
    },
    SET_LOADING_STATE: (state, data) => {
      state.loading = data
    },
    RESET_LANGUAGE: (state, lang) => {
      state.lang = lang
    },
    SET_LOCALE_LIST: (state, localeList) => {
      state.localeList = localeList
    }
  },
  actions: {
    GetLocaleList({ commit }) {
      return new Promise((resolve, reject) => {
        ajax({
          url: '/language/conf.json',
          method: 'get'
        }).then(res => {
          commit('SET_LOCALE_LIST', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetLanguage({ commit }, lang) {
      commit('RESET_LANGUAGE', lang)
    }
  }
};

export default storeModule;
