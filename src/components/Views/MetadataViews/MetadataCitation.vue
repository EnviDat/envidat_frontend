<template>

  <v-card :style="fixedHeight ? 'height: 304px;' : ''">
    <v-card-title class="title metadata_title" >Citation</v-card-title>

    <v-card-text v-if="citationText"
                  style="font-style: italic; ">
      {{ citationText }}
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !citationText" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

    <v-card-actions v-if="!showPlaceholder">
      
      <v-layout row wrap justify-end>
        
          <rectangle-button v-if="citationXmlLink"
                        class="ml-2"
                        buttonText="DataCite"
                        materialIconName="assignment"
                        :isSmall="$vuetify.breakpoint.xsOnly"
                        iconColor="white"
                        toolTipText="Download XML citation"
                        :url="citationXmlLink"
          />

          <rectangle-button v-if="ciationIsoXmlLink"
                        class="ml-2"
                        buttonText="ISO 19139"
                        toolTipText="Download ISO XML citation"
                        materialIconName="assignment"
                        :isSmall="$vuetify.breakpoint.xsOnly"
                        iconColor="white"
                        :url="ciationIsoXmlLink"
          />

          <rectangle-button v-if="ciationGCMDXmlLink"
                        class="ml-2"
                        buttonText="GCMD DIF"
                        toolTipText="Download GCMD XML citation"
                        materialIconName="assignment"
                        :isSmall="$vuetify.breakpoint.xsOnly"
                        iconColor="white"
                        :url="ciationGCMDXmlLink"
          />

      </v-layout>
    </v-card-actions>

    <v-card-actions v-if="showPlaceholder && !citationText">
      <v-spacer></v-spacer>          
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
        <div style="width: 128px; height: 32px;" class='px-1 bone bone-type-image bone-style-rectangle' ></div>
      </div>
    </v-card-actions>

  </v-card>

</template>

<script>
import RectangleButton from '../../Elements/RectangleButton';

export default {
  props: {
    id: String,
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
    RectangleButton,
  },
};

</script>


