## NestJS Prisma 🚅

NestJSとPrismaでAPIサーバを構築する

## ドキュメント 📃

- [NestJS Database & Prisma | Type-safe ORM for SQL Databases](https://www.prisma.io/nestjs)
- [Prisma | NestJS - A progressive Node.js framework](https://docs.nestjs.com/recipes/prisma#prisma)

## 確認バージョン

- Node.js: 14.x +

## 開発環境セットアップ 💡

PostgresQLをDockerでセットアップします。

> 💡 なぜMySQLではなく、PostgreSQLか？ A.ほとんどのチュートリアルが、PostgreSQLを最初に使うので追従する

```bash
docker-compose up -d
```

`.env`をセットアップします。

```bash
cp .env.example .env
```

依存関係を取得します。

```bash
yarn install
```

Prismaをセットアップします。

```bash
npx prisma generate
npx prisma migrate dev
```

NestJSアプリケーションを立ち上げます。

```bash
yarn start:dev
```

|URL|解説|
|---|---|
|http://localhost:3000|アプリケーション URL|
|postgresql://postgres:password@localhost:5432/mydb|PostgreSQL URL|

> 💡 PostgreSQLのDBクライアントは、[TablePlus | Modern, Native Tool for Database Management](https://tableplus.com/)を使っています

## デプロイ ⛴