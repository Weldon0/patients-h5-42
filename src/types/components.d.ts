import CpNavbar from '@/components/cp-nav-bar.vue'
import CpIcon from '@/components/CpIcon.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavbar
    CpIcon: typeof CpIcon
  }
}
