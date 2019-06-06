
// use markdown syntax to style the text: https://markdown-it.github.io/
const policiesState = {
  policiesPageBackRoute: '',
  policiesTitle: 'EnviDat General Policies v. 1.0',
  policiesInfo: [
    {
      title: '## Preamble',
      text: 'The EnviDat policies are subject to change by EnviDat at any time and without notice, other than through posting the updated policies on the www.envidat.ch website. For any questions about the EnviDat general policies, please contact EnviDat support at envidat@wsl.ch.',
    },
    {
      title: '## EnviDat Privacy Policy',
      text: '**(for information collected from users)**',
      // text: 'FOREST FUNCTION DRINKING WATER FOREST FUNCTION GAME RESERVE FOREST FUNCTION LANDSCAPE PROTECTION FOREST FUNCTION MILITARY FOREST FUNCTION NATURE PROTECTION FOREST FUNCTION PROTECTION AGAINST NATURAL HAZARDS',
      // bulletTitle: 'EnviDat Privacy Policy',
      bulletpoints: [
        '1. EnviDat does not track, collect or retain personal information from users, except as otherwise provided herein.',
        '2. Depositors gain access with a passwordless login procedure, which ensures that there is no need to store user passwords.',
        '3. Non-personal information such as IP addresses and cookies may be tracked and retained in order to monitor traffic and aggregated to provide various usage statistics as requested by the depositors. These usage statistics may also be made public.',
        '4. Server log files containing non-personal information such as IP addresses and requested URLs may be retained. These server logs may be shared with third parties for the purpose of security auditing.',
        '5. EnviDat will take all reasonable measures to protect the privacy of its users and to resist service interruptions, intentional attacks, or other events that may compromise the security of the EnviDat website.',
      ],
    },
    {
      title: '## EnviDat Metadata Policy',
      text: '**(for information describing content items in the repository)**' +
      ' ' +
      '1. All metadata is in English.' +
      '2. Access to the metadata is open and free of charge.' +
      '3. All information is provided “as-is”, EnviDat disclaims all warranties, express or implied.' +
      '4. The validity, authenticity and quality of the content of submissions is the sole responsibility of the depositor.' +
      '5. The metadata may be re-used in any medium for any purposes without prior permission, given:' +
      '  the terms of the Open Data Commons Open Database License (OdBL) are respected, and' +
      '  a link to the original metadata record is provided.',
      // bulletpoints: [
      //   '1. All metadata is in English.',
      //   '2. Access to the metadata is open and free of charge.',
      //   '3. All information is provided “as-is”, EnviDat disclaims all warranties, express or implied.',
      //   '4. The validity, authenticity and quality of the content of submissions is the sole responsibility of the depositor.',
      //   '5. The metadata may be re-used in any medium for any purposes without prior permission, given:',
      //   // subpoints: [
      //   //   'the terms of the Open Data Commons Open Database License (OdBL) are respected, and',
      //   //   'a link to the original metadata record is provided.',
      //   // ],
      // ],
    },
    {
      title: '## EnviDat Metadata Policy',
      text: `**(for information describing content items in the repository)**


        - 1. All metadata is in English. 
        - 2. Access to the metadata is open and free of charge. 

        * 3. All information is provided “as-is”, EnviDat disclaims all warranties, express or implied. 
        * 4. The validity, authenticity and quality of the content of submissions is the sole responsibility of the depositor. 
        * 5. The metadata may be re-used in any medium for any purposes without prior permission, given: 
            the terms of the Open Data Commons Open Database License (OdBL) are respected, and 
            a link to the original metadata record is provided.`,
    },
  ],
};

export const policies = {
  namespaced: true,
  state: policiesState,
  getters: {
    policiesInfo: state => state.policiesInfo,
    policiesTitle: state => state.policiesTitle,
    policiesPageBackRoute: state => state.policiesPageBackRoute,
  },
};
