<template>

  <v-card
    ripple
    hover>

    <v-card-media
      class="imagezoom"
      v-bind="{ [`height`]: this.$vuetify.breakpoint.smAndDown ? '200px' : '300px', 
              }"
      :src="dataCreatorImg">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 >
            <span class="display-2 white--text">{{ titleText }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn      
        v-if="loggedIn"
        large
        color="primary"
        @click.native="enterclick">
          {{ loggedinText }}
      </v-btn>      

      <v-btn
        v-if="!loggedIn"
        large
        color="primary"
        @click.native="singupclick">
          {{ signupText }}
      </v-btn>
      
      <v-btn
        v-if="!loggedIn"
        large
        color="primary"
        @click.native="loginclick">
          {{ loginText }}
      </v-btn>      

    </v-card-actions>
    
  </v-card>

  
</template>


<script>
  import dataCreatorImg from '../../../assets/cards/data_creator.jpg';

  export default {
    props: {
      titleText: String,
      loginText: String,
      signupText: String,
      loggedIn: Boolean,
      loggedinText: String,
    },
    methods: {
      enterclick: function enterclick() {
        this.$emit('enterclick', this.loggedinText);
      },
      singupclick: function singupclick() {
        this.$emit('singupclick', this.signupText);
      },
      loginclick: function loginclick() {
        this.$emit('loginclick', this.loginText);
      },
    },
    data: () => ({
      dataCreatorImg,
    }),
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*
  
    h1,
  
    h2 {
  
      font-weight: normal;
  
    }
  
    
  
    ul {
  
      list-style-type: none;
  
      padding: 0;
  
    }
  
    
  
    li {
  
      display: inline-block;
  
      margin: 0 10px;
  
    }
  
    
  
    a {
  
      color: #42b983;
  
    }
  
    */
</style>
