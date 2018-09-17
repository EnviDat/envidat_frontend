<template>

  <v-card :style="fixedHeight ? 'height: 304px;' : ''">
    <v-card-title class="title metadata_title" >Citation</v-card-title>

    <v-card-text v-if="citationText"
                  style="font-style: italic; ">
      {{ citationText }}
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !citationText" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

    <v-card-actions v-if="!showPlaceholder">
      
      <v-layout row wrap justify-end>
        
          <v-btn v-if="citationXmlLink"
                  class="mt-1"
                  color="primary"
                  :small="$vuetify.breakpoint.xsOnly"
                  :href="citationXmlLink"
          >
            DataCite<v-icon right>assignment</v-icon>
          </v-btn>

          <v-btn v-if="ciationIsoXmlLink"
                  class="mt-1"
                  color="primary"
                  :small="$vuetify.breakpoint.xsOnly"
                  :href="ciationIsoXmlLink"
          >
            ISO 19139<v-icon right>assignment</v-icon>
          </v-btn>

          <v-btn v-if="ciationGCMDXmlLink"
                  class="mt-1"
                  color="primary"
                  :small="$vuetify.breakpoint.xsOnly"
                  :href="ciationGCMDXmlLink"
          >
            GCMD DIF<v-icon right>assignment</v-icon>
          </v-btn>

      </v-layout>
    </v-card-actions>

    <v-card-actions v-if="showPlaceholder && !citationText">
      <v-spacer></v-spacer>          
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
      </div>
    </v-card-actions>

  </v-card>

</template>

<script>
  export default {
    props: {
      metaid: String,
      citationText: String,
      citationXmlLink: String,
      ciationIsoXmlLink: String,
      ciationGCMDXmlLink: String,
      fixedHeight: Boolean,
      showPlaceholder: Boolean,
    },
    mounted: function mounted() {
    },
    data: () => ({
    }),
    methods: {
    },
    components: {
    },
  };

</script>


