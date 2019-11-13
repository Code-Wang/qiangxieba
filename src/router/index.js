import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Nav from '@/components/Nav'
import Statics from '@/components/Statics'
import User from '@/components/User'
import Account from '@/components/Account'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/nav',
      name: 'Nav',
      component: Nav,
      children: [
        {
          path: 'statics',
          name: 'Statics',
          component: Statics
        },        
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },       
      ]  
    }
  ]
})
