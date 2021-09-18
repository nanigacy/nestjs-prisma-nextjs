## NestJS Prisma 🚅

NestJSとPrismaでAPIサーバを構築する

## ドキュメント 📃

- [NestJS Database & Prisma | Type-safe ORM for SQL Databases](https://www.prisma.io/nestjs)
- [Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma#prisma)

## 確認バージョン

- Node.js: 14.x +

## 開発環境セットアップ 💡

 NestJSとPostgreSQLをDockerでセットアップします。

> 💡 なぜMySQLではなく、PostgreSQLか？ A.ほとんどのチュートリアルが、PostgreSQLを最初に使うので追従する

```bash
docker-compose up
```

`.env`をセットアップします。

```bash
cp .env.example .env
```

依存関係を取得します。

```bash
docker-compose exec app bash
# コンテナ内 #
yarn install
```

Prismaをセットアップします。

```bash
# コンテナ内 #
npx prisma generate
npx prisma migrate dev
```

`docker-compose up`を実行すると、`start:dev`からNestJSアプリケーションを立ち上がります。

|URL|解説|
|---|---|
|http://localhost:8080|アプリケーション URL|
|postgresql://postgres:password@db:5432/mydb|PostgreSQL URL|

> 💡 PostgreSQLのDBクライアントは、[TablePlus](https://tableplus.com/)を使っています

## デプロイ ⛴

## APIリファレンス ⚡️

APIの確認は、[Curl](https://curl.se/docs/manpage.html)もしくは、[Postman API Platform](https://www.postman.com/)をオススメします。
複雑なAPIは、Postmanが良いです。

### 汎用的なCurlオプション

|オプション|解説|
|---|---|
|出力にHTTP応答ヘッダーを含めます|`-i` or `-include`|
|HTTPメソッドの指定|`-X` or `--header`|
|ヘッダーの指定|`-H` or `--request`|
|データ指定|`-d` or `--data`|

## 認証

### POST  `/auth/signup`

`/auth/signup`は、ユーザー作成の役割を持っています。

> 💡 なぜ`username`か？ A.emailだとメールアドレスが紛失した場合に、復旧できないから

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"username", "password": "password"}'
```

### POST  `/auth/login`

> 💡 `/auth/login`にリクエストするとJWTトークン(`{ access_token: xxxxx }`)が返却されます。認証に失敗すると、`{ "statusCode": 401, "message": "Unauthorized" }`が返却されます。

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "username", "password": "password"}'
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
