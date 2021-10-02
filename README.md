## NestJS Prisma Next.js 🚅

[NestJS](https://nestjs.com/) と [Prisma](https://www.prisma.io/) と [Next.js](https://nextjs.org/) でプロジェクトベースを構築

## ドキュメント 📃

- [NestJS Database & Prisma | Type-safe ORM for SQL Databases](https://www.prisma.io/nestjs)
- [Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma#prisma)
- [Getting Started \| Next\.js](https://nextjs.org/docs/getting-started)

## 確認バージョン

- Node.js: 14.x +

## 開発環境セットアップ 💡

### API と DB の起動

`.env` をセットアップします。

``` bash
$ cp api/.env.example api/.env
```

下記の変更を行う。

``` bash
-AUTH0_ISSUER_URL='https://xxxxx.jp.auth0.com/'
+AUTH0_ISSUER_URL='https://nanigacy.jp.auth0.com/'
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
$ cd client
$ yarn  # 依存関係を解消します
$ yarn dev  # http://localhost:3000 で起動されます
```

### 起動アプリケーション一覧

|URL|解説|
|---|---|
|http://localhost:8080|API URL|
|http://localhost:3000|フロントアプリ URL|
|postgresql://postgres:password@db:5432/nestjs-prisma-nextjs|PostgreSQL URL|

> 💡 PostgreSQLのDBクライアントは、 [TablePlus](https://tableplus.com/) を使っています。

## デプロイ ⛴

GCP Cloud Run にデプロイされます。

### アーキテクチャ

github -> cloud build -> cloud run

## APIリファレンス ⚡️

APIの確認は、 [curl](https://curl.se/docs/manpage.html) もしくは、 [Postman API Platform](https://www.postman.com/) をオススメします。
複雑な API は、 Postman が良いです。

### 汎用的な `curl` オプション

|オプション|解説|
|---|---|
|出力にHTTP応答ヘッダーを含めます|`-i` or `-include`|
|HTTPメソッドの指定|`-X` or `--header`|
|ヘッダーの指定|`-H` or `--request`|
|データ指定|`-d` or `--data`|

## 認証

### POST  `/auth/signup`

`/auth/signup`は、ユーザー作成の役割を持っています。

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"example@gmail.com", "password": "password"}'
```

### POST  `/auth/login`

> 💡 `/auth/login`にリクエストするとJWTトークン(`{ access_token: xxxxx }`)が返却されます。認証に失敗すると、`{ "statusCode": 401, "message": "Unauthorized" }`が返却されます。

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"example@gmail.com", "password": "password"}'
```

## User 

### GET `/users`

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
