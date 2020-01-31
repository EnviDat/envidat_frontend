<template>
    <v-card class="authorCard pa-3"
            :style="dynamicCardBackground"
            @click.native="cardClick" >

      <v-card-title class="px-2 pb-5">
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

      <v-card-title v-if="author.dataCredit"
                    class="py-1 px-2">
        <data-credit-layout class="pa-0"
                            :dataCredit="author.dataCredit"
                            :iconColor="this.dark ? whiteColor : darkColor"
                            :dark="!dark" />

      </v-card-title>

      <v-card-title class="py-1 px-2">
        <v-container pa-0 fluid>
          <v-layout row wrap
                    align-center
                    justify-space-between >

            <v-flex xs5 py-0
                    :class="dark ? 'white--text' : 'black--text'" >
              {{ dataCountLabel }} 
            </v-flex>

            <v-flex shrink py-0>
              <base-icon-button class="ma-0"
                                material-icon-name="search"
                                :iconColor="dark ? 'white' : 'black'"
                                :outlined="dark"
                                :color="dark ? 'white' : 'transparent'"
                                :tooltipText="`Search for the datasets of ${author.firstName} ${author.lastName}`"
                                @clicked="catchSearchAuthor(author.fullName)" />

              <v-badge color="highlight"
                        overlap
                        style="top: -25px; right: -2px;">
                <span slot="badge"
                      :class="dark ? 'white--text' : 'black--text'" >
                      {{ author.datasetCount }}
                </span>
              </v-badge>

            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>


      <v-card-title class="pl-2 py-1 pr-0" >

        <v-layout row wrap
                  justify-space-between
                  align-center >

          <v-flex shrink
                  :class="dark ? 'white--text' : 'black--text'" >
            {{ dataScoreLabel }}
          </v-flex>

          <v-flex grow >
            <v-tooltip bottom>
              <v-icon slot="activator"
                      dark
                      :class="dark ? 'white--text' : 'black--text'">
                info_outline
              </v-icon>
              {{ dataCreditScoreInfo }}
            </v-tooltip>
          </v-flex>

          <v-flex shrink>
            <div :style="`background-color: ${!this.dark ? darkColor : whiteColor};`"
                  class="dataCreditScore elevation-5">

              <div :style="bigCountStyling"
                  :class="!this.dark ? 'white--text' : 'black--text'" >
                {{ dataCreditScore }}
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-title class="pt-2 pb-0 px-2">
        <v-layout row
                  align-center
                  pa-0 >

          <v-flex grow @click="infosExpanded = !infosExpanded">
            <v-divider :dark="dark" />
          </v-flex>

          <v-flex shrink>
            <v-btn flat icon
                    :color="dark ? 'white' : 'black'"
                    :outline="dark"
                    class="ma-0"
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

            <v-flex xs6 v-if="author.email">
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

            <v-flex xs6 v-if="author.id && author.id.identifier">
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

            <v-flex xs6 v-if="author.affiliation">
              <v-layout column>
                <v-flex xs12 py-0
                        class="authorInfoLabel"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ affiliationLabel }}
                </v-flex>

                <v-flex xs12 py-0
                        class="authorInfo"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ author.affiliation }}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

        </v-container>
      </v-card-title>


      <div v-if="dataCreditLevel >= 1"
            style="position: absolute; top: 0px; right: 18%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="dataCreditLevel >= 2"
            style="position: absolute; top: 0px; right: 12%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="dataCreditLevel >= 3"
            style="position: absolute; top: 0px; right: 6%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>
    </v-card>

</template>


<script>
import DataCreditLayout from '@/components/Layouts/DataCreditLayout';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import { BROWSE_PATH } from '@/router/routeConsts';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    DataCreditLayout,
    BaseIconButton,
  },
  props: {
    author: Object,
  },
  computed: {
    dark() {
      return this.dataCreditLevel === 3;
    },
    dataCredits() {
      return this.author && this.author.dataCredit ? Object.keys(this.author.dataCredit) : [];
    },
    dataCreditLevel() {
      let lvl = 0;

      if (this.dataCreditScore >= 20) {
        lvl = 1;

        if (this.dataCreditScore >= 40) {
          lvl = 2;

          if (this.dataCreditScore >= 60) {
            lvl = 3;
          }
        }
      }

      return lvl;
    },
    dataCreditScore() {
      let score = 0;

      if (this.author) {
        // a dataset counts two points
        score = this.author.datasetCount * 2;
      }

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
      let minSize = 55;

      if (this.dataCreditScore >= 100) {
        minSize = 60;
      }

      return minSize;
    },
    dynamicCardBackground() {
      let color = 'white';
      let toColor = '#efefef';

      if (this.dataCreditLevel === 0) {
        return 'background-color: #fff';
      }
      
      if (this.dataCreditLevel === 1) {
        color = '#e02a00FF'; // #e00000
        toColor = '#ff3d3d64'; // #ff0000
      } else if (this.dataCreditLevel === 2) {
        color = '#ffac05FF';
        toColor = '#ffac0596';
      } else if (this.dataCreditLevel === 3) {
        return 'background-color: #111';
      }

      return `background-image: linear-gradient(45deg, ${color} 10%, ${toColor} 90%);
              background-position: center, center; background-size: cover;`;
    },
    authorIsDead() {
      return this.author.fullName ? this.author.fullName.match(this.asciiDead) : false;
    }
  },
  methods: {
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
    bottomToTopStyle(height, fromColor, toColor, toPct) {
      if (!toColor) {
        toColor = 'transparent';
      }
      if (!toPct) {
        toPct = '100%';
      }
      if (!height) {
        height = 100;
      }
      height = height >= 100 ? 100 : height;

      const width = '1';
      /* eslint-disable prefer-template */
      let grd = 'height: ' + height + '%;border-width: ' + width + 'px; border-style: solid;';
      grd += 'border-image: ';
      grd += 'linear-gradient(to top, ' + fromColor + ' , ' + toColor + ') 1 ' + toPct + ';';

      return grd;
    },
  },
  data: () => ({
    dataScoreLabel: 'Data Credit Score',
    dataCountLabel: 'Published datasets',
    dataCreditScoreInfo: 'The Data Credit Score represents the engangement of an author to declared how on they were involved to a certain publish research dataset.',
    emailLabel: 'Email',
    affiliationLabel: 'Affiliation',
    idLabel: 'Identifier',
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    infosExpanded: false,
    darkColor: '#231F20',
    whiteColor: '#EFEFEF',
    asciiDead: '&#8224;',
    authorPassedInfo: 'Sadly this author has passed away.',
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
    font-size: 32px !important;
    font-weight: bold !important;
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

  .authorInfoLabel {
    opacity: 0.65;
  }


</style>
