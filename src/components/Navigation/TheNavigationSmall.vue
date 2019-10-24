<template>
  <v-navigation-drawer permanent
                        fixed
                        right
                        :mini-variant-width="menuItem.active ? 60 : 48"
                        mini-variant
                        :height="menuItem.active ? navItems.length * 44 : 48"
                        :style="!menuItem.active ? 'border-radius: 50%;' :  'border-radius: 2px;'"
  >

    <v-list dense
            class="pt-0" >

      <div v-for="(item, index) in navItems" :key="index">

        <v-list-tile v-show="menuItem.active || item.icon === 'menu'"
                      class="tileNoPadding"
                      :class="{
                              'pt-4': item.icon === 'menu' && menuItem.active,
                              'pt-1': item.icon === 'menu' && !menuItem.active,
                              'pt-2': item.icon === 'envidat'
                              }" >

          <v-list-tile-action v-if="item.icon === 'envidat'"
                              style="margin-left: 5px;">
            <v-btn icon class="ma-0"
                  :color="item.active ? 'accent' : 'trasparent'"
                  @click.stop="itemClick(item)" >
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="item.icon !== 'envidat'"
                              class="v-list__group__header__prepend-icon"
          >
              <base-icon-button
                marginClass="ma-0"
                :tooltipText="item.title"
                :materialIconName="item.icon"
                :iconColor="item.active ? 'accent' : 'secondary'"
                color="transparent"
                @clicked="item.icon === 'menu' ? item.active = !item.active : itemClick(item)"
              />

          </v-list-tile-action>
        </v-list-tile>

      </div>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
import Logo from '@/assets/logo/EnviDat_logo_32.png';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  props: {
    navItems: Array,
  },
  data: () => ({
    Logo,
    logoText: 'EnviDat',
  }),
  computed: {
    activeItems() {
      const actives = [];

      this.navItems.forEach((el) => {
        if (el.icon === 'menu') {
          actives.push(el);
        } if (el.active) {
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
    BaseIconButton,
  },
};
</script>

<style>

.tileNoPadding > div {
  padding-left: 0;
  padding-right: 0;
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
