import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free-solid'
const components = [
  FontAwesomeIcon
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  });
}

export default install
