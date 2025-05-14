# 🚀 Docker Composeによる3層Webアプリ + 監視・CI/CD統合環境（学習・実践対応）

**Node.js (Express) + MySQL + Nginx** による3層構成アプリに加えて、**Prometheus / Grafana / Loki**による監視基盤、**GitHub Actions**によるCI/CD、**ESLint / Jest**を統合した開発・学習向けコンテナ環境です。

---

## 🎯 技術選定の背景

本構成は、現場でよく採用される基本的なWebアーキテクチャをベースに、**SRE・運用視点も含んだ統合設計**を目的に構築しました。

| 技術 | 理由・背景 |
|------|------------|
| Node.js (Express) | 非同期処理に強く、学習リソースが豊富。ブラウザとの親和性も高いため。 |
| MySQL | SQLの学習ベースとして安定。3層構成との相性が良い。 |
| Nginx | リバースプロキシとして現場でも多用されるため、学習優先度が高い。 |
| Prometheus | OSSで無料、学習リソースが豊富。Grafanaとの統合が容易でモニタリングのベースとして優秀。 |
| Loki / Promtail | LogQLの操作性がPrometheusに似ており、扱いやすかった。 |
| GitHub Actions | GitHub公開との親和性が高く、CI/CDの導入に最適。学習リソースも豊富。 |

---

## 🏗️ 構成図

```
Browser
  ↓
[Nginx] → [Node.js App] → [MySQL]
                        ↘︎ /metrics (Prometheus scrape)
[Promtail] → [Loki] → [Grafana]
```

---

## 📊 Grafanaダッシュボード（例）

| Node.jsのメトリクス可視化 | MySQLのパフォーマンス監視 |
|--------------------------|-----------------------------|
| ※スクリーンショットをGitHubにアップして反映してください |

- Node.jsとMySQLは**明確に別のjob/instanceで定義**し、可視化の切り分けを明確化
- `/metrics` 経由で **CPU・RAM・イベントループの遅延・アクティブハンドル数** を表示
- MySQL接続確認やクエリ時間も可視化済み

---

## 📁 ディレクトリ構成（抜粋）

```
my_project/
├── docker-compose.yml
├── .env
├── node/
│   ├── app.js
│   ├── sum.js
│   ├── sum.test.js
│   └── eslint.config.mjs
├── nginx/
├── prometheus/
├── grafana/
├── loki/
├── promtail/
└── .github/
    └── workflows/
        └── ci.yml
```

---

## 🚀 起動方法

```bash
docker compose up -d
```

- アプリ: http://localhost:3000  
- Grafana: http://localhost:3001（admin/admin）  
- Prometheus: http://localhost:9090  
- Loki: http://localhost:3100  

---

## 🧪 テスト・Lint

### ESLint

```bash
npx eslint .
```

- Flat config（eslint.config.mjs）
- Node.js + React対応
- Node.js v20系にバージョンアップ対応済

### Jest

```bash
npm test
```

- 簡易的な`sum.js / sum.test.js`で基本的なJest導入を確認

---

## ⚙️ GitHub Actions（CI）

`.github/workflows/ci.yml`

```yaml
- push / PR トリガー
- ESLint ＋ Jest 実行
- 将来的に docker build / push も追加予定
```

---

## 📚 トラブル・学びメモ

| 内容 | 対応・気付き |
|------|--------------|
| MySQL Exporter導入失敗 | 引数渡しが困難で.jsラッパーで回避、最終的に中断（20時間以上格闘） |
| ESLint導入に伴うNode.jsバージョン変更 | OS更新によりDB破損 → MySQL削除・再インストール |
| Loki可視化未完 | 今後の課題。ログレベルごとの抽出やAlert設定なども予定。 |

---

## 🧠 今後の改善予定

- `.env`による環境分離（開発・本番）
- `Dockerfile`のマルチステージ化／分割管理
- PrometheusのExporter設計見直しと再導入
- AWS EC2上での本構成展開、CD処理の実装（GitHub Actions + ECS or Lightsail）
- Grafana Alert / Slack連携（実運用イメージ強化）

---

## 🔗 GitHub / 公開URL

- [GitHub リポジトリ](https://github.com/Yamada-03/my_project)
- 今後Vercelなどでのデモ公開も検討中

---

## 👤 Author

- 作成者: Yamada-03  
- インフラ系実務経験者（監視業務など）、本構成は学習ベースで独自実装  
- ChatGPTを併用しながら、トラブル時は都度構成の見直し・検証を実施

---

## ✅ 想定読者・活用シーン

- Webアプリ開発における3層アーキテクチャを学びたい方
- OSSベースでの監視・CI/CDを体験したい方
- Node.jsアプリをDocker Composeで構成管理・可視化したい方

---

## 📌 備考

本構成は学習目的で設計されたものであり、本番環境に展開する場合は**セキュリティ・スケーラビリティ等の追加対策**が必要です。
