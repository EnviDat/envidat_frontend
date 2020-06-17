<template>
  <v-navigation-drawer app
                        permanent
                        clipped
                        :mini-variant.sync="mini"
                        mini-variant-width="60"
                        width="190" >

    <v-list class="pt-1"
            dense >

      <v-list-item v-for="(item, index) in navItemsMenuExcluded"
                  :key="index"
                  link
                  :class="`${item.icon === 'envidat' ? mini ? 'px-2' : 'px-3' : '' }`"  >

        <v-list-item-action v-if="item.icon === 'envidat'"
                            @click.stop="itemClick(item)" >
          <v-btn icon
                  class="ma-0"
                  :style="`background-color: ${ item.active ? $vuetify.theme.themes.light.accent : 'transparent' }`"
                  @click.stop="itemClick(item)" >
            <img :src="Logo"
                  alt="envidat_logo" />
          </v-btn>
        </v-list-item-action>

        <v-list-item-content v-if="item.icon === 'envidat'"
                              @click.stop="itemClick(item)">
          <v-row class="fill-height" 
                  align="start"
                  justify="end" >
            <v-col cols="12"
                    class="headline envidatNavbarTitleSmall py-0">
              {{ logoText }}
            </v-col>
            <v-col v-if="version"
                    cols="12"
                    class="py-0"
                    style="font-size: 8px; position: relative; left: 2px;">
              Version {{ version }}
            </v-col>
          </v-row>
        </v-list-item-content>

        <v-list-item-icon v-if="item.icon !== 'envidat'"
                          @click="itemClick(item)" >
                          <!-- @click="item.icon === 'menu' ? item.active = !item.active : itemClick(item)" > -->
          <v-icon :color="item.active ? 'accent' : 'secondary'">
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content v-if="item.icon !== 'envidat'"
                              class=""
                              @click="itemClick(item)" >
          {{ item.title }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item link
                    @click.stop="mini = !mini">
        <v-list-item-icon >
          <v-icon color="primary">
            {{ mini ? 'chevron_right' : 'chevron_left' }}
          </v-icon>
        </v-list-item-icon>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';
// import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';
// import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
    navItems: Array,
    version: String,
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
    mini: true,
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
    menuItem() {
      let menuItem = { active: true };

      this.navItems.forEach((el) => {
        if (el.icon === 'menu') {
          menuItem = el;
        }
      });

      // return default with active true so all items will be shown
      return menuItem;
    },
  },
  methods: {
    itemClick(item) {
      this.$emit('itemClick', item);
    },
  },
  components: {
    // BaseRectangleButton,
    // BaseIconButton,
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
