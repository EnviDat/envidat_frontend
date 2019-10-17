<template>
  <!-- <div  @mouseover="hovered = true"
        @mouseleave="hovered = false" > -->
    <v-card class="authorCard"
            hover
            :style="`background-color: ${this.dark ? 'black' : 'white'};`"
            min-height="350px"
            @click.native="cardClick" >

      <v-card-title class="pt-3 pb-5">
        <v-layout row wrap>
          <v-flex xs2
                  v-for="(credit, index) in dataCredits"
                  :key="`credit_${index}`" >
            <v-tooltip bottom>
              <v-icon slot="activator" >
                publication
              </v-icon>
              {{ credit }}
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-card-title class="pt-0 pb-5">
        <v-container pa-0 grid-list-xs>
          <v-layout row wrap>

            <v-flex xs12 py-0 >
              <div class="authorTitle"
                    :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.firstName }}
              </div>
            </v-flex>

            <v-flex xs12 py-0>
              <div class="authorTitle"
                    :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.lastName }}
              </div>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card-title>

      <v-card-text>
      <v-container pa-0 grid-list-xs>
        <v-layout column px-0 >

          <v-flex xs12>
            <v-layout row>
              <v-flex grow
                      class="subheading"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ dataCountLabel }}
              </v-flex>

              <v-flex shrink
                      class="subheading"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.datasetCount }}
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-container>

      <v-container px-0 pb-3 pt-5 grid-list-xs align-content-end align-end>
        <v-layout row wrap>

          <v-flex xs12 v-if="author.email">
            <v-layout column>
              <v-flex xs12 py-0
                      class="authorInfoLabel"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ emailLabel }}
              </v-flex>

              <v-flex xs12 py-0
                      class="authorInfo"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.email }}
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12 v-if="author.id.identifier">
            <v-layout column>
              <v-flex xs12 py-0
                      class="authorInfoLabel"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.id.type ? author.id.type : idLabel }}
              </v-flex>

              <v-flex xs12 py-0
                      class="authorInfo"
                      :class="this.dark ? 'white--text' : 'black--text'" >

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
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ affiliationLabel }}
              </v-flex>

              <v-flex xs12 py-0
                      class="authorInfo"
                      :class="this.dark ? 'white--text' : 'black--text'" >
                {{ author.affiliation }}
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

      </v-container>
      </v-card-text>
    </v-card>

</template>


<script>
// import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import BaseIconLabelView from '@/components/BaseElements/BaseIconLabelView';

// checkout skeleton
// https://github.com/ToxicJojo/SkeletonPlaceholder

export default {
  components: {
    BaseIconLabelView,
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
    dataCreditsCount(credit) {
      return this.author.dataCredit ? this.author.dataCredit[credit] : '';
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
    cardClick() {
    },
  },
  data: () => ({
    dataCountLabel: 'Published datasets',
    emailLabel: 'Email',
    affiliationLabel: 'Affiliation',
    idLabel: 'Identifier',
    blackTopToBottom: 'rgba(20,20,20, 0.1) 0%, rgba(20,20,20, 0.9) 60%',
    whiteTopToBottom: 'rgba(255,255,255, 0.6) 0%, rgba(255,255,255, 0.99) 70%',
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
