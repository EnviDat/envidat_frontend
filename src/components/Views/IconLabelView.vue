<template>
  
    <v-layout row align-center
      v-if="label || text">

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
              v-bind:style="this.bold ? 'font-weight: 700 !important;': ''"
      >
        {{ label }}
      </v-flex>

      <v-flex v-if="text"
              v-bind:style="this.bold ? 'font-weight: 700 !important;': ''"
      >
        {{ text }}
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
    },
  };
</script>

<style>
  .iconCentering {
    position: relative;
    top: 2px;
  }
</style>