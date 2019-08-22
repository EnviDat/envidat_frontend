<template>
  <v-card :dark="dark">

    <v-card-title class="bodyTitle title">Subprojects</v-card-title>

    <v-card-text v-if="subProjects" >

          <v-container pa-0 grid-list-lg fluid>
          <v-layout row wrap>

            <v-flex v-for="(project, index) in subProjects"
                    :key="'sub_' + index"
                    xs12 sm6 md4 xl3
                    pa-3>

              <project-card :id="project.id"
                            :title="project.title"
                            :img="project.image_url"
                            :defaultImg="defaultImg"
                            :description="project.description"
                            :subProjects="project.subProjects"
                            @cardClick="onCardClick"
                            @subprojectClick="onSubprojectClick" />
            </v-flex>

          </v-layout>
          </v-container>
    </v-card-text>

    <v-card-text v-if="showPlaceholder && !subProjects" >
      <div class="skeleton skeleton-size-normal skeleton-color-concrete skeleton-animation-shimmer">
        <div class="bone bone-type-multiline bone-style-paragraph" />
      </div>
    </v-card-text>

    <v-card-text v-if="!showPlaceholder && !subProjects"
                  style="color: red;" >
      {{ emptyText }}
    </v-card-text>

  </v-card>
</template>

<script>
import ProjectCard from '@/components/Cards/ProjectCard';

export default {
  components: {
    ProjectCard,
  },
  props: {
    defaultImg: String,
    subProjects: Array,
    dark: Boolean,
    showPlaceholder: Boolean,
  },
  computed: {
  },
  methods: {
    onCardClick(projectId) {
      this.$emit('projectClick', projectId);
    },
    onSubprojectClick(subprojectId) {
      this.$emit('subprojectClick', subprojectId);
    },
  },
  data: () => ({
    showFullDescription: false,
    maxTextLength: 1000,
    emptyText: 'Could not load Subprojects',
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
