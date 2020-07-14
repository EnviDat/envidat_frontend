/**
 * routes for the user module
 *
 * @summary routes of user module
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:20:05 
 * Last modified  : 2020-07-14 14:22:40
 * 
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import {
  USER_LOGIN_PATH,
  USER_LOGIN_PAGENAME,
} from '@/router/routeConsts';

export const userRoutes = [
  {
    path: USER_LOGIN_PATH,
    name: USER_LOGIN_PAGENAME,
    component: () => import(/* webpackPrefetch: true, webpackChunkName: "loginPage" */ '@/modules/user/components/LoginPage'),
  },  
];
