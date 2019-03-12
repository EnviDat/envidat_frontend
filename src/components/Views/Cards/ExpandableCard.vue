<template>
  <v-card ripple
          hover
          :expanded="expanded"
          v-on:click.native="clicked">  
          
    <v-container grid-list-md pa-0>
      <v-layout row align-center>

        <v-flex xs5 py-0>
          <v-card-media class="imagezoom"
                        :height=" $vuetify.breakpoint.xsOnly ? minHeight + 'px' : maxHeight + 'px' ">
            <img :src="img" />                        
          </v-card-media>
        </v-flex>

        <v-flex xs7 mx-1 mt-1>
            <div class="headline"
                :class="{ 'compactTitle' : this.$vuetify.breakpoint.xsOnly }"
            >
              {{ title }}
            </div>
        </v-flex>

      </v-layout>
    </v-container>

    <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 5px; right: 5px;">
      
      <base-icon-button materialIconName="expand_more"
                        :outlined="false"
                        color="transparent"
                        iconColor="grey"
                        :isToggled="expanded"
                        :rotateOnClick="true"
                        :toolTipText="expanded ? 'Hide info' : 'Show info'"
                        v-on:clicked="clicked" />

    </v-card-actions>

    <v-slide-y-transition >
      <v-card-text v-show="expanded"
                    class="py-4">
        <m-markdown-preview :markdown="text" :options="{ html: true, xhtmlOut: true, linkify: true, breaks: true }" />
      </v-card-text>
    </v-slide-y-transition>

  </v-card>
</template>


<script>
  import MMarkdownPreview from 'm-markdown-preview';
  import BaseIconButton from '../../BaseElements/BaseIconButton';

  export default {
    props: {
      title: String,
      img: String,
      text: String,
      minHeight: Number,
      maxHeight: Number,
    },
    methods: {
      clicked: function clicked() {
        this.expanded = !this.expanded;
      },
    },
    computed: {
    },
    data: () => ({
      expanded: false,
    }),
    components: {
      BaseIconButton,
      MMarkdownPreview,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .card .headline {
    font-size: 1.45em !important;
    overflow: inherit !important;
    text-overflow: inherit !important;
    max-height: inherit !important;
    line-height: inherit !important;
  }

  .compactTitle { 
    font-size: 15px !important; 
    line-height: 1.3em !important; 
  } 

  .v-card__media img {
    width: inherit !important;
  }
</style>