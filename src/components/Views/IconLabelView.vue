<template>
  
    <v-layout row >

      <v-flex v-if="icon && iconTooltip"
        xs2 >
        <v-tooltip bottom>
        <v-icon slot="activator" >{{ icon }}</v-icon>
        <span>{{ iconTooltip }}</span>
        </v-tooltip>
      </v-flex>

      <v-flex v-if="icon && !iconTooltip"
        xs2 >
        <v-icon >{{ icon }}</v-icon>
      </v-flex>

      <v-flex v-if="label"
        xs4 >
        {{ label }}
      </v-flex>

      <v-flex v-if="text"
        xs5 >
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
    },
  };
</script>

<style>
  
</style>