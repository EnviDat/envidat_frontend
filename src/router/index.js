import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/Pages/LandingPage';
import BrowsePage from '@/components/Pages/BrowsePage';
import MetadataDetailPage from '@/components/Pages/MetadataDetailPage';
import ResourceDetailPage from '@/components/Pages/ResourceDetailPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/browse/:search/category/:category',
      name: 'BrowsePage',
      component: BrowsePage,
    },
    {
      path: '/browse/:search',
      name: 'BrowsePage',
      component: BrowsePage,
    },
    {
      path: '/metadata/:urlId',
      name: 'MetadataDetailPage',
      component: MetadataDetailPage,
    },
    {
      path: '/dataresource/:id',
      name: 'ResourceDetailPage',
      component: ResourceDetailPage,
    },
  ],
});
