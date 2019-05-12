import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserPage from '../views/User/UserPage'
import BlogPage from "../views/blog/BlogPage";
import BlogMainPage from "../views/blog/BlogMainPage";
import BaseBlogList from "../components/bases/BaseBlogList";
import BaseArchive from "../components/bases/BaseArchive";
import indexMessageBoard from "../components/MainIndexComponent/indexMessageBoard";
import EditBlog from "../views/editor/EditBlog";
import UserAccountManager from "../views/User/UserAccountManager";
import UserBlogManager from "../views/User/UserBlogManager";
import BlogManagerAll from "../views/blogmanager/BlogManagerAll";
import BlogManagerPublic from "../views/blogmanager/BlogManagerPublic";
import BlogManagerPrivate from "../views/blogmanager/BlogManagerPrivate";
import BlogManagerDraft from "../views/blogmanager/BlogManagerDraft";
import UserProfile from "../views/User/UserProfile";
import UserProfileCategories from "../views/profile/UserProfileCategories";
import UserProfileCollectionPage from "../views/profile/UserProfileCollectionPage";
import UserProfileMyCollection from "../views/profile/UserProfileMyCollection";
import UserProfileOtherCollection from "../views/profile/UserProfileOtherCollection";
import CollectionDir from "../views/collection/CollectionDir";
import UserProfileFollowPage from "../views/profile/UserProfileFollowPage";
import UserProfileMyFollower from "../views/profile/UserProfileMyFollower";
import UserProfileMyFans from "../views/profile/UserProfileMyFans";
import NotFound from "../views/NotFound";
import IndexCategory from "../views/index/IndexCategory";


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
    },{
      path: '/editor',
      component: EditBlog
    },
    {
      path: '/userAccountManager/:id',
      component: UserAccountManager
    },
    {
      path: '/userBlogManager/:id',
      component: UserBlogManager,
      children: [
        {
          path: 'public',
          component: BlogManagerPublic
        },
        {
          path: 'private',
          component: BlogManagerPrivate
        },
        {
          path: 'draft',
          component: BlogManagerDraft
        },
        {
          path: '/',
          component: BlogManagerAll
        },
        {
          path: '*',
          component: BlogManagerAll
        }
      ]
    },
    {
      path: '/userProfile/:id',
      component: UserProfile,
      children: [
        {
          path: 'collection',
          component: UserProfileCollectionPage,
          children: [
            {
              path: 'myDir',
              component: UserProfileMyCollection
            },
            {
              path: 'otherDir',
              component: UserProfileOtherCollection
            },
            {
              path: '*',
              component: UserProfileMyCollection
            }
          ]
        },{
          path: 'follow',
          component: UserProfileFollowPage,
          children: [
            {
              path: 'myFollower',
              component: UserProfileMyFollower
            },
            {
              path: 'myFans',
              component: UserProfileMyFans
            },
            {
              path: '*',
              component: UserProfileMyFollower
            }
          ]
        },
        {
          path: '/',
          component: UserProfileCategories
        },
        {
          path: '*',
          component: UserProfileCategories,
        }
      ]
    },
    {
      path: '/collectionDir/:id',
      component: CollectionDir
    },
    {
      path: '/:id?',
      component: Index
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

