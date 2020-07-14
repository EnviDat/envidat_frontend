
<template >

  <v-card :style="`background-color: ${bg};`">

    <signinView :prefilledEmail="prefilledEmail"
                :prefilledToken="prefilledToken"
                :signInLoading="signInLoading"
                :signInSuccess="signInSuccess"
                :signedIn="user !== null"
                :requestLoading="requestLoading"
                :requestSuccess="requestSuccess"
                @requestToken="catchRequestToken"
                @signIn="catchSignIn" />

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
 * Last modified  : 2020-07-14 18:19:49
 */

import { mapGetters } from 'vuex';

import {
  USER_NAMESPACE,
  GET_USER_CONTEXT,
  USER_SIGNIN,
  REQUEST_TOKEN,
} from '@/modules/user/store/userMutationsConsts';

import SigninView from './SigninView';

export default {
  components: {
    SigninView,
  },
  props: {
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
      ],
    ),
    bg() {
      // console.log(`user valiable? ${this.user}`);
      return this.user ? 'green' : 'red';
      // return this.signInLoading ? 'green' : 'red';
    },
    prefilledEmail() {
      return this.$route.query.email;
    },
    prefilledToken() {
      return this.$route.query.key;
    },
  },
  methods: {
    checkUserSignedIn() {
      this.$store.dispatch(`${USER_NAMESPACE}/${GET_USER_CONTEXT}`);
    },
    catchSignIn(email, key) {
      this.$store.dispatch(`${USER_NAMESPACE}/${USER_SIGNIN}`, { email, key });
    },
    catchRequestToken(email) {
      this.$store.dispatch(`${USER_NAMESPACE}/${REQUEST_TOKEN}`, { email });
    },
  },
  data: () => ({
    submitSent: false,
    submitOk: false,
    formErrorText: 'Please make sure everything is filled correctly',
  }),
};
</script>


<style lang="scss" scoped>

</style>
