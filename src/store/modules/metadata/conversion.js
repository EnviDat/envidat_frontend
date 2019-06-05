
export function solrResultToCKANJSON(solorJSON) {
  const ckanStructure = {};

  ckanStructure.id = solorJSON.id;
  ckanStructure.name = solorJSON.name;
  ckanStructure.maintainer = solorJSON.maintainer;

  ckanStructure.metadata_created = solorJSON.metadata_created;
  ckanStructure.license_id = solorJSON.license_id;

  let dataDict = null;
  try {
    dataDict = JSON.parse(solorJSON.validated_data_dict);
  } catch (error) {
    // console.log("error validated_data_dict " + error);
  }

  if (dataDict) {
    ckanStructure.owner_org = dataDict.owner_org;
    ckanStructure.relationships_as_object = dataDict.relationships_as_object;
    ckanStructure.private = dataDict.private;
    ckanStructure.publication = dataDict.publication;
    // TODO decode publication?

    ckanStructure.metadata_modified = dataDict.metadata_modified;
    ckanStructure.author = dataDict.author;
    // TODO decode author?
    ckanStructure.author_email = dataDict.author_email;
    ckanStructure.isopen = dataDict.isopen;
    ckanStructure.state = dataDict.state;
    ckanStructure.version = dataDict.version;

    ckanStructure.spatial = dataDict.spatial;
    // TODO decode spatial?
    ckanStructure.spatial_info = dataDict.spatial_info;
    ckanStructure.type = dataDict.type;

    ckanStructure.num_resources = dataDict.num_resources;
    ckanStructure.resources = dataDict.resources;
    // TODO decode resources.restricted
    ckanStructure.num_tags = dataDict.num_tags;
    ckanStructure.tags = dataDict.tags;

    ckanStructure.title = dataDict.title;
    ckanStructure.subtitle = dataDict.subtitle;

    ckanStructure.groups = dataDict.groups;
    ckanStructure.creator_user_id = dataDict.creator_user_id;
    ckanStructure.date = dataDict.date;
    // TODO decode date?

    ckanStructure.resource_type_general = dataDict.resource_type_general;
    ckanStructure.relationships_as_subject = dataDict.relationships_as_subject;

    ckanStructure.doi = dataDict.doi;
    ckanStructure.language = dataDict.language;
    ckanStructure.url = dataDict.url;

    ckanStructure.notes = dataDict.notes;
    ckanStructure.license_title = dataDict.license_title;
    ckanStructure.license_url = dataDict.license_url;
    ckanStructure.organization = dataDict.organization;
    // TODO decode organization?

    ckanStructure.revision_id = dataDict.revision_id;
    ckanStructure.resource_type = dataDict.resource_type;
  }

  return ckanStructure;
}
