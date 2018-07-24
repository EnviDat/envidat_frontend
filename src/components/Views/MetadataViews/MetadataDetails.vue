<template>
  <v-card >
    <v-card-title class="title metadata_title" >Further Information</v-card-title>

    <v-card-text >

      <v-form>

        <div v-for="val in details" :key="val.label" >
          <v-text-field v-if="val.text"
              v-bind:label="val.label"
              v-bind:name="val.label"
              :value="val.text"
              :id="val.label"
              disabled
          />
          <div v-if="!val.text && showPlaceholder"
              style="float: left;">
            {{ val.label }}
          </div>

          <div v-if="!val.text && showPlaceholder" 
              style="float: right; width: 80%; "
                class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-pulse" >
            <div class='bone bone-type-heading ' ></div>
          </div>

        </div>

        <!-- <v-text-field v-if="details"
          v-for="val in details" :key="val.label"
          v-bind:label="val.label"
          v-bind:name="val.label"
          :value="val.text"
          :id="val.label"
          disabled
        ></v-text-field> -->
        
      </v-form>

    </v-card-text>

    <!--v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="readMore()">
        <v-icon color="accent" >{{ showFullDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>        
    </v-card-actions-->
  </v-card>
</template>

<script>
  /* eslint-disable no-alert */
  /* eslint-disable no-console */
  export default {
    props: {
      details: Array,
      showPlaceholder: Boolean,
    },
    data: () => ({ }),
    methods: {
      clicking: function clicking() {
        alert(this.props);
      },
    },
    components: {
    },
  };
  
</script>


