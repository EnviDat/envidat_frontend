import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/Pages/LandingPage';
import BrowsePage from '@/components/Pages/BrowsePage';
import MetadataDetailPage from '@/components/Pages/MetadataDetailPage';
import ResourceDetailPage from '@/components/Pages/ResourceDetailPage';
import GCMDPage from '@/components/Pages/GCMDPage';
import AboutPage from '@/components/Pages/AboutPage';
import AboutPage2 from '@/components/Pages/AboutPage2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/browse/:category',
      name: 'BrowsePage',
      component: BrowsePage,
    },
    {
      path: '/browse',
      name: 'BrowsePage',
      component: BrowsePage,
    },
    {
      path: '/metadata/:metadataid',
      name: 'MetadataDetailPage',
      component: MetadataDetailPage,
    },
    {
      path: '/metadata/:metadataid/resource/:resourceid',
      name: 'ResourceDetailPage',
      component: ResourceDetailPage,
    },
    {
      path: '/gcmd/',
      name: 'GCMDPage',
      component: GCMDPage,
    },
    {
      path: '/about/',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/about2/',
      name: 'AboutPage2',
      component: AboutPage2,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          if (savedPosition) {
            return savedPosition;
          }

          return { x: 0, y: 0 };
        });
      }, 450);
    });
  },
});
