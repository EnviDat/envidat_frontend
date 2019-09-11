/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import './js/vuetify-components';

import SloganCard from '../components/Cards/SloganCard';

// get Project test data and enhance it
import projectJSON from '@/testdata/projects';
import projectDataFactory from '@/components/projectsDataFactory';

import globalMethods from '@/components/globalMethods';

const enhancedProjects = projectDataFactory.enhanceSubprojects(projectJSON.result);
const projectsCards = enhancedProjects;
const imgPaths = require.context('../assets/cards/forest/', false, /\.jpg$/);
const imgName = 'c_b_forest_texture_bark2';
const images = globalMethods.methods.mixinMethods_importImages(imgPaths, imgName);
const defaultImg = images[`./${imgName}.jpg`];

export const methods = {
  onCardClick: action('clicked on card'),
  onTagClick: action('clicked on tag'),
  projectsCardsParents() {
    const noSubs = [];

    for (let i = 0; i < this.projectsCards.length; i++) {
      const p = this.projectsCards[i];
      if (!p.parent) {
        noSubs.push(p);
      }
    }

    return noSubs;
  },
  projectsCardsChilds() {
    const noSubs = [];

    for (let i = 0; i < this.projectsCards.length; i++) {
      const p = this.projectsCards[i];
      if (p.parent) {
        noSubs.push(p);
      }
    }

    return noSubs;
  },
};

storiesOf('3 Cards | Slogan Cards', module)
  .add('collection of Parents', () => ({
    components: { SloganCard },
    template: `
    <v-container grid-list-lg fluid pa-0>
    <v-layout row wrap>

      <v-flex xs3
        v-for="(project, index) in projectsCardsParents()"
        :key="index"
      >
        <slogan-card
         slogan="Random Slogan"
           subSlogan="Subsloganm normally longer than the slogan"
           buttonText="Fun button",
        />
      </v-flex>

    </v-layout>
    </v-container>
    `
  }));
