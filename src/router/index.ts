import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false // 是否展示加载中的loading小圆圈
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: {
        title: '家庭档案'
      }
    },
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: {
            title: '消息通知'
          }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: {
            title: '个人中心'
          }
        }
      ]
    }
  ]
})

// 全局前置守卫的拦截
// 如果没有token同时要去需要权限的界面的话，重定向到login
router.beforeEach((to) => {
  // 路由跳转之前开启滚动条
  NProgress.start()
  const userStore = useUserStore()
  const whiteList = ['/login']
  if (!userStore.user?.token && !whiteList.includes(to.path)) return '/login'
  // 其他情况不做任何处理，可以理解为放行
})

router.afterEach((to) => {
  // 路由跳转之后关闭滚动条
  document.title = `优医问诊-${to.meta.title}`
  NProgress.done()
})

export default router
