<template>
  <v-toolbar app
              clipped-left
              color="white"
              :height="mode && $vuetify.breakpoint.xsOnly ? 50 : 36"
              >
    <v-row 
              align="center"
              justify="space-between" >

      <v-col class="grow" v-if="mode"
              >
        <mode-view :mode="mode"
                    :closeCallback="modeCloseCallback" />
      </v-col>

      <v-col class="shrink" v-if="userIsSignedIn"
              >
        <user-avatar v-if="$vuetify.breakpoint.smAndUp"
                    :clickCallback="avatarClickCallback" />
      </v-col>

    </v-row>

    <v-progress-linear v-show="loading"
                        indeterminate
                        style="position: absolute; left: 0; bottom: -14px;"
                        height="2"
                        color="primary" />


  </v-toolbar>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import ModeView from '@/components/Layouts/ModeView';
import UserAvatar from '@/components/Layouts/UserAvatar';

export default {
  name: 'TheNavigationToolbar',
  components: {
    ModeView,
    UserAvatar,
  },
  props: {
    loading: Boolean,
    mode: String,
    modeCloseCallback: Function,
    userIsSignedIn: Boolean,
    avatarClickCallback: Function,
  },
  computed: {
  },
  methods: {
    loginClick() {
      this.$emit('loginClick');
    },
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    expanded: false,
    modeLogo: null,
  }),
};
</script>
