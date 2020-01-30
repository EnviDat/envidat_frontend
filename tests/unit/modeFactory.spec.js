import {
  getModeData,
  getTagsMergedWithExtras,
  enhanceMetadataFromExtras,
} from '../../src/factories/modeFactory';

import { SWISSFL_MODE } from '../../src/store/metadataMutationsConsts';

describe('modeFactory - getModeData', () => {
  it('empty', () => {

    try {
      getModeData(undefined);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('with SwissFL mode', () => {

    const mode = getModeData(SWISSFL_MODE);

    expect(mode).toBeDefined();
    expect(mode.name).toBe(SWISSFL_MODE);
  });
});

describe('modeFactory - getTagsMergedWithExtras', () => {
  it('empty', () => {
    const mergedTags = getTagsMergedWithExtras(undefined, undefined);

    expect(mergedTags).toBeNull();
  });

  it('with SwissFL mode with empty tags', () => {

    const tags = [];
    const mergedTags = getTagsMergedWithExtras(SWISSFL_MODE, tags);

    expect(mergedTags).toBeDefined();
    expect(mergedTags).toBeInstanceOf(Array);
    expect(mergedTags.length).toBeLessThanOrEqual(0);
  });

  // it('with SwissFL mode with tags', () => {

  //   const tags = [];
  //   const mergedTags = getTagsMergedWithExtras(SWISSFL_MODE, tags);

  //   expect(mergedTags).toBeDefined();
  //   expect(mergedTags).toBeInstanceOf(Array);
  //   expect(mergedTags.length).toBeLessThanOrEqual(0);
  // });
});

describe('modeFactory - enhanceMetadataFromExtras', () => {
  it('empty', () => {
    const enhancedMetadata = enhanceMetadataFromExtras(undefined, undefined);

    expect(enhancedMetadata).toBeNull();
  });

  it('with SwissFL mode', () => {
    const metdataEntry = {};

    const enhancedMetadata = enhanceMetadataFromExtras(SWISSFL_MODE, metdataEntry);

    expect(enhancedMetadata).toBeDefined();
    expect(enhancedMetadata.extras).toBeDefined();
    expect(enhancedMetadata.extras).toBeInstanceOf(Array);
  });
});
