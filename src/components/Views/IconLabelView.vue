<template>
  
    <v-layout row align-center>

      <!-- <v-flex v-if="icon && iconTooltip"
        xs2 >
        <v-tooltip bottom>
          <img slot="activator" class="envidatIcon" :src="icon" />          
          <span>{{ iconTooltip }}</span>
        </v-tooltip>
      </v-flex> -->

      <div v-if="icon && iconTooltip"
        :class="alignClass"
        style="position: relative: top: 2px;"
        >
        <v-tooltip bottom>
          <div slot="activator" class="iconCentering">
            <img class="envidatIcon" :src="icon" />          
          </div>
          <span>{{ iconTooltip }}</span>
        </v-tooltip>
      </div>

      <v-flex v-if="icon && !iconTooltip"
        xs2 pr-2
        >
        <div class="iconCentering">
          <img class="envidatIcon" :src="icon" />          
        </div>
      </v-flex>

      <v-flex v-if="label"
              xs4 
              :style="textStyle"
      >
        {{ label }}
      </v-flex>

      <v-flex v-if="text"
              :style="textStyle"
      >
        {{ text }}
      </v-flex>

      <v-flex v-if="!text && usePlaceholder" >
        <div class="pr-2 skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-pulse" >
          <div class='bone bone-type-text bone-style-steps' ></div>
        </div>
      </v-flex>

    </v-layout>

</template>

<script>
  export default {
    props: {
      icon: String,
      iconTooltip: String,
      label: String,
      text: String,
      alignLeft: Boolean,
      bold: Boolean,
      usePlaceholder: Boolean,
      wordBreak: Boolean,
    },
    computed: {
      alignClass: function alignClass() {
        return {
          flex: !this.alignLeft,
          xs3: !this.alignLeft,
          md2: !this.alignLeft,
          'pr-3': this.alignLeft,
          'pl-1': this.alignLeft,
          'py-0': true,
        };
      },
      textStyle: function textStyle() {
        let style = '';

        if (this.bold) {
          style = 'font-weight: 700 !important;';
        }

        if (this.wordBreak) {
          style += 'word-break: break-all;';
        }

        if (this.$vuetify.breakpoint.smAndDown) {
          style += 'font-size: 0.85rem;';
        }

        return style;
      },
    },
  };
</script>

<style>
  .iconCentering {
    position: relative;
    top: 2px;
  }

</style>