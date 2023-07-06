import CpNavbar from '@/components/cp-nav-bar.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavbar
  }
}
