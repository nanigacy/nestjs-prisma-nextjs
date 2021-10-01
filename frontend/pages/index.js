import Head from "next/head";
import axios from "axios";

export default function Home() {
  const googleLogin = async () => {
    await axios.post('http://localhost:8080/auth/google');
  }
  return (
    <>
      <Head>
        <title>Nest.js Prisma</title>
      </Head>
      <div className="mx-auto justify-center max-w-4xl">
        <div className="mt-8">
          <div className="text-4xl text-center font-bold">Nest.js Prisma</div>
          <div className="justify-center mx-auto">
            <button 
              onClick={googleLogin}
              className="text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2"
            >
              Google ログイン
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
