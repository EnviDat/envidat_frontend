<template>

  <v-card :style="fixedHeight ? 'height: 304px;' : ''">
    <v-card-title class="title metadata_title" >Citation</v-card-title>

    <v-card-text v-if="citationText"
                  style="font-style: italic; ">
      {{ citationText }}
    </v-card-text>

    <v-card-actions v-if="!showPlaceholder && citationText">
      
      <v-container fluid grid-list-md pa-0>

        <v-layout justify-end row wrap>

          <!-- use xs5 to ensure on xs screens it will be in two rows -->
          <v-flex xs5 sm3 lg4 xl3>
        
            <base-rectangle-button v-if="citationXmlLink"
                                  class="ml-2"
                                  buttonText="DataCite"
                                  materialIconName="assignment"
                                  :isSmall="$vuetify.breakpoint.xsOnly"
                                  iconColor="white"
                                  toolTipText="Download XML citation"
                                  :url="citationXmlLink"
                                  />
          </v-flex>

          <!-- use xs5 to ensure on xs screens it will be in two rows -->
          <v-flex xs5 sm3 lg4 xl3>
            <base-rectangle-button v-if="ciationIsoXmlLink"
                                  class="ml-2"
                                  buttonText="ISO 19139"
                                  toolTipText="Download ISO XML citation"
                                  materialIconName="assignment"
                                  :isSmall="$vuetify.breakpoint.xsOnly"
                                  iconColor="white"
                                  :url="ciationIsoXmlLink"
                                  />
          </v-flex>

          <!-- use xs5 to ensure on xs screens it will be in two rows -->
          <v-flex xs5 sm3 lg4 xl3>
            <base-rectangle-button v-if="ciationGCMDXmlLink"
                                  class="ml-2"
                                  buttonText="GCMD DIF"
                                  toolTipText="Download GCMD XML citation"
                                  materialIconName="assignment"
                                  :isSmall="$vuetify.breakpoint.xsOnly"
                                  iconColor="white"
                                  :url="ciationGCMDXmlLink"
                                  />
          </v-flex>

        </v-layout>
      </v-container>

    </v-card-actions>

    <v-card-text v-if="showPlaceholder && !citationText" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !citationText"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

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
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  props: {
    genericProps: Object,
    showPlaceholder: Boolean,
  },
  data: () => ({
    emptyText: 'No citation found for this dataset',
  }),
  computed: {
    citationText() {
      return this.mixinMethods_getGenericProp('citationText');
    },
    citationXmlLink() {
      return this.mixinMethods_getGenericProp('citationXmlLink');
    },
    ciationIsoXmlLink() {
      return this.mixinMethods_getGenericProp('ciationIsoXmlLink');
    },    
    ciationGCMDXmlLink() {
      return this.mixinMethods_getGenericProp('ciationGCMDXmlLink');
    },
    fixedHeight() {
      return this.mixinMethods_getGenericProp('fixedHeight');
    },
  },
  components: {
    BaseRectangleButton,
  },
};

</script>


