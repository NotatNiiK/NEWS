import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/MainPage')
  },
  {
    path: '/news',
    component: () => import('../views/NewsPage')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
