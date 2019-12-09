import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Nav from '@/components/Nav'
import Statics from '@/components/Statics'
import User from '@/components/User'
import Account from '@/components/Account'
import Stocks from '@/components/Stocks'
import Orders from '@/components/Orders'
import ItemMenu from '@/components/ItemMenu'
import StocksManage from '@/components/StocksManage'
import ItemManage from '@/components/ItemManage'

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
        {
          path: 'itemmenu',
          name: 'ItemMenu',
          component: ItemMenu,
        },
        {
          path: 'itemmanage',
          name: 'ItemManage',
          component: ItemManage,
        },
        {
          path: 'stocksmanage',
          name: 'StocksManage',
          component: StocksManage,
        },
        {
          path: 'stocks',
          name: 'Stocks',
          component: Stocks,
        },     
      ]  
    }
  ]
})
