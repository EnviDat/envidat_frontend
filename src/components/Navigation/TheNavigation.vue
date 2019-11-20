<template>
  <v-navigation-drawer app
                        permanent
                        clipped
                        :mini-variant.sync="mini"
                        mini-variant-width="60"
                        width="190"
                        @click.native.stop="" >

    <v-list class="pt-1"
            :class="{ 'narrowNavigation': mini }"
            @click.native.stop=""
            dense >

      <v-list-tile v-for="(item, index) in navItemsMenuExcluded"
                  :key="index"
                  @click.native.stop="" >

        <div v-if="mini" style="width: 100%; height: 100%;">

          <v-list-tile-action v-if="item.icon === 'envidat'" >
            <v-btn icon class="ma-0"
                  :color="item.active ? 'accent' : 'trasparent'"
                  @click.stop="itemClick(item)" >
              <img :src="Logo" alt="envidat_logo" />
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action v-if="item.icon !== 'envidat'"
                              class="v-list__group__header__prepend-icon px-2" >

            <base-icon-button marginClass="ma-0 pa-0"
                              :tooltipText="item.title"
                              :materialIconName="item.icon"
                              :iconColor="item.active ? 'accent' : 'secondary'"
                              color="transparent"
                              @clicked="item.icon === 'menu' ? item.active = !item.active : itemClick(item)" />
          </v-list-tile-action>
        </div>

        <div v-if="!mini" style="width: 100%; height: 100%;">

          <v-list-tile-action v-if="item.icon === 'envidat'">
                              <!-- class="v-list__group__header__prepend-icon"
                              style="position: relative; right: -1px;" > -->
            <v-layout row wrap>

              <v-flex xs3>
                <v-btn icon class="ma-0"
                      :color="item.active ? 'accent' : 'trasparent'"
                      @click.stop="itemClick(item)" >
                  <img :src="Logo" alt="envidat_logo" />
                </v-btn>
              </v-flex>

              <v-flex xs9>
                <v-layout column fill-height align-start justify-end >
                  <v-flex xs4></v-flex>
                  <v-flex xs4
                          class="headline envidatNavbarTitleSmall">
                    {{ logoText }}
                  </v-flex>
                  <v-flex v-if="version"
                          xs4
                          style="font-size: 6px; position: relative; left: 2px;">
                    Version {{ version }}
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-list-tile-action>

          <v-list-tile-content v-if="item.icon !== 'envidat'" >

            <base-rectangle-button marginClass="ma-0 px-2 py-0"
                                    isSmall
                                    isFlat
                                    :buttonText="item.title"
                                    :tooltipText="item.tooltip"
                                    :materialIconName="item.icon"
                                    :iconColor="item.active ? 'accent' : 'grey'"
                                    color="secondary"
                                    @clicked="item.icon === 'menu' ? item.active = !item.active : itemClick(item)" />
          </v-list-tile-content>
        </div>

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
    navItems: Array,
    mini: Boolean,
    version: String,
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
