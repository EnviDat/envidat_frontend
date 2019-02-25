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
    additiveChangeRoute: function additiveChangeRoute(search, tags) {
      const query = {};

      if (search !== undefined) {
        query.search = search;
      } else if (this.$route.query.search) {
        query.search = this.$route.query.search;
      }

      if (tags !== undefined) {
        query.tags = tags;
      } else if (this.$route.query.tags) {
        query.tags = this.$route.query.tags;
      }
      // console.log("additiveChangeRoute search: " + query.search + " tags: " + query.tags);

      this.$router.push({
        path: '/browse',
        query,
      });
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
    /* eslint-disable */
    // for details: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    formatBytes: function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]},
  },
};
