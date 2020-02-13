<template>
  <v-app class="application" :style="dynamicBackground">

      <div v-for="(notification, index) in visibleNotifications()"
          :key="`notification_${index}`"
          :style="`position: absolute;
                  right: ${$vuetify.breakpoint.xsOnly ? 0 : 15}px;
                  top: ${35 + index * 175}px;
                  z-index: ${NotificationZIndex};`" >

        <notification-card v-if="notification.show"
                            :notification="notification"
                            :showReportButton="config.errorReportingEnabled && notification.type === 'error'"
                            @clickedClose="catchCloseClicked(notification.key)"
                            @clickedReport="catchReportClicked(notification.key)" />
      </div>

    <the-navigation v-if="!showSmallNavigation"
                    :style="`z-index: ${NavigationZIndex}`"
                    :navItems="navItems"
                    :version="appVersion"
                    @menuClick="catchMenuClicked"
                    @itemClick="catchItemClicked" />

    <the-navigation-small v-if="showSmallNavigation"
                          :navItems="navItems"
                          :style="`z-index: ${NavigationZIndex}`"
                          class="envidatSmallNavigation elevation-3"
                          @itemClick="catchItemClicked" />

    <the-navigation-toolbar v-if="showToolbar"
                            ref="TheNavigationToolbar"
                            class="envidatToolbar"
                            :style="`z-index: ${NavToolbarZIndex}`"
                            :searchTerm="searchTerm"
                            :loading="loading"
                            :mode="mode"
                            :modeCloseCallback="catchModeClose"
                            :searchCount="searchCount"
                            :showSearchCount="true"
                            @menuClick="catchMenuClicked"
                            @searchClick="catchSearchClicked"
                            @searchCleared="catchSearchCleared" />

    <v-content>
      <v-container fluid
                    pa-2 
                    fill-height
                    v-on:scroll="updateScroll()"
                    ref="appContainer"
                    :style="pageStyle" >
        <v-layout column >
          <v-flex xs12 mx-0 >

            <transition name="fade" mode="out-in">
              <router-view />
            </transition>

          </v-flex>

        </v-layout>
      </v-container>

      <v-dialog v-model="showReloadDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">New Version Available!</v-card-title>
          <v-card-text>{{ dialogVersionText() }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" flat @click="reloadApp()">Reload</v-btn>
            <v-btn color="green darken-1" flat @click="reloadDialogCanceled = true">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>

  </v-app>
</template>

<script>
/**
 * The App.vue bootstraps all the other components.
 *
 * @summary main component
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:12:30
 * Last modified  : 2019-11-20 16:06:15
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import { mapGetters } from 'vuex';
import {
  LANDING_PATH,
  LANDING_PAGENAME,
  BROWSE_PATH,
  BROWSE_PAGENAME,
  PROJECTS_PATH,
  PROJECTS_PAGENAME,
  PROJECT_DETAIL_PAGENAME,
  GUIDELINES_PATH,
  GUIDELINES_PAGENAME,
  POLICIES_PATH,
  POLICIES_PAGENAME,
  ABOUT_PATH,
  ABOUT_PAGENAME,
  REPORT_PATH,
} from '@/router/routeConsts';
import {
  METADATA_NAMESPACE,
  BULK_LOAD_METADATAS_CONTENT,
} from '@/store/metadataMutationsConsts';
import {
  SET_CONFIG,
  SET_APP_SCROLL_POSITION,
  TRIM_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
} from '@/store/mainMutationsConsts';

import { POLICIES_NAMESPACE } from '@/store/policiesMutationsConsts';
import { GUIDELINES_NAMESPACE } from '@/store/guidelinesMutationsConsts';
import { PROJECTS_NAMESPACE } from '@/store/projectsMutationsConsts';

import TheNavigation from '@/components/Navigation/TheNavigation';
import TheNavigationSmall from '@/components/Navigation/TheNavigationSmall';
import TheNavigationToolbar from '@/components/Navigation/TheNavigationToolbar';
import NotificationCard from '@/components/Cards/NotificationCard';
import '@/../node_modules/skeleton-placeholder/dist/bone.min.css';

export default {
  beforeCreate() {
    // check for the backend version
    this.$store.dispatch(SET_CONFIG);
  },
  created() {
    this.loadAllMetadata();

    const bgImgs = require.context('./assets/', false, /\.jpg$/);
    this.appBGImages = this.mixinMethods_importImages(bgImgs, 'app_b');
  },
  updated() {
    this.updateActiveStateOnNavItems();
  },
  methods: {
    updateScroll() {
      if (this.$refs && this.$refs.appContainer) {
        this.storeScroll(this.$refs.appContainer.scrollTop);
      }
    },
    storeScroll(scrollY) {
      this.$store.commit(SET_APP_SCROLL_POSITION, scrollY);
    },
    updateActiveStateOnNavItems() {
      // console.log(this.currentPage);

      for (let i = 0; i < this.navItems.length; i++) {
        const item = this.navItems[i];

        if (item.icon !== 'menu') {
          const isActive = this.currentPage === item.pageName;

          if (item.subpages && item.subpages instanceof Array) {
            let subIsActive = false;

            item.subpages.forEach((sub) => {
              if (!subIsActive) {
                subIsActive = this.currentPage === sub;
              }
            });

            item.active = isActive || subIsActive;
          } else {
            item.active = isActive;
          }
        }
      }
    },
    visibleNotifications() {
      const notis = Object.values(this.notifications);
      return notis.filter(n => n.show);
    },
    catchMenuClicked() {
      this.menuItem.active = !this.menuItem.active;
    },
    catchItemClicked(item) {
      if (item.pageName === 'external') {
        window.open(item.path, '_blank');
        return;
      }
      if (this.$route.name === item.pageName) {
        return;
      }

      if (this.showSmallNavigation) {
        this.catchMenuClicked();
      }

      this.$router.push({ path: item.path, query: '' });
    },
    catchSearchClicked(search) {
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, search);
    },
    catchSearchCleared() {
      // the search parameter needs to be '' to clear it
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, '');
    },
    catchModeClose() {
      this.$router.push({
        path: BROWSE_PATH,
      });
    },
    navigateTo(navItem) {
      if (navItem.pageName === 'external') {
        window.open(navItem.path, '_blank');
      } else {
        this.$router.push(navItem.path);
      }

      if (this.$route.name === navItem.pageName) {
        return;
      }

      this.$router.push({ path: navItem.path, query: '' });
    },
    catchCloseClicked(key) {
      if (!this.notifications) return;

      this.$store.commit(HIDE_NOTIFICATIONS, key);
    },
    catchReportClicked(index) {
      if (this.$route.path === REPORT_PATH) {
        return;
      }
      this.$router.push({ path: REPORT_PATH, query: index });
    },
    reloadApp() {
      window.location.reload();
    },
    loadAllMetadata() {
      if (!this.loadingMetadatasContent && this.metadatasContentSize <= 0) {
        this.$store.dispatch(`metadata/${BULK_LOAD_METADATAS_CONTENT}`);
      }
    },
    dialogVersionText() {
      return `You are using the version ${this.appVersion}, but there is are newer version available (${this.newVersion}). Please reload to get the latest verison of EnviDat.`;
    },
  },
  computed: {
    ...mapGetters({
      metadataIds: `${METADATA_NAMESPACE}/metadataIds`,
      metadatasContent: `${METADATA_NAMESPACE}/metadatasContent`,
      metadatasContentSize: `${METADATA_NAMESPACE}/metadatasContentSize`,
      loadingMetadataIds: `${METADATA_NAMESPACE}/loadingMetadataIds`,
      loadingMetadatasContent: `${METADATA_NAMESPACE}/loadingMetadatasContent`,
      loadingCurrentMetadataContent: `${METADATA_NAMESPACE}/loadingCurrentMetadataContent`,
      searchingMetadatasContent: `${METADATA_NAMESPACE}/searchingMetadatasContent`,
      currentMetadataContent: `${METADATA_NAMESPACE}/currentMetadataContent`,
      filteredContent: `${METADATA_NAMESPACE}/filteredContent`,
      isFilteringContent: `${METADATA_NAMESPACE}/isFilteringContent`,
      policiesLoading: `${POLICIES_NAMESPACE}/loading`,
      guidelinesLoading: `${GUIDELINES_NAMESPACE}/loading`,
      projectsLoading: `${PROJECTS_NAMESPACE}/loading`,
      currentPage: 'currentPage',
      appBGImage: 'appBGImage',
      outdatedVersion: 'outdatedVersion',
      newVersion: 'newVersion',
      config: 'config',
      notifications: 'notifications',
      maxNotifications: 'maxNotifications',
    }),
    loading() {
      return this.loadingMetadatasContent || this.searchingMetadatasContent || this.isFilteringContent
          || this.projectsLoading || this.policiesLoading || this.guidelinesLoading;
    },
    searchTerm() {
      return this.$route.query.search;
    },
    currentPageIsBrowsePage() {
      return this.currentPage === BROWSE_PAGENAME;
    },
    currentPageIsLandingPage() {
      return this.currentPage === LANDING_PAGENAME;
    },
    showToolbar() {
      return false;
      // return this.currentPageIsBrowsePage || !this.$vuetify.breakpoint.smAndDown;
    },
    pageStyle() {
      const heightStyle = this.showToolbar ? 'height: calc(100vh - 36px);' : 'height: 100vh;';
      return this.currentPageIsBrowsePage ? '' : `${heightStyle} overflow-y: auto; scroll-behavior: smooth;`;
    },
    showSmallNavigation() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    searchCount() {
      return this.filteredContent !== undefined ? Object.keys(this.filteredContent).length : 0;
    },
    showReloadDialog() {
      return this.outdatedVersion && !this.reloadDialogCanceled;
    },
    dynamicBackground() {
      const imageKey = this.appBGImage;
      const bgImg = this.appBGImages[imageKey];
      let bgStyle = '';

      if (bgImg) {
        bgStyle = `background: linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.25) 100%), url(${bgImg}) !important;`;

        bgStyle += `background-position: center top !important;
                      background-repeat: no-repeat !important;
                      background-size: cover !important; `;

        if (bgImg.includes('browsepage')) {
          bgStyle = `background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.7) 100%), url(${bgImg}) !important;`;

          bgStyle += `background-position: center top !important;
                        background-repeat: repeat !important; `;
        }
      }
      return bgStyle;
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
    mode() {
      return this.$route.query.mode ? this.$route.query.mode.toLowerCase() : null;
    },
  },
  components: {
    TheNavigation,
    TheNavigationSmall,
    TheNavigationToolbar,
    NotificationCard,
  },
  watch: {
    notifications() {
      if (!this.notifications) return;

      const keys = Object.keys(this.notifications);
      if (keys.length > this.maxNotifications) {
        this.$store.commit(TRIM_NOTIFICATIONS);
      }
    },
  },
  /* eslint-disable object-curly-newline */
  data: () => ({
    appBGImages: {},
    reloadDialogCanceled: false,
    appVersion: process.env.VUE_APP_VERSION,
    showMenu: true,
    NavToolbarZIndex: 1150,
    NavigationZIndex: 1100,
    NotificationZIndex: 1500,
    navItems: [
      { title: 'Home', icon: 'envidat', toolTip: 'Back to the start page', active: false, path: LANDING_PATH, pageName: LANDING_PAGENAME },
      { title: 'Explore', icon: 'search', toolTip: 'Explore research data', active: false, path: BROWSE_PATH, pageName: BROWSE_PAGENAME },
      { title: 'Projects', icon: 'library_books', toolTip: 'Overview of the research projects on envidat', active: false, path: PROJECTS_PATH, pageName: PROJECTS_PAGENAME, subpages: [PROJECT_DETAIL_PAGENAME] },
      { title: 'Organizations', icon: 'account_tree', toolTip: 'Overview of the different organizations', active: false, path: 'https://www.envidat.ch/organization', pageName: 'external' },
      { title: 'Guidelines', icon: 'local_library', toolTip: 'Guidlines about the creation of metadata', active: false, path: GUIDELINES_PATH, pageName: GUIDELINES_PAGENAME },
      { title: 'Policies', icon: 'policy', toolTip: 'The rules of EnviDat', active: false, path: POLICIES_PATH, pageName: POLICIES_PAGENAME },
      { title: 'Login', icon: 'person', toolTip: 'Login to upload data', active: false, path: 'https://www.envidat.ch/user/reset', pageName: 'external' },
      { title: 'About', icon: 'info', toolTip: 'What is EnviDat? How is behind EnviDat?', active: false, path: ABOUT_PATH, pageName: ABOUT_PAGENAME },
      // { title: 'Contact', icon: 'contact_support', toolTip: 'Do you need support?', active: false },
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

.envidatSmallNavigation {
  position: fixed;
  top: auto;
  right: 10px;
  bottom: 10px;
}

.envidatToolbar > .v-toolbar__content {
  padding: 0px 8px !important;
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
  opacity: 0.7;
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
  /* opacity: 0.85 !important; */
}

.enviDatSnackbar > .v-snack__wrapper > .v-snack__content {
  height: 100%;
  padding: 12px;
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

.authorTag span {
  font-size: 14px !important;
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
