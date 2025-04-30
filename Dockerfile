# ベースイメージとしてNode.jsを指定
FROM node:20

# アプリケーションの作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonだけ先にコピー
COPY node/package.json /app/package.json
COPY node/package-lock.json /app/package-lock.json

# 依存関係をインストール
RUN npm install

# そのあとでソースコード全部コピー
COPY node/ /app

# サーバ起動
CMD ["npm", "start"]
