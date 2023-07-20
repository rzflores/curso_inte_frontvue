// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LoginView.vue'),    
  },  
  {
    path: '/home',
    component: () => import('@/layouts/HomeLayout.vue'), 
    children:[
      {
        path: 'catalogo',
        component: () => import('@/views/CatalogoView.vue'),    
      }, 
      {
        path: 'ventas',
        component: () => import('@/views/VentasView.vue'),    
      }, 
    ]   
  }, 
  {
    path: '/homeAdmin',
    component: () => import('@/layouts/HomeAdminLayout.vue'), 
    children:[
      {
        path: 'catalogoAdmin',
        component: () => import('@/views/adminViews/CatalogoAdmin.vue'),    
      }, 
      {
        path: 'sucursalesAdmin',
        component: () => import('@/views/adminViews/SucursalesAdmin.vue'),    
      }, 
      {
        path: 'usuariosAdmin',
        component: () => import('@/views/adminViews/UsuariosAdmin.vue'),    
      }, 
      {
        path: 'cuponesAdmin',
        component: () => import('@/views/adminViews/CuponesAdmin.vue'),    
      }, 
      {
        path: 'permisosAdmin',
        component: () => import('@/views/adminViews/PermisosAdmin.vue'),    
      }, 
      {
        path: 'enviosAdmin',
        component: () => import('@/views/adminViews/EnviosAdmin.vue'),    
      },
      {
        path: 'reporteStock',
        component: () => import('@/views/adminViews/ReporteStock.vue'),    
      },
      {
        path: 'reporteVencimiento',
        component: () => import('@/views/adminViews/ReporteVencimiento.vue'),    
      },
    ]   
  },

  {
    path:'/:patchMatch(.*)',
    component: () => import('@/views/LoginView.vue'),    
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
