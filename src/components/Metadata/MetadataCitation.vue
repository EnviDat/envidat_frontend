<template>
  <v-card :style="fixedHeight ? 'height: 304px;' : ''">
    <v-card-title class="title metadata_title">
      Citation
    </v-card-title>

    <v-card-text v-if="citationText"
                  style="font-style: italic; " >

      <m-markdown-preview :markdown="citationText"
                          :options="{ html: true,
                                      xhtmlOut: true,
                                      linkify: true,
                                      breaks: true }" />

    </v-card-text>

    <v-card-actions v-if="!showPlaceholder && citationText"
                    class="px-3">
      <v-container fluid
                    grid-list-md
                    pa-0 >
        <v-layout row wrap >

          <v-flex v-for="link in citationLinks"
                  :key="link.text"
                  shrink >
            <base-rectangle-button margin-class="mx-1 citationButton"
                                    :button-text="link.text"
                                    :tool-tip-text="link.tooltipText"
                                    material-icon-name="assignment"
                                    :is-small="true"
                                    icon-color="white"
                                    :url="link.url" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-actions>

    <v-card-text v-if="showPlaceholder && !citationText">
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !citationText"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

    <v-card-actions v-if="showPlaceholder && !citationText">
      <v-spacer />
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div style="width: 128px; height: 32px;"
              class="mx-1 bone bone-type-image bone-style-rectangle" />
        <div style="width: 128px; height: 32px;"
              class="mx-1 bone bone-type-image bone-style-rectangle" />
        <div style="width: 128px; height: 32px;"
              class="mx-1 bone bone-type-image bone-style-rectangle" />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
/**
 * MetadataCitation.vue shows the citation and buttons
 * to download different xml formatted version of the citation.
 *
 * @summary shows the citation of a metadata entry
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 15:54:13
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import MMarkdownPreview from 'm-markdown-preview';
import BaseRectangleButton from '@/components/BaseElements/BaseRectangleButton';

export default {
  components: {
    MMarkdownPreview,
    BaseRectangleButton,
  },
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
    citationLinks() {
      return [{
        text: 'DataCite',
        tooltipText: 'Download DataCite XML citation',
        url: this.citationXmlLink,
      },
      {
        text: 'ISO 19139',
        tooltipText: 'Download ISO XML citation',
        url: this.citationIsoXmlLink,
      },
      {
        text: 'GCMD DIF',
        tooltipText: 'Download GCMD XML citation',
        url: this.citationGCMDXmlLink,
      },
      {
        text: 'BibTex',
        tooltipText: 'Download BibTex XML citation',
        url: this.citationBibtexXmlLink,
      },
      {
        text: 'RIS',
        tooltipText: 'Download RIS XML citation',
        url: this.citationRisXmlLink,
      },
      ];
    },
    citationXmlLink() {
      return this.mixinMethods_getGenericProp('citationXmlLink');
    },
    citationIsoXmlLink() {
      return this.mixinMethods_getGenericProp('citationIsoXmlLink');
    },
    citationGCMDXmlLink() {
      return this.mixinMethods_getGenericProp('citationGCMDXmlLink');
    },
    citationBibtexXmlLink() {
      return this.mixinMethods_getGenericProp('citationBibtexXmlLink');
    },
    citationRisXmlLink() {
      return this.mixinMethods_getGenericProp('citationRisXmlLink');
    },
    fixedHeight() {
      return this.mixinMethods_getGenericProp('fixedHeight');
    },
  },
};

</script>
