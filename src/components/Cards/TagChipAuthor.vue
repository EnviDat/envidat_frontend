<template>
    <v-tooltip bottom>
      <!-- <div slot="activator" class="iconCentering">
        <img class="envidatIcon"
            :class="compactLayout ? 'small' : ''"
            :src="icon" />          
      </div> -->

      <v-chip slot="activator"
          class="authorTag"
          :class="{ 'white--text': highlighted ? true : false,
                    'smallChip': $vuetify.breakpoint.smAndDown ? true : false,
                  }"
          :style="{'height' : $vuetify.breakpoint.xsOnly ? '15px' : '' }"
          @click.stop="clicked" >

          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>

          {{ name }}
      </v-chip>

      <span>{{ toolTipText }}</span>
    </v-tooltip>


</template>

<script>
  export default {
    props: {
      name: String,
      toolTipText: String,
      highlighted: Boolean,
    },
    computed: {
    },
    methods: {
      clicked: function clicked() {
        this.$emit('clicked', this.name);
      },
    },
  };
</script>

<style scoped>
  .authorTag {
    opacity: 0.85;
    height: 24px !important;
    background-color: #f8f8f8 !important;
  }

  .authorTag > .v-chip__content > .v-avatar {
    margin-left: -16px !important;
  }

</style>