import Vue from 'vue'
import Router from 'vue-router'
import Staking from '@/components/Staking'
import Trading from '@/components/Trading'
import MyPortfolio from '@/components/MyPortfolio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/staking',
      name: 'staking',
      component: Staking
    },
    {
      path: '/trading',
      name: 'trading',
      component: Trading
    },
    {
      path: '/my_portfolio',
      name: 'my_portfolio',
      component: MyPortfolio
    },
    {
      path: '*',
      redirect: '/staking'
    }
  ]
})
