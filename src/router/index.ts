import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeViewVue,
      name: 'Home'
    },
    {
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
      name: 'about'
    }
  ]
})

export default router
