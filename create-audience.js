require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const TOKEN = process.env.META_ACCESS_TOKEN;
const PIXEL_ID = '935146592304186';
const AD_ACCOUNT_ID = 'act_1247430407284609';

const body = new URLSearchParams();
body.append('access_token', TOKEN);
body.append('name', 'Visiteurs site web 14j');
body.append('prefill', 'true');
body.append('retention_days', '14');
body.append('rule', JSON.stringify({
  inclusions: {
    operator: 'or',
    rules: [{
      event_sources: [{ id: PIXEL_ID, type: 'pixel' }],
      retention_seconds: 1209600,
      filter: { operator: 'and', filters: [{ field: 'url', operator: 'i_contains', value: '' }] },
    }],
  },
}));

fetch(`https://graph.facebook.com/v21.0/${AD_ACCOUNT_ID}/customaudiences`, {
  method: 'POST',
  body: body.toString(),
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
  .then((r) => r.json())
  .then((d) => console.log(JSON.stringify(d, null, 2)))
  .catch((e) => console.error(e.message));
