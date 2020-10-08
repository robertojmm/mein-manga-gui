import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@web/views/Home.vue';
import Dashboard from '@web/views/Dashboard.vue';
import Manga from '@web/views/Manga.vue';
import Chapter from '@web/views/Chapter.vue';
import store from '@web/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '',
    redirect: 'home',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/library',
        name: 'Library',
        component: () => import('@web/views/Library.vue'),
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@web/views/Admin.vue'),
        meta: {
          permission: 'admin',
        },
        children: [
          {
            path: '/admin/manga/add',
            name: 'AddManga',
            component: () => import('@web/views/admin/manga/AddManga.vue'),
          },
          {
            path: '/admin/manga/delete',
            name: 'DeleteManga',
            component: () => import('@web/views/admin/manga/DeleteManga.vue'),
          },
          {
            path: '/admin/chapter/add',
            name: 'AddChapter',
            component: () => import('@web/views/admin/chapter/AddChapter.vue'),
          },
          {
            path: '/admin/chapter/edit',
            name: 'EditChapter',
            component: () => import('@web/views/admin/chapter/EditChapter.vue'),
          },
          {
            path: '/admin/chapter/delete',
            name: 'DeleteChapter',
            component: () =>
              import('@web/views/admin/chapter/DeleteChapter.vue'),
          },
          {
            path: '/admin/user/add',
            name: 'AddUser',
            component: () => import('@web/views/admin/user/AddUser.vue'),
          },
          {
            path: '/admin/user/edit',
            name: 'EditUser',
            component: () => import('@web/views/admin/user/EditUser.vue'),
          },
          {
            path: '/admin/user/delete',
            name: 'DeleteUser',
            component: () => import('@web/views/admin/user/DeleteUser.vue'),
          },
        ],
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@web/views/Settings.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@web/views/About.vue'),
      },
      {
        path: '/manga/:id',
        name: 'Manga',
        component: Manga,
      },
      {
        path: '/manga/:mangaId/:chapterNo',
        name: 'Chapter',
        component: Chapter,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@web/views/Login.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@web/views/NotFound.vue'),
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@web/views/Unauthorized.vue'),
  },
  {
    path: '/install',
    name: 'Install',
    component: () => import('@web/views/Install.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.permission)) {
    store.getters.userIsAdmin ? next() : next('/unauthorized');
    return;
  }
  next();
});

export default router;
