[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ddf970eec3da4b668f90bb03d012872e)](https://www.codacy.com/gh/EnviDat/envidat_frontend?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=EnviDat/envidat_frontend&amp;utm_campaign=Badge_Grade)
[![DeepScan grade](https://deepscan.io/api/teams/6114/projects/7972/branches/89555/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6114&pid=7972&bid=89555)
![Travis (.com) branch](https://img.shields.io/travis/com/EnviDat/envidat_frontend/develop)

# EnviDat Frontend
Frontend for the Envidat platform which provides environmental research data from researchers of the Swiss Federal Institute for Forest, Snow and Landscape.
The backend API is base on CKAN. So the respective actions are used to consume the metadata about the research data.

# Installtion
After cloning the project, use <code>npm install</code> to install all the dependencies.

Local development: <code>npm run serve</code>
Create a build: <code>npm run build</code>


# Usage
You **have to change the environment variables** in the .env.development / .env.production files

An example of the .env.development:
<code>
  VUE_APP_USE_TESTDATA=true
  VUE_APP_CONFIG_URL=./testdata/config.json
  VUE_APP_ENVIDAT_PROXY=https://www.envidat.ch
</code>

When <code>VUE_APP_USE_TESTDATA=true</code> VUE_APP_ENVIDAT_PROXY variable is ignored and the
local testfiles are being used. So you have to have json files in the /public/testdata/ folder which 
resembel the result of the ckan actions. Like the action 'current_package_list_with_resources'
for all the datasets or 'package_show' for a single dataset.

For more details about the actions check '*actions.js' files in the respective modules.
E.g. './src/modules/meatadata/store/metadataAction.js' for metadata / dataset actions
'./src/modules/projects/store/projectsAction.js' for projects actions.

For a **productive build** you have to change the VUE_APP_ENVIDAT_PROXY variable to point to your CKAN backend.
If the VUE_APP_USE_TESTDATA is still on true, the testdata is being used regardless of being
a production build.

An example of the .env.production:
<code>
  VUE_APP_USE_TESTDATA=false
  VUE_APP_CONFIG_URL=./config.json
  VUE_APP_ENVIDAT_PROXY=https://www.envidat.ch
</code>

Would you use any other backend you would need to adjust the code in the store actions files
to handle the response and it's content accordingly.

Check the CKAN actions and their details here: https://docs.ckan.org/en/2.8/api/index.html

The config.json can be used to inject configurations from the server side into the frontend without rebuilding the project.
By now we only use it for checking the version number to promt the User to reload the frontend if a newer version is available.

config.json content on server side:
<code>
{ "version": "0.6.87" }
</code>


# Missing Features


# Known issues
