<template>
  <div>
      <div>Uuups didn't find what you are looking for</div>

      <router-link :to="path">Back to browsing</router-link>
  </div>
</template>


<script>
export default {
  props: {
    backPath: String,
  },
  computed:{
    path: function path() {
      return "/" + this.backPath + "/";
    }
  }
};
</script>
