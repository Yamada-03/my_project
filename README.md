# 🚀 モダン3層構成 × OSS監視 × CI/CD統合環境（学習・実務検証対応）

Node.js + MySQL + Nginx による3層Webアプリに、Prometheus / Grafana / Loki による監視基盤、GitHub Actions によるCI統合、ESLint / Jest による品質チェックを加えた、コンテナベースの開発・運用統合環境です。

---

## 🎯 技術選定の意図

| 技術 | 採用理由 |
|------|----------|
| **Node.js (Express)** | 非同期I/Oと軽量API設計に強く、学習・検証に最適 |
| **MySQL** | RDBの基礎理解と3層構成への適用性から選定 |
| **Nginx** | Webサーバ兼リバースプロキシとして現場使用頻度が高いため |
| **Prometheus / Grafana** | OSSで構成できるため運用コストが低く、実務導入に近い構成を再現可能 |
| **Loki / Promtail** | Prometheusとの親和性が高く、LogQLベースのログ分析を試せる |
| **GitHub Actions** | GitHub上でのCI統合が容易なため。将来的なCD展開も視野に設計 |

---

## 🏗️ システム構成図

```
[Browser]
   ↓
[Nginx] → [Node.js API] → [MySQL]
                    ↘︎ /metrics（Prometheusがscrape）
[Promtail] → [Loki] → [Grafana]
                       ↑
             Prometheus（メトリクス収集）
```

---

## 📊 ダッシュボード可視化例

- Node.js / MySQL それぞれ個別 job として監視
- 以下メトリクスを Grafana 上で可視化済：
  - `http_requests_total`, `process_memory`, `eventloop_lag`
  - `mysql_query_duration_seconds`, `MySQL接続確認`, etc.
- `node-exporter` によりホストマシンの CPU / メモリ / Disk も監視対象に追加

→ 現場で要求される最低限のアプリ & インフラ監視レベルを再現

---

## 🚨 アラート設定（In-App Notification）

- Grafana の Notification policy により画面内アラート表示を実装
- 例：
  - メモリ使用率 > 80%
  - ディスク使用率 > 90%
- Slack / Email 通知も拡張可能（未導入）

---

## 🧪 品質保証（CI / Lint / Test）

- GitHub Actions にて ESLint / Jest を PR / Push 時に実行
- Flat config (`eslint.config.mjs`) + Node.js + React 環境に対応
- Jest による基本ユニットテスト済（`sum.test.js`）

---

## ⚙️ 起動方法

```bash
docker compose up -d
```

- http://localhost:3000（API）
- http://localhost:3001（Grafana）
- http://localhost:9090（Prometheus）
- http://localhost:3100（Loki）

---

## 📂 ディレクトリ構成（抜粋）

```
my_project/
├── docker-compose.yml
├── .env
├── node/           # Node.js API本体
├── nginx/          # Nginx設定
├── prometheus/     # prometheus.yml
├── grafana/        # ダッシュボード・設定
├── loki/           # Loki構成ファイル
├── promtail/       # promtail-config.yaml
└── .github/workflows/ci.yml
```

---

## 🧠 トラブル・学び

| 項目 | 内容 |
|------|------|
| MySQL Exporter導入失敗 | CLI引数渡しに難航。最終的に `mysql2` 経由で手動メトリクス収集に切り替え |
| Node.js v20化対応 | ESLint導入のためにバージョン変更 → OS側にも影響しMySQL破損（再構築） |
| ログ監視（Loki） | JSON構造ログ出力、Promtailから `/var/lib/docker/containers` を明示マウントで対応 |

---

## 🚀 今後の発展

- `.env` による開発／本番環境分離
- Dockerfileの最適化（マルチステージ化）
- CI → CD（GitHub ActionsからDockerHubやECSへ）
- Slack通知、Lokiアラート拡張、Zabbix導入比較なども予定
- AWS（EC2 or Lightsail）での構成検証（IaaS対応力の強化）

---

## 📝 このリポジトリについて

- **学習目的で構成を自力構築**
- GPT補助ありつつも、構成理解とトラブル対応は手動で試行錯誤
- 実務の「監視」「CI」「構成管理」に近づけることを意識

---

## 📌 想定ユーザ

- Node.js / Docker 初学者〜中堅
- OSSベースの運用構成を学びたいインフラ系職種
- CI/CDと監視のつながりを実装を通じて学びたい方

---

## 👤 Author

Yamada-03  
インフラ運用（監視、LB、VPN、プロキシ等）実務経験あり。  
本構成は構築経験の補完・実践力強化のために作成。

---

## 🔗 GitHub

[https://github.com/Yamada-03/my_project](https://github.com/Yamada-03/my_project)