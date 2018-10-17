<template>

  <v-card 
    ripple
    hover
    @click.native="cardClick"
    style="height: 100%;"
    >

    <v-img
        background-color="primary"
        :style="!compactLayout ? dynamicCardBackground : ''"        
        :height="compactLayout? '85px' : '125px'"
      >
      
      <v-container grid-list-xs fluid fill-height
                    px-3 pt-3 pb-0>

        <v-layout column>
          <v-flex xs12 py-0>
            <v-layout row >

              <v-flex xs12 v-if="!maxTitleLengthReached">
                <div class="headline mb-0"
                    :class="titleClass"
                >
                  {{ truncatedTitle }}</div>
              </v-flex>

              <v-flex xs12 v-if="maxTitleLengthReached">
                <v-tooltip bottom>
                  <div slot="activator" class="headline mb-0"
                      :class="titleClass"
                  >
                    {{ truncatedTitle }}</div>
                  <span>{{ title }}</span>
                </v-tooltip>
              </v-flex>
              
            </v-layout>
          </v-flex>
  
          <v-flex xs12 py-0>
            <v-layout row fill-height align-end >
                <tag-chip py-0
                          v-if="tags" v-for="tag in tags.slice (0, maxTagNumber)" :key="tag.name"
                          :name="tag.name"
                          :selectable="true"
                          v-on:clicked="catchTagClicked($event, tag.name)"
                          class="card_tag" />
              
                <tag-chip py-0
                          v-if="maxTagsReached" class="card_tag" name="..." />
              
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>


    </v-img>

    <v-card-text :class="{['cardText'] : true,
                          ['compactText'] : compactLayout,
                          ['py-2'] : compactLayout,
                          ['pr-5'] : compactLayout,
                          ['pb-4'] : !compactLayout,
                        }"
    >
      <!-- TODO: need to strip the markdown characters from the desc -->
      {{ truncatedSubtitle }}
    </v-card-text>


    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 5px;">
      
      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="isRestricted">
        <v-icon slot="activator" color="black" >lock</v-icon>
          <div v-if="userHasAccess"
                class="iconCentering">
            <img class="envidatIcon" :src="getIcon('lock2Open')" />          
            <span>The data of this entry is only accessible with permission.</span>
          </div>

          <div v-if="userHasAccess"
                class="iconCentering">
            <img class="envidatIcon" :src="getIcon('lock2Closed')" />          
            <span>The data of this entry is only accessible with permission.</span>
          </div>

      </v-tooltip>

      <icon-count-view :count="resourceAmount"
                        iconString="file"
                        :tooltip="`Metadata with ${resourceAmount} resources`">
      </icon-count-view>

    </v-card-actions>

  </v-card>

</template>


<script>
import TagChip from './TagChip';
import IconCountView from '../IconCountView';

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
    resources: Array,
    compactLayout: Boolean,
  },
  components: {
    TagChip,
    IconCountView,
  },
  created: function created() {
  },
  methods: {
    cardClick: function cardClick() {
      let detailParam = this.name;
      if (!detailParam) {
        detailParam = this.id; // fallback id in url isn't too nice
      }
      this.$emit('clickedEvent', detailParam);
    },
    favouritClicked: function favouritClicked() {
      this.$emit('clickedFavourit', this.id);
    },
    catchTagClicked: function catchTagClicked(tagId) {
      this.$emit('clickedTag', tagId);
    },
  },
  computed: {
    dynamicCardBackground: function dynamicCardBackground() {
      const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      if (this.titleImg) {
        return `background-image: linear-gradient(0deg, ${gradient}), url(${this.titleImg});
                background-position: center, center;
                background-size: cover; background-repeat: initial; `;
      }

      return '';
    },
    maxTagsReached: function maxTagsReached() {
      return this.tags !== undefined && this.tags.length > this.maxTagNumber;
    },
    maxTagNumber: function maxTagNumber() {
      // if (this.compactLayout) {
      //   return 10;
      // }
      let textLength = 0;
      let numberOfTags = 0;

      if (this.tags !== undefined) {
        for (let i = 0; i < this.tags.length; i++) {
          if (this.tags[i].name !== undefined) {
            textLength += this.tags[i].name.length + 1;

            if ((this.compactLayout && textLength >= this.maxCompactTagtextLength)
            || (!this.compactLayout && textLength >= this.maxTagtextLength)) {
              break;
            }

            numberOfTags++;
          }
        }
      }

      return numberOfTags;
    },
    maxTitleLengthReached: function maxTitleLengthReached() {
      return (!this.compactLayout && this.title.length > this.maxTitleLength)
          || (this.compactLayout && this.title.length > this.compactTitleLength);
    },
    truncatedTitle: function truncatedTitle() {
      let maxLength = this.maxTitleLength;

      if (this.compactLayout) {
        maxLength = this.compactTitleLength;
      }

      if (this.title !== undefined && this.maxTitleLengthReached) {
        return `${this.title.substring(0, maxLength)}...`;
      }

      return this.title;
    },
    truncatedSubtitle: function truncatedSubtitle() {
      let maxLength = this.maxSubtitleLength;

      if (this.compactLayout) {
        maxLength = this.compactSubtitleLength;
      }

      if (this.subtitle !== undefined) {
        return `${this.subtitle.substring(0, maxLength)}...`;
      }

      return '';
    },
    isRestricted: function isRestricted() {
      return this.restricted;
      // return this.restricted &&
      // (this.restricted.allowed_users !== undefined || this.restricted.level !== 'public');
    },
    userHasAccess: function userHasAccess() {
      if (!this.isRestricted) {
        return false;
      }

      const userAccess = this.restricted.allowed_users;
      const accessLvl = this.restricted.level;

      return userAccess || accessLvl;
    },
    resourceAmount: function resourceAmount() {
      if (this.resourceCount) {
        return this.resourceCount;
      }

      if (this.resources) {
        return this.resources.length;
      }

      return 0;
    },
    titleClass: function titleClass() {
      return {
        black_title: !this.dark,
        white_title: this.dark,
        // compactTitle: this.$vuetify.breakpoint.smAndDown || this.compactLayout,
        compactTitle: true,
      };
    },
  },
  data: () => ({
    show: false,
    showDataText: 'SHOW DATA',
    maxTitleLength: 80,
    compactTitleLength: 100,
    maxSubtitleLength: 280,
    compactSubtitleLength: 320,
    // maxTags: 3,
    maxTagtextLength: 40,
    maxCompactTagtextLength: 170,
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.3) 0%, rgba(255,255,255, 1) 60%',
    imageDefaults: {
      snow: 'c_b_snow_icy2',
      landscape: 'c_b_landscape_lake2', // or c_b_landscape_view ! c_b_landscape_long_lake
      forest: 'c_b_forest_texture_bark', // maybe c_b_forest_texture_bark2
      diversity: 'b_c_diversity_meadow',
      hazard: 'c_b_hazard_cloud_road', // maybe c_b_hazard_cloud
    },
    hoverBadge: false,
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
  
  .compactTitle {
    font-size: 20px !important;
    line-height: 1.1em !important;
  }

  .compactText {
    font-size: 12px !important;
    line-height: 1.3em !important;
  }

  .cardText {
    line-height: 1.3em !important;
  }

  .card_tag {
    /* opacity: 0.7; */
  }

</style>
