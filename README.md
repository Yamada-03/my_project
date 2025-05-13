
# 🚀 Docker Compose 3層構成 Webアプリ + 監視・CI/CD付き開発環境

Node.js (Express) + MySQL + Nginx を中心とした3層構成アプリに、以下を追加した開発用統合環境です：

- Prometheus + Grafana（メトリクス監視）
- Loki + Promtail（ログ監視）
- ESLint（静的解析）
- Jest（ユニットテスト）
- GitHub Actions（CI/CD）

---

## 📦 技術スタック

- Node.js (Express)
- MySQL
- Nginx
- Prometheus / Grafana
- Loki / Promtail
- ESLint / Jest
- Docker / Docker Compose
- GitHub Actions（CI/CD）

---

## 🏗️ 構成図

```
Browser
  ↓
[Nginx] → [Node.js App] → [MySQL]
                        ↘︎ Prometheus Metrics
[Promtail] → [Loki] → [Grafana]
```

---

## 📁 ディレクトリ構成（例）

```
my_project/
├── docker-compose.yml
├── node/
│   ├── app.js
│   ├── sum.js
│   ├── sum.test.js
│   ├── package.json
│   └── eslint.config.mjs
├── nginx/
│   └── default.conf
├── prometheus/
│   └── prometheus.yml
├── grafana/
│   └── provisioning/
├── loki/
│   └── loki-config.yaml
├── promtail/
│   └── promtail-config.yaml
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 🚀 起動手順

```bash
docker compose up -d
```

- アプリ: http://localhost:3000  
- Grafana: http://localhost:3001 （初期ログイン: `admin` / `admin`）  
- Prometheus: http://localhost:9090  
- Loki: http://localhost:3100  

---

## 🔌 API仕様（簡易）

| メソッド | エンドポイント | 内容                     |
|----------|----------------|--------------------------|
| GET      | `/`            | 簡易レスポンス（Hello）  |
| GET      | `/users`       | `users` テーブルの一覧取得 |
| POST     | `/users`       | ユーザー追加（JSON形式）  |

- POSTボディの例：

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## 📊 モニタリング

- **メトリクスエンドポイント**: `/metrics`
- **Prometheus** で `http_requests_total` 等を収集
- **Loki** + **Promtail** でコンテナログを Grafana に表示

---

## ✅ Lint / テスト

### ESLint（静的解析）

```bash
npx eslint .
```

- `eslint.config.mjs` を使用（Flat Config構成）
- CommonJS + React + ブラウザ対応

### Jest（ユニットテスト）

```bash
npm test
```

- 例：`sum.js` / `sum.test.js` によるテスト確認済み

---

## ⚙️ CI/CD（GitHub Actions）

`.github/workflows/ci.yml` にて構成済み：

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npx eslint .
      - run: npm test
```

- Push or PR 時に ESLint + Jest を実行
- 必要であれば `docker build` や `docker push` にも対応可能

---

## 📝 今後の追加予定（例）

- Swagger によるAPIドキュメント
- MySQL マイグレーション自動化（例: Prisma / Sequelize）
- GitHub Pages または Vercel 連携によるデモ公開

---

## 👤 Author

- Maintained by [Your Name]  
- GitHub: [your_github_url_here]  
- Portfolio Ready ✅

---
