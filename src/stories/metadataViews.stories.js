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
  VCardMedia,
  VChip,
  VSpacer,
  VDivider,
  VAvatar,
  VForm,
  VTextarea
} from "vuetify/lib";

Vue.component("v-card", VCard);
Vue.component("v-card-text", VCardText);
Vue.component("v-card-actions", VCardActions);
Vue.component("v-card-title", VCardTitle);
Vue.component("v-card-media", VCardMedia);
Vue.component("v-chip", VChip);
Vue.component("v-avatar", VAvatar);
Vue.component("v-spacer", VSpacer);
Vue.component("v-divider", VDivider);
Vue.component("v-form", VForm);
Vue.component("v-textarea", VTextarea);
Vue.component("v-btn", VBtn);
Vue.component("v-icon", VIcon);
Vue.component("v-img", VImg);
Vue.component("v-layout", VLayout);
Vue.component("v-flex", VFlex);

import MetadataHeader from "@/components/MetadataDetailViews/MetadataHeader.vue";
import MetadataBody from "@/components/MetadataDetailViews/MetadataBody.vue";
import MetadataCitation from "@/components/MetadataDetailViews/MetadataCitation.vue";
import MetadataDetails from "@/components/MetadataDetailViews/MetadataDetails.vue";
import MetadataLocation from "@/components/MetadataDetailViews/MetadataLocation.vue";

// import for css classes
import App from "@/App.vue";
import MetadataDetailPage from "@/components/Pages/MetadataDetailPage.vue";

import doiIcon from "@/assets/icons/doi.png";
import mailIcon from "@/assets/icons/mail.png";
import contactIcon from "@/assets/icons/contact2.png";
import licenseIcon from "@/assets/icons/license.png";

import metaDataFactory from "@/components/metaDataFactory";
// metadata gets enhance in the storybook config
import metadata from "@/stories/metadata";

const smallHeader = metaDataFactory.createHeader(metadata[0], true);
const largeHeader = metaDataFactory.createHeader(metadata[1], false);

const citation1 = metaDataFactory.createCitation(metadata[0]);
const citation2 = metaDataFactory.createCitation(metadata[2]);

const genericProps1 = {
  showPlaceholder: false, id: citation1.id,
  citationText: citation1.citationText,
  citationXmlLink: citation1.citationBibtexXmlLink,
  citationIsoXmlLink: citation1.citationIsoXmlLink,
  citationGCMDXmlLink: citation1.citationGCMDXmlLink,
  citationBibtexXmlLink: citation1.citationBibtexXmlLink,
  citationRisXmlLink: citation1.citationRisXmlLink,
};

const genericProps2 = {
  showPlaceholder: false, id: citation2.id,
  citationText: citation2.citationText,
  citationXmlLink: citation2.citationBibtexXmlLink,
  citationIsoXmlLink: citation2.citationIsoXmlLink,
  citationGCMDXmlLink: citation2.citationGCMDXmlLink,
  citationBibtexXmlLink: citation2.citationBibtexXmlLink,
  citationRisXmlLink: citation2.citationRisXmlLink,
};

const details1 = metaDataFactory.createDetails(metadata[0]);
const details2 = metaDataFactory.createDetails(metadata[1]);


const genericProps3 = {
  showPlaceholder: false,
  details: details1,
};

const location1 = metaDataFactory.createLocation(metadata[2]);

const genericProps4 = {
  showPlaceholder: false,
  id: location1.id,
  name: location1.name,
  title: location1.title,
  pointArray: location1.pointArray,
  isPolygon: location1.isPolygon,
  isPoint: location1.isPoint,
  isMultiPoint: location1.isMultiPoint,
  geoJSON: location1.geoJSON,
};

export const methods = {
  onCardClick: action("clicked on card"),
  onTagClick: action("clicked on tag")
};

storiesOf("6 Metadata | Detail Views", module)
  .add("Header", () => ({
    components: { MetadataHeader },
    template: `
    <v-layout row wrap>

      <v-flex xs12 >
        Empty Metadata Header
      </v-flex>

      <v-flex xs12 py-3 >
        <metadata-header metadataId="id-which-can-not-be-found" />
      </v-flex>

      <v-flex xs12 >
        Metadata Header with showPlaceholder
      </v-flex>

      <v-flex xs12 py-3 >
        <metadata-header :showPlaceholder="true" />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-header
          v-bind="smallHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

      <v-flex xs12 py-3>
        <metadata-header
          v-bind="largeHeader"
          :doiIcon="doiIcon"
          :contactIcon="contactIcon"
          :mailIcon="mailIcon"
          :licenseIcon="licenseIcon"
        />
      </v-flex>        

    </v-layout>        
    `,
    methods,
    data: () => ({
      smallHeader,
      largeHeader,
      doiIcon,
      contactIcon,
      licenseIcon,
      mailIcon
    })
  })).add("Body", () => ({
    components: { MetadataBody },
    template: `
    <v-layout row wrap>

      <v-flex xs12 py-3>
        <metadata-body
          :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-body
          :genericProps="genericPropsBody"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-body
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-body
          :genericProps="genericPropsBodyLongDesc"
        />
      </v-flex>

    </v-layout>        
    `,
    methods,
    data: () => ({
      genericPropsPlaceholder: {
        showPlaceholder: true,
        description: null,
      },
      genericPropsBody: {
        showPlaceholder: false,        
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      genericPropsBodyLongDesc: {
        showPlaceholder: false,        
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut. Proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Quis enim lobortis scelerisque fermentum dui. Neque egestas congue quisque egestas. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Volutpat blandit aliquam etiam erat. Tempor id eu nisl nunc. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Ultricies mi eget mauris pharetra et ultrices. Eu consequat ac felis donec et odio pellentesque diam volutpat. Fames ac turpis egestas integer. Faucibus interdum posuere lorem ipsum dolor sit amet. Cursus euismod quis viverra nibh cras. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. At elementum eu facilisis sed odio morbi quis. Ut sem viverra aliquet eget sit amet tellus.
        Proin nibh nisl condimentum id venenatis. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Eu mi bibendum neque egestas congue quisque egestas diam. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Sed velit dignissim sodales ut. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Sodales ut eu sem integer vitae. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Augue lacus viverra vitae congue. Eget sit amet tellus cras adipiscing enim eu turpis. Pharetra vel turpis nunc eget lorem. Cras sed felis eget velit aliquet sagittis.
        Tellus elementum sagittis vitae et. Morbi leo urna molestie at elementum. Cursus sit amet dictum sit amet. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Pellentesque id nibh tortor id aliquet lectus. At elementum eu facilisis sed odio morbi. Massa id neque aliquam vestibulum morbi blandit cursus. Ultricies mi quis hendrerit dolor magna eget est lorem. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Vitae tempus quam pellentesque nec. Auctor augue mauris augue neque gravida in fermentum. Ac auctor augue mauris augue neque gravida in fermentum. Bibendum at varius vel pharetra vel. Eget velit aliquet sagittis id consectetur purus ut faucibus. Faucibus purus in massa tempor nec feugiat.
        Sed tempus urna et pharetra pharetra massa massa. Suspendisse in est ante in nibh mauris cursus mattis. Orci a scelerisque purus semper eget duis at tellus at. Semper eget duis at tellus at urna condimentum. Nunc scelerisque viverra mauris in aliquam sem. Blandit massa enim nec dui nunc mattis. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Diam maecenas ultricies mi eget mauris. Nisl tincidunt eget nullam non nisi est. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Cras fermentum odio eu feugiat pretium. Et tortor at risus viverra adipiscing at in tellus. Tristique nulla aliquet enim tortor at auctor. Consequat nisl vel pretium lectus quam id.
        Sagittis nisl rhoncus mattis rhoncus urna. Vehicula ipsum a arcu cursus vitae. Sed elementum tempus egestas sed. Nec nam aliquam sem et tortor. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Massa eget egestas purus viverra accumsan in. Integer eget aliquet nibh praesent. Ut placerat orci nulla pellentesque dignissim enim sit amet. Amet venenatis urna cursus eget. Nunc pulvinar sapien et ligula. Vel pharetra vel turpis nunc eget lorem dolor. Felis donec et odio pellentesque diam. Porttitor rhoncus dolor purus non enim.
        Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Vitae congue eu consequat ac felis donec et odio. Et ultrices neque ornare aenean euismod elementum. In hac habitasse platea dictumst quisque sagittis. Volutpat sed cras ornare arcu dui. Auctor neque vitae tempus quam pellentesque. Erat nam at lectus urna duis convallis. Viverra nam libero justo laoreet sit amet cursus sit amet. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Sed vulputate odio ut enim blandit volutpat. Feugiat vivamus at augue eget arcu. Duis at consectetur lorem donec massa sapien faucibus et molestie. Amet cursus sit amet dictum sit amet justo. Ut diam quam nulla porttitor. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. A condimentum vitae sapien pellentesque. Condimentum lacinia quis vel eros. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt.
        Dolor sit amet consectetur adipiscing elit. Praesent semper feugiat nibh sed. Nulla facilisi morbi tempus iaculis urna id volutpat. Sit amet consectetur adipiscing elit ut aliquam purus. Scelerisque felis imperdiet proin fermentum leo vel orci. Mauris vitae ultricies leo integer. Facilisis gravida neque convallis a cras semper auctor neque vitae. Velit ut tortor pretium viverra suspendisse potenti. Augue eget arcu dictum varius. Sed velit dignissim sodales ut eu sem. Nibh nisl condimentum id venenatis a.
        Sed pulvinar proin gravida hendrerit. Sollicitudin aliquam ultrices sagittis orci a scelerisque. Justo eget magna fermentum iaculis eu. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel. Turpis massa tincidunt dui ut ornare lectus. Non blandit massa enim nec dui. Faucibus ornare suspendisse sed nisi lacus. Augue ut lectus arcu bibendum at varius vel. Ac orci phasellus egestas tellus rutrum tellus pellentesque. Vestibulum sed arcu non odio euismod. Diam vulputate ut pharetra sit amet aliquam id. Donec massa sapien faucibus et molestie ac. Sem integer vitae justo eget magna. Arcu cursus euismod quis viverra nibh cras pulvinar mattis. Neque convallis a cras semper auctor neque vitae.
        Congue quisque egestas diam in arcu cursus. Eget duis at tellus at. Est pellentesque elit ullamcorper dignissim. Enim sed faucibus turpis in eu mi bibendum. Eget sit amet tellus cras adipiscing enim eu. Nunc congue nisi vitae suscipit. Congue eu consequat ac felis donec et. Nulla at volutpat diam ut venenatis tellus in metus. Donec enim diam vulputate ut pharetra sit amet. Magna etiam tempor orci eu lobortis elementum nibh. Dignissim enim sit amet venenatis urna cursus eget nunc.
        Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. A diam maecenas sed enim ut sem viverra. Ac felis donec et odio pellentesque diam volutpat commodo. Risus commodo viverra maecenas accumsan lacus vel facilisis. Vitae aliquet nec ullamcorper sit amet. Ullamcorper malesuada proin libero nunc consequat. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Et tortor consequat id porta nibh venenatis. Lectus mauris ultrices eros in cursus. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus a. Justo donec enim diam vulputate ut pharetra sit. Sit amet luctus venenatis lectus magna fringilla. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Orci dapibus ultrices in iaculis nunc sed augue lacus.
        `
      },
    })
  })).add("Citation", () => ({
    components: { MetadataCitation },
    template: `
    <v-layout row wrap>

      <v-flex xs6 py-3>
        <metadata-citation
          :genericProps="genericProps1"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-citation
          :genericProps="genericProps2"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-citation
          :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },    
    methods: {
    },
    data: () => ({
      genericProps1,
      genericProps2,
      genericPropsPlaceholder: {
        showPlaceholder: true,
        fixedHeight: false,
      },
    })
  })).add("Details", () => ({
    components: { MetadataDetails },
    template: `
    <v-layout row wrap>

      <v-flex xs6 py-3>
        <metadata-details :genericProps="genericProps3"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-details :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

<!--
      <v-flex xs12 py-3>
        <metadata-details :genericProps="genericProps2"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-details :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

      <v-flex xs12 py-3>
        <metadata-details :genericProps="genericPropsPlaceholder"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-details :genericProps="genericPropsPlaceholder"
        />
      </v-flex>
-->
    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },    
    methods: {
    },
    data: () => ({
      genericProps3,
      genericProps2,
      genericPropsPlaceholder: {
        details: [],
        showPlaceholder: true,
        fixedHeight: false,
      },
    })
  })).add("Location", () => ({
    components: { MetadataLocation },
    template: `
    <v-layout row wrap>

      <v-flex xs6 py-3>
        <metadata-location :genericProps="genericProps4"
        />
      </v-flex>

      <v-flex xs6 py-3>
        <metadata-location :genericProps="genericPropsPlaceholder"
          :showPlaceholder="genericPropsPlaceholder.showPlaceholder"
        />
      </v-flex>

    </v-layout>        
    `,
    updated() {
      this.$children.forEach((child) => {
        child.$forceUpdate();
      });
    },    
    methods: {
    },
    data: () => ({
      genericProps4,
      genericPropsPlaceholder: {
        details: [],
        showPlaceholder: true,
        fixedHeight: false,
      },
    })
  }));


  