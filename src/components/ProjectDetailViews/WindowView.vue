<template>
<v-card>
  <v-layout align-center>
    <v-item-group v-model="window"
                  mandatory
                  class="shrink mr-4"
                  tag="v-flex" >

      <v-item v-for="(sub, index) in subProjects"
              :key="'nav_' + index" >

        <div slot-scope="{ active, toggle }">

          <!-- <base-icon-button :materialIconName="active ? 'arrow_right' : 'arrow_drop_down'"
                            :outlined="false"
                            color="transparent"
                            iconColor="grey"
                            :isToggled="expanded"
                            :rotateOnClick="true"
                            :rotateToggle="expanded"
                            :toolTipText="sub.title"
                            @clicked="toggle" /> -->

          <v-tooltip>
            <v-btn slot="activator"
                    :input-value="active"
                    icon
                    @click="toggle" >
              <v-icon>{{ active ? 'arrow_right' : 'arrow_drop_down' }}</v-icon>
            </v-btn>

            <span>{{ sub.title }}</span>
          </v-tooltip>
        </div>
      </v-item>
    </v-item-group>

    <v-flex>
      <v-window v-model="window"
                class="elevation-1"
                vertical
      >
        <v-window-item v-for="(sub, index) in subProjects"
                        :key="'window_' + index" >

          <v-card flat>
            <v-card-text>
              <v-layout align-center mb-3>
                <strong class="title">{{ sub.title }}</strong>

                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>find_in_page</v-icon>
                </v-btn>
              </v-layout>

              <m-markdown-preview :markdown="sub.description"
                                  :options="{ html: true,
                                              xhtmlOut: true,
                                              linkify: true,
                                              breaks: true }" />
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-flex>
  </v-layout>
</v-card>
</template>

<script>
import MMarkdownPreview from 'm-markdown-preview';
import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    BaseIconButton,
    MMarkdownPreview,
  },
  props: {
    subProjects: Array,
    showPlaceholder: Boolean,
  },
  computed: {
    // window() {
    //   return this.subProjects;
    // },
  },
  methods: {
  },
  data: () => ({
    length: 5,
    window: 0,
  }),
};
</script>

<style scoped>

  .bodyTitle {
    font-family: 'Libre Baskerville', serif !important;
    font-weight: 700 !important;
  }

  .heightAndScroll {
    max-height: 500px;
    overflow-y: auto !important;
  }

</style>
