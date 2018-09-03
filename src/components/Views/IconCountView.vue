<template>
      <v-tooltip bottom>
        
          <div slot="activator" class="metadataInfoIcon">
            <v-layout row @mouseover="hoverBadge = true" @mouseleave="hoverBadge = false">

              <v-flex pa-0>
                <v-badge v-bind="{ left: !hoverBadge }"
                        overlap
                        :class="{ envidat_badgeBigNumber : count > 9,
                                  envidat_badge: count <= 9 }"
                        >
                  <span slot="badge">{{ count }}</span>
                </v-badge>              
              </v-flex>

              <v-flex pa-0 >
                <img class="envidatIcon" :src="getIcon(iconString)" />                
              </v-flex>
              
            </v-layout>
          </div>

          <span>{{ tooltip }}</span>
      </v-tooltip>

</template>

<script>
  export default {
    props: {
      iconString: String,
      count: Number,
      tooltip: String,
    },
    data: () => ({
      hoverBadge: false,
    }),
    computed: {
    },
  };
</script>

<style>
  .iconCentering {
    position: relative;
    top: 2px;
  }
</style>