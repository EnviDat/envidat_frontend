const fs = require('fs');

const packagelist = require(__dirname + '/../testdata/packagelist');
const metadataList = packagelist.result;

const metaDataFactory = require(__dirname + '/../components/metaDataFactory');

const outputFileName = 'authorCollection.json';
const outputPath = __dirname + '/../testdata/';


function getDataCredit(author) {
  if (!author.data_credit) {
    return null;
  }

  // key: dataCreditName, value: count
  const dataCredits = {};

  if (author.data_credit instanceof Array){
    for (let i = 0; i < author.data_credit.length; i++) {
      const credit = author.data_credit[i];
      
      if (dataCredits[credit]){
        const v = dataCredits[credit];
        v += 1;
        dataCredits[credit] = v;
      } else {
        dataCredits[credit] = 1;
      }
    }

  } else if (typeof author.data_credit === 'string') {
    dataCredits[author.data_credit] = 1;
  } else {
    console.log('Unexpected type for author.data_credit ' + typeof author.data_credit);
    throw new Error('Unexpected type for author.data_credit ' + typeof author.data_credit);
  }

  return dataCredits;
}

function getAuthors(dataset){ 
    const header = metaDataFactory.createHeader(dataset, false);
    const authors = header.authors;

    if (authors && authors instanceof Array) {
      const authorObjs = [];

      for (let i = 0; i < authors.length; i++) {
          const author = authors[i];

          const id = {
            type: author.identifier_scheme,
            identifier: author.identifier,
          };
          
          const dataCredit = getDataCredit(author);

          authorObjs.push({ name: author.name.trim(), datasetCount: 1,
                            affiliation: author.affiliation, id,
                            email: author.email, dataCredit });
      }

      return authorObjs;
    }

    return null;
}

function extractAuthors() {

  const authorMap = {};

  for (let i = 0; i < metadataList.length; i++) {
    const dataset = metadataList[i];

    const authors = getAuthors(dataset);
 
    if (authors) {
      for (let j = 0; j < authors.length; j++) {
        const author = authors[j];

        const authorName = author.name.trim();
        const existingAuthor = authorMap[authorName];

        if (existingAuthor){
          existingAuthor.datasetCount += author.datasetCount;

          if (author.data_credit){
            if (!existingAuthor.data_credit){
              existingAuthor.data_credit = author.data_credit;
            } else {
              const keys = Object.keys(author.data_credit);

              for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                const value = author.data_credit[key];

                let existingValue = existingAuthor.data_credit[key];

                if (existingValue) {
                  existingValue += value;
                } else {
                  existingValue = value;
                }

                // console.log('for ' + author.name + ' set ' + key + ' ' + existingValue);
                existingAuthor.data_credit[key] = existingValue;
              }
            }
          }

          // console.log('for ' + author.name + ' updated ' + existingAuthor.count);
          authorMap[authorName] = existingAuthor;
        } else {
          // console.log('for ' + author.name + ' set ' + author.count);
          authorMap[authorName] = author;
        }
      }
    } else {
      console.log('Dataset ' + dataset.title + ' id ' + dataset.id + ' has no authors?');
    }

  }

  return authorMap;
}

function writeAuthorsToFile(authorMap) {

  const authorJson = JSON.stringify(authorMap, null, 2);

  fs.writeFile(outputPath + outputFileName, authorJson, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("Authors extracted and saved in " + outputPath + outputFileName + ". Wrote " + authorJson.length);
  }); 
  
}


const authorMap = extractAuthors();
writeAuthorsToFile(authorMap);