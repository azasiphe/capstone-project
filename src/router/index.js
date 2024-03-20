import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'; 
import view from '../views/ViewView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/users',
    name: 'users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OrdView.vue')
  },
  
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: {
      requiresAuth: true, // Indicates that authentication is required for this route
      requiresRole: true, // Indicates that a specific role is required for this route
      requiredRole: 'admin' // Specifies the required role for this route
    }
  },
  {
    path: '/products',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductsView.vue'),
    meta: {
      requiresAuth: true, // Indicates that authentication is required for this route
      requiresRole: true, // Indicates that a specific role is required for this route
      requiredRole: 'user' // Specifies the required role for this route
    }
  },
  {
    path: '/logout', 
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/logoutView.vue')

  }
  
  ,
  {
    path: '/view/:id',
    name: 'view',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewView.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue'),
    meta: {
      requiresAuth: true, // Indicates that authentication is required for this route
      requiresRole: true, // Indicates that a specific role is required for this route
      requiredRole: 'user' // Specifies the required role for this route
    }
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckoutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; 
  const Role = store.state.Role;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); 
  } else {
    if (to.meta.requiresRole && userRole !== to.meta.requiredRole) {
      next('/unauthorized');
    } else {
      next(); 
    }
  }
});


export default router
