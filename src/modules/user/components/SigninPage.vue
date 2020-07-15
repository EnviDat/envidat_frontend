
<template >

  <v-card class="pa-4">

    <signinView :prefilledEmail="prefilledEmail"
                :prefilledKey="prefilledKey"
                :signInLoading="signInLoading"
                :signInSuccess="signInSuccess"
                :signedIn="user !== null"
                :signedInColor="$vuetify.theme.themes.light.highlight"
                :requestLoading="requestLoading"
                :requestSuccess="requestSuccess"
                :formErrorText="errorText()"
                :errorFieldText="error"
                :showError="error !== null"
                :errorField="errorField"
                :errorColor="$vuetify.theme.themes.light.errorHighlight"
                @requestToken="catchRequestToken"
                @signIn="catchSignIn"
                @signOut="catchSignOut" />

  </v-card>

</template>

<script>
/**
 * Login Page
 *
 * @summary Login page
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:18:32 
 * Last modified  : 2020-07-15 23:35:41
 */

import { mapGetters } from 'vuex';

import {
  USER_NAMESPACE,
  GET_USER_CONTEXT,
  USER_SIGNIN,
  REQUEST_TOKEN,
  VALIDATION_ERROR,
  USER_SIGNOUT,
} from '@/modules/user/store/userMutationsConsts';

import SigninView from './SigninView';

export default {
  components: {
    SigninView,
  },
  beforeMount() {
    this.checkUserSignedIn();
  },
  computed: {
    ...mapGetters(
      USER_NAMESPACE,
      [
        'userLoading',
        'signInLoading',
        'signInSuccess',
        'requestLoading',
        'requestSuccess',
        'user',
        'error',
        'errorType',
        'errorField',
      ],
    ),
    prefilledEmail() {
      return this.$route.query.email;
    },
    prefilledKey() {
      return this.$route.query.key;
    },
  },
  methods: {
    errorText() {
      let errMsg = 'Please make sure everything is filled correctly';

      if (this.error) {
        if (this.errorType === VALIDATION_ERROR) {
          errMsg = `A field was filled incorrectly: ${this.error}`;
        }
      }

      return errMsg;
    },
    checkUserSignedIn() {
      this.$store.dispatch(`${USER_NAMESPACE}/${GET_USER_CONTEXT}`);
    },
    catchSignIn(email, key) {
      this.$store.dispatch(`${USER_NAMESPACE}/${USER_SIGNIN}`, { email, key });
    },
    catchRequestToken(email) {
      this.$store.dispatch(`${USER_NAMESPACE}/${REQUEST_TOKEN}`, { email });
    },
    catchSignOut() {
      this.$store.dispatch(`${USER_NAMESPACE}/${USER_SIGNOUT}`);
    },
  },
  data: () => ({
  }),
};
</script>


<style lang="scss" scoped>

</style>
