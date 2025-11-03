const axios = require('axios');

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;

if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.warn(
    '⚠️  Warning: Missing Sanity credentials. Set SANITY_PROJECT_ID and SANITY_API_TOKEN in .env'
  );
}

const SANITY_API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07`;

const sanityClient = axios.create({
  baseURL: SANITY_API_URL,
  headers: {
    'Authorization': `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

module.exports = {
  sanityClient,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SANITY_API_URL,
};
