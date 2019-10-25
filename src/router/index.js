/**
 * main vue-router file. it lists all the possible routes.
 *
 * @summary list of the routes
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:33:32 
 * Last modified  : 2019-10-25 15:40:50
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable prefer-template */
import Vue from 'vue';
import Router from 'vue-router';
import {
  LANDING_PATH,
  BROWSE_PATH,
  BROWSE_PAGENAME,
  METADATADETAIL_PATH,
  METADATADETAIL_PAGENAME,
  GCMD_PATH,
  GCMD_PAGENAME,
  ABOUT_PATH,
  ABOUT_PAGENAME,
  POLICIES_PATH,
  POLICIES_PAGENAME,
  GUIDELINES_PATH,
  GUIDELINES_PAGENAME,
  PROJECTS_PATH,
  PROJECTS_PAGENAME,
  PROJECT_DETAIL_PATH,
  PROJECT_DETAIL_PAGENAME,
  REPORT_PATH,
  REPORT_PAGENAME,
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
      name: BROWSE_PAGENAME,
      component: () => import(/* webpackChunkName: "browsePage" */ '@/components/Pages/BrowsePage'),
    },
    {
      path: `${METADATADETAIL_PATH}/:metadataid`,
      name: METADATADETAIL_PAGENAME,
      component: () => import(/* webpackChunkName: "metadataDetailPage" */ '@/components/Pages/MetadataDetailPage'),
    },
    // {
    //   path: `${METADATADETAIL_PATH}/:metadataid/resource/:resourceid`,
    //   name: 'ResourceDetailPage',
    //   component: () => import(/* webpackChunkName: "resourceDetailPage" */ '@/components/Pages/ResourceDetailPage'),
    // },
    {
      path: GCMD_PATH,
      name: GCMD_PAGENAME,
      component: () => import(/* webpackChunkName: "gcmdPage" */ '@/components/Pages/GCMDPage'),
    },
    {
      path: ABOUT_PATH,
      name: ABOUT_PAGENAME,
      component: () => import(/* webpackChunkName: "aboutPage" */ '@/components/Pages/AboutPage'),
    },
    {
      path: POLICIES_PATH,
      name: POLICIES_PAGENAME,
      component: () => import(/* webpackChunkName: "policiesPage" */ '@/components/Pages/PoliciesPage'),
    },
    {
      path: GUIDELINES_PATH,
      name: GUIDELINES_PAGENAME,
      component: () => import(/* webpackChunkName: "guidelinesPage" */ '@/components/Pages/GuidelinesPage'),
    },
    {
      path: PROJECTS_PATH,
      name: PROJECTS_PAGENAME,
      component: () => import(/* webpackChunkName: "projectsPage" */ '@/components/Pages/ProjectsPage'),
    },
    {
      path: `${PROJECT_DETAIL_PATH}/:id`,
      name: PROJECT_DETAIL_PAGENAME,
      component: () => import(/* webpackChunkName: "projectDetailPage" */ '@/components/Pages/ProjectDetailPage'),
    },
    {
      path: REPORT_PATH,
      name: REPORT_PAGENAME,
      component: () => import(/* webpackChunkName: "guidelinesPage" */ "@/components/Pages/ReportPage"),
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
  isObjectEqual(a, b) {
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
  isSameRoute(a, b) {
    if (b === START) {
      return a === b;
    } if (!b) {
      return false;
    } if (a.path && b.path) {
      return (
        a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '')
        && a.hash === b.hash
        && this.isObjectEqual(a.query, b.query)
      );
    } if (a.name && b.name) {
      return (
        a.name === b.name
        && a.hash === b.hash
        && this.isObjectEqual(a.query, b.query)
        && this.isObjectEqual(a.params, b.params)
      );
    }
    return false;
  },
});
