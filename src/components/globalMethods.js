import seedrandom from 'seedrandom';

export default {
  methods: {
    encodeTagForUrl: function encodeTagForUrl(jsonTags) {
      // console.log("encodeTagForUrl input " + jsonTags);

      if (jsonTags && jsonTags.length > 0) {
        const jsonString = JSON.stringify(jsonTags);

        const urlquery = btoa(jsonString);

        let urlConformString = urlquery.replace(/\+/g, '.');
        urlConformString = urlConformString.replace(/\//g, '_');
        urlConformString = urlConformString.replace(/=/g, '-');

        // console.log("encodeTagForUrl output " + urlConformString);
        return urlConformString;
      }

      return '';
    },
    decodeTagsFromUrl: function decodeTagsFromUrl(urlquery) {
      // console.log("decodeTagsFromUrl input " + urlquery);

      if (urlquery) {
        let jsonConformString = urlquery.replace(/\./g, '+');
        jsonConformString = jsonConformString.replace(/_/g, '/');
        jsonConformString = jsonConformString.replace(/-/g, '=');

        const jsonString = atob(jsonConformString);

        const jsonTags = JSON.parse(jsonString);

        // console.log("decodeTagsFromUrl output " + jsonTags);
        return jsonTags;
      }

      // return an empty array for the selectedTagIds
      return [];
    },
    formatDate: function formatDate(date) {
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
    getIcon: function getIcon(iconName) {
      const iconKey = `./${iconName}.png`;
      return this.$store.getters.iconImages[iconKey];
    },
    getIconFileExtension: function getIconFileExtension(fileExtension) {
      const ext = fileExtension.toLowerCase();
      const iconKey = `./file${ext}.png`;

      const iconPath = this.$store.getters.iconImages[iconKey];

      // if (!iconPath) {
      //   iconPath = this.$store.getters.iconImages['./file.png'];
      // }
      return iconPath;
    },
    importImages: function importImages(imgs, checkForString) {
      const imgCache = {};
      // console.log("importImages " + imgs.keys().length);

      imgs.keys().forEach((key) => {
        if (!checkForString || (checkForString && key.includes(checkForString))) {
          imgCache[key] = imgs(key);
          // console.log(key + " -> " + imgCache[key]);
        }
      });

      return imgCache;

      /*
      const imports = {};
      const pic = imgs('./c_b_snow.jpg');
      console.log("pic " + pic);

      this.images.forEach(element => {
        var imgImport = require(`../../../assets/cards/${element}`);
        console.log("imgImport " + imgImport);
        imports[element] = imgImport;
      });

      return imports;
      */
    },
    randomInt: function randomInt(min, max, seed) {
      if (!seed) {
        seed = 'For the Horde!';
      }

      const rng = seedrandom(seed);
      const r = Math.floor(rng() * 10);

      if (r > max) {
        return max;
      }
      if (r < min) {
        return min;
      }

      return r;
      // return Math.floor(this.rNG() * (max - (min + 1))) + min;
      // return Math.floor(Math.random() * (max - (min + 1))) + min;
    },
    enhanceMetadata: function enhanceMetadata(metadatas, cardBGImages) {
      if (metadatas === undefined && metadatas.length <= 0) {
        return undefined;
      }

      // console.log("enhanceMetadata " + Array.isArray(metadatas) + " " + cardBGImages );

      if (Array.isArray(metadatas)) {
        for (let i = 0; i < metadatas.length; i++) {
          const el = metadatas[i];

          if (!el.titleImg) {
            this.enhanceTitleImg(el, cardBGImages);
          }
        }
      } else {
        this.enhanceTitleImg(metadatas, cardBGImages);
      }

      return metadatas;
    },
    enhanceTitleImg: function enhanceTitleImg(metadata, cardBGImages) {
      /* eslint-disable no-param-reassign */
      const category = this.getTagCategory(metadata.tags);
      const categoryImgs = cardBGImages[category];
      const max = Object.keys(categoryImgs).length - 1;
      const randomIndex = this.randomInt(0, max, metadata.title);
      const cardImg = randomIndex >= 0 ? Object.values(categoryImgs)[randomIndex] : 0;

      // console.log("loaded " + randomIndex + " category " + category + " img " + cardImg);
      metadata.titleImg = cardImg;
    },
    getTagCategory: function getTagCategory(tags) {
      let category = 'landscape';

      if (tags) {
        for (let i = 0; i < tags.length; i++) {
          const element = tags[i];
          if (element.name) {
            if (element.name.includes('HAZARD')) {
              category = 'hazard'; break;
            }
            if (element.name.includes('DIVERSITY')) {
              category = 'diversity'; break;
            }
            if (element.name.includes('FOREST')) {
              category = 'forest'; break;
            }
            if (element.name.includes('SNOW')) {
              category = 'snow'; break;
            }
            if (element.name.includes('LANDSCAPE')) {
              category = 'landscape'; break;
            }
          }
        }
      }

      return category;
    },
    createLocation: function createLocation(dataset) {
      const location = {};
      location.id = dataset.id;

      if (dataset && dataset.spatial) {
        location.geoJSON = dataset.spatial;

        // parseJSON because the geoJOSN from CKAN might be invalid!
        const spatialJSON = JSON.parse(dataset.spatial);
        // console.log("createLocation spatial " + spatialJSON.coordinates);

        if (spatialJSON) {
          location.isPolygon = spatialJSON.type === 'Polygon';
          location.isPoint = spatialJSON.type === 'Point';
          location.isMultiPoint = spatialJSON.type === 'MultiPoint';

          // Swap lngLat to latLng because the geoJOSN from CKAN might be invalid!

          if (location.isPoint) {
            // swap coords for the leaflet map
            location.pointArray = [spatialJSON.coordinates[1], spatialJSON.coordinates[0]];
          } else if (location.isPolygon) {
            location.pointArray = [];

            for (let i = 0; i < spatialJSON.coordinates.length; i++) {
              const pointElement = spatialJSON.coordinates[i];
              const pointObject = [];

              for (let j = 0; j < pointElement.length; j++) {
                const coord = pointElement[j];
                pointObject.push([coord[1], coord[0]]);
              }

              location.pointArray.push(pointObject);
            }
          } else if (location.isMultiPoint) {
            location.pointArray = [];

            for (let i = 0; i < spatialJSON.coordinates.length; i++) {
              const pointElement = spatialJSON.coordinates[i];
              const pointObject = [pointElement[1], pointElement[0]];
              location.pointArray.push(pointObject);
            }
          }
        }
      }

      // console.log("createLocation " + location.pointArray + " " + location.geoJSON);

      return location;
    },
    /* eslint-disable */
    // for details: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    formatBytes: function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]},
  },
};
