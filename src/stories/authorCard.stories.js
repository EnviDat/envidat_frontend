/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import './js/vuetify-components';

import AuthorCard from '@/components/Cards/AuthorCard.vue';

import authorCollection from '@/testdata/authorCollection.json';

export const methods = {
  authors() {
    const items = Object.values(this.authorCollection);
    return items.splice(0, items.length / 2);
  },
};


const stories = storiesOf('3 Cards | Author Cards', module)
  .add('Author Cards', () => ({
    components: { AuthorCard },
    props: {
      author: {
        default: {
          firstName: text('firstName', 'Felix'),
          lastName: text('lastName', 'Gugerli'),
          fullName: text('fullName', 'Felix Gugerli'),
          datasetCount: number('datasetCount', 7),
          affiliation: text('affiliation', 'WSL'),
          id: {
            identifier: text('identifier', '0000-0003-3878-1845'),
          },
          email: text('email', 'felix.gugerli@wsl.ch'),
          dataCredit: {
            collection: number('collection', 1),
            validation: number('validation', 2),
            curation: number('curation', 3),
            software: number('software', 4),
            publication: number('publication', 5),
            supervision: number('supervision', 6),
          },
        },
      },
    },    
    template: `
    <v-container grid-list-lg fluid pa-0>
      <v-layout row wrap>

        <v-flex xs4 pt-5 >
          <author-card :author="author" />
        </v-flex>

        <v-flex xs4 pt-5 >
          <author-card :author="author" />
        </v-flex>

        <v-flex xs6 pt-5 >
          <author-card :author="author" />
        </v-flex>

      </v-layout>
    </v-container>
    `,
    methods,
    data: () => ({
      authorCollection,
    }),
  }));

stories.addDecorator(withKnobs);
