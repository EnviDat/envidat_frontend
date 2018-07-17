
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
  },
};
