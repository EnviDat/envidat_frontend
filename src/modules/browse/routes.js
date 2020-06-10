import {
  BROWSE_PATH,
  BROWSE_PAGENAME,
  METADATADETAIL_PATH,
  METADATADETAIL_PAGENAME,
} from '@/router/routeConsts';

export const browseRoutes = [
  {
    path: BROWSE_PATH,
    name: BROWSE_PAGENAME,
    component: () => import(/* webpackPrefetch: true, webpackChunkName: "browsePage" */ '@/modules/browse/components/BrowsePage'),
  },
  {
    path: `${METADATADETAIL_PATH}/:metadataid`,
    name: METADATADETAIL_PAGENAME,
    component: () => import(/* webpackChunkName: "metadataDetailPage" */ '@/modules/browse/components/MetadataDetailPage'),
  },
  // {
  //   path: `${METADATADETAIL_PATH}/:metadataid/resource/:resourceid`,
  //   name: 'ResourceDetailPage',
  //   component: () => import(/* webpackChunkName: "resourceDetailPage" */ '@/components/Pages/ResourceDetailPage'),
  // },
];
