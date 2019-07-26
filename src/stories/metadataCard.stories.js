/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import Vue from "vue";
import {
  VBtn,
  VTooltip,
  VIcon,
  VImg,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VCardActions,
  VCardTitle,
  VCardMedia
} from "vuetify/lib";

Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import MetadataCard from "@/components/Cards/MetadataCard.vue";
import App from "@/App.vue";
import fileIcon from "@/assets/icons/file.png";
import lockedIcon from "@/assets/icons/lockClosed.png";
import unlockedIcon from "@/assets/icons/lockOpen.png";

// import {
//   mixinMethods_enhanceMetadataEntry,
//   mixinMethods_importImages
// } from "@/components/globalMethods";

import { default as globalMethods } from "@/components/globalMethods";
const cardImages = getCardImages(globalMethods);
let metadataCards = [];

export const methods = {
  hasRestrictedResources: function hasRestrictedResources(metadata) {
    if (!metadata || !metadata.resources || metadata.resources.length <= 0) {
      return false;
    }

    /* eslint-disable consistent-return  */
    metadata.resources.forEach(res => {
      if (
        res.restricted !== undefined &&
        (res.restricted.allowed_users !== undefined ||
          (res.restricted.level !== undefined && res.restricted.level !== "public"))
      ) {
        return true;
      }
    });

    return false;
  },
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("3 Cards | Metadata Cards", module)
  .add("Metadata collection", () => ({
    components: { MetadataCard },
    template: `
<v-layout column>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs3 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs4 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
  <v-flex>
    <v-layout row wrap>

      <v-flex xs6 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>
  </v-flex>
</v-layout>
    `,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon
    })
  }))
  .add("Metadata collection flat", () => ({
    components: { MetadataCard },
    template: `
    <v-layout row wrap>

      <v-flex xs12 pa-2
        v-for="(metadata, index) in metadataCards"
        :key="index"
      >
        <metadata-card
          :id="metadata.id"
          :ref="metadata.id"
          :title="metadata.title"
          :name="metadata.name"
          :subtitle="metadata.notes"
          :tags="metadata.tags"
          :titleImg="metadata.titleImg"
          :restricted="hasRestrictedResources(metadata)"
          :resourceCount="metadata.num_resources || metadata.res_name.length"
          :resources="metadata.resources"
          flatLayout
          :fileIconString="fileIcon"
          :lockedIconString="lockedIcon"
          :unlockedIconString="lockedIcon"
          @clickedEvent="onCardClick"
          @clickedTag="onTagClick"
        />
      </v-flex>

    </v-layout>`,
    methods,
    data: () => ({
      metadataCards,
      fileIcon,
      lockedIcon,
      unlockedIcon
    })
  }));

metadataCards = [
  {
    maintainer:
      '{"affiliation": "WSL", "email": "urs-beat.braendli@wsl.ch", "name": "Urs-Beat Brändli"}',
    author:
      '[{"affiliation": "WSL", "name": "Abegg, M.", "email": "meinrad.abegg@wsl.ch"}, {"affiliation": "WSL", "name": " Br\\u00e4ndli, U.-B.", "email": "urs-beat.braendli@wsl.ch"}, {"affiliation": "WSL", "name": " Cioldi, F.", "email": "fabrizio.cioldi@wsl.ch"}, {"affiliation": "WSL", "name": " Fischer, C.", "email": "christoph.fischer@wsl.ch"}, {"affiliation": "WSL", "name": " Herold-Bonardi, A.", "email": "anne.herold@wsl.ch"}, {"affiliation": "WSL", "name": " Huber M.", "email": "markus.huber@wsl.ch"}, {"affiliation": "WSL", "name": " Keller, M.", "email": "markus.keller@wsl.ch"}, {"affiliation": "WSL", "name": " Meile, R.", "email": "rolf.meile@wsl.ch"}, {"affiliation": "WSL", "name": " R\\u00f6sler, E.", "email": "erik.roesler@wsl.ch"}, {"affiliation": "WSL", "name": " Speich, S.", "email": "simon.speich@wsl.ch"}, {"affiliation": "WSL", "name": " Traub, B.", "email": "berthold.traub@wsl.ch"}, {"affiliation": "WSL", "name": " Vidondo, B.", "email": "beatriz.vidondo@wsl.ch"}]',
    site_id: "default",
    extras_resource_type_general: "dataset",
    id: "fb851074-a421-47bf-802f-f03493c57041",
    metadata_created: "2018-05-13T17:11:21.604Z",
    extras_language: "en",
    capacity: "public",
    metadata_modified: "2018-07-06T22:19:53.421Z",
    extras_resource_type: "Dataset",
    extras_doi: "10.21258/1057112",
    res_format: ["URL", "URL", "URL"],
    index_id: "c5a0656cb5bef461889bd81a30361fbd",
    state: "active",
    res_url: [
      "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=250",
      "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=350",
      "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=452"
    ],
    entity_type: "package",
    tags: [
      "7 CLASSES",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4",
      "ALTITUDINAL VEGETATION ZONE",
      "BIOGEOGRAPHICAL REGION",
      "CANTON",
      "ECONOMIC REGION",
      "FOREST COMMUNITIES KÜCHLER 2008",
      "GRID NFI4 2009-2013",
      "MAIN TREE SPECIES",
      "NFI2",
      "NFI3",
      "NFI4B",
      "PRODUCTION REGION",
      "PROTECTION FOREST REGION",
      "TERRESTRIAL GRID NFI2",
      "TERRESTRIAL GRID NFI3",
      "TOTAL BASAL AREA"
    ],
    title: "Total basal area",
    license_id: "other-open",
    validated_data_dict:
      '{"owner_org": "49192b11-adac-4e68-ad64-be15a4321347", "maintainer": "{\\"affiliation\\": \\"WSL\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\", \\"name\\": \\"Urs-Beat Br\\u00e4ndli\\"}", "relationships_as_object": [], "private": false, "maintainer_email": null, "num_tags": 19, "subtitle": "", "id": "fb851074-a421-47bf-802f-f03493c57041", "metadata_created": "2018-05-13T17:11:21.604417", "publication": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL\\", \\"publication_year\\": \\"2014\\"}", "metadata_modified": "2018-07-06T22:19:53.421891", "author": "[{\\"affiliation\\": \\"WSL\\", \\"name\\": \\"Abegg, M.\\", \\"email\\": \\"meinrad.abegg@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Br\\\\u00e4ndli, U.-B.\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Cioldi, F.\\", \\"email\\": \\"fabrizio.cioldi@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Fischer, C.\\", \\"email\\": \\"christoph.fischer@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Herold-Bonardi, A.\\", \\"email\\": \\"anne.herold@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Huber M.\\", \\"email\\": \\"markus.huber@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Keller, M.\\", \\"email\\": \\"markus.keller@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Meile, R.\\", \\"email\\": \\"rolf.meile@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" R\\\\u00f6sler, E.\\", \\"email\\": \\"erik.roesler@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Speich, S.\\", \\"email\\": \\"simon.speich@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Traub, B.\\", \\"email\\": \\"berthold.traub@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Vidondo, B.\\", \\"email\\": \\"beatriz.vidondo@wsl.ch\\"}]", "author_email": null, "state": "active", "spatial": "{\\"type\\": \\"Polygon\\", \\"coordinates\\": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}", "license_id": "other-open", "type": "dataset", "resources": [{"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=250", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470534", "state": "active", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "last_modified": null, "mimetype": null, "url_type": null, "position": 0, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "id": "f92f574c-6c53-4696-b7cf-1f59c2004289", "resource_type": null, "name": "NFI2 (1993/95) "}, {"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=350", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470544", "state": "active", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "last_modified": null, "mimetype": null, "url_type": null, "position": 1, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "id": "6c7f53f8-47c6-417b-bc35-8e557371d7da", "resource_type": null, "name": "NFI3 (2004/06) "}, {"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=452", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470548", "state": "active", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "last_modified": null, "mimetype": null, "url_type": null, "position": 2, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "id": "53281d5d-1d5a-445b-bc77-42aa3c14c14f", "resource_type": null, "name": "NFI4b (2009/13) "}], "num_resources": 3, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "7 CLASSES", "id": "f1f8515b-e3a5-4d86-b15a-afbc46ee1829", "name": "7 CLASSES"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST", "id": "bb246615-39ff-45d8-ab87-3443c6b7e03b", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4", "id": "bb187fcd-0638-4b9d-9013-d3df341ecc54", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4", "id": "07cdbd84-6d9a-4b0d-abbc-408769b24e3e", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ALTITUDINAL VEGETATION ZONE", "id": "b214255f-3d7b-4321-bc97-80f21e722f8f", "name": "ALTITUDINAL VEGETATION ZONE"}, {"vocabulary_id": null, "state": "active", "display_name": "BIOGEOGRAPHICAL REGION", "id": "3b6ceb71-b9d7-40e1-81d2-abee2838c7cd", "name": "BIOGEOGRAPHICAL REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "CANTON", "id": "8d23d414-d384-4fd1-ac12-4f43f8667973", "name": "CANTON"}, {"vocabulary_id": null, "state": "active", "display_name": "ECONOMIC REGION", "id": "303fa816-8d7f-403f-8fae-aa20d8c7fc58", "name": "ECONOMIC REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "FOREST COMMUNITIES K\\u00dcCHLER 2008", "id": "d2c36890-b9dd-4ab5-ae10-c2837340e602", "name": "FOREST COMMUNITIES K\\u00dcCHLER 2008"}, {"vocabulary_id": null, "state": "active", "display_name": "GRID NFI4 2009-2013", "id": "75dea3f4-623a-4f53-9459-65f3ee636f26", "name": "GRID NFI4 2009-2013"}, {"vocabulary_id": null, "state": "active", "display_name": "MAIN TREE SPECIES", "id": "ba1c573f-6962-42ca-b27d-92042b3372c1", "name": "MAIN TREE SPECIES"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI2", "id": "e40e9cfa-7bdf-4ceb-827c-5b4e7cbb0d5a", "name": "NFI2"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI3", "id": "fdab4a72-540e-4b74-b9ee-02a117a70765", "name": "NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI4B", "id": "7a7fc8ed-5d76-48e0-a420-4443ae249d77", "name": "NFI4B"}, {"vocabulary_id": null, "state": "active", "display_name": "PRODUCTION REGION", "id": "43246fc4-2747-4867-a8fc-39d6d2dd7f1a", "name": "PRODUCTION REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "PROTECTION FOREST REGION", "id": "ec68922c-5f0c-435c-9d60-5cc3b4f46ee4", "name": "PROTECTION FOREST REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "TERRESTRIAL GRID NFI2", "id": "76f4c14d-bafa-4828-82d2-dec4888571cb", "name": "TERRESTRIAL GRID NFI2"}, {"vocabulary_id": null, "state": "active", "display_name": "TERRESTRIAL GRID NFI3", "id": "11a126bd-0378-406a-94ba-7f7a23f04011", "name": "TERRESTRIAL GRID NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "TOTAL BASAL AREA", "id": "c91b5e52-4f05-456a-b93f-6d1de98747d0", "name": "TOTAL BASAL AREA"}], "title": "Total basal area", "spatial_info": "Switzerland", "groups": [], "creator_user_id": "334cee1e-6afa-4639-88a2-f980e6ff42c3", "date": "", "resource_type_general": "dataset", "relationships_as_subject": [], "name": "total_basal_area-2", "doi": "10.21258/1057112", "isopen": true, "language": "en", "url": null, "notes": "Sum of the stem cross-section areas of all living and dead trees and shrubs starting at 12 cm dbh at a height of 1.3 m (dbh measurement height).\\n\\n__Citation:__\\n > _Abegg, M.; Br\\u00e4ndli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; R\\u00f6sler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ", "license_title": "Other (Open)", "extras": [{"value": "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.", "key": "License"}], "organization": {"description": "The Swiss National Forest Inventory records the current state and the changes of the Swiss forest. The survey obtains data about trees, stands, sample plots and through enquiries at the local forest service.\\r\\n\\r\\nThe NFI carried out by the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL) in collaboration with the Forest Division at Federal Office for the Environment (FOEN ). The WSL is responsible for the planning, survey and analysis, as well as the scientific interpretation and publication of the NFI. The political interpretation and implementation is done by the Forest Division.\\r\\n\\r\\nThe first survey (LFI1) took place from 1983\\u201385, the second survey followed in 1993\\u201395 and the third inventory was carried out 2004\\u20132006. Since 2009, the continuous survey of the fourth NFI (2009\\u20132017) has been in progress.\\r\\n\\r\\nMore information: https://www.lfi.ch/lfi/lfi-en.php", "title": "NFI", "created": "2016-07-05T13:46:14.456454", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "https://www.lfi.ch/layout/images/logo.gif", "revision_id": "57729ab8-3744-438f-959a-aed2a9f4d900", "type": "organization", "id": "49192b11-adac-4e68-ad64-be15a4321347", "name": "nfi"}, "revision_id": "c432e8be-d870-4a25-abab-0dcd2528ba3c", "resource_type": "Dataset"}',
    res_name: ["NFI2 (1993/95) ", "NFI3 (2004/06) ", "NFI4b (2009/13) "],
    name: "total_basal_area-2",
    extras_spatial_info: "Switzerland",
    notes:
      "Sum of the stem cross-section areas of all living and dead trees and shrubs starting at 12 cm dbh at a height of 1.3 m (dbh measurement height).\n\n__Citation:__\n > _Abegg, M.; Brändli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; Rösler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ",
    extras_License:
      "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.",
    spatial_geom: [
      "POLYGON ((5.95587 45.81802, 10.49203 45.81802, 10.49203 47.80838, 5.95587 47.80838, 5.95587 45.81802))"
    ],
    dataset_type: "dataset",
    organization: "nfi",
    revision_id: "c432e8be-d870-4a25-abab-0dcd2528ba3c",
    extras_publication:
      '{"publisher": "Swiss Federal Research Institute WSL", "publication_year": "2014"}',
    extras_spatial:
      '{"type": "Polygon", "coordinates": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}',
    _version_: "1613720540784099328",
    indexed_ts: "2018-10-08T01:57:13.603Z",
    data_dict:
      '{"license_title": "Other (Open)", "maintainer": "{\\"affiliation\\": \\"WSL\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\", \\"name\\": \\"Urs-Beat Br\\u00e4ndli\\"}", "relationships_as_object": [], "private": false, "maintainer_email": null, "num_tags": 19, "id": "fb851074-a421-47bf-802f-f03493c57041", "metadata_created": "2018-05-13T17:11:21.604417", "metadata_modified": "2018-07-06T22:19:53.421891", "author": "[{\\"affiliation\\": \\"WSL\\", \\"name\\": \\"Abegg, M.\\", \\"email\\": \\"meinrad.abegg@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Br\\\\u00e4ndli, U.-B.\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Cioldi, F.\\", \\"email\\": \\"fabrizio.cioldi@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Fischer, C.\\", \\"email\\": \\"christoph.fischer@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Herold-Bonardi, A.\\", \\"email\\": \\"anne.herold@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Huber M.\\", \\"email\\": \\"markus.huber@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Keller, M.\\", \\"email\\": \\"markus.keller@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Meile, R.\\", \\"email\\": \\"rolf.meile@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" R\\\\u00f6sler, E.\\", \\"email\\": \\"erik.roesler@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Speich, S.\\", \\"email\\": \\"simon.speich@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Traub, B.\\", \\"email\\": \\"berthold.traub@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Vidondo, B.\\", \\"email\\": \\"beatriz.vidondo@wsl.ch\\"}]", "author_email": null, "state": "active", "version": null, "creator_user_id": "334cee1e-6afa-4639-88a2-f980e6ff42c3", "type": "dataset", "resources": [{"mimetype": null, "cache_url": null, "state": "active", "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=250", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470534", "cache_last_updated": null, "package_id": "fb851074-a421-47bf-802f-f03493c57041", "mimetype_inner": null, "last_modified": null, "position": 0, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "url_type": null, "id": "f92f574c-6c53-4696-b7cf-1f59c2004289", "resource_type": null, "name": "NFI2 (1993/95) "}, {"mimetype": null, "cache_url": null, "state": "active", "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=350", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470544", "cache_last_updated": null, "package_id": "fb851074-a421-47bf-802f-f03493c57041", "mimetype_inner": null, "last_modified": null, "position": 1, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "url_type": null, "id": "6c7f53f8-47c6-417b-bc35-8e557371d7da", "resource_type": null, "name": "NFI3 (2004/06) "}, {"mimetype": null, "cache_url": null, "state": "active", "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=2&invNr=452", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:31.470548", "cache_last_updated": null, "package_id": "fb851074-a421-47bf-802f-f03493c57041", "mimetype_inner": null, "last_modified": null, "position": 2, "revision_id": "7637d61b-3687-4c9b-ad7f-0333248e8b12", "size": null, "url_type": null, "id": "53281d5d-1d5a-445b-bc77-42aa3c14c14f", "resource_type": null, "name": "NFI4b (2009/13) "}], "num_resources": 3, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "7 CLASSES", "id": "f1f8515b-e3a5-4d86-b15a-afbc46ee1829", "name": "7 CLASSES"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST", "id": "bb246615-39ff-45d8-ab87-3443c6b7e03b", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4", "id": "bb187fcd-0638-4b9d-9013-d3df341ecc54", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4", "id": "07cdbd84-6d9a-4b0d-abbc-408769b24e3e", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ALTITUDINAL VEGETATION ZONE", "id": "b214255f-3d7b-4321-bc97-80f21e722f8f", "name": "ALTITUDINAL VEGETATION ZONE"}, {"vocabulary_id": null, "state": "active", "display_name": "BIOGEOGRAPHICAL REGION", "id": "3b6ceb71-b9d7-40e1-81d2-abee2838c7cd", "name": "BIOGEOGRAPHICAL REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "CANTON", "id": "8d23d414-d384-4fd1-ac12-4f43f8667973", "name": "CANTON"}, {"vocabulary_id": null, "state": "active", "display_name": "ECONOMIC REGION", "id": "303fa816-8d7f-403f-8fae-aa20d8c7fc58", "name": "ECONOMIC REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "FOREST COMMUNITIES K\\u00dcCHLER 2008", "id": "d2c36890-b9dd-4ab5-ae10-c2837340e602", "name": "FOREST COMMUNITIES K\\u00dcCHLER 2008"}, {"vocabulary_id": null, "state": "active", "display_name": "GRID NFI4 2009-2013", "id": "75dea3f4-623a-4f53-9459-65f3ee636f26", "name": "GRID NFI4 2009-2013"}, {"vocabulary_id": null, "state": "active", "display_name": "MAIN TREE SPECIES", "id": "ba1c573f-6962-42ca-b27d-92042b3372c1", "name": "MAIN TREE SPECIES"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI2", "id": "e40e9cfa-7bdf-4ceb-827c-5b4e7cbb0d5a", "name": "NFI2"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI3", "id": "fdab4a72-540e-4b74-b9ee-02a117a70765", "name": "NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI4B", "id": "7a7fc8ed-5d76-48e0-a420-4443ae249d77", "name": "NFI4B"}, {"vocabulary_id": null, "state": "active", "display_name": "PRODUCTION REGION", "id": "43246fc4-2747-4867-a8fc-39d6d2dd7f1a", "name": "PRODUCTION REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "PROTECTION FOREST REGION", "id": "ec68922c-5f0c-435c-9d60-5cc3b4f46ee4", "name": "PROTECTION FOREST REGION"}, {"vocabulary_id": null, "state": "active", "display_name": "TERRESTRIAL GRID NFI2", "id": "76f4c14d-bafa-4828-82d2-dec4888571cb", "name": "TERRESTRIAL GRID NFI2"}, {"vocabulary_id": null, "state": "active", "display_name": "TERRESTRIAL GRID NFI3", "id": "11a126bd-0378-406a-94ba-7f7a23f04011", "name": "TERRESTRIAL GRID NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "TOTAL BASAL AREA", "id": "c91b5e52-4f05-456a-b93f-6d1de98747d0", "name": "TOTAL BASAL AREA"}], "groups": [], "license_id": "other-open", "relationships_as_subject": [], "organization": {"description": "The Swiss National Forest Inventory records the current state and the changes of the Swiss forest. The survey obtains data about trees, stands, sample plots and through enquiries at the local forest service.\\r\\n\\r\\nThe NFI carried out by the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL) in collaboration with the Forest Division at Federal Office for the Environment (FOEN ). The WSL is responsible for the planning, survey and analysis, as well as the scientific interpretation and publication of the NFI. The political interpretation and implementation is done by the Forest Division.\\r\\n\\r\\nThe first survey (LFI1) took place from 1983\\u201385, the second survey followed in 1993\\u201395 and the third inventory was carried out 2004\\u20132006. Since 2009, the continuous survey of the fourth NFI (2009\\u20132017) has been in progress.\\r\\n\\r\\nMore information: https://www.lfi.ch/lfi/lfi-en.php", "title": "NFI", "created": "2016-07-05T13:46:14.456454", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "https://www.lfi.ch/layout/images/logo.gif", "revision_id": "57729ab8-3744-438f-959a-aed2a9f4d900", "type": "organization", "id": "49192b11-adac-4e68-ad64-be15a4321347", "name": "nfi"}, "name": "total_basal_area-2", "isopen": true, "url": null, "notes": "Sum of the stem cross-section areas of all living and dead trees and shrubs starting at 12 cm dbh at a height of 1.3 m (dbh measurement height).\\n\\n__Citation:__\\n > _Abegg, M.; Br\\u00e4ndli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; R\\u00f6sler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ", "owner_org": "49192b11-adac-4e68-ad64-be15a4321347", "extras": [{"state": "active", "value": "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "License", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "033c4e7a-5eb3-4b59-a3ae-e209aa2c7055"}, {"state": "active", "value": "", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "date", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "c7215e22-064e-4b31-bf9b-4fce7dfc2338"}, {"state": "active", "value": "10.21258/1057112", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "doi", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "bc7edc86-b305-4643-ab3f-c8098799f9a9"}, {"state": "active", "value": "en", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "language", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "8af64633-ee1d-4aac-b065-ee8bebe78c27"}, {"state": "active", "value": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL\\", \\"publication_year\\": \\"2014\\"}", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "publication", "revision_id": "b0866331-4b62-426c-be03-3f12b1929bcd", "id": "480b1732-9ad1-4d7e-b1f5-181655da02b3"}, {"state": "active", "value": "Dataset", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "resource_type", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "a09fd338-07c2-4050-8eab-b7a83223ea74"}, {"state": "active", "value": "dataset", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "resource_type_general", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "d5a3a751-0678-4880-bead-e284610e1d3b"}, {"state": "active", "value": "{\\"type\\": \\"Polygon\\", \\"coordinates\\": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "spatial", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "45dcd0a2-da2d-4e94-a05f-18133d41e90c"}, {"state": "active", "value": "Switzerland", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "spatial_info", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "157147ff-5798-40c0-9d6a-6d80ed46a144"}, {"state": "active", "value": "", "package_id": "fb851074-a421-47bf-802f-f03493c57041", "key": "subtitle", "revision_id": "eed7f276-7ab4-4185-8f88-e450f9490eab", "id": "3d41de1e-02ae-4db1-8b94-783cbc5b30c0"}], "title": "Total basal area", "revision_id": "c432e8be-d870-4a25-abab-0dcd2528ba3c"}'
  },
  {
    maintainer:
      '{"affiliation": "WSL", "email": "urs-beat.braendli@wsl.ch", "name": "Urs-Beat Brändli"}',
    author:
      '[{"affiliation": "WSL", "name": "Abegg, M.", "email": "meinrad.abegg@wsl.ch"}, {"affiliation": "WSL", "name": " Br\\u00e4ndli, U.-B.", "email": "urs-beat.braendli@wsl.ch"}, {"affiliation": "WSL", "name": " Cioldi, F.", "email": "fabrizio.cioldi@wsl.ch"}, {"affiliation": "WSL", "name": " Fischer, C.", "email": "christoph.fischer@wsl.ch"}, {"affiliation": "WSL", "name": " Herold-Bonardi, A.", "email": "anne.herold@wsl.ch"}, {"affiliation": "WSL", "name": " Huber M.", "email": "markus.huber@wsl.ch"}, {"affiliation": "WSL", "name": " Keller, M.", "email": "markus.keller@wsl.ch"}, {"affiliation": "WSL", "name": " Meile, R.", "email": "rolf.meile@wsl.ch"}, {"affiliation": "WSL", "name": " R\\u00f6sler, E.", "email": "erik.roesler@wsl.ch"}, {"affiliation": "WSL", "name": " Speich, S.", "email": "simon.speich@wsl.ch"}, {"affiliation": "WSL", "name": " Traub, B.", "email": "berthold.traub@wsl.ch"}, {"affiliation": "WSL", "name": " Vidondo, B.", "email": "beatriz.vidondo@wsl.ch"}]',
    site_id: "default",
    extras_resource_type_general: "dataset",
    id: "fd734937-cf78-4529-878b-4815a20a1bbf",
    metadata_created: "2018-05-13T17:11:11.136Z",
    extras_language: "en",
    capacity: "public",
    metadata_modified: "2018-07-06T22:20:48.167Z",
    extras_resource_type: "Dataset",
    extras_doi: "10.21258/1057112",
    res_format: ["URL", "URL"],
    index_id: "aabeafb6cb3f51005cada6ac9ba77b09",
    state: "active",
    res_url: [
      "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=250350",
      "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=350452"
    ],
    entity_type: "package",
    tags: [
      "NFI2-NFI3",
      "NFI3-NFI4B",
      "CANTON",
      "14 X 14 KM GRID",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3-NFI4",
      "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4",
      "AVALANCHES SILVAPROTECT",
      "CAUSE OF SALVAGE LOGGING",
      "COST OF TIMBER HARVEST 6 CLASSES",
      "GRID NFI4 2009-2013",
      "LANDSLIDE-MUDFLOW SILVAPROTECT",
      "MAIN TYPE OF HARVEST",
      "POTENTIAL COST FOR TIMBER HARVESTING",
      "PROCESSES IN CHANNELS SILVAPROTECT",
      "PROTECTION FOREST PERIMETER SILVAPROTECT",
      "ROCKFALL SILVAPROTECT",
      "SALVAGE LOGGING STAR"
    ],
    title: "Salvage logging*",
    license_id: "other-open",
    validated_data_dict:
      '{"owner_org": "49192b11-adac-4e68-ad64-be15a4321347", "maintainer": "{\\"affiliation\\": \\"WSL\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\", \\"name\\": \\"Urs-Beat Br\\u00e4ndli\\"}", "relationships_as_object": [], "private": false, "maintainer_email": null, "num_tags": 19, "subtitle": "", "id": "fd734937-cf78-4529-878b-4815a20a1bbf", "metadata_created": "2018-05-13T17:11:11.136392", "publication": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL\\", \\"publication_year\\": \\"2014\\"}", "metadata_modified": "2018-07-06T22:20:48.167059", "author": "[{\\"affiliation\\": \\"WSL\\", \\"name\\": \\"Abegg, M.\\", \\"email\\": \\"meinrad.abegg@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Br\\\\u00e4ndli, U.-B.\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Cioldi, F.\\", \\"email\\": \\"fabrizio.cioldi@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Fischer, C.\\", \\"email\\": \\"christoph.fischer@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Herold-Bonardi, A.\\", \\"email\\": \\"anne.herold@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Huber M.\\", \\"email\\": \\"markus.huber@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Keller, M.\\", \\"email\\": \\"markus.keller@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Meile, R.\\", \\"email\\": \\"rolf.meile@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" R\\\\u00f6sler, E.\\", \\"email\\": \\"erik.roesler@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Speich, S.\\", \\"email\\": \\"simon.speich@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Traub, B.\\", \\"email\\": \\"berthold.traub@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Vidondo, B.\\", \\"email\\": \\"beatriz.vidondo@wsl.ch\\"}]", "author_email": null, "state": "active", "spatial": "{\\"type\\": \\"Polygon\\", \\"coordinates\\": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}", "license_id": "other-open", "type": "dataset", "resources": [{"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=250350", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:25.805944", "state": "active", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "last_modified": null, "mimetype": null, "url_type": null, "position": 0, "revision_id": "0d53cb90-6a8a-4e9f-b150-aa052a3afab8", "size": null, "id": "aa957199-f854-47be-9e66-1a24d7f9e981", "resource_type": null, "name": "NFI2\\u2013NFI3 (1993/95\\u20132004/06) "}, {"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=350452", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:25.805955", "state": "active", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "last_modified": null, "mimetype": null, "url_type": null, "position": 1, "revision_id": "0d53cb90-6a8a-4e9f-b150-aa052a3afab8", "size": null, "id": "41f39dbc-467e-4a4b-8bea-1071b36b68d5", "resource_type": null, "name": "NFI3\\u2013NFI4b (2004/06\\u20132009/13) "}], "num_resources": 2, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "14 X 14 KM GRID", "id": "2ada6508-684d-4b81-9b13-96bf53df5410", "name": "14 X 14 KM GRID"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4", "id": "bb187fcd-0638-4b9d-9013-d3df341ecc54", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3", "id": "40ec6f37-2158-4ece-be9f-55cd87d14608", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3-NFI4", "id": "3a3504eb-ebad-4732-9b46-5ab7500b7a3c", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4", "id": "07cdbd84-6d9a-4b0d-abbc-408769b24e3e", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "AVALANCHES SILVAPROTECT", "id": "b8183624-fe5b-4019-9061-4af1e0863454", "name": "AVALANCHES SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "CANTON", "id": "8d23d414-d384-4fd1-ac12-4f43f8667973", "name": "CANTON"}, {"vocabulary_id": null, "state": "active", "display_name": "CAUSE OF SALVAGE LOGGING", "id": "639a1a8c-4f3f-4d0f-a5f1-dd6eebbb5279", "name": "CAUSE OF SALVAGE LOGGING"}, {"vocabulary_id": null, "state": "active", "display_name": "COST OF TIMBER HARVEST 6 CLASSES", "id": "8e90c160-abab-4553-bf75-bad253cd4526", "name": "COST OF TIMBER HARVEST 6 CLASSES"}, {"vocabulary_id": null, "state": "active", "display_name": "GRID NFI4 2009-2013", "id": "75dea3f4-623a-4f53-9459-65f3ee636f26", "name": "GRID NFI4 2009-2013"}, {"vocabulary_id": null, "state": "active", "display_name": "LANDSLIDE-MUDFLOW SILVAPROTECT", "id": "aec8669b-e1d8-4381-85ef-456d16f6ebd1", "name": "LANDSLIDE-MUDFLOW SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "MAIN TYPE OF HARVEST", "id": "c60027ba-a66d-46fc-9db5-dfc050970597", "name": "MAIN TYPE OF HARVEST"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI2-NFI3", "id": "6fc60559-41e5-4f9f-9ff3-33a19c199945", "name": "NFI2-NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI3-NFI4B", "id": "7b5f8772-ad1a-4174-b0f5-7d51fd2bb943", "name": "NFI3-NFI4B"}, {"vocabulary_id": null, "state": "active", "display_name": "POTENTIAL COST FOR TIMBER HARVESTING", "id": "a061c78d-8588-475a-a445-eea29dfed0f3", "name": "POTENTIAL COST FOR TIMBER HARVESTING"}, {"vocabulary_id": null, "state": "active", "display_name": "PROCESSES IN CHANNELS SILVAPROTECT", "id": "30dc6e92-2512-4e65-9101-4cb054a391ad", "name": "PROCESSES IN CHANNELS SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "PROTECTION FOREST PERIMETER SILVAPROTECT", "id": "554dba56-1278-4490-90c2-68ad4dcfaf5a", "name": "PROTECTION FOREST PERIMETER SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "ROCKFALL SILVAPROTECT", "id": "781787e9-867b-4a98-97fd-08c299b69519", "name": "ROCKFALL SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "SALVAGE LOGGING STAR", "id": "7d674fca-b8d2-45dc-bec2-f149fdb3478d", "name": "SALVAGE LOGGING STAR"}], "title": "Salvage logging*", "spatial_info": "Switzerland", "groups": [], "creator_user_id": "334cee1e-6afa-4639-88a2-f980e6ff42c3", "date": "", "resource_type_general": "dataset", "relationships_as_subject": [], "name": "salvage_logging_star-186", "doi": "10.21258/1057112", "isopen": true, "language": "en", "url": null, "notes": "Volume of stemwood with bark of all trees and shrubs  starting at 12 cm dbh that were removed from the forest as a result of damage occurring (e.g. windthrow, avalanches, insects, rockfall), and not because of management planning. This theme is derived on the level of a sample plot from the cuttings of the sample trees and the salvage cut proportion (according to information from the forester).  *In the calculation no D7/tree height data were used. The values calculated like this have not been corrected for bias, but allow for cantons or forest districts a more robust estimation of changes and could thus be better interpreted.\\n\\n__Citation:__\\n > _Abegg, M.; Br\\u00e4ndli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; R\\u00f6sler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ", "license_title": "Other (Open)", "extras": [{"value": "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.", "key": "License"}], "organization": {"description": "The Swiss National Forest Inventory records the current state and the changes of the Swiss forest. The survey obtains data about trees, stands, sample plots and through enquiries at the local forest service.\\r\\n\\r\\nThe NFI carried out by the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL) in collaboration with the Forest Division at Federal Office for the Environment (FOEN ). The WSL is responsible for the planning, survey and analysis, as well as the scientific interpretation and publication of the NFI. The political interpretation and implementation is done by the Forest Division.\\r\\n\\r\\nThe first survey (LFI1) took place from 1983\\u201385, the second survey followed in 1993\\u201395 and the third inventory was carried out 2004\\u20132006. Since 2009, the continuous survey of the fourth NFI (2009\\u20132017) has been in progress.\\r\\n\\r\\nMore information: https://www.lfi.ch/lfi/lfi-en.php", "title": "NFI", "created": "2016-07-05T13:46:14.456454", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "https://www.lfi.ch/layout/images/logo.gif", "revision_id": "57729ab8-3744-438f-959a-aed2a9f4d900", "type": "organization", "id": "49192b11-adac-4e68-ad64-be15a4321347", "name": "nfi"}, "revision_id": "d172966c-30a2-4fdb-a80f-aebaaf581f43", "resource_type": "Dataset"}',
    res_name: ["NFI2–NFI3 (1993/95–2004/06) ", "NFI3–NFI4b (2004/06–2009/13) "],
    name: "salvage_logging_star-186",
    extras_spatial_info: "Switzerland",
    notes:
      "Volume of stemwood with bark of all trees and shrubs  starting at 12 cm dbh that were removed from the forest as a result of damage occurring (e.g. windthrow, avalanches, insects, rockfall), and not because of management planning. This theme is derived on the level of a sample plot from the cuttings of the sample trees and the salvage cut proportion (according to information from the forester).  *In the calculation no D7/tree height data were used. The values calculated like this have not been corrected for bias, but allow for cantons or forest districts a more robust estimation of changes and could thus be better interpreted.\n\n__Citation:__\n > _Abegg, M.; Brändli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; Rösler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ",
    extras_License:
      "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.",
    spatial_geom: [
      "POLYGON ((5.95587 45.81802, 10.49203 45.81802, 10.49203 47.80838, 5.95587 47.80838, 5.95587 45.81802))"
    ],
    dataset_type: "dataset",
    organization: "nfi",
    revision_id: "d172966c-30a2-4fdb-a80f-aebaaf581f43",
    extras_publication:
      '{"publisher": "Swiss Federal Research Institute WSL", "publication_year": "2014"}',
    extras_spatial:
      '{"type": "Polygon", "coordinates": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}',
    _version_: "1613720540840722432",
    indexed_ts: "2018-10-08T01:57:13.657Z",
    data_dict:
      '{"license_title": "Other (Open)", "maintainer": "{\\"affiliation\\": \\"WSL\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\", \\"name\\": \\"Urs-Beat Br\\u00e4ndli\\"}", "relationships_as_object": [], "private": false, "maintainer_email": null, "num_tags": 19, "id": "fd734937-cf78-4529-878b-4815a20a1bbf", "metadata_created": "2018-05-13T17:11:11.136392", "metadata_modified": "2018-07-06T22:20:48.167059", "author": "[{\\"affiliation\\": \\"WSL\\", \\"name\\": \\"Abegg, M.\\", \\"email\\": \\"meinrad.abegg@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Br\\\\u00e4ndli, U.-B.\\", \\"email\\": \\"urs-beat.braendli@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Cioldi, F.\\", \\"email\\": \\"fabrizio.cioldi@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Fischer, C.\\", \\"email\\": \\"christoph.fischer@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Herold-Bonardi, A.\\", \\"email\\": \\"anne.herold@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Huber M.\\", \\"email\\": \\"markus.huber@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Keller, M.\\", \\"email\\": \\"markus.keller@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Meile, R.\\", \\"email\\": \\"rolf.meile@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" R\\\\u00f6sler, E.\\", \\"email\\": \\"erik.roesler@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Speich, S.\\", \\"email\\": \\"simon.speich@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Traub, B.\\", \\"email\\": \\"berthold.traub@wsl.ch\\"}, {\\"affiliation\\": \\"WSL\\", \\"name\\": \\" Vidondo, B.\\", \\"email\\": \\"beatriz.vidondo@wsl.ch\\"}]", "author_email": null, "state": "active", "version": null, "creator_user_id": "334cee1e-6afa-4639-88a2-f980e6ff42c3", "type": "dataset", "resources": [{"mimetype": null, "cache_url": null, "state": "active", "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=250350", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:25.805944", "cache_last_updated": null, "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "mimetype_inner": null, "last_modified": null, "position": 0, "revision_id": "0d53cb90-6a8a-4e9f-b150-aa052a3afab8", "size": null, "url_type": null, "id": "aa957199-f854-47be-9e66-1a24d7f9e981", "resource_type": null, "name": "NFI2\\u2013NFI3 (1993/95\\u20132004/06) "}, {"mimetype": null, "cache_url": null, "state": "active", "hash": "", "description": "", "format": "URL", "url": "http://www.lfi.ch/resultate/resultateliste-en.php?p=theme&zigrNr=186&invNr=350452", "restricted": "{\\"allowed_users\\": \\"\\", \\"level\\": \\"public\\"}", "created": "2018-05-29T21:17:25.805955", "cache_last_updated": null, "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "mimetype_inner": null, "last_modified": null, "position": 1, "revision_id": "0d53cb90-6a8a-4e9f-b150-aa052a3afab8", "size": null, "url_type": null, "id": "41f39dbc-467e-4a4b-8bea-1071b36b68d5", "resource_type": null, "name": "NFI3\\u2013NFI4b (2004/06\\u20132009/13) "}], "num_resources": 2, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "14 X 14 KM GRID", "id": "2ada6508-684d-4b81-9b13-96bf53df5410", "name": "14 X 14 KM GRID"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4", "id": "bb187fcd-0638-4b9d-9013-d3df341ecc54", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI1-NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3", "id": "40ec6f37-2158-4ece-be9f-55cd87d14608", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3-NFI4", "id": "3a3504eb-ebad-4732-9b46-5ab7500b7a3c", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI2-NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4", "id": "07cdbd84-6d9a-4b0d-abbc-408769b24e3e", "name": "ACCESSIBLE FOREST WITHOUT SHRUB FOREST NFI3-NFI4"}, {"vocabulary_id": null, "state": "active", "display_name": "AVALANCHES SILVAPROTECT", "id": "b8183624-fe5b-4019-9061-4af1e0863454", "name": "AVALANCHES SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "CANTON", "id": "8d23d414-d384-4fd1-ac12-4f43f8667973", "name": "CANTON"}, {"vocabulary_id": null, "state": "active", "display_name": "CAUSE OF SALVAGE LOGGING", "id": "639a1a8c-4f3f-4d0f-a5f1-dd6eebbb5279", "name": "CAUSE OF SALVAGE LOGGING"}, {"vocabulary_id": null, "state": "active", "display_name": "COST OF TIMBER HARVEST 6 CLASSES", "id": "8e90c160-abab-4553-bf75-bad253cd4526", "name": "COST OF TIMBER HARVEST 6 CLASSES"}, {"vocabulary_id": null, "state": "active", "display_name": "GRID NFI4 2009-2013", "id": "75dea3f4-623a-4f53-9459-65f3ee636f26", "name": "GRID NFI4 2009-2013"}, {"vocabulary_id": null, "state": "active", "display_name": "LANDSLIDE-MUDFLOW SILVAPROTECT", "id": "aec8669b-e1d8-4381-85ef-456d16f6ebd1", "name": "LANDSLIDE-MUDFLOW SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "MAIN TYPE OF HARVEST", "id": "c60027ba-a66d-46fc-9db5-dfc050970597", "name": "MAIN TYPE OF HARVEST"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI2-NFI3", "id": "6fc60559-41e5-4f9f-9ff3-33a19c199945", "name": "NFI2-NFI3"}, {"vocabulary_id": null, "state": "active", "display_name": "NFI3-NFI4B", "id": "7b5f8772-ad1a-4174-b0f5-7d51fd2bb943", "name": "NFI3-NFI4B"}, {"vocabulary_id": null, "state": "active", "display_name": "POTENTIAL COST FOR TIMBER HARVESTING", "id": "a061c78d-8588-475a-a445-eea29dfed0f3", "name": "POTENTIAL COST FOR TIMBER HARVESTING"}, {"vocabulary_id": null, "state": "active", "display_name": "PROCESSES IN CHANNELS SILVAPROTECT", "id": "30dc6e92-2512-4e65-9101-4cb054a391ad", "name": "PROCESSES IN CHANNELS SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "PROTECTION FOREST PERIMETER SILVAPROTECT", "id": "554dba56-1278-4490-90c2-68ad4dcfaf5a", "name": "PROTECTION FOREST PERIMETER SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "ROCKFALL SILVAPROTECT", "id": "781787e9-867b-4a98-97fd-08c299b69519", "name": "ROCKFALL SILVAPROTECT"}, {"vocabulary_id": null, "state": "active", "display_name": "SALVAGE LOGGING STAR", "id": "7d674fca-b8d2-45dc-bec2-f149fdb3478d", "name": "SALVAGE LOGGING STAR"}], "groups": [], "license_id": "other-open", "relationships_as_subject": [], "organization": {"description": "The Swiss National Forest Inventory records the current state and the changes of the Swiss forest. The survey obtains data about trees, stands, sample plots and through enquiries at the local forest service.\\r\\n\\r\\nThe NFI carried out by the Swiss Federal Institute for Forest, Snow and Landscape Research (WSL) in collaboration with the Forest Division at Federal Office for the Environment (FOEN ). The WSL is responsible for the planning, survey and analysis, as well as the scientific interpretation and publication of the NFI. The political interpretation and implementation is done by the Forest Division.\\r\\n\\r\\nThe first survey (LFI1) took place from 1983\\u201385, the second survey followed in 1993\\u201395 and the third inventory was carried out 2004\\u20132006. Since 2009, the continuous survey of the fourth NFI (2009\\u20132017) has been in progress.\\r\\n\\r\\nMore information: https://www.lfi.ch/lfi/lfi-en.php", "title": "NFI", "created": "2016-07-05T13:46:14.456454", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "https://www.lfi.ch/layout/images/logo.gif", "revision_id": "57729ab8-3744-438f-959a-aed2a9f4d900", "type": "organization", "id": "49192b11-adac-4e68-ad64-be15a4321347", "name": "nfi"}, "name": "salvage_logging_star-186", "isopen": true, "url": null, "notes": "Volume of stemwood with bark of all trees and shrubs  starting at 12 cm dbh that were removed from the forest as a result of damage occurring (e.g. windthrow, avalanches, insects, rockfall), and not because of management planning. This theme is derived on the level of a sample plot from the cuttings of the sample trees and the salvage cut proportion (according to information from the forester).  *In the calculation no D7/tree height data were used. The values calculated like this have not been corrected for bias, but allow for cantons or forest districts a more robust estimation of changes and could thus be better interpreted.\\n\\n__Citation:__\\n > _Abegg, M.; Br\\u00e4ndli, U.-B.; Cioldi, F.; Fischer, C.; Herold-Bonardi, A.; Huber M.; Keller, M.; Meile, R.; R\\u00f6sler, E.; Speich, S.; Traub, B.; Vidondo, B. (2014). Fourth national forest inventory - result tables and maps on the Internet for the NFI 2009-2013 (NFI4b). [Published online 06.11.2014] Available from World Wide Web http://www.lfi.ch/resultate/ Birmensdorf, Swiss Federal Research Institute WSL. [doi:10.21258/1057112](https://doi.org/10.21258/1057112)_ ", "owner_org": "49192b11-adac-4e68-ad64-be15a4321347", "extras": [{"state": "active", "value": "All data and text are copyrighted and further use is restricted. Copying these files or parts of them into any publicly accessible service is NOT permitted without a prior agreement with the authors.", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "License", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "10d66ffa-2088-4729-9d4b-ce0e7c5a76e0"}, {"state": "active", "value": "", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "date", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "1c5906e4-26c2-421f-9c4d-fd276b07ce0e"}, {"state": "active", "value": "10.21258/1057112", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "doi", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "aa3026b3-e7ae-4d48-bfe1-02a36a8071d8"}, {"state": "active", "value": "en", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "language", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "e92fe9d2-e4a2-493b-83d3-3ddd933cfda5"}, {"state": "active", "value": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL\\", \\"publication_year\\": \\"2014\\"}", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "publication", "revision_id": "2a7fe0d6-211b-4c2d-9671-2ad87b75dbd8", "id": "e1551eff-c93d-4cd3-a2b1-d6ac344772fb"}, {"state": "active", "value": "Dataset", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "resource_type", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "5c34e07c-dd8d-4ea3-ad41-db4ed8083dfd"}, {"state": "active", "value": "dataset", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "resource_type_general", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "b19c3060-2aad-49b2-a289-1fa3f99f804c"}, {"state": "active", "value": "{\\"type\\": \\"Polygon\\", \\"coordinates\\": [[[5.95587, 45.81802],[5.95587, 47.80838],[10.49203, 47.80838],[10.49203, 45.81802],[5.95587, 45.81802]]]}", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "spatial", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "33aebb8b-3f37-4618-a48c-6826034dd938"}, {"state": "active", "value": "Switzerland", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "spatial_info", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "c2e45812-d692-45b5-a86e-27f3a9925271"}, {"state": "active", "value": "", "package_id": "fd734937-cf78-4529-878b-4815a20a1bbf", "key": "subtitle", "revision_id": "8ea8efca-c4ab-465a-ada0-2900d279ae71", "id": "b45590ff-f98c-41be-ab01-1997f4618041"}], "title": "Salvage logging*", "revision_id": "d172966c-30a2-4fdb-a80f-aebaaf581f43"}'
  },
  {
    res_description: [
      "Site photo of the forest station from below (viewing upwards the slope)",
      "Data overview for air temperature, relative humidity, precipitation, PAR, wind speed.",
      "Data file."
    ],
    maintainer:
      '{"identifier_scheme": "", "affiliation": "Swiss Federal Research Institute WSL", "identifier": "", "email": "matthias.haeni@wsl.ch", "name": "Matthias Haeni"}',
    author:
      '[{"affiliation": "Swiss Federal Research Institute WSL", "name": "Matthias Haeni", "email": "matthias.haeni@wsl.ch"}, {"affiliation": "Swiss Federal Research Institute WSL", "name": "Arthur Gessler", "email": "arthur.gessler@wsl.ch"}, {"affiliation": "Swiss Federal Research Institute WSL", "email": "martine.rebetez@wsl.ch", "name": "Martine Rebetez"}]',
    site_id: "default",
    extras_resource_type_general: "dataset",
    id: "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43",
    metadata_created: "2016-11-09T14:31:50.918Z",
    extras_language: "en",
    capacity: "private",
    metadata_modified: "2018-05-25T10:00:51.855Z",
    res_format: ["JPEG", "PDF", "CSV"],
    index_id: "b20f8e25f8a1797268ca7d8f3de1fc4d",
    state: "active",
    version: "1.0",
    res_url: [
      "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/15eb26e6-46a4-43e6-8cdb-fd7072968eb3/download/leb.jpg",
      "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/569d951e-97b2-44e0-9ad5-d861994a78eb/download/lebplot.pdf",
      "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/21e6ffa5-4cc5-4310-be18-91c2d579163c/download/lebforest.csv"
    ],
    entity_type: "package",
    tags: [
      "CLIMATE CHANGE",
      "LONG-TERM",
      "METEO",
      "METEOROLOGY",
      "PAR",
      "PRECIPITATION",
      "RELATIVE HUMIDITY",
      "TEMPERATURE",
      "WIND SPEED"
    ],
    title:
      "Lens, Switzerland: Long-term forest meteorological data from the Long-term Forest Ecosystem Research Programme (LWF), from 1997-2016",
    license_id: "odc-odbl",
    validated_data_dict:
      '{"owner_org": "0763c98e-6fba-4f5f-bf83-c4d37f19bd6e", "maintainer": "{\\"identifier_scheme\\": \\"\\", \\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"identifier\\": \\"\\", \\"email\\": \\"matthias.haeni@wsl.ch\\", \\"name\\": \\"Matthias Haeni\\"}", "relationships_as_object": [], "private": true, "maintainer_email": null, "num_tags": 9, "subtitle": "", "id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "metadata_created": "2016-11-09T14:31:50.918276", "publication": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL / SwissForestLab\\", \\"publication_year\\": \\"2016\\"}", "metadata_modified": "2018-05-25T10:00:51.855604", "author": "[{\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"name\\": \\"Matthias Haeni\\", \\"email\\": \\"matthias.haeni@wsl.ch\\"}, {\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"name\\": \\"Arthur Gessler\\", \\"email\\": \\"arthur.gessler@wsl.ch\\"}, {\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"email\\": \\"martine.rebetez@wsl.ch\\", \\"name\\": \\"Martine Rebetez\\"}]", "author_email": null, "state": "active", "version": "1.0", "spatial": "{\\"type\\": \\"Point\\", \\"coordinates\\": [7.435198,46.268368]}", "license_id": "odc-odbl", "type": "dataset", "resources": [{"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "doi": "", "hash": "", "description": "Site photo of the forest station from below (viewing upwards the slope)", "format": "JPEG", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/15eb26e6-46a4-43e6-8cdb-fd7072968eb3/download/leb.jpg", "restricted": "", "created": "2016-11-09T15:33:09.567402", "state": "active", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "last_modified": "2016-11-09T14:33:09.506072", "mimetype": "image/jpeg", "url_type": "upload", "position": 0, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "size": null, "id": "15eb26e6-46a4-43e6-8cdb-fd7072968eb3", "resource_type": null, "name": "Site photo of the forest station (LEB)"}, {"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "doi": "", "hash": "", "description": "Data overview for air temperature, relative humidity, precipitation, PAR, wind speed.", "format": "PDF", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/569d951e-97b2-44e0-9ad5-d861994a78eb/download/lebplot.pdf", "restricted": "", "created": "2016-11-14T15:59:29.603830", "state": "active", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "last_modified": "2016-11-14T14:59:29.534437", "mimetype": "application/pdf", "url_type": "upload", "position": 1, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "size": 234314, "id": "569d951e-97b2-44e0-9ad5-d861994a78eb", "resource_type": null, "name": "Data plot of the forest station (LEB)"}, {"cache_last_updated": null, "cache_url": null, "mimetype_inner": null, "doi": "", "hash": "", "description": "Data file.", "format": "CSV", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/21e6ffa5-4cc5-4310-be18-91c2d579163c/download/lebforest.csv", "restricted": "", "created": "2016-11-14T16:02:16.412489", "state": "active", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "last_modified": "2016-11-14T15:02:16.374338", "mimetype": "text/csv", "url_type": "upload", "position": 2, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "size": 9240564, "id": "21e6ffa5-4cc5-4310-be18-91c2d579163c", "resource_type": null, "name": "Forest station data (LEB)"}], "num_resources": 3, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "CLIMATE CHANGE", "id": "7586fd99-56bd-4c44-ace2-14d87ec1dd9b", "name": "CLIMATE CHANGE"}, {"vocabulary_id": null, "state": "active", "display_name": "LONG-TERM", "id": "b3126982-ee18-45d2-b9e2-5c52c272f278", "name": "LONG-TERM"}, {"vocabulary_id": null, "state": "active", "display_name": "METEO", "id": "a2d5289c-e970-4210-8cd2-b4d0e21ab4af", "name": "METEO"}, {"vocabulary_id": null, "state": "active", "display_name": "METEOROLOGY", "id": "1cde4b46-1fd4-4227-b910-ce97d87f99ad", "name": "METEOROLOGY"}, {"vocabulary_id": null, "state": "active", "display_name": "PAR", "id": "87c52aa3-f1b5-42dd-8b58-a5b8bc709898", "name": "PAR"}, {"vocabulary_id": null, "state": "active", "display_name": "PRECIPITATION", "id": "dba7b369-a028-4ce3-805f-ecbefe796885", "name": "PRECIPITATION"}, {"vocabulary_id": null, "state": "active", "display_name": "RELATIVE HUMIDITY", "id": "d90189bb-d066-4183-a1de-8cdf50c28f67", "name": "RELATIVE HUMIDITY"}, {"vocabulary_id": null, "state": "active", "display_name": "TEMPERATURE", "id": "bbdcfdc8-2700-4889-a062-c30bff494244", "name": "TEMPERATURE"}, {"vocabulary_id": null, "state": "active", "display_name": "WIND SPEED", "id": "3c4e47d5-a129-4c0b-a7ed-264926e3a908", "name": "WIND SPEED"}], "title": "Lens, Switzerland: Long-term forest meteorological data from the Long-term Forest Ecosystem Research Programme (LWF), from 1997-2016", "spatial_info": "Lens, Switzerland", "groups": [], "creator_user_id": "11dc6637-cf6e-4c83-ab01-c708cc742b27", "date": "", "resource_type_general": "dataset", "relationships_as_subject": [], "name": "lwfmeteo-lens-2016", "doi": "", "isopen": true, "language": "en", "url": null, "notes": "High quality meteorological data are needed for long-term forest ecosystem research, particularly in the light of global change. The long-term data series published here comprises almost 20 years of measurements for one meteorological station in Lens in Switzerland which is located within a natural coniferous forest with Scots pine (_Pinus sylvestris_; 150-170 yrs)) as dominant tree species. The meteorological time series are presented in hourly time resolution of air temperature, relative humidity, precipitation, photosynthetically active radiation (PAR) and wind speed. Lens is part of the Long-term Forest Ecosystem Research Programme (LWF) established and maintained by the Swiss Federal Research Institute WSL.", "license_title": "Open Data Commons Open Database License (ODbL)", "license_url": "http://www.opendefinition.org/licenses/odc-odbl", "organization": {"description": "__Air pollution and climate change have an effect on the forest. We examine these effects as part of the Long-Term Forest Ecosystem Research (LWF) programme.__\\r\\n\\r\\nWe need reliable information in order to record the condition of the forest on an ongoing basis and to understand precisely what happens in the forest when the environment changes. An important source of data here is the Long-Term Forest Ecosystem Research (LWF) programme. It consists of 19 permanent monitoring sites on which we have regularly carried out numerous measurements since 1994. We have also been recording the health of trees on the monitoring sites of the Sanasilva Inventory, which is part of the LWF programme (see Sites), since 1985.\\r\\n\\r\\nWe disclose the gathered data, as well as the scientific interpretation of this data, to national and international decision-makers.\\r\\n\\r\\nWith the legally enshrined functions of the LWF programme, Switzerland participates in international research programmes such as the \\"International Co-operative Programme on Assessment and Monitoring of Air Pollution Effects on Forests\\" ICP Forests and the LTER-Europe Network (Long-Term Ecosystem Research in Europe).\\r\\n\\r\\nThe Long-term Forest Ecosystem Research (LWF) programme is run and financed by the WSL.\\r\\n \\r\\n### Objectives of the programme\\r\\n\\r\\n *   Early detection and a representative assessment of changes in forest condition\\r\\n *   Determination of external influences, both from anthropogenic and natural sources and their effect on the forest ecosystem (element inputs, climate)\\r\\n *    Determination of changes in important components within the forest ecosystem\\r\\n *   Development of indicators to assess the condition of the forest\\r\\n *   Integrated risk assessment based on different stress scenarios\\r\\n *   Extended platform for internal and external research projects\\r\\n\\r\\n__Further information__: https://www.wsl.ch/en/forest/forest-development-and-monitoring/long-term-forest-ecosystem-research-lwf.html", "title": "LWF", "created": "2016-11-09T11:47:45.334341", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "2018-07-10-091116.682489LogoWSL.svg", "revision_id": "c9e63942-9a4e-4f0c-b777-c48f6b23df52", "type": "organization", "id": "0763c98e-6fba-4f5f-bf83-c4d37f19bd6e", "name": "lwf"}, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "resource_type": ""}',
    res_name: [
      "Site photo of the forest station (LEB)",
      "Data plot of the forest station (LEB)",
      "Forest station data (LEB)"
    ],
    name: "lwfmeteo-lens-2016",
    extras_spatial_info: "Lens, Switzerland",
    notes:
      "High quality meteorological data are needed for long-term forest ecosystem research, particularly in the light of global change. The long-term data series published here comprises almost 20 years of measurements for one meteorological station in Lens in Switzerland which is located within a natural coniferous forest with Scots pine (_Pinus sylvestris_; 150-170 yrs)) as dominant tree species. The meteorological time series are presented in hourly time resolution of air temperature, relative humidity, precipitation, photosynthetically active radiation (PAR) and wind speed. Lens is part of the Long-term Forest Ecosystem Research Programme (LWF) established and maintained by the Swiss Federal Research Institute WSL.",
    spatial_geom: ["POINT (7.435198 46.268368)"],
    dataset_type: "dataset",
    organization: "lwf",
    revision_id: "999fbbb6-a416-48a6-8064-3d9ff2eca655",
    extras_publication:
      '{"publisher": "Swiss Federal Research Institute WSL / SwissForestLab", "publication_year": "2016"}',
    extras_spatial: '{"type": "Point", "coordinates": [7.435198,46.268368]}',
    _version_: "1613720540894199808",
    indexed_ts: "2018-10-08T01:57:13.708Z",
    data_dict:
      '{"license_title": "Open Data Commons Open Database License (ODbL)", "maintainer": "{\\"identifier_scheme\\": \\"\\", \\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"identifier\\": \\"\\", \\"email\\": \\"matthias.haeni@wsl.ch\\", \\"name\\": \\"Matthias Haeni\\"}", "relationships_as_object": [], "private": true, "maintainer_email": null, "num_tags": 9, "id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "metadata_created": "2016-11-09T14:31:50.918276", "metadata_modified": "2018-05-25T10:00:51.855604", "author": "[{\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"name\\": \\"Matthias Haeni\\", \\"email\\": \\"matthias.haeni@wsl.ch\\"}, {\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"name\\": \\"Arthur Gessler\\", \\"email\\": \\"arthur.gessler@wsl.ch\\"}, {\\"affiliation\\": \\"Swiss Federal Research Institute WSL\\", \\"email\\": \\"martine.rebetez@wsl.ch\\", \\"name\\": \\"Martine Rebetez\\"}]", "author_email": null, "state": "active", "version": "1.0", "creator_user_id": "11dc6637-cf6e-4c83-ab01-c708cc742b27", "type": "dataset", "resources": [{"hash": "", "description": "Site photo of the forest station from below (viewing upwards the slope)", "format": "JPEG", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "mimetype_inner": null, "url_type": "upload", "id": "15eb26e6-46a4-43e6-8cdb-fd7072968eb3", "size": null, "mimetype": "image/jpeg", "cache_url": null, "doi": "", "name": "Site photo of the forest station (LEB)", "created": "2016-11-09T15:33:09.567402", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/15eb26e6-46a4-43e6-8cdb-fd7072968eb3/download/leb.jpg", "restricted": "", "cache_last_updated": null, "state": "active", "last_modified": "2016-11-09T14:33:09.506072", "position": 0, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "resource_type": null}, {"hash": "", "description": "Data overview for air temperature, relative humidity, precipitation, PAR, wind speed.", "format": "PDF", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "mimetype_inner": null, "url_type": "upload", "id": "569d951e-97b2-44e0-9ad5-d861994a78eb", "size": 234314, "mimetype": "application/pdf", "cache_url": null, "doi": "", "name": "Data plot of the forest station (LEB)", "created": "2016-11-14T15:59:29.603830", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/569d951e-97b2-44e0-9ad5-d861994a78eb/download/lebplot.pdf", "restricted": "", "cache_last_updated": null, "state": "active", "last_modified": "2016-11-14T14:59:29.534437", "position": 1, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "resource_type": null}, {"hash": "", "description": "Data file.", "format": "CSV", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "mimetype_inner": null, "url_type": "upload", "id": "21e6ffa5-4cc5-4310-be18-91c2d579163c", "size": 9240564, "mimetype": "text/csv", "cache_url": null, "doi": "", "name": "Forest station data (LEB)", "created": "2016-11-14T16:02:16.412489", "url": "https://www.envidat.ch/dataset/fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43/resource/21e6ffa5-4cc5-4310-be18-91c2d579163c/download/lebforest.csv", "restricted": "", "cache_last_updated": null, "state": "active", "last_modified": "2016-11-14T15:02:16.374338", "position": 2, "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655", "resource_type": null}], "num_resources": 3, "tags": [{"vocabulary_id": null, "state": "active", "display_name": "CLIMATE CHANGE", "id": "7586fd99-56bd-4c44-ace2-14d87ec1dd9b", "name": "CLIMATE CHANGE"}, {"vocabulary_id": null, "state": "active", "display_name": "LONG-TERM", "id": "b3126982-ee18-45d2-b9e2-5c52c272f278", "name": "LONG-TERM"}, {"vocabulary_id": null, "state": "active", "display_name": "METEO", "id": "a2d5289c-e970-4210-8cd2-b4d0e21ab4af", "name": "METEO"}, {"vocabulary_id": null, "state": "active", "display_name": "METEOROLOGY", "id": "1cde4b46-1fd4-4227-b910-ce97d87f99ad", "name": "METEOROLOGY"}, {"vocabulary_id": null, "state": "active", "display_name": "PAR", "id": "87c52aa3-f1b5-42dd-8b58-a5b8bc709898", "name": "PAR"}, {"vocabulary_id": null, "state": "active", "display_name": "PRECIPITATION", "id": "dba7b369-a028-4ce3-805f-ecbefe796885", "name": "PRECIPITATION"}, {"vocabulary_id": null, "state": "active", "display_name": "RELATIVE HUMIDITY", "id": "d90189bb-d066-4183-a1de-8cdf50c28f67", "name": "RELATIVE HUMIDITY"}, {"vocabulary_id": null, "state": "active", "display_name": "TEMPERATURE", "id": "bbdcfdc8-2700-4889-a062-c30bff494244", "name": "TEMPERATURE"}, {"vocabulary_id": null, "state": "active", "display_name": "WIND SPEED", "id": "3c4e47d5-a129-4c0b-a7ed-264926e3a908", "name": "WIND SPEED"}], "groups": [], "license_id": "odc-odbl", "relationships_as_subject": [], "organization": {"description": "__Air pollution and climate change have an effect on the forest. We examine these effects as part of the Long-Term Forest Ecosystem Research (LWF) programme.__\\r\\n\\r\\nWe need reliable information in order to record the condition of the forest on an ongoing basis and to understand precisely what happens in the forest when the environment changes. An important source of data here is the Long-Term Forest Ecosystem Research (LWF) programme. It consists of 19 permanent monitoring sites on which we have regularly carried out numerous measurements since 1994. We have also been recording the health of trees on the monitoring sites of the Sanasilva Inventory, which is part of the LWF programme (see Sites), since 1985.\\r\\n\\r\\nWe disclose the gathered data, as well as the scientific interpretation of this data, to national and international decision-makers.\\r\\n\\r\\nWith the legally enshrined functions of the LWF programme, Switzerland participates in international research programmes such as the \\"International Co-operative Programme on Assessment and Monitoring of Air Pollution Effects on Forests\\" ICP Forests and the LTER-Europe Network (Long-Term Ecosystem Research in Europe).\\r\\n\\r\\nThe Long-term Forest Ecosystem Research (LWF) programme is run and financed by the WSL.\\r\\n \\r\\n### Objectives of the programme\\r\\n\\r\\n *   Early detection and a representative assessment of changes in forest condition\\r\\n *   Determination of external influences, both from anthropogenic and natural sources and their effect on the forest ecosystem (element inputs, climate)\\r\\n *    Determination of changes in important components within the forest ecosystem\\r\\n *   Development of indicators to assess the condition of the forest\\r\\n *   Integrated risk assessment based on different stress scenarios\\r\\n *   Extended platform for internal and external research projects\\r\\n\\r\\n__Further information__: https://www.wsl.ch/en/forest/forest-development-and-monitoring/long-term-forest-ecosystem-research-lwf.html", "title": "LWF", "created": "2016-11-09T11:47:45.334341", "approval_status": "approved", "is_organization": true, "state": "active", "image_url": "2018-07-10-091116.682489LogoWSL.svg", "revision_id": "c9e63942-9a4e-4f0c-b777-c48f6b23df52", "type": "organization", "id": "0763c98e-6fba-4f5f-bf83-c4d37f19bd6e", "name": "lwf"}, "name": "lwfmeteo-lens-2016", "isopen": true, "url": null, "notes": "High quality meteorological data are needed for long-term forest ecosystem research, particularly in the light of global change. The long-term data series published here comprises almost 20 years of measurements for one meteorological station in Lens in Switzerland which is located within a natural coniferous forest with Scots pine (_Pinus sylvestris_; 150-170 yrs)) as dominant tree species. The meteorological time series are presented in hourly time resolution of air temperature, relative humidity, precipitation, photosynthetically active radiation (PAR) and wind speed. Lens is part of the Long-term Forest Ecosystem Research Programme (LWF) established and maintained by the Swiss Federal Research Institute WSL.", "owner_org": "0763c98e-6fba-4f5f-bf83-c4d37f19bd6e", "extras": [{"state": "active", "value": "", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "date", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "68db9d78-27fd-4acb-accc-8380280bf90c"}, {"state": "active", "value": "", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "doi", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "4b124577-d41f-4ddd-a1d3-2d014ad56f54"}, {"state": "active", "value": "en", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "language", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "bdc42083-681e-4dff-8635-9e4515761cdd"}, {"state": "active", "value": "{\\"publisher\\": \\"Swiss Federal Research Institute WSL / SwissForestLab\\", \\"publication_year\\": \\"2016\\"}", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "publication", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "b2b118d8-7291-4bcf-bcfc-afd54ad2f4de"}, {"state": "active", "value": "", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "resource_type", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "78fcc784-b9ab-4453-9c03-62970d061a3b"}, {"state": "active", "value": "dataset", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "resource_type_general", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "b4968024-d920-473b-bb59-581e8f8ac7e2"}, {"state": "active", "value": "{\\"type\\": \\"Point\\", \\"coordinates\\": [7.435198,46.268368]}", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "spatial", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "b170eda0-9410-4a94-96b5-b311adfc97fa"}, {"state": "active", "value": "Lens, Switzerland", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "spatial_info", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "a894ec43-997b-4201-b97c-b26f00e11d9c"}, {"state": "active", "value": "", "package_id": "fea7c28b-0a5b-4f38-b3df-c1ce66c2cf43", "key": "subtitle", "revision_id": "ad2f7758-208a-44ee-8b3d-63776f45d482", "id": "24c60e55-2554-4dba-acf1-09047957719f"}], "license_url": "http://www.opendefinition.org/licenses/odc-odbl", "title": "Lens, Switzerland: Long-term forest meteorological data from the Long-term Forest Ecosystem Research Programme (LWF), from 1997-2016", "revision_id": "999fbbb6-a416-48a6-8064-3d9ff2eca655"}'
  }
];

globalMethods.methods.mixinMethods_enhanceMetadatas(metadataCards, cardImages);

function getCardImages(globalMethods) {
  let cardImages = {};

  // alert(
  //   "globalMethods " +
  //     typeof globalMethods +
  //     " globalMethods.methods.mixinMethods_importImages " +
  //     typeof globalMethods.methods.mixinMethods_importImages
  // );

  let imgPaths = require.context("@/assets/cards/landscape/", false, /\.jpg$/);
  cardImages.landscape = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/forest/", false, /\.jpg$/);
  cardImages.forest = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/snow/", false, /\.jpg$/);
  cardImages.snow = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/diversity/", false, /\.jpg$/);
  cardImages.diversity = globalMethods.methods.mixinMethods_importImages(imgPaths);

  imgPaths = require.context("@/assets/cards/hazard/", false, /\.jpg$/);
  cardImages.hazard = globalMethods.methods.mixinMethods_importImages(imgPaths);

  return cardImages;
}
