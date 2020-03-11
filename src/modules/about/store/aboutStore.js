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

import { policies } from '@/modules/about/store/policies/policies';
import { guidelines } from '@/modules/about/store/guidelines/guidelines';

export const about = {
  namespaced: true,
  state: { ...policies.state, ...guidelines.state },
  getters: { ...policies.getters, ...guidelines.getters },
  mutations: { ...policies.mutations, ...guidelines.mutations },
  actions: { ...policies.actions, ...guidelines.actions },
};
