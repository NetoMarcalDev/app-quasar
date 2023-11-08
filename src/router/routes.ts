import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/LoginPage.vue') },
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'cadastro', name: 'cadastro', component: () => import('pages/Register.vue') },
      { path: 'email-confirmacao', name: 'email-confirmacao', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'esqueci-minha-senha', name: 'esqueci-minha-senha', component: () => import('pages/ForgotPassword.vue') },
      { path: 'alterar-senha', name: 'alterar-senha', component: () => import('pages/ResetPassword.vue') },
      { path: 'produtos/:id', name: 'produtos', component: () => import('pages/product/Public.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') }
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'categoria', name: 'categoria', component: () => import('pages/category/List.vue') },
      { path: 'form-categoria/:id?', name: 'form-categoria', component: () => import('pages/category/Form.vue') },
      { path: 'form-produto/:id?', name: 'form-produto', component: () => import('pages/product/Form.vue') },
      { path: 'form-config/:id?', name: 'form-config', component: () => import('pages/config/Form.vue') },
      { path: 'produto', name: 'produto', component: () => import('pages/product/List.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
