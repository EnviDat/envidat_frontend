<template >

  <v-menu transition="slide-y-transition"
          bottom
          offset-y >
    <template v-slot:activator="{ on, attrs }">
      
      <div v-bind="attrs"
            v-on="on" >
        <user-avatar :size="28"
                      :nameInitials="nameInitials"
                      :emailHash="userObject ? userObject.email_hash : null" />
      </div>                    

    </template>
    <v-list>
      <v-list-item v-for="(item, i) in navItems"
                    :key="i"
                    @click="menuClick(item)" >
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
 * Last modified  : 2020-08-12 15:15:41
 */
import UserAvatar from '@/components/Layouts/UserAvatar';

export default {
  props: {
    userObject: Object,
    navItems: Array,
  },
  components: {
    UserAvatar,
  },
  computed: {
    nameInitials() {
      if (!this.userObject) {
        return '';
      }

      return `${this.userObject.name.substring(0, 1)}${this.userObject.fullname.substring(0, 1)}`.toUpperCase();
    },
  },
  methods: {
    menuClick(item) {
      this.$emit('userMenuItemClick', item);
    },
  },
  data: () => ({
  }),
};
</script>


<style lang="scss" scoped>

</style>
