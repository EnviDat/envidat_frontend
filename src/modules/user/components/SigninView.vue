<template>
  <v-container fluid>

    <v-row>
      <v-col class="display-2">
        {{ title }}
      </v-col>
    </v-row>

    <v-row v-if="signedIn">
      <v-col cols="12"
              class="title">
        {{ alreadSignInText }}
      </v-col>
    </v-row>

    <v-row v-if="!signedIn">
      <v-col cols="12"
              class="title">
        {{ instructionsText }}
      </v-col>
    </v-row>

    <form class="enviDatForm">
      <v-row>
        <v-col>

          <v-text-field v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        solo
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()" />
        </v-col>
      </v-row>

      <v-row v-if="email && emailErrors.length <= 0 && (!key || !keyErrors)" >
        <v-col>
          <v-text-field :label="requestTokenText"
                        readonly
                        hide-details
                        solo
                        flat />
        </v-col>
      </v-row>

      <v-row v-if="email && emailErrors.length <= 0" >

        <v-col v-if="!key || !keyErrors"
              cols="6"
              lg="2">
          <v-btn color="primary"
                  :loading="requestLoading && !requestSucess"
                  @click="catchRequstToken">
            {{ tokenButtonText }}
          </v-btn>
        </v-col>

        <v-col >
          <v-text-field v-model="key"
                        :error-messages="keyErrors"
                        :counter="keyLength"
                        label="Token"
                        solo
                        required
                        clearable
                        clear-icon="clear"
                        @input="$v.key.$touch()"
                        @blur="$v.key.$touch()" />
        </v-col>
      </v-row>

      <v-row v-if="formInvalid" >
        <v-col>
          <v-text-field :label="formErrorText"
                        readonly
                        hide-details
                        solo
                        flat />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn v-if="!$v.$invalid"
                  class="mr-4"
                  color="primary"
                  :loading="signInLoading && !signInSuccess"
                  @click="catchSignIn">
            {{ submitButtonText}}
          </v-btn>
        </v-col>
      </v-row>
    </form>

  </v-container>

</template>


<script>
/**
 * LoginView.vue provides the users with login form with email and token
 *
 * @summary login form with email and token
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:13:35
 * Last modified  : 2020-07-14 18:11:26
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/
import { validationMixin } from 'vuelidate';
import {
 email,
 required,
 minLength,
 maxLength, 
} from 'vuelidate/lib/validators';

const keyLength = 32;

export default {
  components: {
  },
  props: {
    prefilledEmail: String,
    prefilledToken: String,
    signInLoading: Boolean,
    signInSuccess: Boolean,
    signedIn: Boolean,
    requestLoading: Boolean,
    requestSucess: Boolean,
    formErrorText: String,
  },
  beforeMount() {
    this.email = this.prefilledEmail;
    this.key = this.prefilledToken;
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;

      if (!this.$v.email.email) {
        errors.push('Must be valid e-mail');
      }
      if (!this.$v.email.required) {
         errors.push('E-mail is required');
      }

      return errors;
    },
    keyErrors() {
      const errors = [];

      if (!this.$v.key.$dirty) return errors;

      if (!this.$v.key.minLength || !this.$v.key.maxLength) {
        errors.push(`Key must be ${this.keyLength} characters long`);
      }
      
      if (!this.$v.key.required) {
       errors.push('Key is required.');
      }
      
      return errors;
    },
  },
  methods: {
    catchRequstToken() {
      this.$v.$touch();
      this.formInvalid = this.$v.$invalid;

      if (!this.formInvalid) {
        this.$emit('requestToken', this.email);
      }      
    },
    catchSignIn() {
      this.$v.$touch();
      this.formInvalid = this.$v.$invalid;

      if (!this.formInvalid) {
        this.$emit('signIn', this.email, this.key);
      }      
    },
  },
  data: () => ({
    submitButtonText: 'Sign In',
    email: '',
    key: '',
    formInvalid: false,
    keyLength,
    requestTokenText: 'How do have get a token to sign in?',
    tokenButtonText: 'Request a token',
    title: 'Sign in',
    alreadSignInText: 'You are already signed in.',
    instructionsText: 'Sign in with your e-mail adress and the token which was sent by e-mail.',
  }),
  validations: {
    email: {
      required,
      email,
    },
    key: {
      required,
      minLength: minLength(keyLength),
      maxLength: maxLength(keyLength),
    },
  },  
  mixins: [validationMixin],
};
</script>
