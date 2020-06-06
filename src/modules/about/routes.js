import {
  ABOUT_PATH,
  ABOUT_PAGENAME,
} from '@/router/routeConsts';

export const aboutRoutes = [
  {
    path: ABOUT_PATH,
    name: ABOUT_PAGENAME,
    component: () => import(/* webpackChunkName: "aboutPage" */ '@/modules/about/components/AboutPage'),
  },
];
