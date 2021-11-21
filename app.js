const express = require('express');
const _ = require('lodash');
const axios = require('axios');
const { escapeRegExp } = require('lodash');
const app = express();

app.get('/api/health-check', (req, res) => {
  return res.send({ status: 'ok' });
});

app.get('/api/pokemon', async (req, res) => {
  const { filter } = req.query;
  const result = await axios.get('https://pokeapi.co/api/v2/pokemon');

  if (filter) {
    const {
      data: { results },
    } = result;

    const filteredData = _.filter(results, ({ name }) => name.match(filter));
    return res.send(filteredData);
  }

  return res.send(result.data);
});

module.exports = app;
