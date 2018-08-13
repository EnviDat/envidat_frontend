<template>
  <v-card >
    <v-card-title class="title metadata_title" >Further Information</v-card-title>

    <v-card-text >

      <v-form>

        <div v-for="val in details" :key="val.label" >

          <v-text-field v-if="isSingleText(val.text, val.label)"
                        :label="val.label"
                        :name="val.label"
                        :value="val.text"
                        :id="val.label"
                        readonly
          />

          <v-textarea v-if="!isSingleText(val.text, val.label)"
                        :label="val.label"
                        :name="val.label"
                        :value="val.text"
                        :id="val.label"
                        readonly
           />

          <div v-if="showPlaceholder
              && !val.text" >
            <v-layout row>
              <div style="width: 20%;"
                    class="flex pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
                <div class='bone bone-type-text ' ></div>
              </div>

              <div style="width: 80%;"
                    class="flex pl-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
                <div class='bone bone-type-text ' ></div>
              </div>
            </v-layout>
          </div>
        </div>
        
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
    data: () => ({
      maxSingleTextLength: 55,
    }),
    methods: {
      clicking: function clicking() {
        alert(this.props);
      },
      isSingleText: function isSingleText(text, label) {
        if (!text || text.length <= 0){
          return true;          
        }

        return text.length <= this.maxSingleTextLength;
      },
    },
    components: {
    },
  };
  
</script>


