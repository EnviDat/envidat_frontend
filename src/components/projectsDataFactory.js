export default {
  enhanceSubprojects: function enhanceSubprojects(projects) {

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
            if (extra.value.trim() === '(RACLETS)') {

              for (let l = 0; l < projects.length; l++) {
                const p = projects[l];
                if (p.title === 'RACLETS Field Campaign'){
                  el.parent = p;
                  break;
                }
              }
              
            } else {
              el.parent = extra.value;
            }
          }
        }
      }
    };

    return projects;
  },
};
