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

import actions from '@/pages/about/store/guidelines/guidelinesActions';
import mutations from '@/pages/about/store/guidelines/guidelinesMutations';

const guidelinesState = {
  guidelinesPageBackRoute: '',
  guidelinesMarkdown: null,
  guidelinesLoading: false,
};


export const guidelines = {
  namespaced: true,
  state: guidelinesState,
  getters: {
    guidelinesMarkdown: state => state.guidelinesMarkdown,
    guidelinesPageBackRoute: state => state.guidelinesPageBackRoute,
    guidelinesLoading: state => state.guidelinesLoading,
  },
  mutations,
  actions,
};
