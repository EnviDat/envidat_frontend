/**
 * guidelines store module
 *
 * @summary guidelines store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51 
 * Last modified  : 2019-10-23 16:34:51 
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import actions from '@/store/modules/guidelines/guidelinesActions';
import mutations from '@/store/modules/guidelines/guidelinesMutations';

const guidelinesState = {
  guidelinesPageBackRoute: '',
  guidelinesMarkdown: null,
  loading: false,
};


export const guidelines = {
  namespaced: true,
  state: guidelinesState,
  getters: {
    guidelinesMarkdown: state => state.guidelinesMarkdown,
    guidelinesPageBackRoute: state => state.guidelinesPageBackRoute,
    loading: state => state.loading,
  },
  mutations,
  actions,
};
