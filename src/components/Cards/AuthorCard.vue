<template>
    <v-card class="authorCard pa-3"
            :style="dynamicCardBackground"
            @click.native="cardClick" >

            <!-- :style="`background-color: ${this.dark ? darkColor : whiteColor};`" -->

      <v-card-title class="px-2 py-0 justify-end">
        <div :style="`background-color: ${!this.dark ? darkColor : whiteColor};`"
              class="dataCreditScore elevation-5">

          <div :style="bigCountStyling"
              :class="!this.dark ? 'white--text' : 'black--text'" >
            {{ dataCreditScore }}
          </div>
        </div>
      </v-card-title>

      <v-card-title class="px-2 pt-0 pb-5">
        <v-container pa-0 grid-list-xs>
          <v-layout row wrap>

            <v-flex xs12 py-0 >
              <div class="authorTitle"
                    :class="dark ? 'white--text' : 'black--text'" >
                {{ author.firstName }}
              </div>
            </v-flex>

            <v-flex xs12 py-0>
              <div class="authorTitle"
                    :class="dark ? 'white--text' : 'black--text'" >
                {{ author.lastName }}
              </div>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-title>

      <v-card-title class="py-0 px-2">
        <data-credit-layout v-if="author.dataCredit"
                              class="pa-0"
                              :dataCredit="author.dataCredit"
                              :iconColor="this.dark ? whiteColor : darkColor"
                              :dark="!dark" />

        <v-container pa-0 pt-2 grid-list-xs>
          <v-layout column px-0 >

            <v-flex xs12>
              <v-layout row align-center>
                <v-flex grow
                        class="subheading"
                        :class="dark ? 'white--text' : 'black--text'" >
                  {{ dataCountLabel }}
                </v-flex>

                <v-flex shrink
                        class="subheading">

                  <div :style="`background-color: ${!this.dark ? darkColor : whiteColor}; font-size: 20px !important`"
                        class="dataCreditScore ">

                    <div :style="smallCountStyling"
                        :class="!this.dark ? 'white--text' : 'black--text'" >
                      {{ author.datasetCount }}
                    </div>
                  </div>

                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-title>

      <v-card-title class="py-0 px-2">
        <v-container pa-0 grid-list-xs>
          <v-layout row
                    align-center
                    pa-0 >

            <v-flex grow @click="infosExpanded = !infosExpanded">
              <v-divider :dark="dark" />
            </v-flex>

            <v-flex shrink>
              <v-btn flat icon
                      :color="dark ? 'white' : 'black'"
                      class="ma-0"
                      @click="infosExpanded = !infosExpanded">
                <v-icon> {{ infosExpanded ? 'arrow_drop_down' : 'arrow_left' }}</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>

      <v-card-text v-if="infosExpanded"
                    class="py-0 px-2">
      <v-container grid-list-xs align-content-end align-end
                    pa-0 >
        <v-layout row wrap>

          <v-flex xs12 v-if="author.email">
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

          <v-flex xs12 v-if="author.id && author.id.identifier">
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

          <v-flex xs12 v-if="author.affiliation">
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
      </v-card-text>


      <div v-if="dataCreditLevel === 1"
            style="position: absolute; top: 0px; right: 20%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="dataCreditLevel === 2"
            style="position: absolute; top: 0px; right: 15%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="dataCreditLevel === 3"
            style="position: absolute; top: 0px; right: 10%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>
    </v-card>

</template>


<script>
import DataCreditLayout from '@/components/Layouts/DataCreditLayout';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    DataCreditLayout,
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

      if (this.dataCreditScore > 20) {
        lvl = 1;

        if (this.dataCreditScore > 40) {
          lvl = 2;

          if (this.dataCreditScore > 60) {
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
      let style = `width: ${this.dataCreditSize * 0.65}px; height: ${this.dataCreditSize * 0.65}px;`;

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
        color = '#e00000'; // #e00000
        toColor = '#ff3d3d'; // #ff0000
      } else if (this.dataCreditLevel === 2) {
        color = '#ffac05';
        toColor = '#ffd700';
      } else if (this.dataCreditLevel === 3) {
        return 'background-color: #111';
      }

      // return this.bottomToTopStyle('100%', color, 'gold');
      return `background-image: linear-gradient(45deg, ${color} 10%, ${toColor} 90%);
              background-position: center, center; background-size: cover;`;

      // const gradient = this.dark ? this.blackTopToBottom : this.whiteTopToBottom;

      // return `background-image: linear-gradient(0deg, ${gradient});
      //         background-position: center, center; background-size: cover;
      //         background-repeat: initial;
      //         z-index: 0;`;
    },
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
      // grd += ''
      //   -webkit-border-image:
      //     -webkit-gradient(linear, 0 100%, 0 0, from(${fromColor}), to(transparent) 1 100%;
      //   -webkit-border-image:
      //     -webkit-linear-gradient(bottom, ${fromColor}, transparent) 1 100%;
      //   -moz-border-image:
      //     -moz-linear-gradient(bottom, ${fromColor}, transparent) 1 100%;
      //   -o-border-image:
      //     -o-linear-gradient(bottom, ${fromColor}, transparent) 1 100%;
        // border-image:
        //   linear-gradient(to top, ${fromColor}, transparent) 1 100%;`;
      grd += 'border-image: ';
      grd += 'linear-gradient(to top, ' + fromColor + ' , ' + toColor + ') 1 ' + toPct + ';';
      // console.log(grd);
      return grd;
    },
  },
  data: () => ({
    dataScoreLabel: 'Data Credit Score',
    dataCountLabel: 'Published datasets',
    emailLabel: 'Email',
    affiliationLabel: 'Affiliation',
    idLabel: 'Identifier',
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
    infosExpanded: false,
    darkColor: '#231F20',
    whiteColor: '#EFEFEF',
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
    min-width: 300px;
    max-width: 400px;
    /* min-height: 350px; */
  }

  .authorTitle {
    margin: 0;
    padding: 0;
    line-height: 3rem;
    word-break: break-word;
    font-size: 34px !important;
    font-weight: 700 !important;
    font-family: 'Libre Baskerville', serif !important;
  }

  .authorInfoLabel {
    opacity: 0.65;
  }


</style>
