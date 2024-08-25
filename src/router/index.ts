import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Game1 from '../components/Game1.vue'
import Game3 from '../components/Game3.vue'
import FeedBack from '../components/FeedBack.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game1',
      name: 'game1',
      component: Game1
    },
    {
      path: '/game3',
      name: 'game3',
      component: Game3
    },
    // 问卷二维码页
    {
      path: '/feedback',
      name: 'feedBack',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FeedBack
    }
  ]
})

export default router
