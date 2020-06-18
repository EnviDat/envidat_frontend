<template>
    <v-card class="authorCard pa-3"
            :style="dynamicCardBackground"
            @click.native="cardClick" >

      <v-card-title class="px-2 pt-2 pb-3">
        <v-layout row wrap>

          <v-flex grow py-0 >
            <div class="authorTitle"
                  :class="dark ? 'white--text' : 'black--text'" >
              {{ author.firstName }}
            </div>
          </v-flex>

          <v-flex v-if="authorIsDead"
                  shrink py-0>

            <v-tooltip bottom>
              <v-icon slot="activator"
                      dark
                      :class="dark ? 'white--text' : 'black--text'">
                hourglass_empty
              </v-icon>
              {{ authorPassedInfo }}
            </v-tooltip>

          </v-flex>

          <v-flex xs12 py-0>
            <div class="authorTitle"
                  :class="dark ? 'white--text' : 'black--text'" >
              {{ authorIsDead ? author.lastName.replace(`(${asciiDead})`, '') : author.lastName }}
            </div>
          </v-flex>

        </v-layout>
      </v-card-title>

      <v-card-title class="py-2 px-2">
        <v-layout row
                  align-center
                  justify-space-between >

          <v-flex xs6
                  :class="dark ? 'white--text' : 'black--text'" >
            {{ dataCountLabel }} 
          </v-flex>

          <v-flex shrink
                  py-0
                  style="max-height: 36px;">
            <base-icon-button class="ma-0"
                              material-icon-name="search"
                              :iconColor="dark ? 'white' : darkColor"
                              :outlined="true"
                              :color="dark ? 'white' : darkColor"
                              :tooltipText="`Search for the datasets of ${author.firstName} ${author.lastName}`"
                              @clicked="catchSearchAuthor(author.fullName)" />

            <v-badge  :color="dark ? 'white' : darkColor"                    
                      overlap
                      style="top: -25px; right: -2px;">
              <span slot="badge"
                    :class="!dark ? 'white--text' : 'black--text'" >
                    {{ author.datasetCount }}
              </span>
            </v-badge>

          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-title class="py-1 pb-2 px-2">
        <data-credit-layout class="pa-0"
                            :dataCredit="author.dataCredit"
                            badgesLabel="Data Credit Contributions"
                            :iconColor="dark ? 'white' : 'black'"
                            :badgeColor="dark ? 'white' : darkColor"
                            :dark="!dark" />

      </v-card-title>

      <!-- <v-card-title class="pl-2 py-2 pr-0" >

        <v-layout row
                  justify-space-between
                  align-center >

          <v-flex shrink
                  :class="dark ? 'white--text' : 'black--text'" >
            {{ dataScoreLabel }}
          </v-flex>

          <v-flex grow >
            <v-tooltip bottom>
              <v-icon slot="activator"
                      class="badgesIcon"
                      dark
                      :class="dark ? 'white--text' : 'black--text'">
                info_outline
              </v-icon>
              {{ dataCreditScoreInfo }}
            </v-tooltip>
          </v-flex>

          <v-flex shrink px-2>
            <div :style="`background-color: ${!this.dark ? darkColor : whiteColor};`"
                  class="dataCreditScore elevation-5">

              <div :style="bigCountStyling"
                  :class="!this.dark ? 'white--text' : 'black--text'" >
                {{ dataCreditScore }}
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-title> -->

      <v-card-title class="pt-2 pb-0 px-2">
        <v-layout row
                  align-center >

          <v-flex grow @click="infosExpanded = !infosExpanded">
            <v-divider :dark="dark" />
          </v-flex>

          <v-flex shrink>
            <v-btn flat icon
                    :color="dark ? 'white' : 'black'"
                    :outline="true"
                    class="ma-0 badgesIcon"
                    @click="infosExpanded = !infosExpanded">
              <v-icon> {{ infosExpanded ? 'keyboard_arrow_down' : 'keyboard_arrow_left' }}</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-container v-if="infosExpanded"
                      fluid
                      grid-list-lg align-end
                      py-2 px-0 >
          <v-layout row wrap>

            <v-flex shrink v-if="author.email && !authorIsDead">
              <v-layout column>
                <v-flex xs12 py-0
                        class="authorInfoLabel"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ emailLabel }}
                </v-flex>

                <v-flex xs12 py-0
                        class="authorInfo"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ author.email }}
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex shrink v-if="author.id && author.id.identifier">
              <v-layout column>
                <v-flex xs12 py-0
                        class="authorInfoLabel"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ author.id.type ? author.id.type : idLabel }}
                </v-flex>

                <v-flex xs12 py-0
                        class="authorInfo"
                        :class="dark ? 'white--text' : 'black--text'" >

                  <a v-if="(author.id.type && author.id.type === 'orcid') || isOrcId(formatIdentifier(author.id.identifier))"
                      :href="`https://orcid.org/${formatIdentifier(author.id.identifier)}`"
                      target="_blank" >
                      {{ formatIdentifier(author.id.identifier) }}
                  </a>
                  <div v-else>{{ formatIdentifier(author.id.identifier) }}</div>

                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex shrink v-if="author.affiliation">
              <v-layout column>
                <v-flex xs6 py-0
                        class="authorInfoLabel"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ affiliationLabel }}
                </v-flex>

                <v-flex xs6 py-0
                        class="authorInfo"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ author.affiliation }}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card-title>

      <!-- <div id="wrapper"
            style="position: absolute; top: 0; right: 0;"
            class="pa-4">

        <svg class="progress"
              :data-progress="levelProgress"
              x="0px" y="0px"
              viewBox="0 0 776 628">

          <path ref="progressTrack"
                class="track"
                viewBox="0 0 500 500"
                d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z">
          </path>

          <path ref="progressFill"
                class="fill"
                d="M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z">
          </path>
          
          <text class="value"
                style="fill: white;"
                x="50%" y="73%">
            {{ dataCreditLevel }}
          </text>
        </svg>
      </div> -->

    </v-card>

</template>


<script>
import DataCreditLayout from '@/components/Layouts/DataCreditLayout';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import { BROWSE_PATH } from '@/router/routeConsts';
import {
  getLevelProgress,
  getDataCreditLevel,
} from '@/factories/authorFactory';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  name: 'AuthorCard',
  components: {
    DataCreditLayout,
    BaseIconButton,
  },
  props: {
    author: Object,
    asciiDead: String,
    authorPassedInfo: String,
  },
  mounted() {
    // this.setLevelProgress();
  },
  computed: {
    // getDataCreditLevel(currentScore) {
    //   const entires = this.authorDataCreditLevels;

    //   for (let i = 0; i < entires.length; i++) {
    //     const scoreLvl = entires[i];
    //     if (currentScore >= scoreLvl.score) {
    //       return scoreLvl.lvl;
    //     }
    //   }

    //   return 0;
    // },
    dark() {
      return this.dataCreditLevel >= 6;
    },
    dataCredits() {
      return this.author && this.author.dataCredit ? Object.keys(this.author.dataCredit) : [];
    },
    dataCreditLevel() {
      return getDataCreditLevel(this.dataCreditScore);
    },
    dataCreditLevelColor() {
      return this.colorPalette[this.dataCreditLevel];
    },
    levelProgress() {
      return getLevelProgress(this.dataCreditScore);
    },
    dataCreditScore() {
      let score = 0;

      if (this.author) {
        // a dataset counts two points
        score = this.author.datasetCount * 2;

        if (this.author.dataCredit) {
          const counts = Object.values(this.author.dataCredit);

          for (let i = 0; i < counts.length; i++) {
            const creditCount = counts[i];
            score += creditCount;
            if (creditCount > 0) {
              // add +4 for every dataCredit made so it gives
              // least 5 points for each datacredit
              score += 4;
            }
          }
        }
      }

      return score;
    },
    bigCountStyling() {
      let style = `width: ${this.dataCreditSize}px; height: ${this.dataCreditSize}px;`;

      if (this.dataCreditScore >= 100) {
        style = `${style}position: relative; top: 3px;`;
      }

      return style;
    },
    smallCountStyling() {
      let style = `width: ${this.dataCreditSize * 0.55}px; height: ${this.dataCreditSize * 0.55}px;`;

      if (this.dataCreditScore >= 100) {
        style = `${style}position: relative; top: 3px;`;
      }

      return style;
    },
    dataCreditSize() {
      let minSize = 45;

      if (this.dataCreditScore >= 100) {
        minSize = 50;
      }

      return minSize;
    },
    dynamicCardBackground() {
      if (this.dataCreditLevel === 0) {
        return 'background-color: #fff';
      }

      const color = this.colorPalette[this.dataCreditLevel - 1];
      const toColor = this.colorPaletteTo[this.dataCreditLevel - 1];

      return `background-image: linear-gradient(45deg, ${color} 10%, ${toColor} 90%);
              background-position: center, center; background-size: cover;`;
    },
    authorIsDead() {
      return this.asciiDead && this.author.fullName ? this.author.fullName.match(this.asciiDead) : false;
    },
  },
  methods: {
    setLevelProgress() {
      const max = 2160;
      let style = `stroke-dashoffset: ${((100 - this.levelProgress) / 100) * max}; stroke: ${this.$vuetify.theme.accent} !important;`;
      this.$refs.progressFill.setAttribute('style', style);
      style = `stroke: ${this.dataCreditLevelColor} !important;`;
      this.$refs.progressTrack.setAttribute('style', style);
    },
    isOrcId(id) {
      return id.match(RegExp(/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/g));
    },
    formatIdentifier(id) {
      if (id.includes('https://')) {
        const splits = id.split('/');
        return splits[splits.length - 1];
      }

      return id;
    },
    dataCreditsCount(credit) {
      return this.author.dataCredit ? this.author.dataCredit[credit] : '';
    },
    cardClick() {
    },
    catchSearchAuthor(search) {
      this.mixinMethods_additiveChangeRoute(BROWSE_PATH, search);
    },
    verticalLineStyle(color) {
      return `border-left: thick solid ${color}`;
    },
  },
  data: () => ({
    dataScoreLabel: 'Data Credit Score',
    dataCountLabel: 'Published datasets',
    dataCreditScoreInfo: 'Data Credit Score: represents the dedication of an author to publish data and declare how on their involvement was in a dataset.',
    emailLabel: 'Email',
    affiliationLabel: 'Affiliation',
    idLabel: 'Identifier',
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    infosExpanded: false,
    // darkColor: '#231F20',
    darkColor: '#384753',
    whiteColor: '#EFEFEF',
    colorPalette: ['rgb(226, 242, 124)', 'rgb(158, 219, 129)', 'rgb(0, 191, 173)', 'rgb(8, 135, 124)', 'rgb(153, 88, 209)', 'rgb(17, 17, 17)'],
    colorPaletteTo: ['rgba(226, 242, 124, 0.4)', 'rgba(158, 219, 129, 0.4)', 'rgba(0, 191, 173, 0.4)', 'rgba(8, 135, 124, 0.4)', 'rgba(153, 88, 209, 0.4)', 'rgba(17, 17, 17, 0.4)'],
    // colorsPalette: ['#E2F27C', '#9EDB81', '#00BFAD', '#08877C', '#111111'],
  }),
};
</script>

<style scoped>

  div.v-card__title {
    position: relative;
    z-index: 10;
  }

  .dataCreditScore {
    border-radius: 50% !important;
    text-align: center;
    font-size: 28px !important;
    /* font-weight: bold !important; */
    position: relative;
    z-index: 1;
    /* border-style: solid; */
  }

  .authorCard {
    border-radius: 20px;
    /* min-width: 300px; */
    /* max-width: 400px; */
    /* min-height: 350px; */
  }

  .authorTitle {
    margin: 0;
    padding: 0;
    line-height: 2.75rem;
    word-break: break-word;
    font-size: 34px !important;
    font-weight: 700 !important;
    font-family: 'Raleway', serif !important;
  }

  .subheading {
    font-size: 14px !important;
  }

  .badgesIcon {
    opacity: 0.75;
  }

  .authorInfoLabel {
    opacity: 0.65;
  }

  .progress {
    width: 40px;
    height: 40px;
  }
  .progress .track, .progress .fill{
    stroke-width: 65;
    transform: translate(290px, 800px)rotate(-120deg);
  }
  .progress .track{
    /* stroke: rgb(56, 71, 83); */
    fill: rgb(56, 71, 83);
  }
  .progress .fill {
    fill: rgba(56, 71, 83, 0);
    stroke-linecap: round;
    stroke-dasharray: 2160;
    stroke-dashoffset: 2160;
    transition: stroke-dashoffset 1s;
  }

  .progress .value, .progress .text {
    fill: 'black';
    text-anchor: middle;
  }
  .progress .value {
    font-size: 500px;
  }

</style>
