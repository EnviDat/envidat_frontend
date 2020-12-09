import {
  renderMarkdown,
  stripMarkdown,
} from '@/factories/stringFactory';

const markdownString = `It's been a while since the last EnviDat release, we had a bit a different focus for a while.
Because we have released an other app: the S3 Browser which provides access to large datasets on [EnviCloud](https://envicloud.wsl.ch/)
(It's also an open source project available: https://github.com/EnviDat/S3_Browsing)

### Major Features
**Read-Only Mode**
EnviDat can now run on in a read-only mode, which allows users to explore the metadata and all the other information about Envidat when the servers are in maintenance for example. An info banner is shown to indicate that any connection to the server is currently not possible.

**Tidied up the Navigation**
The About Page includes now the Policies, Guidelines and DMP Templates that's why the navigation has become smaller.
Directly access to [Guidelines](https://www.envidat.ch/beta/#/about/guidelines) is still possible, also for the [Policies](https://www.envidat.ch/beta/#/about/policies) and for the [Data Management Plan](https://www.envidat.ch/beta/#/about/dmp)
`;

const paragraphTag = '<p';
const hrTag = '<h3';
const aTag = '<a';

describe('stringFactory - renderMarkdown', () => {

  it('renderMarkdown - empty', () => {

    const emptyOutput = renderMarkdown();
    expect(emptyOutput).toBe('');
  });

  it('renderMarkdown - markdown input with url link', () => {

    const markOut = renderMarkdown(markdownString);
    expect(markOut).toBeDefined();
    expect(markOut).not.toBe('');
    expect(markOut.includes(paragraphTag)).toBeTruthy();
    expect(markOut.includes(hrTag)).toBeTruthy();
    expect(markOut.includes(aTag)).toBeTruthy();
  });
  
});

describe('stringFactory - stripMarkdown', () => {

  it('stripMarkdown - empty', () => {

    const emptyOutput = stripMarkdown();
    expect(emptyOutput).toBe('');
  });

  it('stripMarkdown - markdown input with url link', () => {

    const markOut = stripMarkdown(markdownString);
    expect(markOut).toBeDefined();
    expect(markOut).not.toBe('');
    expect(markOut.includes('**')).toBeFalsy();
    expect(markOut.includes('###')).toBeFalsy();
    expect(markOut.includes('[EnviCloud]')).toBeFalsy();
  });

  it('stripMarkdown - markdown input and strip html', () => {

    const stripHtmlTags = true;
    const markOut = stripMarkdown(markdownString, stripHtmlTags);
    expect(markOut).toBeDefined();
    expect(markOut).not.toBe('');
    expect(markOut.includes(paragraphTag)).toBeFalsy();
    expect(markOut.includes(hrTag)).toBeFalsy();
    expect(markOut.includes(aTag)).toBeFalsy();
  });

});
