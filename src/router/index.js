import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/Index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '轻摇',
        viewport: 'width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes',
        'apple-mobile-web-app-capable': 'yes',
        'format-detection': 'telephone=no',
        httpEquiv: 'Content-Type',
        content: "multipart/form-data; charset=utf-8"
      }
    }
  ]
})

