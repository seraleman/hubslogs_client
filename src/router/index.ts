import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import reasonRouter from '../modules/reason/router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../modules/ui/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../modules/ui/pages/HomePage.vue'),
      },
      {
        path: 'reasons',
        ...reasonRouter,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('../modules/ui/views/Error404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
