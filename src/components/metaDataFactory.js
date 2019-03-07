
module.exports = {
  createHeader: function createHeader(dataset, breakpoint) {
    let { maintainer } = dataset;

    if (typeof (dataset.maintainer) === 'string') {
      maintainer = JSON.parse(dataset.maintainer);
    }

    let contactEmail = dataset.maintainer_email;
    if (!dataset.maintainer_email && maintainer) {
      contactEmail = maintainer.email ? maintainer.email : '';
    }

    const license = this.createLicense(dataset);

    let authors = null;

    if (typeof (dataset.author) === 'string') {
      authors = JSON.parse(dataset.author);
    }

    return {
      metadataTitle: dataset.title,
      doi: dataset.doi,
      contactName: maintainer ? maintainer.name : '',
      contactEmail,
      license: license.title,
      tags: dataset.tags,
      titleImg: dataset.titleImg,
      maxTags: breakpoint.smAndDown ? 5 : 12,
      authors,
    };
  },
  createBody: function createBody(dataset) {
    return {
      id: dataset.id,
      title: dataset.title,
      doi: dataset.doi,
      description: dataset.notes,
    };
  },
  getAuthorsString: function getAuthorsString(dataset) {
    let authors = '';

    if (dataset.author !== undefined) {
      let { author } = dataset;

      if (typeof (dataset.author) === 'string') {
        author = JSON.parse(dataset.author);
      }

      author.forEach((element) => {
        authors += ` ${element.name};`;
      });

      // cut of the last ';'
      if (authors.length > 1) {
        authors = authors.substring(0, authors.length - 1);
      }
    }

    return authors;
  },
  createCitation: function createCitation(dataset) {
    const authors = this.getAuthorsString(dataset);

    let { publication } = dataset;

    if (typeof (dataset.publication) === 'string') {
      publication = JSON.parse(dataset.publication);
    }

    let text = '';
    if (publication) {
      text = `${authors.trim()} (${publication.publication_year}). ${publication.publisher},`;
    }

    if (dataset.doi) {
      text += ` doi: ${dataset.doi}`;
    }

    return {
      id: dataset.id,
      citationText: text,
      citationXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/datacite.xml`,
      ciationIsoXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/iso19139.xml`,
      ciationGCMDXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/gcmd_dif.xml`,
    };
  },
  createResources: function createResources(dataset) {
    const resources = [];

    if (dataset.resources) {
      dataset.resources.forEach((element) => {
        const res = {
          // "hash": "",
          description: element.description,
          // "cache_last_updated": null,
          metadataId: element.package_id,
          // "mimetype_inner": null,
          // url_type: "upload",
          id: element.id,
          size: element.size,
          mimetype: element.mimetype,
          cacheUrl: element.cache_url,
          doi: element.doi,
          name: element.name,
          url: element.url,
          restricted: element.restricted,
          format: element.format,
          state: element.state,
          created: element.created,
          lastModified: element.last_modified,
          position: element.position,
          revisionId: element.revision_id,
        };

        resources.push(res);
      });
    }

    return {
      metadataId: dataset.id,
      metadataTitle: dataset.title,
      doi: dataset.doi,
      resources,
    };
  },
  createDetails: function createDetails(dataset) {
    const details = [];

    details.push({ label: 'Title', text: dataset.title });

    const authors = this.getAuthorsString(dataset);
    details.push({ label: 'Authors', text: authors });

    // TODO DataCRedit

    details.push({ label: 'DOI', text: dataset.doi, url: `https://doi.org/${dataset.doi}` });
    details.push({ label: 'Created', text: dataset.created });
    details.push({ label: 'Last Modified', text: dataset.last_modified });

    const license = this.createLicense(dataset);
    details.push({ label: 'License', text: license.title, url: license.url });

    details.push({ label: 'MetadataId', text: dataset.id });


    return details;
  },
  createLicense: function createLicense(dataset) {
    const license = {};

    license.id = dataset.license_id;
    license.title = dataset.license_title;
    license.url = dataset.license_url;

    return license;
  },
  createLocation: function createLocation(dataset) {
    const location = {};
    location.id = dataset.id;
    location.name = dataset.name;
    location.title = dataset.title;

    if (dataset && dataset.spatial) {
      location.geoJSON = dataset.spatial;

      // parseJSON because the geoJOSN from CKAN might be invalid!
      const spatialJSON = JSON.parse(dataset.spatial);

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

    return location;
  },
};
