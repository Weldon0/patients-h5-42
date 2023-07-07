import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('@/views/User/index.vue')
    }
  ]
})

export default router
