/**
 * function factory for global methods, mainly used as a mixin to
 * provide functions for every vue component.
 *
 * @summary function factory for global methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-10-25 15:52:30
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

/* eslint-disable camelcase */
import seedrandom from 'seedrandom';

import {
  FOREST,
  SNOW,
  LAND,
  HAZARD,
  DIVERSITY,
  METEO,
} from '@/store/categoriesConsts';
import { Object } from 'core-js';

export default {
  methods: {
    mixinMethods_isTagSelected(tagName) {
      if (!tagName || this.selectedTagNames === undefined) {
        return false;
      }

      return this.selectedTagNames.indexOf(tagName) >= 0;
    },
    mixinMethods_areArraysIdentical(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;

      for (let i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i]) return false;
      }

      return true;
    },
    /**
     * Encodes a array of tagNames via btoa() to a string.
     * Also replaces theses characters '.', '_', '-' which cause problems for urls.
     *
     * @param {array} jsonTags: array of tagNames
     * @return {String} encoded string usable for urls
     */
    mixinMethods_encodeTagForUrl(jsonTags) {
      if (jsonTags && jsonTags.length > 0) {
        const jsonString = JSON.stringify(jsonTags);

        const urlquery = btoa(jsonString);

        let urlConformString = urlquery.replace(/\+/g, '.');
        urlConformString = urlConformString.replace(/\//g, '_');
        urlConformString = urlConformString.replace(/=/g, '-');

        return urlConformString;
      }

      return '';
    },
    /**
     * Decodes a string which was encoded via mixinMethods_encodeTagForUrl().
     * Returns the original array or an empty one.
     * Also restores characters '.', '_', '-'.
     *
     * @param {String} urlquery: encoded string
     * @return {array}: array of tagNames
     */
    mixinMethods_decodeTagsFromUrl(urlquery) {
      if (urlquery) {
        let jsonConformString = urlquery.replace(/\./g, '+');
        jsonConformString = jsonConformString.replace(/_/g, '/');
        jsonConformString = jsonConformString.replace(/-/g, '=');

        const jsonString = atob(jsonConformString);
        const jsonTags = JSON.parse(jsonString);

        return jsonTags;
      }

      // return an empty array for the selectedTagIds
      return [];
    },
    /**
     * Changes the route via this.$router.push();
     * The search and tag parameter are added as query parameters.
     * urlSubPath is added as the path.
     *
     * @param {String} basePath the path of the route
     * @param {String} search search term
     * @param {String} tags encoded string
     */
    mixinMethods_additiveChangeRoute(basePath, search, tags, mode) {
      const query = {};
      Object.assign(query, this.$route.query);

      if (search !== undefined) {
        query.search = search;;
      // } else if (this.$route.query.search) {
      //   query.search = this.$route.query.search;
      }

      if (tags !== undefined) {
        query.tags = tags;
      // } else if (this.$route.query.tags) {
      //   query.tags = this.$route.query.tags;
      }

      if (mode !== undefined) {
        query.mode = mode;
      // } else if (this.$route.query.mode) {
      //   query.mode = this.$route.query.mode;
      }

      this.$router.push({
        path: basePath,
        query,
      });
    },
    /**
     * @param {String} date expecting a format like 2017-08-15T15:25:45.175790
     * @return {String} Returns a date string containing the date and hours:minutes:seconds
     */
    mixinMethods_formatDate(date) {
      // expecting a format like 2017-08-15T15:25:45.175790
      let formatedDate = '';

      if (date) {
        const split = date.split('T');
        if (split.length > 0) {
          const dateOnly = split[0];
          const timeOnly = split[1];
          const timeSplit = timeOnly.split('.');
          const timeToMinutes = timeSplit[0];

          formatedDate = `${dateOnly} ${timeToMinutes}`;
        } else {
          // fallback: just return the input
          formatedDate = date;
        }
      }

      return formatedDate;
    },
    /**
     * Loads the path to the icon image
     *
     * @param {String} iconName
     * @return {String} relative file path with extension to the icon image file
     */
    mixinMethods_getIcon(iconName) {
      const iconKey = `./${iconName}.png`;
      return this.$store.getters.iconImages[iconKey];
    },
    /**
     * Loads the path to the icon image representing a file extension
     *
     * @param {*} iconName
     * @return {string} relative file path to the icon image file
     */
    mixinMethods_getIconFileExtension(fileExtension) {
      const ext = fileExtension.toLowerCase();
      const iconKey = `./file${ext}.png`;

      return this.$store.getters.iconImages[iconKey];
    },
    /**
     * Loads the file path to given images into a Map.
     *
     * @param {Map<string, string>} imgs imageContext which is loaded via require.context() (ex. require.context('./assets/', false, /\.jpg$/);)
     * @param {String} checkForString
     *
     * @return {Map<string, string>} Image cache
     */
    mixinMethods_importImages(imgs, checkForString) {
      const imgCache = {};

      imgs.keys().forEach((key) => {
        if (!checkForString || (checkForString && key.includes(checkForString))) {
          imgCache[key] = imgs(key);
        }
      });

      return imgCache;
    },
    /**
     * Create a psyeudo random integer based on a given seed using the 'seedrandom' lib.
     *
     * @param {Number} min
     * @param {Number} max
     * @param {String} seed
     */
    mixinMethods_randomInt(min, max, seed = 'For the Horde!') {
      const rng = seedrandom(seed);
      const r = Math.floor(rng() * 10);

      if (r > max) {
        return max;
      }
      if (r < min) {
        return min;
      }

      return r;
    },
    /**
     * @param {Object} metadataEntry
     * @param {Array} cardBGImages
     *
     * @return {Object} metadataEntry enhanced with a title image based on the entrys tags
     */
    mixinMethods_enhanceMetadataEntry(metadataEntry, cardBGImages, categoryCards) {
      if (metadataEntry && !metadataEntry.titleImg) {
        this.mixinMethods_enhanceTitleImg(metadataEntry, cardBGImages, categoryCards);
      }

      return metadataEntry;
    },
    mixinMethods_getGenericProp(propName) {
      if (!this.genericProps) {
        return null;
      }

      return this.genericProps[propName] ? this.genericProps[propName] : null;
    },
    /**
     * @param {Array} metadatas
     * @param {Array} cardBGImages
     *
     * @return {Array} metadatas enhanced with a title image based on the metadatas tags
     */
    mixinMethods_enhanceMetadatas(metadatas, cardBGImages, categoryCards) {
      if (metadatas === undefined && metadatas.length <= 0) {
        return undefined;
      }

      if (Array.isArray(metadatas)) {
        for (let i = 0; i < metadatas.length; i++) {
          const el = metadatas[i];

          if (!el.titleImg) {
            metadatas[i] = this.mixinMethods_enhanceTitleImg(el, cardBGImages, categoryCards);
          }
        }
      }

      return metadatas;
    },
    /**
     * @param {Object} metadata
     * @param {Array} cardBGImages
     *
     * @return {Object} metadata entry enhanced with a title image based on its tags
     */
    mixinMethods_enhanceTitleImg(metadata, cardBGImages, categoryCards) {
      /* eslint-disable no-param-reassign */
      const category = this.mixinMethods_guessTagCategory(metadata.tags);

      if (cardBGImages) {
        const categoryImgs = cardBGImages[category];
        const max = Object.keys(categoryImgs).length - 1;
        const randomIndex = this.mixinMethods_randomInt(0, max, metadata.title);
        const cardImg = randomIndex >= 0 ? Object.values(categoryImgs)[randomIndex] : 0;

        metadata.titleImg = cardImg;
      }

      metadata.categoryColor = this.mixinMethods_getCategoryColor(categoryCards, category);

      return metadata;
    },
    mixinMethods_getCategoryColor(categoryCards, categoryName) {
      for (let i = 0; i < categoryCards.length; i++) {
        const cat = categoryCards[i];
        if (cat.type === categoryName) {
          return cat.color;
        }
      }

      return null;
    },
    mixinMethods_getTagColor(categoryCards, tagName) {
      if (!tagName) {
        return '';
      }

      for (let i = 0; i < categoryCards.length; i++) {
        const cat = categoryCards[i];
        if (tagName.toLowerCase().includes(cat.type)) {
          return cat.darkColor;
        }
      }

      return '#e0e0e0';
    },
    mixinMethods_enhanceTags(dataset, categoryCards) {

      if (dataset && dataset.tags && dataset.tags instanceof Array) {
        for (let j = 0; j < dataset.tags.length; j++) {
          const tag = dataset.tags[j];
          tag.color = this.mixinMethods_getTagColor(categoryCards, tag.name);
        }
      }

      return dataset;
    },
    /**
     * @param {Array} tags
     *
     * @return {String} category based on tags array
     */
    mixinMethods_guessTagCategory(tags) {
      let category = LAND;

      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          const element = tags[i];

          if (element.name) {
            if (element.name.includes('HAZARD') || element.name.includes('ACCIDENTS')) {
              category = HAZARD; break;
            }
            if (element.name.includes('DIVERSITY')) {
              category = DIVERSITY; break;
            }
            if (element.name.includes('FOREST')) {
              category = FOREST; break;
            }
            if (element.name.includes('SNOW') || element.name.includes('AVALANCHE')) {
              category = SNOW; break;
            }
            if (element.name.includes('METEO') || element.name.includes('CLIMATE')) {
              category = METEO; break;
            }
            if (element.name.includes('LAND') || element.name.includes('LANDSCAPE')) {
              category = LAND; break;
            }
          }
        }
      }

      return category;
    },
    /**
     *
     * for details: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
     * @param {*} a
     * @param {*} b
     */
    mixinMethods_formatBytes(a, b) {
      if (a === 0) return '0 Bytes';

      const c = 1024;
      const d = b || 2;

      const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const f = Math.floor(Math.log(a) / Math.log(c));

      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
    },
    /**
     * @param {Number} pos Sets the position to the main scroll position of the main
     */
    mixinMethods_setScrollPosition(pos) {
      window.scrollTo(0, pos);
    },
  },
};
