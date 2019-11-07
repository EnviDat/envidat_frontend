<template>
  <v-card ripple
          hover
          style="height: 100%;"
          @click.native="cardClick" >

    <v-img :style="!flatLayout ? dynamicCardBackground : `background-color: ${this.categoryColor}`"
            :height="flatLayout ? '55px' : $vuetify.breakpoint.smAndDown ? '90px' : '115px'" >

      <v-container fluid
                    fill-height
                    px-3 pt-3 pb-0 >
        <v-layout column>

          <v-flex xs12
                  py-0 >
            <v-layout row>

              <v-flex v-if="!maxTitleLengthReached"
                      xs12 >
                <div class="headline mb-0"
                    :class="titleClass" >
                  {{ truncatedTitle }}
                </div>
              </v-flex>

              <v-flex v-if="maxTitleLengthReached"
                      xs12 >
                <v-tooltip bottom
                            :disabled="$vuetify.breakpoint.xsOnly" >
                  <div slot="activator"
                        class="headline mb-0"
                        :class="titleClass" >
                    {{ truncatedTitle }}
                  </div>

                  <span>{{ title }}</span>
                </v-tooltip>
              </v-flex>

            </v-layout>
          </v-flex>

        </v-layout>
      </v-container>
    </v-img>

    <v-card-text :class="{['cardText'] : $vuetify.breakpoint.mdAndUp,
                        ['compactText'] : flatLayout || $vuetify.breakpoint.smAndDown,
                        ['py-2'] : flatLayout,
                        ['pr-5'] : flatLayout,
                        ['pr-4'] : !flatLayout,
                        ['py-2'] : !flatLayout,
                  }" >
      <!-- TODO: need to strip the markdown characters from the desc -->
      <v-layout row wrap>
        <v-flex xs12
                :style="flatLayout ? singleLineCss : ''" >
          {{ truncatedSubtitle }}
        </v-flex>
        <v-flex xs12
                px-1
                style="overflow: hidden;">

            <tag-chip py-0
                      v-for="(tag, index) in tags.slice (0, maxTagNumber)"
                      :key="index"
                      :name="tag.name"
                      :selectable="true"
                      :color="tag.color"
                      @clicked="catchTagClicked($event, tag.name)"
            />

            <tag-chip v-if="maxTagsReached"
                      py-0
                      name="..."
            />

        </v-flex>
      </v-layout>
    </v-card-text>


    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 5px;" >

      <v-layout column>
        <v-flex v-if="modeData" 
                pa-1>
          <base-icon-button isFlat
                              isSmall
                              color="transparent"
                              :disabled="true"
                              :customIcon="modeEntryIcon"
                              :tooltipText="`Metadata with ${resourceAmount} resources`" />
        </v-flex>

        <v-flex pa-1>
          <base-icon-count-view :count="resourceAmount"
                                :icon-string="fileIconString"
                                :tooltipText="`Metadata with ${resourceAmount} resources`" />
        </v-flex>
      </v-layout>
      <!-- <v-tooltip v-if="isRestricted"
                  bottom
                  :disabled="$vuetify.breakpoint.xsOnly" >
        <v-icon slot="activator"
                color="black" >
          lock
        </v-icon>
        <div v-if="userHasAccess"
              class="iconCentering" >
          <img class="envidatIcon"
                :src="unlockedIconString" >
          <span>The data of this entry is only accessible with permission.</span>
        </div>

        <div v-if="userHasAccess"
              class="iconCentering" >
          <img class="envidatIcon"
                :src="lockedIconString" >
          <span>The data of this entry is only accessible with permission.</span>
        </div>
      </v-tooltip> -->



    </v-card-actions>
  </v-card>
</template>


<script>
/**
 * MetaDataCard.vue creates a card with a header image, title, keywords and preview description.
 * When clicked its emits the 'clickedEvent' event, also the clickedTag can be emitted.
 *
 * @summary card with img, title, keywords and preview description
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-02 11:24:00
 * Last modified  : 2019-11-01 16:13:11
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */
import TagChip from '@/components/Cards/TagChip';
import BaseIconCountView from '@/components/BaseElements/BaseIconCountView';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import { getModeData } from '@/factories/modeFactory';

// Header Sleek design
// https://codepen.io/GeorgeGedox/pen/NQrxrY

// checkout possible transition animation
// https://codepen.io/balapa/pen/embYYB
// https://codepen.io/zavoloklom/pen/eNaEBM

// this one maybe for the guided content scrolling
// https://codepen.io/pgreg/pen/EDoFB

// Card design #2 probably only the header would be doable?
// https://codepen.io/marlenesco/pen/NqOozj

// Card opening animation
// https://codepen.io/luizotcarvalho/pen/yyQNRO


// check multi line truncation via css (only works with one-colored background)
// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/

export default {
  components: {
    TagChip,
    BaseIconCountView,
    BaseIconButton,
  },
  props: {
    id: String,
    title: String,
    subtitle: String,
    name: String,
    type: Number,
    restricted: Boolean,
    favourit: Boolean,
    tags: Array,
    titleImg: String,
    dark: Boolean,
    resourceCount: Number,
    flatLayout: Boolean,
    fileIconString: String,
    lockedIconString: String,
    unlockedIconString: String,
    categoryColor: String,
    mode: String,
  },
  computed: {
    dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.titleImg && this.$vuetify.breakpoint.mdAndUp) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.titleImg});
                background-position: center, center;
                background-size: cover; background-repeat: initial; `;
      }

      return `background-color: ${this.categoryColor}`;
    },
    maxTagsReached() {
      return this.tags !== undefined && this.tags.length > this.maxTagNumber;
    },
    maxTagNumber() {
      // if (this.flatLayout) {
      //   return 10;
      // }
      let textLength = 0;
      let numberOfTags = 0;

      if (this.tags !== undefined) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].name !== undefined) {
            textLength += this.tags[i].name.length + 1;

            if ((this.flatLayout && textLength >= this.maxCompactTagtextLength)
            || (!this.flatLayout && textLength >= this.maxTagtextLength)) {
              break;
            }

            numberOfTags++;
          }
        }
      }

      return numberOfTags;
    },
    maxTitleLengthReached() {
      return (!this.flatLayout && this.title.length > this.maxTitleLength)
          || ((this.flatLayout || this.$vuetify.breakpoint.smAndDown) && this.title.length > this.compactTitleLength);
    },
    truncatedTitle() {
      let maxLength = this.maxTitleLength;

      if (this.flatLayout) {
        maxLength = this.compactTitleLength;
      }

      if (this.title !== undefined && this.maxTitleLengthReached) {
        return `${this.title.substring(0, maxLength)}...`;
      }

      return this.title;
    },
    truncatedSubtitle() {
      let maxLength = this.maxDescriptionLength;

      if (this.flatLayout) {
        maxLength = this.compactDescriptionLength;
      }

      if (this.subtitle !== undefined) {
        return `${this.subtitle.substring(0, maxLength)}...`;
      }

      return '';
    },
    isRestricted() {
      return this.restricted;
      // return this.restricted &&
      // (this.restricted.allowed_users !== undefined || this.restricted.level !== 'public');
    },
    userHasAccess() {
      if (!this.isRestricted) {
        return false;
      }

      const userAccess = this.restricted.allowed_users;
      const accessLvl = this.restricted.level;

      return userAccess || accessLvl;
    },
    resourceAmount() {
      if (this.resourceCount) {
        return this.resourceCount;
      }

      return 0;
    },
    titleClass() {
      return {
        black_title: !this.dark,
        white_title: this.dark,
        smallScreenTitle: this.$vuetify.breakpoint.xsOnly,
        compactTitle: this.$vuetify.breakpoint.smOnly,
      };
    },
    modeEntryIcon() {
      const keys = Object.keys(this.modeData.icons);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (this.tags.findIndex(t => t.name === key.toUpperCase()) >= 0) {
          return this.modeData.icons[key];
        }
      }

      return Object.values(this.modeData.icons)[0];
    },
    modeData() {
      if (!this.mode) return null;

      return getModeData(this.mode);
    },
  },
  created() {
  },
  methods: {
    cardClick() {
      let detailParam = this.name;
      if (!detailParam) {
        detailParam = this.id; // fallback id in url isn't too nice
      }
      this.$emit('clickedEvent', detailParam);
    },
    favouritClicked() {
      this.$emit('clickedFavourit', this.id);
    },
    catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
  },
  data: () => ({
    singleLineCss: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
    show: false,
    showDataText: 'SHOW DATA',
    // maxTitleLength: 80,
    maxTitleLength: 150,
    compactTitleLength: 120,
    maxDescriptionLength: 280,
    compactDescriptionLength: 450,
    // maxTags: 3,
    // maxTagtextLength: 40,
    maxTagtextLength: 100,
    maxCompactTagtextLength: 170,
    // maxCompactTagtextLength: 320,
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .card .card__media {
    /* Fallback if the background images don't work */
    background: #00695c; /* Old Browsers */
    background: -webkit-linear-gradient(top,#00695c,#00897b); /*Safari 5.1-6*/
    background: -o-linear-gradient(top,#00695c,#00897b); /*Opera 11.1-12*/
    background: -moz-linear-gradient(top,#00695c,#00897b); /*Fx 3.6-15*/
    background: linear-gradient(to bottom, #00695c, #00897b); /*Standard*/
  }

  .black_title{
    color: rgba(0,0,0,.87) !important;
  }

  .white_title{
    color: rgba(255,255,255,.9) !important;
  }

  .headline {
    font-size: 19px !important;
  }

  .compactTitle {
    font-size: 17px !important;
  }

  .smallScreenTitle {
    font-size: 14px !important;
  }

  .compactText {
    line-height: 1.2em !important;
  }

  .cardText {
    font-size: 14px !important;
    opacity: 0.75;
    line-height: 1.2em !important;
  }


</style>
