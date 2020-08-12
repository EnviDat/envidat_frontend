<template >

  <v-menu
    transition="slide-y-transition"
    bottom
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="purple"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        User Menu
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, i) in navItems"
                    :key="i" >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
/**
 * User Profile Menu Navigation
 *
 * @summary User Menu
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 14:18:32 
 * Last modified  : 2020-08-11 21:04:32
 */

export default {
  props: {
    navItems: Array,
  },
  components: {
  },
  computed: {
  },
  methods: {
  },
  data: () => ({
  }),
};
</script>


<style lang="scss" scoped>

</style>
