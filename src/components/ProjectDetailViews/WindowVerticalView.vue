<template>
  <v-card tile min-height="200">

    <v-layout align-center>
      <v-item-group v-model="window"
                    mandatory
                    class="shrink mr-2"
                    tag="v-flex" >

        <div v-if="!subProjects && showPlaceholder" >

          <v-item v-for="index in 3"
                  :key="'bullet_' + index" >

            <div class='px-3 skeleton'>
              <div style='height: 36px; width: 36px;'
                    class='bone bone-type-image bone-style-round'></div>
            </div>
          </v-item>
        </div>

        <v-item v-for="(sub, index) in subProjects"
                :key="'nav_' + index" >

          <div slot-scope="{ active, toggle }">

            <v-tooltip top>
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
                  vertical >

          <v-window-item v-if="!subProjects && showPlaceholder"
                          class="ma-3">

            <v-card height="150" class="pa-3">
              <div class="skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
                <div class="bone bone-type-heading " />
              </div>

              <div class="pt-4 skeleton skeleton-size-big skeleton-color-concrete skeleton-animation-shimmer">
                <div class="bone bone-type-multiline bone-style-steps" />
              </div>

            </v-card>

          </v-window-item>

          <v-window-item v-for="(sub, index) in subProjects"
                          :key="'window_' + index"
                          class="ma-3" >

            <v-card height="200" >
              <v-card-title>
                <strong class="title">{{ sub.title }}</strong>
              </v-card-title>

              <v-card-text>
                <v-layout row wrap
                          align-center
                          justify-center
                          fill-height >

                  <v-flex xs11>
                    {{ sub.description }}
                  </v-flex>

                  <v-flex xs1>
                    <v-btn icon>
                      <v-icon>find_in_page</v-icon>
                    </v-btn>
                  </v-flex>

                  <!-- <m-markdown-preview :markdown="sub.description"
                                      :options="{ html: true,
                                                  xhtmlOut: true,
                                                  linkify: true,
                                                  breaks: true }" /> -->
                  <v-flex xs12>Metadata</v-flex>

                  <v-flex xs12
                          v-for="(meta, index) in metadatas"
                          :key="index">
                    {{ meta.id }}
                  </v-flex>

                </v-layout>
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
// import BaseIconButton from '@/components/BaseElements/BaseIconButton';

export default {
  components: {
    // BaseIconButton,
    MMarkdownPreview,
  },
  props: {
    subProjects: Array,
    metadatas: Array,
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
