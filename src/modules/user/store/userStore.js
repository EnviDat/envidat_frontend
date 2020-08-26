/**
 * The stor of the user module
 *
 * @summary user module store
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:13:14
 * Last modified  : 2020-08-19 11:44:32
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { tagsIncludedInSelectedTags } from '@/factories/metadataFilterMethods';

import actions from './userActions';
import mutations from './userMutations';

const userState = {
  userLoading: false,
  signInLoading: false,
  signInSuccess: false,
  requestLoading: false,
  requestSuccess: false,
  filteringTagNames: [],
  user: null,
  userOrganizationLoading: false, 
  userOrganizationIds: [],
  userOrganizations: {},
  error: null,
  errorType: '',
  errorField: '',
};


export const user = {
  namespaced: true,
  state: userState,
  getters: {
    userDatasets: (state) => {
      const userObj = state.user;

      if (userObj && userObj.datasets && userObj.datasets.length > 0) {
        return state.user.datasets;
      }

      return null;
    },
    filteredDatasets: (state, getters) => {
      const filteredContent = [];
      const content = getters.userDatasets;

      if (content) {
        for (let i = 0; i < content.length; i++) {
          const entry = content[i];

          if (entry.tags && tagsIncludedInSelectedTags(entry.tags, state.filteringTagNames)) {
            filteredContent.push(entry);
          }
        }
      }

      return filteredContent;
    },
  },
  mutations,
  actions,
};
