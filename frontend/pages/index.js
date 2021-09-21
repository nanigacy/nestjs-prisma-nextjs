import Head from "next/head";
import axios from "axios";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nest.js Prisma</title>
      </Head>
      <div className="mx-auto justify-center">
        <div className="text-2xl">Nest.js Prisma</div>
        <button className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md">Google ログイン</button>
      </div>
    </>
  )
}
