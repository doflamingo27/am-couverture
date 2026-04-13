require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const TOKEN = process.env.META_ACCESS_TOKEN;
const ADSET_ID = '120244222687670572';

const targeting = {
  geo_locations: {
    cities: [
      { key: '739674', radius: 17, distance_unit: 'kilometer' },  // Briare
      { key: '746262' },                                           // Courtenay
      { key: '752260', radius: 20, distance_unit: 'kilometer' },  // Gien
      { key: '773818', radius: 25, distance_unit: 'kilometer' },  // Montargis
      { key: '777266', radius: 40, distance_unit: 'kilometer' },  // Orléans
      { key: '779169', radius: 20, distance_unit: 'kilometer' },  // Pithiviers
      { key: '792289', radius: 17, distance_unit: 'kilometer' },  // Sully-sur-Loire
    ],
    location_types: ['home', 'recent'],
  },
  age_min: 30,
  age_max: 65,
  facebook_positions: ['feed', 'story', 'facebook_reels'],
  instagram_positions: ['stream', 'reels', 'story'],
  publisher_platforms: ['facebook', 'instagram', 'audience_network'],
  device_platforms: ['mobile', 'desktop'],
};

const body = new URLSearchParams();
body.append('access_token', TOKEN);
body.append('targeting', JSON.stringify(targeting));

fetch('https://graph.facebook.com/v21.0/' + ADSET_ID, {
  method: 'POST',
  body: body.toString(),
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
  .then((r) => r.json())
  .then((d) => {
    if (d.error) {
      console.error('❌ Erreur:', JSON.stringify(d.error, null, 2));
    } else {
      console.log('✅ Ad Set mis à jour:', JSON.stringify(d));
    }
  })
  .catch((e) => console.error('💥', e.message));
