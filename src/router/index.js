import Vue from 'vue'
import Router from 'vue-router'
import PhotoMapper from '@/components/PhotoMapper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PhotoMapper',
      component: PhotoMapper
    }
  ]
})
