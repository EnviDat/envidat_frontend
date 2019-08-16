<template>
  <v-navigation-drawer app
                        permanent
                        stateless
                        :mini-variant.sync="mini"
                        mini-variant-width="60"
                        width="190"
  >
                        <!-- :permanent="permanent" -->

    <v-list class="pt-0"
            :class="{ 'narrowNavigation': mini }"
            dense>

      <v-list-tile v-for="(item, index) in navItemsMenuExcluded" :key="index">

        <v-list-tile-action v-if="item.icon === 'envidat'"
                            class="v-list__group__header__prepend-icon"
        >
          <div style="position: relative; right: -1px;">
            <v-btn icon href="./" class="ma-0">
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>

            <div class="pl-1 headline envidatLogoText envidatNavbarTitleSmall">
              {{ mini ? '' : logoText }}
            </div>
          </div>
        </v-list-tile-action>

        <v-list-tile-action v-if="mini && item.icon !== 'envidat'"
                            class="v-list__group__header__prepend-icon"
        >
          <base-icon-button
            marginClass="ma-0"
            :toolTipText="item.title"
            :materialIconName="item.icon"
            :iconColor="item.active ? 'accent' : 'secondary'"
            color="transparent"
            @clicked="item.icon === 'menu' ? item.active = !item.active : itemClick(item)"
          />
        </v-list-tile-action>

        <v-list-tile-content v-if="!mini && item.icon !== 'envidat'"
                            class="px-2"
        >
          <base-rectangle-button
            marginClass="ma-0 pa-0"
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
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
    show: Boolean,
    navItems: Array,
    mini: Boolean,
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
    BaseIconButton,
  },
};
</script>

<style>

.narrowNavigation > div[role="listitem"] > div {
  padding: 0;
  margin: 0;
}

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
