<template>

  <v-card :style="fixedHeight ? 'height: 304px;' : ''">
    <v-card-title class="title metadata_title" >Citation</v-card-title>

    <v-card-text v-if="citationText"
                  style="font-style: italic; ">
      {{ citationText }}
    </v-card-text>

    <v-card-text v-if="!citationText && showPlaceholder" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
        <div class='bone bone-type-multiline bone-style-paragraph' ></div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>          
      <v-btn color="primary" v-bind:href="$props.citationXmlLink" >Get DataCite XML <v-icon right>assignment</v-icon></v-btn>
      <v-btn color="primary" v-bind:href="$props.ciationIsoXmlLink" >Download ISO 19139 XML <v-icon right>assignment</v-icon></v-btn>          
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


