<template>
  <v-card ripple
          hover
          v-on:click.native="clicked">  
          
    <v-container grid-list-md pa-0>
      <v-layout row align-center>

        <v-flex xs5 py-0>
          <v-card-media class="imagezoom"
                        height="100px">
            <img :src="imageSrc" />                        
          </v-card-media>
        </v-flex>

        <v-flex xs7 mt-1>
            <div class="headline">{{ title }}</div>
        </v-flex>

      </v-layout>
    </v-container>

  </v-card>
</template>


<script>
  import dataCreatorImg from '../../../assets/cards/data_creator.jpg';

  export default {
    props: {
      title: String,
    },
    methods: {
      clicked: function clicked() {
        this.$emit('clicked');
      },
    },
    computed: {
      imageSrc: function imageSrc() {
        return dataCreatorImg;
      },
    },
    data: () => ({
      dataCreatorImg,
    }),
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
</style>