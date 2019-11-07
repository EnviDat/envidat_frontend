/**
 * function factory for filtering methods by parsing
 * the json from the backend.
 *
 * @summary function factory for filtering methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-11-07 16:10:01
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export function tagsIncludedInSelectedTags(tags, selectedTagNames) {
  let selectedTagFound = 0;

  for (let j = 0; j < selectedTagNames.length; j++) {
    const el = selectedTagNames[j];

    for (let k = 0; k < tags.length; k++) {
      const tag = tags[k];

      if (tag.name.includes(el)) {
        selectedTagFound++;
        break;
      }
    }
  }

  return selectedTagFound === selectedTagNames.length;
}

export function getPopularTags(tags, minimalCount = 5) {
  const tagMap = new Map();

  for (let j = 0; j < tags.length; j++) {
    const tag = tags[j];

    if (tagMap.has(tag.name)) {
      tagMap.set(tag.name, tagMap.get(tag.name) + 1);
    } else {
      tagMap.set(tag.name, 1);
    }

  }

  const tagNames = Objects.keys(tagMap);
  const tagCounts = Object.values(tagMap);

  for (let i = 0; i < tagNames.length; i++) {
    const name = tagNames[i];

    if (tagCounts[name] < minimalCount) {
      tagMap.delete(name);
    }
  }

  Array.sort(tagNames, (a, b) => {
    const countA = tagCounts[tagNames.findIndex(a)];
    const countB = tagCounts[tagNames.findIndex(b)];
    return countA > countB;
  })

  return tagNames;
}