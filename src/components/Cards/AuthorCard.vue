<template>
  <!-- <div  @mouseover="hovered = true"
        @mouseleave="hovered = false" > -->
    <v-card class="authorCard pa-3"
            hover
            :style="`background-color: ${this.dark ? darkColor : whiteColor};`"
            min-height="350px"
            max-width="400px"
            @click.native="cardClick" >

      <v-card-title class="pa-3 justify-end">
        <div :style="`background-color: ${!this.dark ? darkColor : whiteColor};`"
              class="dataCreditScore elevation-5">

          <div :style="bigCountStyling"
              :class="!this.dark ? 'white--text' : 'black--text'" >
            {{ dataCreditScore }}
          </div>
        </div>
      </v-card-title>

      <v-card-title class="pt-5 pb-5">
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

      <v-card-title class="pa-0">
        <data-credit-layout class="py-0"
                             :dataCredit="author.dataCredit"
                             :iconColor="!this.dark ? darkColor : whiteColor"
                             :dark="dark" />

        <v-container py-0 pt-2 grid-list-xs>
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
                        <!-- :class="dark ? 'white--text' : 'black--text'" >
                  {{ author.datasetCount }} -->

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

      <v-layout row
                align-center
                px-2 >
        <v-flex grow>
          <v-divider dark ></v-divider>
        </v-flex>
        <v-flex shrink pa-0>
          <v-btn flat icon
                  color="amber"
                  class="ma-0"
                  @click="infosExpanded = !infosExpanded">
            <v-icon> {{ infosExpanded ? 'arrow_drop_down' : 'arrow_left' }}</v-icon>
          </v-btn>
          <!-- <base-icon-button materialIconName="expand_more"
                            :outlined="true"
                            iconColor="primary"
                            :isToggled="infosExpanded"
                            :rotateOnClick="true"
                            :rotateToggle="infosExpanded"
                            :toolTipText="infosExpanded ? 'Hide info' : 'Show info'"
                            @clicked="infosExpanded = !infosExpanded" /> -->
        </v-flex>
      </v-layout>

      <v-card-text v-if="infosExpanded" >
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

      <!-- <div v-if="dataCreditsCount('collection') > 5"
            style="position: absolute; bottom: 0px; right: 30%;"
            :style="bottomToTopStyle(dataCreditsCount('collection') * 10, 'green')" ></div> -->


      <div v-if="author.datasetCount >= 10"
            style="position: absolute; top: 0px; right: 20%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="author.datasetCount >= 30"
            style="position: absolute; top: 0px; right: 15%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>

      <div v-if="author.datasetCount >= 60"
            style="position: absolute; top: 0px; right: 10%;"
           :style="bottomToTopStyle(100, 'gold', 'red')" ></div>
    </v-card>

</template>


<script>
import BaseIconButton from '@/components/BaseElements/BaseIconButton';
// import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';
import DataCreditLayout from '@/components/Layouts/DataCreditLayout';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    BaseIconButton,
    DataCreditLayout,
  },
  props: {
    author: Object,
  },
  computed: {
    dark() {
      return this.author.datasetCount > 5;
    },
    dataCredits() {
      return this.author.dataCredit ? Object.keys(this.author.dataCredit) : [];
    },
    dataCreditScore() {
      let score = 0;

      if (this.author) {
        score = this.author.datasetCount;
      }

      if (this.dataCredits.length > 0) {
        score += this.dataCredits.length;
        score *= this.dataCredits.length;
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

  .authorInfo, .authorInfoLabel {

  }

  .authorInfoLabel {
    opacity: 0.65;
  }


</style>
