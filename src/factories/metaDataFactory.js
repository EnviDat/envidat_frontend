/**
 * function factory for metadata object creation methods by parsing
 * the json from the backend.
 *
 * @summary function factory for metadata object creation methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-11-29 15:52:06
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

import seedrandom from 'seedrandom';

import {
  FOREST,
  SNOW,
  LAND,
  HAZARD,
  DIVERSITY,
  METEO,
} from '@/store/categoriesConsts';


/**
 * Create a psyeudo random integer based on a given seed using the 'seedrandom' lib.
 *
 * @param {Number} min
 * @param {Number} max
 * @param {String} seed
 */
export function randomInt(min, max, seed = 'For the Horde!') {
  const rng = seedrandom(seed);
  const r = Math.floor(rng() * 10);

  if (r > max) {
    return max;
  }
  if (r < min) {
    return min;
  }

  return r;
}

/**
 * @param {Array} tags
 *
 * @return {String} category based on tags array
 */
export function guessTagCategory(tags) {
  let category = LAND;

  if (tags) {
    for (let i = 0; i < tags.length; i++) {
      const element = tags[i];

      if (element.name) {
        if (element.name.includes('HAZARD') || element.name.includes('ACCIDENTS')) {
          category = HAZARD; break;
        }
        if (element.name.includes('DIVERSITY')) {
          category = DIVERSITY; break;
        }
        if (element.name.includes('FOREST')) {
          category = FOREST; break;
        }
        if (element.name.includes('SNOW') || element.name.includes('AVALANCHE')) {
          category = SNOW; break;
        }
        if (element.name.includes('METEO') || element.name.includes('CLIMATE')) {
          category = METEO; break;
        }
        if (element.name.includes('LAND') || element.name.includes('LANDSCAPE')) {
          category = LAND; break;
        }
      }
    }
  }

  return category;
}

/**
 * @param {String} date expecting a format like 2017-08-15T15:25:45.175790
 * @return {String} Returns a date string containing the date and hours:minutes:seconds
 */
export function formateDate(date) {
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
}

export function getAuthorName(author) {
  return `${author.given_name ? author.given_name : ''} ${author.name ? author.name : ''}`.trim();
}

export function getAuthorsString(dataset) {
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
      authors += ` ${getAuthorName(element)};`;
    });

    // cut of the last ';'
    if (authors.length > 1) {
      authors = authors.substring(0, authors.length - 1);
    }
  }

  return authors.trim();
}

export function createLicense(dataset) {
  if (!dataset) {
    return null;
  }

  const license = {};

  license.id = dataset.license_id;
  license.title = dataset.license_title;
  license.url = dataset.license_url;

  return license;
}

export function createHeader(dataset, smallScreen) {
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

  const license = createLicense(dataset);

  let authors = null;

  if (typeof dataset.author === 'string') {
    authors = JSON.parse(dataset.author);
  }

  return {
    metadataTitle: dataset.title,
    doi: dataset.doi,
    contactName: maintainer ? getAuthorName(maintainer) : '',
    contactEmail,
    license: license.title,
    tags: dataset.tags,
    titleImg: dataset.titleImg,
    maxTags: smallScreen ? 5 : 12,
    authors,
  };
}

export function createBody(dataset) {
  if (!dataset) {
    return null;
  }

  return {
    // id: dataset.id,
    title: 'Description',
    // doi: dataset.doi,
    text: dataset.notes,
    maxTextLength: 1000,
    emptyText: 'No description found for this dataset.',
  };
}

export function createPublications(dataset) {
  if (!dataset) {
    return null;
  }

  return {
    text: dataset.related_publications,
    title: 'Related Publications',
    maxTextLength: 500,
    emptyTextColor: 'black',
    emptyText: 'No related publications available for this dataset.',
  };
}

export function createFunding(dataset) {
  if (!dataset) {
    return null;
  }

  if (typeof dataset.funding === 'string') {
    try {
      const funding = JSON.parse(dataset.funding);
      return funding;
    } catch (e) {
      console.log("Error JSON Parse of Funding: " + e);
    }
  }

  return dataset.funding;
  // return {
  //   text: dataset.funding_information,
  //   title: 'Funding Information',
  //   maxTextLength: 500,
  //   emptyTextColor: 'black',
  //   emptyText: 'No information about funding found for this dataset.',
  // };
}

export function createCitation(dataset) {
  if (!dataset) {
    return null;
  }

  const authors = getAuthorsString(dataset);

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
}

export function createResource(dataset) {
  if (!dataset) {
    return null;
  }

  let isProtected = false;
  let restrictedUsers;
  let restrictedObj = false;

  if (dataset.restricted
    && typeof dataset.restricted === 'string'
    && dataset.restricted.length > 0) {

    try {
      restrictedObj = JSON.parse(dataset.restricted);
      isProtected = restrictedObj.level !== 'public';
      restrictedUsers = restrictedObj.allowed_users !== '';
      // "{"allowed_users": "", "level": "public", "shared_secret": ""}"
    } catch (err) {
      isProtected = !dataset.restricted.includes('public');
    }
  }

  let resURL = dataset.url;

  if (isProtected || (typeof restrictedUsers === 'boolean' && restrictedUsers === true)) {
    const splits = dataset.url.split('resource');
    if (splits && splits.length > 0) {
      resURL = splits[0];
    } else {
      resURL = '';
    }
  }

  let format = dataset.format ? dataset.format : '';
  format = format.replace('.', '').toLowerCase();

  const created = formateDate(dataset.created);
  const modified = formateDate(dataset.last_modified);

  return {
    // "hash": "",
    description: dataset.description,
    // "cache_last_updated": null,
    metadataId: dataset.package_id,
    // "mimetype_inner": null,
    // url_type: "upload",
    id: dataset.id,
    size: dataset.size ? dataset.size : '',
    mimetype: dataset.mimetype ? dataset.mimetype : '',
    cacheUrl: dataset.cache_url ? dataset.cache_url : '',
    doi: dataset.doi,
    name: dataset.name,
    url: resURL,
    restricted: dataset.restricted ? dataset.restricted : '',
    format,
    state: dataset.state ? dataset.state : '',
    created,
    lastModified: modified,
    position: dataset.position ? dataset.position : '',
    revisionId: dataset.revision_id ? dataset.revision_id : '',
    isProtected,
  };

}

export function createResources(dataset) {
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

      const res = createResource(element);
      res.metadataContact = contactEmail;

      resources.push(res);
    });
  }

  return {
    metadataId: dataset.id,
    metadataTitle: dataset.title,
    doi: dataset.doi,
    resources,
  };
}

export function createDetails(dataset) {
  if (!dataset) {
    return null;
  }

  const details = [];

  details.push({ label: 'Title', text: dataset.title });

  const authors = getAuthorsString(dataset);
  details.push({ label: 'Authors', text: authors });

  // TODO DataCRedit

  details.push({ label: 'DOI', text: dataset.doi, url: `https://doi.org/${dataset.doi}` });


  const created = formateDate(dataset.metadata_created);
  details.push({ label: 'Created', text: created });

  const modified = formateDate(dataset.metadata_modified);
  details.push({ label: 'Last Modified', text: modified });

  const license = createLicense(dataset);
  details.push({ label: 'License', text: license.title, url: license.url });

  details.push({ label: 'MetadataId', text: dataset.id });

  if (dataset.swissFL_type) {
    details.push({ label: 'swissFL_type', text: dataset.swissFL_type });
  }

  return details;
}


export function createLocation(dataset) {
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

  if (dataset.spatial) {
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
}

export function convertTags(tagsStringArray, tagsEnabled) {
  const tagObjs = [];

  tagsStringArray.forEach((element) => {
    tagObjs.push({ name: element, enabled: tagsEnabled });
  });

  return tagObjs;
}

export function getCategoryColor(categoryCards, categoryName) {
  for (let i = 0; i < categoryCards.length; i++) {
    const cat = categoryCards[i];
    if (cat.type === categoryName) {
      return cat.color;
    }
  }

  return null;
}


export function getTagColor(categoryCards, tagName) {
  if (!tagName) {
    return '';
  }

  for (let i = 0; i < categoryCards.length; i++) {
    const cat = categoryCards[i];
    if (tagName.toLowerCase().includes(cat.type)) {
      return cat.darkColor;
    }
  }

  return '#e0e0e0';
}

export function enhanceTags(dataset, categoryCards) {

  if (dataset && dataset.tags && dataset.tags instanceof Array) {
    for (let j = 0; j < dataset.tags.length; j++) {
      const tag = dataset.tags[j];
      tag.color = getTagColor(categoryCards, tag.name);
    }
  }

  return dataset;
}

/**
 * @param {Object} metadata
 * @param {Array} cardBGImages
 *
 * @return {Object} metadata entry enhanced with a title image based on its tags
 */
export function enhanceTitleImg(metadata, cardBGImages, categoryCards) {
  /* eslint-disable no-param-reassign */
  const category = guessTagCategory(metadata.tags);

  if (cardBGImages) {
    const categoryImgs = cardBGImages[category];
    const max = Object.keys(categoryImgs).length - 1;
    const randomIndex = randomInt(0, max, metadata.title);
    const cardImg = randomIndex >= 0 ? Object.values(categoryImgs)[randomIndex] : 0;

    metadata.titleImg = cardImg;
  }

  metadata.categoryColor = getCategoryColor(categoryCards, category);

  return metadata;
}

/**
 * @param {Object} metadataEntry
 * @param {Array} cardBGImages
 *
 * @return {Object} metadataEntry enhanced with a title image based on the entrys tags
 */
export function enhanceMetadataEntry(metadataEntry, cardBGImages, categoryCards) {
  if (metadataEntry && !metadataEntry.titleImg) {
    enhanceTitleImg(metadataEntry, cardBGImages, categoryCards);
  }

  return metadataEntry;
}

/**
 * @param {Array} metadatas
 * @param {Array} cardBGImages
 *
 * @return {Array} metadatas enhanced with a title image based on the metadatas tags
 */
export function enhanceMetadatas(metadatas, cardBGImages, categoryCards) {
  if (metadatas === undefined || metadatas.length <= 0) {
    return undefined;
  }

  if (Array.isArray(metadatas)) {
    for (let i = 0; i < metadatas.length; i++) {
      const el = metadatas[i];

      if (!el.titleImg) {
        metadatas[i] = enhanceTitleImg(el, cardBGImages, categoryCards);
      }
    }
  }

  return metadatas;
}
