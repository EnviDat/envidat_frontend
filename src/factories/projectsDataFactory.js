/**
 * function factory for project object enhancing methods by parsing
 * the json from the backend.
 *
 * @summary function factory for project object enhancing methods
 * @author Dominik Haas-Artho
 *
 * Created at     : 2019-10-23 16:07:03 
 * Last modified  : 2019-11-20 16:08:39
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

export default {
  enhanceSubprojectsFromExtras(projects) {

    for (let i = 0; i < projects.length; i++) {
      const el = projects[i];
      
      if (typeof el.extras === 'object' && el.extras instanceof Array) {

        for (let j = 0; j < el.extras.length; j++) {
          const extra = el.extras[j];
          
          if (extra.key === 'subprojects') {
            let splits = extra.value.split(',');
            el.subProjects = [];

            for (let k = 0; k < splits.length; k++) {
              const sub = splits[k].trim();
              
               let matchedProject = projects.filter(p => p.title.includes(sub));
               if (matchedProject.length >= 1) {
                 el.subProjects.push(matchedProject[0]);
               }
            }
          }

          if (extra.key === 'parent') {
            let parentTitle = extra.value.trim();
            let parent = null;

              for (let l = 0; l < projects.length; l++) {
                const p = projects[l];
                if (p.title === parentTitle){
                  parent = p;
                  break;
                }
              }
            if (parent) {
              el.parent = parent;
            } else {
              el.parent = extra.value;
            }
          }
        }
      }
    };

    return projects;
  },
  enhanceProjectsDatasets(projects, allDatasets) {

    for (let i = 0; i < projects.length; i++) {
      const proj = projects[i];

      if (proj && proj.packages && proj.packages.length > 0) {

        for (let j = 0; j < proj.packages.length; j++) {
          const dataset = proj.packages[j];

          if (!dataset.tags) {
            const fullDataset = allDatasets[dataset.id];

            if (fullDataset) {
              // the tags of each dataset has to be looked up in the allDatasets (metadataContents)
              // because the backend call doesn't deliver the packages with the tags
              // it can only delivery the tags for the projects, which is no use for this case
              dataset.tags = fullDataset.tags;
            }
          }
        }

      }
    }

    return projects;
  }
};
