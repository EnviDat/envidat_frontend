import {
  createHeader,
  createBody,
  createFunding,
  createCitation,
} from '@/factories/metaDataFactory';

import packagelist from '@/testdata/packagelist';
import { createResource } from '../../src/factories/metaDataFactory';

// const metadatasContent = {};
// packagelist.result.forEach((entry) => {
//   metadatasContent[entry.id] = entry;
// });

describe('metaDataFactory - createHeader', () => {
  it('empty', () => {
    const header = createHeader(undefined);
    expect(header).toBeNull();
  });

  it('with dataset', () => {
    const dataset = packagelist.result[2];

    const header = createHeader(dataset);

    expect(header).toBeDefined();
    expect(header.metadataTitle).toBeDefined();
    expect(header.doi).toBeDefined();
    expect(header.contactName).toBeDefined();
    expect(header.contactEmail).toBeDefined();
    expect(header.license).toBeDefined();
    expect(header.tags).toBeDefined();
    expect(header.titleImg).toBe(dataset.titleImg);
    expect(header.maxTags).toBeDefined();
    expect(header.authors).toBeDefined();
  });
});

describe('metaDataFactory - createBody', () => {
  it('empty', () => {
    const body = createBody(undefined);
    expect(body).toBeNull();
  });

  it('with dataset', () => {
    const dataset = packagelist.result[3];

    const body = createBody(dataset);

    expect(body).toBeDefined();
    expect(body.title).toBeDefined();
    expect(body.text).toBeDefined();
    expect(body.maxTextLength).toBeDefined();
    expect(body.emptyText).toBeDefined();
  });
});

describe('metaDataFactory - createFunding', () => {
  it('empty', () => {
    const funding = createFunding(undefined);
    expect(funding).toBeNull();
  });

  it('with dataset', () => {
    const dataset = packagelist.result[3];

    const funding = createFunding(dataset);

    expect(funding).toBeDefined();
    expect(typeof funding).toBe('object');
  });
});

describe('metaDataFactory - createCitation', () => {
  it('empty', () => {
    const citation = createCitation(undefined);
    expect(citation).toBeNull();
  });

  it('with dataset', () => {
    const dataset = packagelist.result[4];

    const citation = createCitation(dataset);

    expect(citation).toBeDefined();
    expect(citation.id).toBeDefined();
    expect(citation.citationText).toBeDefined();

    expect(citation.citationXmlLink).toBeDefined();
    expect(citation.citationIsoXmlLink).toBeDefined();
    expect(citation.citationGCMDXmlLink).toBeDefined();

    expect(citation.citationBibtexXmlLink).toBeDefined();
    expect(citation.citationBibtexXmlLink.includes('.bib')).toBeTruthy();

    expect(citation.citationRisXmlLink).toBeDefined();
    expect(citation.citationRisXmlLink.includes('.ris')).toBeTruthy();
  });
});

describe('metaDataFactory - createResource', () => {
  it('empty', () => {
    const res = createResource(undefined);
    expect(res).toBeNull();
  });

  it('with dataset', () => {
    const dataset = packagelist.result[4];

    const res = createResource(dataset);

    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.size).toBeDefined();

    expect(res.mimetype).toBeDefined();
    expect(res.cacheUrl).toBeDefined();
    expect(res.doi).toBeDefined();

    expect(res.name).toBeDefined();
    expect(res.url).toBeDefined();

    expect(res.url).toBeDefined();
    expect(res.restricted).toBeDefined();
    expect(res.format).toBeDefined();
    expect(res.state).toBeDefined();

    expect(res.created).toBeDefined();
    expect(res.lastModified).toBeDefined();

    expect(res.position).toBeDefined();
    expect(res.revisionId).toBeDefined();
    expect(res.isProtected).toBeDefined();
  });
});
