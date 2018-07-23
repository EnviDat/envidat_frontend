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

      <v-flex v-if="icon && iconTooltip"
        xs3 md2
        >
        <v-tooltip bottom>
          <img slot="activator" class="envidatIcon" :src="icon" />          
          <span>{{ iconTooltip }}</span>
        </v-tooltip>
      </v-flex>

      <v-flex v-if="icon && !iconTooltip"
        xs2 pr-2>
          <img class="envidatIcon" :src="icon" />          
      </v-flex>

      <v-flex v-if="label"
        xs4 >
        {{ label }}
      </v-flex>

      <v-flex v-if="text" >
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
    },
    computed: {
      alignClass: function alignClass() {
        return {
          flex: !this.alignLeft,
          xs2: !this.alignLeft,
          'pr-3': this.alignLeft,
          'pl-1': this.alignLeft,
        };
      },
    },
  };
</script>

<style>
  
</style>