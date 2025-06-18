import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Cart from '../views/CartView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: Product },
  { path: '/cart', component: Cart },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
