const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json()); // ←ここ！

const client = require('prom-client');

// デフォルトメトリクスの収集
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// カスタムメトリクス（httpリクエストのカウンター）
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  httpRequestCounter.labels('GET', '/', 200).inc();
  res.send('Hello from Node.js via Nginx!');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      httpRequestCounter.labels('GET', '/users', 500).inc();
      return res.status(500).json({ error: err });
    }
    httpRequestCounter.labels('GET', '/users', 200).inc();
    res.json(results);
  });
});


app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    httpRequestCounter.labels('POST', '/users', 400).inc();
    return res.status(400).json({ error: 'Name and email are required' });
  }

  connection.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    (err, results) => {
      if (err) {
        httpRequestCounter.labels('POST', '/users', 500).inc();
        return res.status(500).json({ error: 'Database error' });
      }
      httpRequestCounter.labels('POST', '/users', 201).inc();
      res.status(201).json({ message: 'User created', userId: results.insertId });
    }
  );
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
