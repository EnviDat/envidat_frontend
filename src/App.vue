<template>
  <v-app class="application" :style="dynamicBackground">

    <navigation v-if="$vuetify.breakpoint.mdAndUp"
                :mini="this.menuItem.active"
                :navItems="navItems"
                @menuClick="menuClick()"
                />

    <navigation-mini v-if="$vuetify.breakpoint.smAndDown"
                    :navItems="navItems"
                    style="position: fixed; top: auto; right: 10px; bottom: 10px;"
                    class="elevation-3" />

    <navigation-toolbar :searchTerm="searchTerm"
                        @menuClick="menuClick()" />

    <v-content>
      <v-container fluid
                  v-bind="{ [`px-1`]: this.$vuetify.breakpoint.smAndDown,
                            [`px-2`]: this.$vuetify.breakpoint.mdAndUp,
                            [`py-1`]: this.$vuetify.breakpoint.mdAndUp,
                            [`py-0`]: this.$vuetify.breakpoint.smAndDown }" >
        <v-layout column>
          <!-- <v-flex v-if="currentPage != 'landingPage'"
            xs12
            v-bind="{ [`mx-0`]: this.$vuetify.breakpoint.smAndDown,
                      [`mx-3`]: this.$vuetify.breakpoint.mdAndUp,
                      [`mb-1`]: this.$vuetify.breakpoint.smAndDown,
                      [`my-1`]: this.$vuetify.breakpoint.mdAndUp,
            }"
            class="envidatNavbar"
            :class="{ 'small': this.$vuetify.breakpoint.smAndDown }"
          >
            <the-nav-bar-view />
          </v-flex> -->

          <v-flex xs12
                  mx-0
          >
            <!-- v-bind="{ [`mx-0`]: this.$vuetify.breakpoint.smAndDown,
                      [`mx-3`]: this.$vuetify.breakpoint.mdAndUp }" -->
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </v-flex>

          <v-flex xs12
            style="position: absolute; right: 5px; bottom: 2px; font-size: 5px !important;"
          >Verison: {{ appVersion }}</v-flex>
        </v-layout>
      </v-container>

      <v-dialog v-model="showReloadDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">New Version Available!</v-card-title>
          <v-card-text>{{ dialogVersionText() }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" flat @click="reloadApp();">Reload</v-btn>
            <v-btn color="green darken-1" flat @click="dialogCanceled = true">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import { BULK_LOAD_METADATAS_CONTENT } from '@/store/metadataMutationsConsts';
import {
  ADD_CARD_IMAGES,
  ADD_ICON_IMAGE,
  SET_CONFIG,
} from '@/store/mutationsConsts';
import TheNavBarView from '@/components/Views/TheNavbarView';
import Navigation from '@/components/Views/Navigation';
import NavigationMini from '@/components/Views/NavigationMini';
import NavigationToolbar from '@/components/Views/NavigationToolbar';
import '@/../node_modules/skeleton-placeholder/dist/bone.min.css';

export default {
  beforeCreate() {
    // check for the backend version
    this.$store.dispatch(SET_CONFIG);
    // window.applicationCache.onupdateready = function (e) {
    //   console.log("applicationCache.onupdateready");
    // };

    // window.applicationCache.onerror = function (e) {
    //   console.log("applicationCache.onerror");
    // };

    // window.applicationCache.onnoupdate = function (e) {
    //   console.log("applicationCache.onnoupdate");
    // };
  },
  created: function created() {
    this.loadAllMetadata();

    const bgImgs = require.context('./assets/', false, /\.jpg$/);
    this.appBGImages = this.mixinMethods_importImages(bgImgs, 'app_b');

    this.importCardBackgrounds();
    this.importIcons();
  },
  methods: {
    menuClick() {
      this.menuItem.active = !this.menuItem.active;
    },
    reloadApp() {
      window.location.reload();
    },
    loadAllMetadata: function loadAllMetadata() {
      if (!this.loadingMetadatasContent && this.metadatasContentSize <= 0) {
        this.$store.dispatch(`metadata/${BULK_LOAD_METADATAS_CONTENT}`);
      }
    },
    importCardBackgrounds: function importCardBackgrounds() {
      const imgs = this.$store.getters.cardBGImages;

      if (imgs && Object.keys(imgs).length > 0) {
        // already loaded in localStorage
        return;
      }

      let imgPaths = require.context(
        './assets/cards/landscape/',
        false,
        /\.jpg$/,
      );
      let images = this.mixinMethods_importImages(imgPaths);
      this.$store.commit(ADD_CARD_IMAGES, { key: 'landscape', value: images });

      imgPaths = require.context('./assets/cards/forest/', false, /\.jpg$/);
      images = this.mixinMethods_importImages(imgPaths);
      this.$store.commit(ADD_CARD_IMAGES, { key: 'forest', value: images });

      imgPaths = require.context('./assets/cards/snow/', false, /\.jpg$/);
      images = this.mixinMethods_importImages(imgPaths);
      this.$store.commit(ADD_CARD_IMAGES, { key: 'snow', value: images });

      imgPaths = require.context('./assets/cards/diversity/', false, /\.jpg$/);
      images = this.mixinMethods_importImages(imgPaths);
      this.$store.commit(ADD_CARD_IMAGES, { key: 'diversity', value: images });

      imgPaths = require.context('./assets/cards/hazard/', false, /\.jpg$/);
      images = this.mixinMethods_importImages(imgPaths);
      this.$store.commit(ADD_CARD_IMAGES, { key: 'hazard', value: images });
    },
    importIcons: function importIcons() {
      const imgs = this.$store.getters.iconImages;

      if (imgs && Object.keys(imgs).length > 0) {
        // already loaded in localStorage
        return;
      }

      const imgPaths = require.context('./assets/icons/', false, /\.png$/);
      const images = this.mixinMethods_importImages(imgPaths);

      const keys = Object.keys(images);
      keys.forEach((key) => {
        // console.log('icon ' + key + ' value ' + images[key]);
        this.$store.commit(ADD_ICON_IMAGE, { key, value: images[key] });
      });
    },
    dialogVersionText() {
      return `You are using the version ${process.env.VUE_APP_VERSION}, but there is are newer version available (${this.newVersion}). Please reload to get the latest verison of EnviDat.`;
    },
  },
  computed: {
    ...mapGetters({
      metadataIds: 'metadata/metadataIds',
      metadatasContent: 'metadata/metadatasContent',
      loadingMetadataIds: 'metadata/loadingMetadataIds',
      loadingMetadatasContent: 'metadata/loadingMetadatasContent',
      loadingCurrentMetadataContent: 'metadata/loadingCurrentMetadataContent',
      currentMetadataContent: 'metadata/currentMetadataContent',
      popularTags: 'metadata/popularTags',
      loadingPopularTags: 'metadata/loadingPopularTags',
      currentPage: 'currentPage',
      appBGImage: 'appBGImage',
      showVersionModal: 'showVersionModal',
      newVersion: 'newVersion',
    }),
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
    metadatasContentSize: function metadatasContentSize() {
      return this.metadatasContent !== undefined
        ? Object.keys(this.metadatasContent).length
        : 0;
    },
    showReloadDialog() {
      return this.showVersionModal && !this.dialogCanceled;
    },
    dynamicBackground: function dynamicBackground() {
      const imageKey = this.appBGImage;
      const bgImg = this.appBGImages[imageKey];
      // console.log(imageKey + " bgImg " + bgImg);
      let bgStyle = '';

      if (bgImg) {
        // bgStyle = `background-image: url(${bgImg}) !important;`;
        bgStyle = `background: linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.25) 100%), url(${bgImg}) !important;`;

        bgStyle += `background-position: center top !important;
                      background-repeat: no-repeat !important;
                      background-size: cover !important; `;

        if (bgImg.includes('browsepage')) {
          // bgStyle = `background-image: url(${bgImg}) !important;`;
          bgStyle = `background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.7) 100%), url(${bgImg}) !important;`;

          bgStyle += `background-position: center top !important;
                        background-repeat: repeat !important; `;
        }
      }

      return bgStyle;
    },
  },
  components: {
    TheNavBarView,
    Navigation,
    NavigationMini,
    NavigationToolbar,
  },
  /* eslint-disable object-curly-newline */
  data: () => ({
    appBGImages: {},
    prevHeight: 0,
    dialogCanceled: false,
    appVersion: process.env.VUE_APP_VERSION,
    showMenu: true,
    searchTerm: '',
    navItems: [
      { title: 'Home', icon: 'envidat', toolTip: 'Back to the start page', active: false },
      { title: 'Explore', icon: 'search', toolTip: 'Explore research data', active: false },
      { title: 'Login', icon: 'person', toolTip: 'Login to upload data', active: false },
      { title: 'Organizations', icon: 'account_tree', toolTip: 'Explore research data', active: false },
      { title: 'Projects', icon: 'library_books', toolTip: 'Explore research data', active: false },
      { title: 'Guidelines', icon: 'local_library', toolTip: 'Guidlines about the creation of metadata', active: false },
      { title: 'Policies', icon: 'policy', toolTip: 'The rules of EnviDat', active: false },
      { title: 'About', icon: 'info', toolTip: 'What is EnviDat? How is behind EnviDat?', active: false },
      { title: 'Contact', icon: 'contact_support', toolTip: 'Do you need support?', active: false },
      { title: 'Menu', icon: 'menu', active: false },
    ],
  }),
};
</script>

<style lang="scss">
  /* Icons list: https://jossef.github.io/material-design-icons-iconfont/ */
  $material-design-icons-font-directory-path: '~material-design-icons-iconfont/dist/fonts/';

  @import '~material-design-icons-iconfont/src/material-design-icons.scss';
</style>


<style >
 @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville|Raleway&display=swap');

/* overwrite the applications background https://css-tricks.com/use-cases-fixed-backgrounds-css/ */
.application {
  font-family: "Raleway", sans-serif !important;
  font-size: 12px;
}

.envidatNavbar {
  position: -webkit-sticky;
  position: sticky;
  top: 8px;
  z-index: 1000;
}

.envidatNavbar.small {
  top: 0px;
}

/*** General Card styles ***/

.headline {
  font-family: "Libre Baskerville", serif !important;
  /* font-weight: 700; */

  /*
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 2.15em;
    */
  line-height: 1.1em !important;
}

.block-with-text {
  font-family: "Libre Baskerville", serif !important;

  /* styles for '...' */
  /* hide text if it more than N lines  */
  overflow: hidden;
  /* for set '...' in absolute position */
  position: relative;
  /* use this value to count block height */
  line-height: 1.2em !important;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 6.7em;
  /* fix problem when last visible word doesn't adjoin right side  */
  text-align: justify;
  /* place for '...' */
  margin-right: -1em;
  padding-right: 1em;
}
/* create the ... */
.block-with-text:before {
  /* points in the end */
  content: "...";
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of block */
  right: 0;
  bottom: 0;
}
/* hide ... if we have text, which is less than or equal to max lines */
.block-with-text:after {
  /* points in the end */
  content: "";
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of text */
  right: 0;
  /* set width and height */
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  /* bg color = bg color under block */
  background: white;
}

.card .subheading {
  /* font-family: 'Libre Baskerville', serif; */
  font-weight: 400;
  /* color: #555; */
  opacity: 0.75;
  line-height: 1.25em;
}

.imagezoom,
.imagezoom img {
  transition: all 0.2s;
}

.imagezoom img:hover,
.imagezoom img:focus {
  transform: scale(1.2);
}

.envidatIcon {
  height: 24px !important;
  width: 24px !important;
}

.envidatIcon.small {
  height: 20px !important;
  width: 20px !important;
}

.envidatTitle {
  font-family: "Libre Baskerville", serif !important;
  letter-spacing: 0em !important;
}

.envidatSlogan {
  font-family: "Libre Baskerville", serif !important;
}

.metadataInfoIcon {
  opacity: 0.75;
}

.envidatBadge span {
  font-size: 0.95em !important;
}

.envidatBadgeBigNumber span {
  font-size: 0.9em !important;
}

.envidatChip {
  height: 1.3rem !important;
  font-size: 0.65rem !important;
  margin: 1px 2px !important;
  opacity: 0.85 !important;
}

.smallChip {
  height: 1.2rem !important;
  font-size: 0.55rem !important;
}
.smallChip > .v-chip__content > .v-chip__close > .v-icon {
  font-size: 15px !important;
}

.authorTag span,
.envidatChip span {
  cursor: pointer !important;
}

.filterTag {
  opacity: 0.7;
}

.chip__content span {
  cursor: pointer !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  /* overflow: hidden; */
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
