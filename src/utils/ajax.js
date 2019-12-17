import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import { t } from 'element-ui/src/locale'
const $ajax = axios.create({
  baseURL: '',
  timeout: 120000,
  paramsSerializer: function(params) {
    var result = []
    var _params = Object.assign({}, params)
    if (_params) {
      Object.keys(_params).forEach(key => {
        if (_params[key] != null) {
          if (typeof _params[key] == 'string') {
            try {
              _params[key] = encodeURIComponent(decodeURIComponent(_params[key]))
            } catch (e) {
              _params[key] = encodeURIComponent(_params[key])
            }
          }
          result.push(`${key}=${_params[key]}`)
        }
      })
    }
    return result.join('&')
  }
})
const requestQueue = []

function generateErrors(error) {
  let key = (error && error.response && error.response.data && error.response.data.message) || (error && error.message) || error;
  let message = t('errors').hasOwnProperty(key) ? t('errors')[key] : (key || t('errors.defaultMsg'))
  return message
}
// 拦截请求
$ajax.interceptors.request.use(config => {

  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  config.headers['lang'] = Vue.config.lang;

  // 发起请求后冷冻页面
  if (!config.bypassed) {
    config.timestamp = new Date().getTime()
    requestQueue.push(config.timestamp)
    Vue.config.store.commit('SET_LOADING_STATE', true)
  }
  return config
}, error => {
  Promise.reject(error)
})
// 统一错误处理
$ajax.interceptors.response.use(
  response => {
    requestQueue.splice(requestQueue.indexOf(response.config.timestamp), 1)
    if (requestQueue.length == 0) Vue.config.store.commit('SET_LOADING_STATE', false)
    if (response.status >= 200 && response.status < 300) {
      if (response.data.entity !== undefined) {
        return Promise.resolve(response.data.entity)
      } else {
        return Promise.resolve(response.data)
      }
    } else return response
  },
  error => {
    let timestamp = error && error.config && error.config.timestamp
    if (timestamp) {
      requestQueue.splice(requestQueue.indexOf(timestamp), 1)
    }
    if (requestQueue.length == 0) Vue.config.store.commit('SET_LOADING_STATE', false)
    if (!error.message) {
      return Promise.reject(error)
    }
    if (error.response && (/\/token\/_refresh/).test(error.request.responseURL) && 400 == error.response.status) {
      Vue.config.store.commit('REDIRECT_TO_LOGIN')
    }

    if (error.message == 'Network Error') {
      error.message = t('common.message.error.network')
      return Promise.reject(error)
    }
    if (401 === error.response.status) {
      if (error.response.data.message !== 'invalid_tenant') {
        if (error.response.data && error.response.data.code) {
          let code = error.response.data.code
          let errorCodes = [104101, 104102, 104103]
          if (errorCodes.indexOf(code) !== -1) {
            return Message.error(generateErrors(error))
          }
        }
        Vue.config.store.commit('REDIRECT_TO_LOGIN')
      }
    }
    if (400 === error.response.status || 403 === error.response.status || 500 == error.response.status) {
      if (error.response.config.handle === true && error.response.status === 400) {
        if (error.response.data && error.response.data.errors) {
          if (error.response.data.errors.length) {
            error.response.data.errors = error.response.data.errors.map(item => {
              if (item.key && item.code) {
                item.code = generateErrors(item.code)
                return item
              }
              return item
            })
          }
          return Promise.reject(error)
        }
      }
      let msg = generateErrors(error)
      Message.error(msg)
      return Promise.reject(error)
    }

    return Promise.reject(error)
  })

export function buildCancelToken(target, methodName) {
  let CancelToken = axios.CancelToken
  return new CancelToken(function(c) {
    target[methodName] = c
  })
}

export default $ajax
