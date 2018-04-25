<template>

    <v-chip
        small>
        {{ tag }}
    </v-chip>            

</template>

<script>
  export default {
    props: {
      tag: String,
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>