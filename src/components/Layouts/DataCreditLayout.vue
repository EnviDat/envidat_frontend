<template>
  <v-container grid-list-xs >
    <v-layout row
              wrap >

      <v-flex v-for="(creditName, index) in dataCreditNames"
              :key="index"
              shrink pb-5>

        <v-layout column
                  align-center >

          <v-flex py-0 >
            <v-tooltip bottom>
              <v-badge slot="activator"
                        class="dataCreditBadge"
                        bottom
                        :class="!dark ? 'white--text' : 'black--text'"
                        overlap
                        color="highlight">
                <span slot="badge" >
                      {{ dataCreditCounts[index] }}
                </span>
                <v-icon dark :color="iconColor" >
                  {{ iconLookup(creditName) }}
                </v-icon>
              </v-badge>

              {{ creditName }}
            </v-tooltip>
          </v-flex>
          <!-- <v-flex py-0 class="caption">
            {{ dataCreditCounts[index] }}
          </v-flex> -->
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
    dark: Boolean,
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
