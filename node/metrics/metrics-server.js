const express = require('express');
const client = require('prom-client');
const mysql = require('mysql2/promise');

const app = express();
const register = new client.Registry();

client.collectDefaultMetrics({ register });

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'example',
  database: 'mydb',
};

const queryDuration = new client.Gauge({
  name: 'mysql_query_duration_seconds',
  help: 'Duration of sample query',
});

register.registerMetric(queryDuration);

app.get('/metrics', async (req, res) => {
  const start = Date.now();
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('SELECT 1');
    await connection.end();
    queryDuration.set((Date.now() - start) / 1000);
  } catch (err) {
    console.error(err);
    queryDuration.set(-1);
  }

  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(9104, () => {
  console.log('Metrics server listening on port 9104');
});
