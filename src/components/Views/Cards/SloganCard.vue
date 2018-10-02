<template>

  <v-card>

    <v-img
        background-color="primary"
      >
        <!-- v-bind="{['style'] : dynamicCardBackground }"
        height="150px" -->
      
      <v-container grid-list-xs fill-height px-3 pt-3 pb-0>
        <v-layout column>
          <v-flex xs12 py-0>

            <div class="hidden-sm-and-down envidat_slogan display-1">
              {{ slogan }}
            </div>

            <div class="hidden-xs-only hidden-md-and-up envidat_slogan headline">
              {{ slogan }}
            </div>

            <div class="hidden-sm-and-up envidat_slogan headline">
              {{ slogan }}
            </div>
          </v-flex>

        </v-layout>
      </v-container>


    </v-img>

    <v-card-title primary-title>
      <div>{{ subSlogan }}</div>
    </v-card-title>

    <!-- <v-card-actions class="ma-0 pa-2"
                    style="position: absolute; bottom: 0; right: 0;"> -->
    <v-card-actions >
      <v-spacer></v-spacer>

      <v-btn @click.native="buttonCallback"
              color="primary"
              small
      >
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>

export default {
  props: {
    slogan: String,
    subSlogan: String,
    buttonText: String,
    buttonCallback: Function,
  },
  components: {
  },
  created: function created() {
  },
  methods: {
  },
  computed: {
  },
  data: () => ({
  }),
};
</script>

<style scoped>

</style>
