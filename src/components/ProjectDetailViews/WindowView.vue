<template>
  <v-card tile min-height="200">

    <!-- <v-layout align-center>
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
    </v-layout> -->

    <v-card-title>Subprojects</v-card-title>

    <v-layout row wrap>

      <v-flex v-for="(project, index) in subProjects" :key="'sub_' + index">
        <project-card :id="project.id"
                      :title="project.title"
                      :img="project.image_display_url"
                      :defaultImg="defaultImg"
                      :description="project.description"
                      :subProjects="project.subProjects"
                      @cardClick="onCardClick"
                      @subprojectClick="onSubprojectClick" />
      </v-flex>

    </v-layout>

  </v-card>
</template>

<script>
/**
 * WindowView.vue IS UNFINISHED!
 * Experimental a horizontal slider for content (instead of images).
 *
 * @summary vertical horizontal for content
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 14:11:27
 * Last modified  : 2019-10-23 16:35:03
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

// import MMarkdownPreview from 'm-markdown-preview';
// import BaseIconButton from '@/components/BaseElements/BaseIconButton';
import ProjectCard from '@/components/Cards/ProjectCard';

export default {
  components: {
    ProjectCard,
    // MMarkdownPreview,
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
