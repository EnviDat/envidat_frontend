/**
 * about page store module
 *
 * @summary main vuex store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:34:51
 * Last modified  : 2019-11-22 13:28:12
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { policies } from '@/pages/about/store/policies/policies';
import { guidelines } from '@/store/modules/guidelines/guidelines';

const state = {
  policies,
  guidelines,
};

export const metadata = {
  namespaced: true,
  state,
  getters: {
    policies: state => state.policies,
    guidelines: state => state.guidelines,
  },
  mutations,
  actions,
};
