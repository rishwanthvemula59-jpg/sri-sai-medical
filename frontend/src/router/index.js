// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

// Pages
import HomePage from '@/pages/HomePage.vue'
import DoctorDirectoryPage from '@/pages/DoctorDirectoryPage.vue'
import MedicineDetailsPage from '@/pages/MedicineDetailsPage.vue'
import NotificationsPage from '@/pages/NotificationsPage.vue'
import ScanCameraPage from '@/pages/ScanCameraPage.vue'
import ContactLocationPage from '@/pages/ContactLocationPage.vue'
import AdminDashboardPage from '@/pages/AdminDashboardPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage,
        meta: { title: 'Home - Sri Sai Medical Centre' },
      },
      {
        path: '/doctors',
        name: 'Doctors',
        component: DoctorDirectoryPage,
        meta: { title: 'Doctors - Sri Sai Medical Centre' },
      },
      {
        path: '/medicines',
        name: 'Medicines',
        component: MedicineDetailsPage,
        meta: { title: 'Medicines - Sri Sai Medical Centre' },
      },
      {
        path: '/medicine/:id',
        name: 'MedicineDetail',
        component: MedicineDetailsPage,
        meta: { title: 'Medicine Details - Sri Sai Medical Centre' },
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: NotificationsPage,
        meta: { title: 'Notifications - Sri Sai Medical Centre' },
      },
      {
        path: '/scan',
        name: 'ScanCamera',
        component: ScanCameraPage,
        meta: { title: 'Scan Medicine - Sri Sai Medical Centre' },
      },
      {
        path: '/contact',
        name: 'Contact',
        component: ContactLocationPage,
        meta: { title: 'Contact & Location - Sri Sai Medical Centre' },
      },
      {
        path: '/admin',
        name: 'AdminDashboard',
        component: AdminDashboardPage,
        meta: { 
          title: 'Admin Dashboard - Sri Sai Medical Centre',
          requiresAuth: true,
          role: 'admin'
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: { title: 'Not Found - Sri Sai Medical Centre' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard for title updates
router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'Sri Sai Medical Centre'
  document.title = title
  next()
})

export default router
