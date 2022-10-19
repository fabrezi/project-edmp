const msal = require("@azure/msal-node");

msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + "/" + process.env.TENANT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  }
};

cca = new msal.ConfidentialClientApplication(msalConfig);

tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + '/.default'],
};

exports.getAccessToken = async () => {
  return (await cca.acquireTokenByClientCredential(tokenRequest)).accessToken;
}