/**
 * The stor of the user module
 *
 * @summary user module store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:13:14
 * Last modified  : 2020-07-14 14:14:31
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

// import actions from './projectsActions';
// import mutations from './projectsMutations';

const userState = {
  loading: false,
};


export const projects = {
  namespaced: true,
  state: userState,
  getters: {
    loading: state => state.loading,
  },
  // mutations,
  // actions,
};
