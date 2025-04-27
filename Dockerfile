# ベースイメージとしてNode.jsを指定
FROM node:16

# アプリケーションの作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 必要な依存関係をインストール
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# アプリケーションを起動
CMD ["npm", "start"]
