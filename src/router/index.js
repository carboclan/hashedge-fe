import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/staking',
      name: 'staking',
      component: HelloWorld
    },
    {
      path: '/trading',
      name: 'trading',
      component: HelloWorld
    },
    {
      path: '/my_portfolio',
      name: 'my_portfolio',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/staking'
    }
  ]
})
