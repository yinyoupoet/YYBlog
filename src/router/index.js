import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserPage from '../views/User/UserPage'
import BlogPage from "../views/blog/BlogPage";
import BlogMainPage from "../views/blog/BlogMainPage";
import BaseBlogList from "../components/bases/BaseBlogList";
import BaseArchive from "../components/bases/BaseArchive";
import indexMessageBoard from "../components/MainIndexComponent/indexMessageBoard";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/:id',
      component: UserPage,
      children: [
        {
          path: 'archive',
          component: BaseArchive
        },
        {
          path: 'messageBoard',
          component: indexMessageBoard
        },
        {
          path: '/',
          component: BaseBlogList
        },
        {
          path: '*',
          component: BaseBlogList
        }
      ]
    },
    {
      path: '/blog/:id',
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

