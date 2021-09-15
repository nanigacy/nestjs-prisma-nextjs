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

APIの確認は、[Curl](https://curl.se/docs/manpage.html)もしくは、[Postman API Platform](https://www.postman.com/)をオススメします。複雑なAPIは、Postmanが良いです。

### 汎用的なCurlオプション

|オプション|解説|
|---|---|
|出力にHTTP応答ヘッダーを含めます|`-i` or `-include`|
|HTTPメソッドの指定|`-X` or `--header`|
|ヘッダーの指定|`-H` or `--request`|
|データ指定|`-d` or `--data`|

### GET `/users/:id`

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H GET \
  http://localhost:8080/users/1
```

### POST `/users/`

```bash
curl -i \
  -H "Content-Type: application/json" \
  -X POST -d '{"email":"example.com"}' \
  http://localhost:8080/users/
```

### PUT `/users/:id`

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H PUT -d '{"email":"example01@gmail.com"}' \
  http://localhost:8080/users/1
```

### DELETE `/users/:id`

```bash
curl -i \
  -H "Content-Type: application/json" \
  -H DELETE \
  http://localhost:8080/users/1
```