import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { ref } from 'vue'

// const isAuthenticated = ref(false);
export const isAuthenticated = ref(false);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/style',
        meta: { requiresAuth: true },
      },
      {
        path: 'style',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'add',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const storageAuth = localStorage.getItem('isAuthenticated');
  // Redirect to the login page if not authenticated
  if (to.meta.requiresAuth && !storageAuth || storageAuth ==="false") {
    next('/');
  }
  else {
    // Continue to the route if authenticated
    next();
  }
});
export default router
