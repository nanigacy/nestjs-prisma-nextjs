import Head from "next/head";
import axios from "axios";

export default function Home() {
  // const googleLogin = async () => {
  //   await axios.get('http://localhost:8080/auth/google');
  // }

  // TODO: Baresr header
  const login = async () => {
    const res = await axios.post('http://localhost:8080/auth/login', {
      email: 'example@gmail.com',
      password: 'password',
    })
    console.log('✅res:', res);
  }

  const signup = async () => {
    const res = await axios.post('http://localhost:8080/auth/signup', {
      email: 'example@gmail.com',
      password: 'password',
    });
    console.log('✅res:', res);
  }

  return (
    <>
      <Head>
        <title>Nest.js Prisma Next.js</title>
      </Head>
      <div className="justify-center max-w-4xl mx-auto">
        <div className="mt-8">
          <div className="text-4xl font-bold text-center">Nest.js Prisma Next.js</div>
          {/* <div className="justify-center mx-auto">
            <button 
              onClick={googleLogin}
              className="px-3 py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Google ログイン
            </button>
          </div> */}
          <div className="justify-center mx-auto">
            <button 
              onClick={login}
              className="px-3 py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              ログイン
            </button>
          </div>
          <div className="justify-center mx-auto">
            <button 
              onClick={signup}
              className="px-3 py-2 text-gray-900 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
