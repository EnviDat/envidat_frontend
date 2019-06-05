/* eslint-disable prefer-template */
import Vue from 'vue';
import Router from 'vue-router';
// import LandingPage from '@/components/Pages/LandingPage';
// import BrowsePage from '@/components/Pages/BrowsePage';
// import MetadataDetailPage from '@/components/Pages/MetadataDetailPage';
// import ResourceDetailPage from '@/components/Pages/ResourceDetailPage';
// import GCMDPage from '@/components/Pages/GCMDPage';
// import AboutPage from '@/components/Pages/AboutPage';
import {
  LANDING_PATH,
  BROWSE_PATH,
  BROWSE_NAME,
  METADATADETAIL_PATH,
  METADATADETAIL_NAME,
  GCMD_PATH,
  ABOUT_PATH,
} from '@/router/routeConsts';

Vue.use(Router);

const START = '/';
const trailingSlashRE = /\/?$/;

export default new Router({
  routes: [
    {
      path: LANDING_PATH,
      name: 'LandingPage',
      component: () => import(/* webpackChunkName: "landingPage" */ '@/components/Pages/LandingPage'),
      // component: () => import('@/components/Pages/LandingPage'),
    },
    {
      path: BROWSE_PATH,
      name: BROWSE_NAME,
      component: () => import(/* webpackChunkName: "browsePage" */ '@/components/Pages/BrowsePage'),
    },
    {
      path: `${METADATADETAIL_PATH}/:metadataid`,
      name: METADATADETAIL_NAME,
      component: () => import(/* webpackChunkName: "metadataDetailPage" */ '@/components/Pages/MetadataDetailPage'),
    },
    {
      path: `${METADATADETAIL_PATH}/:metadataid/resource/:resourceid`,
      name: 'ResourceDetailPage',
      component: () => import(/* webpackChunkName: "resourceDetailPage" */ '@/components/Pages/ResourceDetailPage'),
    },
    {
      path: GCMD_PATH,
      name: 'GCMDPage',
      component: () => import(/* webpackChunkName: "gcmdPage" */ '@/components/Pages/GCMDPage'),
    },
    {
      path: ABOUT_PATH,
      name: 'AboutPage',
      component: () => import(/* webpackChunkName: "aboutPage" */ '@/components/Pages/AboutPage'),
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
  // methods is available as this.$router.options.isObjectEqual
  isObjectEqual: function isObjectEqual(a, b) {
    // if (a === void 0) a = {};
    // if (b === void 0) b = {};
    if (a === null) a = {};
    if (b === null) b = {};

    // handle null value #1566
    if (!a || !b) { return a === b; }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    return aKeys.every((key) => {
      const aVal = a[key];
      const bVal = b[key];
      // check nested equality
      if (typeof aVal === 'object' && typeof bVal === 'object') {
        return this.isObjectEqual(aVal, bVal);
      }
      return String(aVal) === String(bVal);
    });
  },
  // methods is available as this.$router.options.isSameRoute
  isSameRoute: function isSameRoute(a, b) {
    if (b === START) {
      return a === b;
    } else if (!b) {
      return false;
    } else if (a.path && b.path) {
      return (
        a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
        a.hash === b.hash &&
        this.isObjectEqual(a.query, b.query)
      );
    } else if (a.name && b.name) {
      return (
        a.name === b.name &&
        a.hash === b.hash &&
        this.isObjectEqual(a.query, b.query) &&
        this.isObjectEqual(a.params, b.params)
      );
    }
    return false;
  },
});
