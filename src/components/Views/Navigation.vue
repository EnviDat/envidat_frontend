<template>
  <v-navigation-drawer app
                        permanent
                        width="160"
  >

    <v-list class="pt-0" dense>

      <v-list-tile v-for="(item, index) in navItemsMenuExcluded" :key="index">
        <v-list-tile-action v-if="item.icon === 'envidat'">
          <div>
            <v-btn icon href="./" class="ma-0">
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>

            <div class="pl-1 headline envidatLogoText envidatNavbarTitleSmall">
              {{ logoText }}
            </div>
          </div>
        </v-list-tile-action>

        <v-list-tile-content v-if="item.icon !== 'envidat'">

            <base-rectangle-button
              marginClass="ma-0"
              isSmall
              isFlat
              :buttonText="item.title"
              :toolTipText="item.toolTip"
              :materialIconName="item.icon"
              :iconColor="item.active ? 'accent' : 'grey'"
              color="secondary"
              @clicked="item.icon === 'menu' ? item.active = !item.active : itemClick(item)"
            />


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
    navItems: Array,
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
  }),
  computed: {
    navItemsMenuExcluded() {
      const actives = [];

      this.navItems.forEach((el) => {
        if (el.icon !== 'menu') {
          actives.push(el);
        }
      });

      return actives;
    },
  },
  methods: {
    itemClick(item) {
      item.active = true;

      this.navItems.forEach((el) => {
        if (el.icon !== 'menu'
         && item.active
         && el.title !== item.title) {
          el.active = false;
        }
      });
    },
  },
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
