import { createRouter, createWebHistory } from 'vue-router';
import NewsList from './components/NewsList.vue';
import NewsDetail from './components/NewsDetail.vue';

const routes = [
  {
    path: '/',
    component: NewsList
  },
  {
    path: '/news',
    component: NewsList
  },
  {
    path: '/news/:id',
    component: NewsDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;    