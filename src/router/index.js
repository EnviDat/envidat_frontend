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
    /*
    {
      path: '/browse/:category',
      name: 'BrowsePage',
      component: BrowsePage,
    },
    */
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
  ],
});
