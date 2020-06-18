<template>
  <v-container grid-list-xs
                fluid>
    <v-layout row
              wrap >

      <v-flex xs12
              :class="!dark ? 'white--text' : 'black--text'" >
        {{ badgesLabel }}
      </v-flex>

      <v-flex v-if="!hasDataCreditCounts"
              xs12
              :class="!dark ? 'white--text' : 'black--text'"       
              style="opacity: 0.65">
        {{ noCreditslabel }}
      </v-flex>

      <v-flex v-for="(creditName, index) in dataCreditNames"
              :key="index"
              shrink px-1
              v-show="showZero || (!showZero && dataCreditCounts[index] > 0)">

        <v-layout column >

          <v-flex py-0 >
            <v-tooltip bottom >
              <v-icon slot="activator"
                      :color="iconColor"
                      class="dataCreditIcon">
                {{ iconLookup(creditName) }}
              </v-icon>

              {{ creditName }}
            </v-tooltip>
          </v-flex>

          <v-flex pt-0 >
              <v-badge class="dataCreditIcon"
                        :color="badgeColor">
                <span slot="badge"
                      :class="dark ? 'white--text' : 'black--text'" >
                      {{ dataCreditCounts[index] }}
                </span>
              </v-badge>
          </v-flex>

        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  components: {
  },
  props: {
    dataCredit: Object,
    iconColor: String,
    badgeColor: String,
    dark: Boolean,
    showZero: {
      type: Boolean,
      default: false,
    },
    badgesLabel: {
      type: String,
      default: 'Data Credit Badges',
    },
    noCreditslabel: {
      type: String,
      default: 'No declaration of Data Credits',
    },
  },
  computed: {
    dataCreditNames() {
      let names = [];

      if (this.dataCredit) {
        names = Object.keys(this.dataCredit);
      }

      return names;
    },
    dataCreditCounts() {
      let counts = [];

      if (this.dataCredit) {
        counts = Object.values(this.dataCredit);
      }

      return counts;
    },
    hasDataCreditCounts() {
      for (let i = 0; i < this.dataCreditCounts.length; i++) {
        const count = this.dataCreditCounts[i];
        if (count > 0) {
          return true;
        }
      }

      return false;
    },
  },
  methods: {
    iconLookup(creditName) {
      switch (creditName) {
        case 'publication':
          return 'menu_book';
        case 'software':
          return 'code';
        case 'curation':
          return 'local_library';
        case 'collection':
          return 'widgets';
        case 'validation':
          return 'record_voice_over';
        case 'supervision':
          return 'supervisor_account';
        default:
          return 'info';
      }
    },
  },
};
</script>

<style >

 .dataCreditIcon {
   opacity: 0.75;
 }

 .dataCreditBadge > span {
    bottom: -25px !important;
    right: 0px !important;
  }

  .dataCreditBadge.black--text > span > span {
    color: #000 !important;
    caret-color: #000 !important;
  }

  .dataCreditBadge.white--text > span > span {
    color: #fff !important;
    caret-color: #fff !important;
  }

</style>
