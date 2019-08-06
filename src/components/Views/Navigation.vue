<template>
  <v-navigation-drawer app permanent>
    <v-list class="pt-0" dense>
      <v-list-tile v-for="(item, index) in navItems" :key="index">
        <v-list-tile-action v-if="item.icon === 'envidat'">
          <div>
            <v-btn icon href="./" class="ma-0">
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>

            <div class="headline envidatLogoText envidatNavbarTitleSmall">{{ logoText }}</div>
          </div>
        </v-list-tile-action>

        <!-- <v-list-tile-action
          v-if="item.icon !== 'envidat'"
          class="v-list__group__header__prepend-icon"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>-->

        <v-list-tile-content v-if="item.icon !== 'envidat'">
          <!-- <v-list-tile-title> -->

          <base-rectangle-button
            isSmall
            isFlat
            :buttonText="item.title"
            :toolTipText="item.toolTip"
            :materialIconName="item.icon"
            color="secondary"
          />
          <!-- </v-list-tile-title> -->
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

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
  components: {
    BaseRectangleButton,
  },
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
