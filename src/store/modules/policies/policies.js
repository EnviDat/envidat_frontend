import actions from '@/store/modules/policies/policiesActions';
import mutations from '@/store/modules/policies/policiesMutations';

const policiesState = {
  policiesPageBackRoute: '',
  policiesTitle: 'EnviDat General Policies v. 1.0',
  policiesInfo: null,
  // use markdown syntax to style the text: https://markdown-it.github.io/
  /*
  policiesInfo: [
    '# EnviDat General Policies v. 1.0',
    '### Preamble',
    'The EnviDat policies are subject to change by EnviDat at any time and without notice, other than through posting the updated policies on the www.envidat.ch website. For any questions, please contact EnviDat support at envidat-support@wsl.ch.',
    '## EnviDat Privacy Policy',
    `**For information collected from users.**
\n\n* EnviDat does not track, collect or retain personal information from users, except as otherwise provided herein. 
    * Depositors gain access with a passwordless login procedure, which ensures that there is no need to store user passwords. 
    * Non-personal information such as IP addresses and cookies may be tracked and retained in order to monitor traffic and aggregated to provide various usage statistics as requested by the depositors. These usage statistics may also be made public. 
    * Server log files containing non-personal information such as IP addresses and requested URLs may be retained. These server logs may be shared with third parties for the purpose of security auditing. 
    * EnviDat will take all reasonable measures to protect the privacy of its users and to resist service interruptions, intentional attacks, or other events that may compromise the security of the EnviDat website.`,
    '## EnviDat Metadata Policy',
    '**For information describing content items in the repository.**',
    ` + All metadata is in English.
      + Access to the published metadata is open and free of charge.
      + All information is provided “as-is”, EnviDat disclaims all warranties, express or implied.
      + The validity, authenticity and quality of the metadata and content of submissions is the sole responsibility of the depositor.
      + The metadata may be re-used in any medium for any purposes without prior permission, given:
        + the attribute, share-alike and keep open terms of the Open Data Commons Open Database License (OdBL) v 1.0 are respected, and
        + a link to the original metadata record is provided and is kept up-to-date.`,
    '## EnviDat Content Policy',
    `**(for all content items in the repository, incl. data, software and other resources)**
\n\n + EnviDat is an institutional data portal and repository of the Swiss Federal Institute for Forest, Snow and Landscape Research WSL.
     + Subject: environmental research data and software, including but not limited to the terrestrial environment, incl. forests, biodiversity, landscape, natural hazards, snow and ice.
     + All formats are allowed, including formats not optimized for preservation. However, preservation friendly formats are actively encouraged.
     + The EnviDat repository is restricted to:
       + datasets,
       + software (including but not limited to scripts, plugins or libraries),
       + additional resources (e.g., documentations, images, videos, links to publications) that improve the understanding and reuse of the datasets and software that are provided through EnviDat.
     + Unless indicated otherwise (please refer to no. 7. below), the datasets and additional resources published in EnviDat can be used free of charge and without prior permission under the Open Data Commons Open Database License (OdBL) v 1.0 / Database Content License (DbCL) v1.0, provided
       + the authors, title and full bibliographic details are given,
       + a hyperlink and/or URL are given for the original EnviDat metadata page.
     + Unless indicated otherwise (please refer to no. 7. below), the software published in EnviDat (including but not limited to scripts, plugins or libraries) can be used without prior permission under the GNU Lesser General Public License. A hyperlink and/or URL for the original EnviDat metadata page is appreciated but not mandatory.
     + Content items may, however, be individually tagged by the depositors with their own content license, thus overriding OdBL with different rights, permissions and restrictions of use. Such individual content licenses (including rights, permissions and restrictions of use) must be respected for the respective content items.`,
    '## EnviDat Submission Policy',
    '**(concerning depositors, quality & copyright)**',
    `+ Metadata and content items may only be deposited by accredited members of WSL, or their delegated collaborators. 
     + All metadata information must be provided in English
     + Depositors may only submit metadata and content items for which they have the necessary permissions and rights for distribution and publication.
     + The EnviDat administrator only vets metadata and content items for the eligibility of depositors, relevance to the scope of EnviDat, valid layout & format, and the exclusion of spam
     + The validity, authenticity and quality of the content of submissions is the sole responsibility of the depositor.
     + Metadata and content items can be deposited at any time, but the depositors have the option to restrict them until any publishers' or funders' embargo period has expired. The responsibility for complying with publisher’s or funder’s embargo policies and for respecting specified embargo period lies with the depositors. The timely lifting of restrictions is also incumbent on depositors.
     + Any copyright violations related to the submission of metadata and content items to EnviDat are the responsibility of the depositors. 
     + If EnviDat receives proof of copyright violation, the relevant item will be removed immediately and the depositors informed.`,
    '## EnviDat Preservation Policy',
    '**(concerning continued readability and accessibility of metadata and content items)**',
    `\n\n + Metadata and content items will be retained for the entire duration of EnviDat existence.
     + In the event of EnviDat having to close down, best efforts will be made to integrate all metadata and content items into a suitable alternative repository.
     + EnviDat has regular backups of all information (metadata and content items) according to best practices if the WSL IT department.
     + Metadata and content items may be removed at the request of the depositor. Possible reasons for withdrawal include, but are not limited to:
       - violations of WSL research integrity guidelines,
       - proven copyright violation or plagiarism,
       - legal requirements and proven violations,
       - journal publishers' rules,
       - national security.
     + Withdrawing metadata and content items means:
       - identifiers/URLs are retained for the entire duration of EnviDat existence,
       - URLs will continue to point to 'tombstone' records, to avoid broken links from scientific citations, with a modified description explaining the reasons for withdrawal,
       - the content items are not deleted per se, but are restricted, and therefore, no longer accessible by the public.
     + Updated versions of the content items may be deposited at any time, as long as the most recent version is clearly identified.`,
    '## Acknowledgments',
    'We would like to thank OpenDOAR (link) and Zenodo (link) for the general policy templates.',
  ],
  */
  error: null,
};


export const policies = {
  namespaced: true,
  state: policiesState,
  getters: {
    policiesMarkdown: state => state.policiesMarkdown,
    policiesInfo: state => state.policiesInfo,
    policiesTitle: state => state.policiesTitle,
    policiesPageBackRoute: state => state.policiesPageBackRoute,
  },
  mutations,
  actions,
};
