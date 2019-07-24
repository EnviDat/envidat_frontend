<template>
  <v-navigation-drawer app permanent>
    <v-list class="pt-0" dense>
      <v-list-tile v-for="item in navItems" :key="item">
        <v-list-tile-action class="v-list__group__header__prepend-icon">
          <div v-if="item.icon === 'envidat'">
            <v-btn icon href="./" class="ma-0">
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>

            <div class="headline envidatLogoText envidatNavbarTitleSmall">{{ logoText }}</div>
          </div>

          <div v-else>
            <v-icon>{{ item.icon }}</v-icon>
          </div>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';

export default {
  props: {
    mini: Boolean,
    navItems: Array,
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
  }),
  computed: {},
  methods: {},
  components: {},
};
</script>

<style>
.envidatLogoText {
  display: inline;
  vertical-align: middle;
  position: relative;
  bottom: -2px;
}

.envidatNavbarLinksSmall > span > .v-btn--small {
  font-size: 10px !important;
}

.envidatNavbarTitleSmall {
  font-size: 18px !important;
}
</style>
