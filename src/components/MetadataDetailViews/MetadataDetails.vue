<template>
  <v-card >
    <v-card-title class="title metadata_title" >Further Information</v-card-title>

    <v-card-text v-if="!showPlaceholder && (!details || details.length <= 0)"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

    <v-card-text v-if="details && details.length > 0">

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
                    class="flex pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
                <div class='bone bone-type-text ' ></div>
              </div>

              <div style="width: 80%;"
                    class="flex pl-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer" >
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
  export default {
    props: {
      genericProps: Object,
      details: Array,
      showPlaceholder: Boolean,
    },
    updated: function updated() {
      if (this.genericProps) {
        Object.assign(this, 'props', this.genericProps);
      }
    },
    data: () => ({
      maxSingleTextLengthLg: 80,
      maxSingleTextLengthMd: 80,
      maxSingleTextLengthXs: 70,
      emptyText: 'No details found for this dataset',
    }),
    methods: {
      clicking: function clicking() {
        alert(this.props);
      },
      isSingleText: function isSingleText(text, label) {
        if (!text || text.length <= 0) {
          return true;
        }

        if (this.$vuetify.breakpoint.xsOnly) {
          return text.length <= this.maxSingleTextLengthXs;
        }

        if (this.$vuetify.breakpoint.mdAndDown) {
          return text.length <= this.maxSingleTextLengthMd;
        }

        return text.length <= this.maxSingleTextLengthLg;
      },
    },
    components: {
    },
  };
  
</script>


