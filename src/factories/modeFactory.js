/**
 * function factory for methods for a specific mode.
 * Starting with a function which provides the mode specific function.
 *
 * @summary function factory for mode methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-10-31 15:38:05
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
*/

import { SWISSFL_MODE } from '@/store/metadataMutationsConsts';
import {
  swissFLTag,
  swissFLExtraTags,
} from '@/store/modules/metadata/swissForestLabTags';

import globalMethods from '@/factories/globalMethods';

const swissflLogo = getSwissflLogo();
const swissflIcons = getSwissflIcons();

const swissflMode = {
  title: 'Swiss Forest Lab',
  externalUrl: 'https://www.wsl.ch/de/wald/waldentwicklung-und-monitoring/swissforestlab.html',
  mainTag: swissFLTag,
  extraTags: swissFLExtraTags,
  logo: swissflLogo,
  icons: swissflIcons,
}

export function getModeData(mode) {
  switch (mode) {
    case SWISSFL_MODE:
      return swissflMode;
    default:
      throw new Error(`Not Mode Objection for mode: "${mode}" implemented`);
  }
}

export function getTagsMergedWithExtras(mode, tags) {
  if (!mode) return null;

  try {
    const modeObj = getModeData(mode);
    return mergedExtraTags(modeObj, tags);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function mergedExtraTags(modeObj, tags) {
  const mergedTags = [...tags, ...modeObj.extraTags];
  const uniqueArrayOfTags = mergedTags.filter((item, pos, self) => self.findIndex(v => v.name === item.name) === pos);
  return uniqueArrayOfTags;
}


export function getSelectedTagsMergedWithHidden(mode, selectedTagNames) {
  if (!mode) return null;

  try {
    const modeObj = getModeData(mode);
    return mergedHiddenFilters(modeObj, selectedTagNames);
  } catch (e) {
    console.error(e);
    return null;
  }
}

function mergedHiddenFilters(modeObj, selectedTagNames) {
  const secretTags = [...selectedTagNames];

  if (!selectedTagNames.includes(modeObj.mainTag.name)) {
    secretTags.push(modeObj.mainTag.name);
  }

  return secretTags;
}

export function getModeTitle(mode) {
  if (!mode) return null;

  try {
    const modeObj = getModeData(mode);
    return modeObj.title;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function getSwissflLogo() {
  const swissflImages = require.context('@/assets/modes/swissfl', false, /\.jpg$/);
  const imgLogo = globalMethods.methods.mixinMethods_importImages(swissflImages, 'logo');
  return imgLogo['./logo.jpg'];  
}

function getSwissflIcons() {
  const swissflPngs = require.context('@/assets/modes/swissfl', false, /\.png$/);
  const iconImgs = globalMethods.methods.mixinMethods_importImages(swissflPngs);
  const swissflIcons = Object.values(iconImgs);
  const swissflIconMap = {
    dataset: swissflIcons[0],
    infrastructure: swissflIcons[1],
    model: swissflIcons[2],
  };

  return swissflIconMap;
}