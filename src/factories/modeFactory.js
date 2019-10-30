/**
 * function factory for methods for a specific mode.
 * Starting with a function which provides the mode specific function.
 *
 * @summary function factory for mode methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-10-30 16:32:56
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import { SWISSFL_MODE } from '@/store/metadataMutationsConsts';
import {
  swissFLTag,
  swissFLExtraTags,
} from '@/store/modules/metadata/swissForestLabTags';

export function getAdditionalTagsFunction(mode) {
  if (!mode) return null;

  switch (mode) {
    case SWISSFL_MODE:
      return getAdditionalTags_SWISSFL;
  
    default:
      throw new Error('Not functions for mode: "' + mode + '" implemented');
      break;
  }
}

function getAdditionalTags_SWISSFL(tags) {
  const mergedTags = [...tags, ...swissFLExtraTags];
  const uniqueArrayOfTags = mergedTags.filter((item, pos, self) => self.findIndex(v => v.name === item.name) === pos);
  return uniqueArrayOfTags;
}


export function getHiddenFiltersFunction(mode) {
  if (!mode) return null;

  switch (mode) {
    case SWISSFL_MODE:
      return getHiddenFilters_SWISSFL;
  
    default:
      throw new Error('Not functions for mode: "' + mode + '" implemented');
      break;
  }

}

function getHiddenFilters_SWISSFL(selectedTagNames){
  const secretTags = [...selectedTagNames];

  if (!selectedTagNames.includes(swissFLTag.name)) {
    secretTags.push(swissFLTag.name);
  }
  return secretTags;
}


