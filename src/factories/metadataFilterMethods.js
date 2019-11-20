/**
 * function factory for filtering methods by parsing
 * the json from the backend.
 *
 * @summary function factory for filtering methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-11-20 16:03:04
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export function tagsIncludedInSelectedTags(tags, selectedTagNames) {
  if (!tags || !selectedTagNames) return false;

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