/**
 * function factory for metadata object creation methods by parsing
 * the json from the backend.
 *
 * @summary function factory for metadata object creation methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-11-01 14:29:51
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import globalMethods from '@/factories/globalMethods';

export default {
  createHeader(dataset, smallScreen) {
    if (!dataset) {
      return null;
    }

    let { maintainer } = dataset;

    if (typeof dataset.maintainer === 'string') {
      maintainer = JSON.parse(dataset.maintainer);
    }

    let contactEmail = dataset.maintainer_email;
    if (!dataset.maintainer_email && maintainer) {
      contactEmail = maintainer.email ? maintainer.email : '';
    }

    const license = this.createLicense(dataset);

    let authors = null;

    if (typeof dataset.author === 'string') {
      authors = JSON.parse(dataset.author);
    }

    return {
      metadataTitle: dataset.title,
      doi: dataset.doi,
      contactName: maintainer ? this.getAuthorName(maintainer) : '',
      contactEmail,
      license: license.title,
      tags: dataset.tags,
      titleImg: dataset.titleImg,
      maxTags: smallScreen ? 5 : 12,
      authors,
    };
  },
  createBody(dataset) {
    if (!dataset) {
      return null;
    }

    return {
      id: dataset.id,
      title: dataset.title,
      doi: dataset.doi,
      description: dataset.notes,
    };
  },
  getAuthorName(author){
    return `${author.given_name} ${author.name}`;
  },
  getAuthorsString(dataset) {
    if (!dataset) {
      return null;
    }

    let authors = '';

    if (dataset.author !== undefined) {
      let { author } = dataset;

      if (typeof dataset.author === 'string') {
        author = JSON.parse(dataset.author);
      }

      author.forEach((element) => {
        authors += ` ${ this.getAuthorName(element) };`;
      });

      // cut of the last ';'
      if (authors.length > 1) {
        authors = authors.substring(0, authors.length - 1);
      }
    }

    return authors.trim();
  },
  createCitation(dataset) {
    if (!dataset) {
      return null;
    }

    const authors = this.getAuthorsString(dataset);

    let { publication } = dataset;

    if (typeof dataset.publication === 'string') {
      publication = JSON.parse(dataset.publication);
    }

    let text = `${authors.trim()} `;

    if (publication && publication.publication_year) {
      text += `(${publication.publication_year}). `;
    }

    text += `${dataset.title}. `;

    if (publication && publication.publisher) {
      text += ` ${publication.publisher}. `;
    }

    if (dataset.doi) {
      text += ` doi: ${dataset.doi}. `;
    }

    return {
      id: dataset.id,
      citationText: text,
      citationXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/datacite.xml`,
      citationIsoXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/iso19139.xml`,
      citationGCMDXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/gcmd_dif.xml`,
      citationBibtexXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/bibtex.bib`,
      citationRisXmlLink: `https://www.envidat.ch/dataset/${dataset.name}/export/ris.ris`,
    };
  },
  createResources(dataset) {
    if (!dataset) {
      return null;
    }

    const resources = [];

    let { maintainer } = dataset;

    if (typeof (dataset.maintainer) === 'string') {
      maintainer = JSON.parse(dataset.maintainer);
    }

    let contactEmail = dataset.maintainer_email;
    if (!dataset.maintainer_email && maintainer) {
      contactEmail = maintainer.email ? maintainer.email : '';
    }

    if (dataset.resources) {
      dataset.resources.forEach((element) => {
        let isProtected = false;
        let restrictedUsers;
        let restrictedObj = false;

        if (typeof element.restricted === 'string') {
          try {
            restrictedObj = JSON.parse(element.restricted);
            isProtected = restrictedObj.level !== 'public';
            restrictedUsers = restrictedObj.allowed_users !== '';
            // "{"allowed_users": "", "level": "public", "shared_secret": ""}"
          } catch (err) {
            isProtected = !element.restricted.includes('public');
          }
        }

        let resURL = element.url;

        if (isProtected || (typeof restrictedUsers === 'boolean' && restrictedUsers === true)) {
          const splits = element.url.split('resource');
          if (splits && splits.length > 0) {
            resURL = splits[0];
          } else {
            resURL = '';
          }
        }

        let { format } = element;
        format = format.replace('.', '').toLowerCase();

        const created = globalMethods.methods.mixinMethods_formatDate(element.created);
        const modified = globalMethods.methods.mixinMethods_formatDate(element.last_modified);

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
          url: resURL,
          restricted: element.restricted,
          format,
          state: element.state,
          created,
          lastModified: modified,
          position: element.position,
          revisionId: element.revision_id,
          isProtected,
          metadataContact: contactEmail,
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
  createDetails(dataset) {
    if (!dataset) {
      return null;
    }

    const details = [];

    details.push({ label: 'Title', text: dataset.title });

    const authors = this.getAuthorsString(dataset);
    details.push({ label: 'Authors', text: authors });

    // TODO DataCRedit

    details.push({ label: 'DOI', text: dataset.doi, url: `https://doi.org/${dataset.doi}` });

    
    const created = globalMethods.methods.mixinMethods_formatDate(dataset.metadata_created);
    details.push({ label: 'Created', text: created });

    const modified = globalMethods.methods.mixinMethods_formatDate(dataset.metadata_modified);
    details.push({ label: 'Last Modified', text: modified });

    const license = this.createLicense(dataset);
    details.push({ label: 'License', text: license.title, url: license.url });

    details.push({ label: 'MetadataId', text: dataset.id });

    if (dataset.swissFL_type) {
      details.push({ label: 'swissFL_type', text: dataset.swissFL_type });
    }

    return details;
  },
  createLicense(dataset) {
    if (!dataset) {
      return null;
    }

    const license = {};

    license.id = dataset.license_id;
    license.title = dataset.license_title;
    license.url = dataset.license_url;

    return license;
  },
  createLocation(dataset) {
    if (!dataset) {
      return null;
    }

    if (typeof dataset.location === 'object') {
      return dataset.location;
    }

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
  convertTags(tagsStringArray, tagsEnabled) {
    const tagObjs = [];

    tagsStringArray.forEach((element) => {
      tagObjs.push({ name: element, enabled: tagsEnabled });
    });

    return tagObjs;
  },
};
