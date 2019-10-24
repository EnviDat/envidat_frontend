/**
 * policies store module
 *
 * @summary policies store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-10-23 16:34:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import actions from '@/store/modules/policies/policiesActions';
import mutations from '@/store/modules/policies/policiesMutations';

const policiesState = {
  policiesPageBackRoute: '',
  policiesMarkdown: null,
  loading: false,
};


export const policies = {
  namespaced: true,
  state: policiesState,
  getters: {
    policiesMarkdown: state => state.policiesMarkdown,
    policiesPageBackRoute: state => state.policiesPageBackRoute,
    loading: state => state.loading,
  },
  mutations,
  actions,
};
