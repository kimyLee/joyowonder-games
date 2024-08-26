import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Game1 from '../components/Game1.vue'
import Game2 from '../components/Game2.vue'
import Game3 from '../components/Game3.vue'
import Game4 from '../components/Game4.vue'
import Game5 from '../components/Game5.vue'
import FeedBack from '../components/FeedBack.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/game2',
      name: 'game2',
      component: Game2
    },
    {
      path: '/game3',
      name: 'game3',
      component: Game3
    },
    {
      path: '/game4',
      name: 'game4',
      component: Game4
    },
    {
      path: '/game5',
      name: 'game5',
      component: Game5
    },
    // 问卷二维码页
    {
      path: '/feedback',
      name: 'feedback',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FeedBack
    }
  ]
})

export default router
