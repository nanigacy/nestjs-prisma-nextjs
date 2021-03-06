# ð NestJS Prisma NextJS

Saas Template

## â¡ï¸ Tech Stack

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

## ð ç¢ºèªãã¼ã¸ã§ã³

- Node.js: 14.x +

## ð¡ éçºç°å¢ã»ããã¢ãã

### API ã¨ DB ã®èµ·å

`.env` ãã»ããã¢ãããã¾ãã
`AUTH0_ISSUER_URL` ãæ­£ããå¤ã«å¤æ´ããã

``` bash
$ cp api/.env.example api/.env
```

ã³ã³ãããèµ·åãã¾ãã

```bash
$ docker compose up
```

Prisma ã§ Database ã migrate ãã¾ãã

``` bash
$ docker compose exec api npx prisma migrate dev
```

`docker compose up` ãå®è¡ããã¨ã `start:dev` ãã NestJS ã® API ãèµ·åãã¾ãã

### ãã­ã³ãã¢ããªã®èµ·å

``` bash
$ cp client/.env.example client/.env
$ cd client
$ yarn  # ä¾å­é¢ä¿ãè§£æ¶ãã¾ã
$ yarn dev  # http://localhost:3000 ã§èµ·åããã¾ã
```

### èµ·åã¢ããªã±ã¼ã·ã§ã³ä¸è¦§

|URL|è§£èª¬|
|---|---|
|http://localhost:8080|api server|
|http://localhost:3000|client appication|
|postgresql://postgres:password@db:5432/nestjs-prisma-nextjs|postgresql server|

> ð¡ PostgreSQLã®DBã¯ã©ã¤ã¢ã³ãã¯ã [TablePlus](https://tableplus.com/) ãä½¿ã£ã¦ãã¾ãã

## âµï¸ ããã­ã¤

GCP Cloud Run ã«ããã­ã¤ããã¾ãã

### ã¢ã¼ã­ãã¯ãã£

github -> cloud build -> cloud run

## â¡ï¸ APIãªãã¡ã¬ã³ã¹

APIã®ç¢ºèªã¯ã [curl](https://curl.se/docs/manpage.html) ãããã¯ã [Postman API Platform](https://www.postman.com/) ããªã¹ã¹ã¡ãã¾ãã
è¤éãª API ã¯ã Postman ãè¯ãã§ãã

### æ±ç¨çãª `curl` ãªãã·ã§ã³

|ãªãã·ã§ã³|è§£èª¬|
|---|---|
|åºåã«HTTPå¿ç­ãããã¼ãå«ãã¾ã|`-i` or `-include`|
|HTTPã¡ã½ããã®æå®|`-X` or `--header`|
|ãããã¼ã®æå®|`-H` or `--request`|
|ãã¼ã¿æå®|`-d` or `--data`|

## User 

### GET `/users`

`$ACCESS_TOKEN`ã¯Auth0ããåå¾ãã¾ãã

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
