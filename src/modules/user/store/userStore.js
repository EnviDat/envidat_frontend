/**
 * The stor of the user module
 *
 * @summary user module store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:13:14
 * Last modified  : 2020-07-14 17:59:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import actions from './userActions';
import mutations from './userMutations';

const userState = {
  userLoading: false,
  signInLoading: false,
  signInSuccess: false,
  requestLoading: false,
  requestSuccess: false,
  user: null,
  error: null,
};


export const user = {
  namespaced: true,
  state: userState,
  getters: {
    userLoading: state => state.userLoading,
    signInLoading: state => state.signInLoading,
    signInSuccess: state => state.signInSuccess,
    requestLoading: state => state.requestLoading,
    requestSuccess: state => state.requestSuccess,
    user: state => state.user,
    error: state => state.error,
  },
  mutations,
  actions,
};
