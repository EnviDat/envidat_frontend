import {
  ABOUT_PATH,
  ABOUT_PAGENAME,
  // POLICIES_PATH,
  // POLICIES_PAGENAME,
  // GUIDELINES_PATH,
  // GUIDELINES_PAGENAME,
} from '@/router/routeConsts';

export const aboutRoutes = [
  {
    path: ABOUT_PATH,
    name: ABOUT_PAGENAME,
    component: () => import(/* webpackChunkName: "aboutPage" */ '@/modules/about/components/AboutPage'),
  },
  // {
  //   path: POLICIES_PATH,
  //   name: POLICIES_PAGENAME,
  //   component: () => import(/* webpackChunkName: "policiesPage" */ '@/components/Pages/PoliciesPage'),
  // },
  // {
  //   path: GUIDELINES_PATH,
  //   name: GUIDELINES_PAGENAME,
  //   component: () => import(/* webpackChunkName: "guidelinesPage" */ '@/components/Pages/GuidelinesPage'),
  // },
];
