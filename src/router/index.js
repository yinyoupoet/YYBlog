import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserMainPage from '../views/User/UserMainPage'
import UserArchive from '../views/User/UserArchive'
import UserPage from '../views/User/UserPage'
import UserMessageBoard from "../views/User/UserMessageBoard";
import BlogPage from "../views/blog/BlogPage";
import BlogMainPage from "../views/blog/BlogMainPage";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/:id',
      name: 'UserPage',
      component: UserPage,
      children: [
        {
          path: 'archive',
          component: UserArchive
        },
        {
          path: 'messageBoard',
          component: UserMessageBoard
        },
        {
          path: '/',
          component: UserMainPage
        }
      ]
    },
    {
      path: '/blog/:id',
      name: 'BlogPage',
      component: BlogPage,
      children: [
        {
          path: '/',
          component: BlogMainPage
        }
      ]
    },
    {
      path: '/',
      name: '404',
      component: Index,
    }
  ]
})

