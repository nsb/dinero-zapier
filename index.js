// You'll want to set these with either `CLIENT_ID=abc zapier test` or `zapier env 1.0.0 CLIENT_ID abc`
process.env.AUTH_URL = process.env.AUTH_URL || 'https://authz.dinero.dk/dineroapi/oauth/token';
process.env.BASE_URL = process.env.BASE_URL || 'https://api.dinero.dk/';
process.env.API_VERSION = process.env.API_VERSION || 'v1';
process.env.CLIENT_ID = process.env.CLIENT_ID || '1234';
process.env.CLIENT_SECRET = process.env.CLIENT_SECRET || 'asdf';

const authentication = require('./authentication');

// To include the Authorization header on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};


const invoice = require('./creates/invoice');

// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  beforeRequest: [
    includeBearerToken
  ],

  afterResponse: [
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [invoice.key]: invoice
  }
};

// Finally, export the app.
module.exports = App;
