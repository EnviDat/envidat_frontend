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


          <v-flex xs4 sm2 md3 lg2
                  v-for="link in citationLinks"
                  :key="link.text"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  :buttonText="link.text"
                                  :toolTipText="link.toolTipText"
                                  materialIconName="assignment"
                                  :isSmall="true"
                                  iconColor="white"
                                  :url="link.url"
                                  />
          </v-flex>

          <!-- use xs5 to ensure on xs screens it will be in two rows -->
          <!-- <v-flex xs4 sm2
                  v-if="citationXmlLink"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  buttonText="DataCite"
                                  materialIconName="assignment"
                                  :isSmall="true"
                                  iconColor="white"
                                  toolTipText="Download XML citation"
                                  :url="citationXmlLink"
                                  />
          </v-flex>

          <v-flex xs4 sm2
                  v-if="ciationIsoXmlLink"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  buttonText="ISO 19139"
                                  toolTipText="Download ISO XML citation"
                                  materialIconName="assignment"
                                  :isSmall="true"
                                  iconColor="white"
                                  :url="ciationIsoXmlLink"
                                  />
          </v-flex>

          <v-flex xs4 sm2
                  v-if="ciationGCMDXmlLink"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  buttonText="GCMD DIF"
                                  toolTipText="Download GCMD XML citation"
                                  materialIconName="assignment"
                                  :isSmall="true"
                                  iconColor="white"
                                  :url="ciationGCMDXmlLink"
                                  />
          </v-flex>

          <v-flex xs4 sm2
                  v-if="ciationBibtexXmlLink"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  buttonText="BibTex"
                                  toolTipText="Download BibTex XML citation"
                                  materialIconName="bookmark"
                                  :isSmall="true"
                                  iconColor="white"
                                  :url="ciationBibtexXmlLink"
                                  />
          </v-flex>

          <v-flex xs4 sm2
                  v-if="ciationRisXmlLink"
          >
            <base-rectangle-button marginClass="mx-1 citationButton"
                                  buttonText="RIS"
                                  toolTipText="Download RIS XML citation"
                                  materialIconName="bookmark"
                                  :isSmall="true"
                                  iconColor="white"
                                  :url="ciationRisXmlLink"
                                  />
          </v-flex> -->

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
    checkedGenericProps: false,
  }),
  computed: {
    citationText() {
      return this.mixinMethods_getGenericProp('citationText');
    },
    citationLinks() {
      return [{
        text: 'DataCite',
        toolTipText: 'Download XML citation',
        url: this.citationXmlLink,
      },
      {
        text: 'ISO 19139',
        toolTipText: 'Download ISO XML citation',
        url: this.ciationIsoXmlLink,
      },
      {
        text: 'GCMD DIF',
        toolTipText: 'Download GCMD XML citation',
        url: this.ciationGCMDXmlLink,
      },
      {
        text: 'BibTex',
        toolTipText: 'Download BibTex XML citation',
        url: this.ciationBibtexXmlLink,
      },
      {
        text: 'RIS',
        toolTipText: 'Download RIS XML citation',
        url: this.ciationRisXmlLink,
      },
      ];
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
    ciationBibtexXmlLink() {
      return this.mixinMethods_getGenericProp('ciationBibtexXmlLink');
    },
    ciationRisXmlLink() {
      return this.mixinMethods_getGenericProp('ciationRisXmlLink');
    },
    fixedHeight() {
      return this.mixinMethods_getGenericProp('fixedHeight');
    },
  },
  // methods: {
  //   getGenericProp(propName) {
  //     return this.genericProps[propName] ? this.genericProps[propName] : null;
  //   },
  // },
  components: {
    BaseRectangleButton,
  },
};

</script>

