import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home
    }
  }
]

routes.forEach(route => {
  route.components.header = Header;
  route.components.sidebar = Sidebar;
})

const router = new VueRouter({
  routes
})

export default router
