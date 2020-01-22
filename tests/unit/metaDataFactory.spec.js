import {
    createHeader,
  } from '@/factories/metaDataFactory';
  
import packagelist from '@/testdata/packagelist';

// const metadatasContent = {};
// packagelist.result.forEach((entry) => {
//   metadatasContent[entry.id] = entry;
// });

describe('metaDataFactory - createHeader', () => {

  it('empty', () => {
    const header = createHeader(undefined);
    expect(header).toBeUndefined();
  });

  it('with dataset', () => {
    const header = createHeader(packagelist.result[2]);
    expect(header).toBeDefined();

    expect(header.metadataTitle).toBeDefined();
    expect(header.doi).toBeDefined();
    expect(header.contactName).toBeDefined();
    expect(header.contactEmail).toBeDefined();
    expect(header.license).toBeDefined();
    expect(header.tags).toBeDefined();
    expect(header.titleImg).toBeDefined();
    expect(header.maxTags).toBeDefined();
    expect(header.authors).toBeDefined();
  });

});
