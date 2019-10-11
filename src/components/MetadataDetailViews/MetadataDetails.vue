<template>
  <v-card>
    <v-card-title class="title metadata_title">
      Further Information
    </v-card-title>

    <v-card-text v-if="details && details.length > 0">
      <v-form>
        <div v-for="val in details"
              :key="val.label" >
          <v-text-field v-if="isSingleText(val.text)"
                        :id="val.label"
                        :label="val.label"
                        :name="val.label"
                        :value="val.text"
                        readonly />

          <v-textarea v-if="!isSingleText(val.text)"
                      :id="val.label"
                      :label="val.label"
                      :name="val.label"
                      :value="val.text"
                      readonly />
        </div>
      </v-form>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && (!details || details.length <= 0)"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>


    <v-card-text v-if="showPlaceholder" >
      <v-layout row wrap
                v-for="n in 5"
                :key="n + 'label'" >

          <div class="flex xs2 pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
            <div class="bone bone-type-text " />
          </div>

          <div class="flex xs10 pl-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
            <div class="bone bone-type-text " />
          </div>
      </v-layout>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  components: {
  },
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    maxSingleTextLengthLg: 80,
    maxSingleTextLengthMd: 80,
    maxSingleTextLengthXs: 70,
    emptyText: 'No details found for this dataset',
  }),
  computed: {
    details() {
      return this.mixinMethods_getGenericProp('details');
    },
  },
  methods: {
    isSingleText: function isSingleText(text) {
      if (!text || text.length <= 0) {
        return true;
      }

      if (this.$vuetify.breakpoint.xsOnly) {
        return text.length <= this.maxSingleTextLengthXs;
      }

      if (this.$vuetify.breakpoint.mdAndDown) {
        return text.length <= this.maxSingleTextLengthMd;
      }

      return text.length <= this.maxSingleTextLengthLg;
    },
  },
};

</script>
