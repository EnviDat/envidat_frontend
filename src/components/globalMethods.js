
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
    /* eslint-disable */
    // for details: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    formatBytes: function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
  },
};
