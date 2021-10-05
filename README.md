# 💎 NestJS Prisma NextJS

Saas Template

## ⚡️ Tech Stack

### Open Source

- [Next.js](https://nextjs.org/)
- [Nest.js](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### Infra Services

- [Auth0](https://auth0.com/jp/)
- [Stripe](https://stripe.com/jp/)
- [SendGrid](https://sendgrid.com/)
- [Vercel](https://vercel.com/docs/concepts/)
- [Cloud Run](https://cloud.google.com/run/)
- [Cloud SQL](https://cloud.google.com/sql/)
- [Cloud Storage](https://cloud.google.com/storage/)

## 👀 確認バージョン

- Node.js: 14.x +

## 💡 開発環境セットアップ

### API と DB の起動

`.env` をセットアップします。
`AUTH0_ISSUER_URL` を正しい値に変更する。

``` bash
$ cp api/.env.example api/.env
```

コンテナを起動します。

```bash
$ docker compose up
```

Prisma で Database を migrate します。

``` bash
$ docker compose exec api npx prisma migrate dev
```

`docker compose up` を実行すると、 `start:dev` から NestJS の API が起動します。

### フロントアプリの起動

``` bash
$ cp client/.env.example client/.env
$ cd client
$ yarn  # 依存関係を解消します
$ yarn dev  # http://localhost:3000 で起動されます
```

### 起動アプリケーション一覧

|URL|解説|
|---|---|
|http://localhost:8080|api server|
|http://localhost:3000|client appication|
|postgresql://postgres:password@db:5432/nestjs-prisma-nextjs|postgresql server|

> 💡 PostgreSQLのDBクライアントは、 [TablePlus](https://tableplus.com/) を使っています。

## ⛵️ デプロイ

GCP Cloud Run にデプロイされます。

### アーキテクチャ

github -> cloud build -> cloud run

## ⚡️ APIリファレンス

APIの確認は、 [curl](https://curl.se/docs/manpage.html) もしくは、 [Postman API Platform](https://www.postman.com/) をオススメします。
複雑な API は、 Postman が良いです。

### 汎用的な `curl` オプション

|オプション|解説|
|---|---|
|出力にHTTP応答ヘッダーを含めます|`-i` or `-include`|
|HTTPメソッドの指定|`-X` or `--header`|
|ヘッダーの指定|`-H` or `--request`|
|データ指定|`-d` or `--data`|

## User 

### GET `/users`

`$ACCESS_TOKEN`はAuth0から取得します。

```bash
curl -X GET http://localhost:8080/users/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### PUT `/users`

```bash
curl -X PUT http://localhost:8080/users/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d '{"email": "example@gmail.com"}'
```

### DELETE `/users`

```bash
curl -X DELETE http://localhost:8080/users/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```
