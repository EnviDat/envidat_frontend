import axios from 'axios';

import {
  CHECK_FRONTEND_VERSION,
  CHECK_FRONTEND_VERSION_NEW,
} from '@/store/mutationsConsts';

// const globalMethods = require('@/components/globalMethods');


export default {
  [CHECK_FRONTEND_VERSION]({ commit }) {
    const response = {
      data: { version: '0.5.71' },
    };

    // const url = 'version.json'; // urlRewrite('version.json', SOLR_API_BASE, SOLR_PROXY);
    commit(CHECK_FRONTEND_VERSION_NEW, response.data);

    // axios.get(url)
    //   .then((response) => {
    //     commit(CHECK_FRONTEND_VERSION_NEW, response.data);
    //   })
    //   .catch((reason) => {
    //     commit(SEARCH_METADATA_ERROR, reason);
    //   });
  },
};
