<template>
  <v-container fluid >

    <metadata-header> </metadata-header>

    <metadata-body> </metadata-body>

  </v-container>
</template>

<script>  
  import MetadataHeader from "../Views/MetadataHeader.vue";
  import MetadataBody from "../Views/MetadataBody.vue";

  export default {
    data: () => ({
      Header: {
        title: "Awesome Metadata #1",
        contactName: 'Dr. Muster Mann',
        contactEmail: 'mustermann@wsl.ch',
        doi: 'envidat.2192318293',
        citation: 'somecitation',
      }
    }),
    components: {
      MetadataHeader,
      MetadataBody,
    }
  }
</script>


