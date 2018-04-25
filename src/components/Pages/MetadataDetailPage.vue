<template>
  <v-container fluid >

    <metadata-header v-bind="header"> </metadata-header>

    <metadata-body v-bind="body"> </metadata-body>

    <metadata-citation v-bind="citation"> </metadata-citation>

    <metadata-resources v-bind="resources" ></metadata-resources>

    <metadata-location v-bind="resources" ></metadata-location>

    <metadata-details v-bind="resources" ></metadata-details>

  </v-container>
</template>

<script>
  import MetadataHeader from '../Views/MetadataViews/MetadataHeader';
  import MetadataBody from '../Views/MetadataViews/MetadataBody';
  import MetadataResources from '../Views/MetadataViews/MetadataResources';
  import MetadataLocation from '../Views/MetadataViews/MetadataLocation';
  import MetadataDetails from '../Views/MetadataViews/MetadataDetails';
  import MetadataCitation from '../Views/MetadataViews/MetadataCitation';

  // Might want to check https://css-tricks.com/use-cases-fixed-backgrounds-css/
  // for animations between the different parts of the Metadata

  export default {
    data: () => ({
      header: {
        metaid: '1',
        metadataTitle: 'Awesome Metadata #1',
        contactName: 'Dr. Muster Mann',
        contactEmail: 'mustermann@wsl.ch',
        doi: 'envidat.2192318293',
        citation: 'somecitation',
        tags: [
          {
            vocabulary_id: null,
            state: 'active',
            display_name: 'AIR TEMPERATURE',
            id: 'ba9c8c16-f908-4173-affa-f813f7f8cd13',
            name: 'AIR TEMPERATURE',
          },
          {
            vocabulary_id: null,
            state: 'active',
            display_name: 'HUMIDITY',
            id: '5d5d3a6d-1047-4c33-bee7-d1bb119bbe32',
            name: 'HUMIDITY',
          },
          {
            vocabulary_id: null,
            state: 'active',
            display_name: 'LONGWAVE RADIATION',
            id: '4a3b1721-1050-434e-8573-9c36284bb50c',
            name: 'LONGWAVE RADIATION',
          },
        ],
      },
      body: {
        metaid: '1',
        metadataTitle: 'Awesome Metadata #1',
        doi: 'envidat.2192318293',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non nisl condimentum, consequat tellus quis, mollis ex. Nulla a lorem non sapien molestie efficitur. Nam auctor felis id fringilla faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis porttitor odio sed dolor viverra, at efficitur arcu aliquam. Nam facilisis, ipsum sit amet bibendum faucibus, magna dolor pellentesque neque, vel tincidunt metus mi non nisl. Nullam vitae congue nisi, ut accumsan sem. Vivamus vestibulum, lectus ut vehicula dignissim, augue dolor dictum eros, vel congue odio magna et ex. Maecenas luctus vestibulum nisl. Sed laoreet ultricies nulla ut luctus. Nunc et dolor ornare, pretium diam in, tristique dui. Ut lorem mi, finibus non orci sit amet, faucibus pellentesque magna. Nulla vitae gravida neque, vitae facilisis tellus. Vestibulum facilisis elementum augue sed dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam arcu est, interdum sed maximus vel, interdum sit amet mi. Vivamus pellentesque lorem eget ante blandit, in consequat nisi bibendum. Etiam luctus, nibh ut sagittis vulputate, ligula sapien faucibus justo, eu ullamcorper diam lectus sed diam. Morbi cursus congue magna, sed pulvinar leo elementum ut. Nunc arcu turpis, suscipit id mattis ut, semper et est. Aliquam pharetra et diam ut consectetur. Curabitur maximus, ante vitae accumsan consectetur, orci purus vehicula sapien, ac tempor est nulla sed leo. Mauris eu augue hendrerit, placerat risus sit amet, pulvinar diam. Donec non semper neque. Phasellus bibendum libero justo, vel mattis metus ornare sed. Integer in nisl in dui dapibus dapibus pharetra vitae erat. Quisque lacinia ac lorem at dapibus. Cras fringilla commodo risus, sed dapibus lorem ultrices imperdiet. Aliquam erat volutpat. Sed dapibus ligula scelerisque lectus dictum, eget ullamcorper odio faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas molestie magna non felis sagittis, ut imperdiet dolor euismod. Suspendisse quis risus at lorem ornare maximus sit amet quis ligula. Ut odio felis, suscipit nec justo et, tempus molestie nisl. Pellentesque et sapien lacinia, semper mauris ac, consectetur arcu. Curabitur eget orci et enim sollicitudin consectetur. Pellentesque lacinia malesuada imperdiet. Nulla ornare lectus in dapibus scelerisque. Maecenas blandit condimentum purus vel sagittis. In venenatis libero sit amet commodo gravida. Vivamus fringilla, sapien non pulvinar placerat, nisi lacus laoreet odio, a cursus nulla risus at justo. Aliquam erat volutpat. Aenean dictum vehicula eros. Phasellus posuere rutrum posuere. In finibus eu velit id tincidunt. Vivamus vulputate urna quis aliquet faucibus. Aenean vestibulum ligula leo, in tincidunt lorem imperdiet quis. Mauris mi enim, tempor id consequat sit amet, suscipit vel lectus. In risus lectus, mollis vel pretium pretium, maximus venenatis felis. Donec mattis velit quis risus fermentum blandit. Etiam vel porta odio, ut iaculis metus. Aenean pharetra, lorem et accumsan tempus, ex orci dictum neque, ac aliquam leo neque ut nisl. Duis eget tempor dui, vitae bibendum sapien. Pellentesque pharetra magna ac interdum varius. Sed congue bibendum mauris, id eleifend diam sagittis non. Etiam convallis feugiat magna eu lobortis. Donec bibendum. ',
      },
      citation: {
        metaid: '1',
        citationText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non nisl condimentum, consequat tellus quis, mollis ex. Nulla a lorem non sapien molestie efficitur. Nam auctor felis id fringilla faucibus. ',
        citationXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/datacite.xml',
        ciationIsoXmlLink: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/export/iso19139.xml',
      },
      resources: {
        metaid: '1',
        id: '68ae000b-1eff-4468-afe0-fa6b9addc8e1',
        resource_link: 'https://www.envidat.ch/dataset/number-of-natural-hazard-fatalities-per-year-in-switzerland-since-1946/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1',
        download_link: 'https://www.envidat.ch/dataset/17732065-e90f-452d-838d-ba70bfd01a5e/resource/68ae000b-1eff-4468-afe0-fa6b9addc8e1/download/nathaz_fat_wsl_1946-15.csv',
      },
    }),
    components: {
      MetadataHeader,
      MetadataBody,
      MetadataResources,
      MetadataLocation,
      MetadataDetails,
      MetadataCitation,
    },
  };
</script>


