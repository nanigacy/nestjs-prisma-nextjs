import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckForm from '@/components/molecules/check-form';
import { LockClosedIcon, UserIcon, DatabaseIcon, CreditCardIcon, NewspaperIcon } from "@heroicons/react/outline";

export default function Home() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();
  
  const [apiResponse, setApiResponse] = useState(null);
  const [auth0User, setAuth0User] = useState(null);

  // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  );

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
          scope: 'read:current_user',
        });

        console.log('✅ accessToken:', accessToken);

        const res = await axios.post(
          'http://localhost:8080/users/',
          {
            email: user?.email,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setApiResponse(JSON.stringify(res.data));
        setAuth0User(JSON.stringify(user))
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const publicApi = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users/public');
      setApiResponse(JSON.stringify(res.data));
    } catch (e) {
      console.log(e.message);
      setApiResponse(JSON.stringify(e.message));
    }
  };

  const deleteUserApi = async () => {
    console.log("🚨 deleteUserApi")
  };

  const privateApi = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'read:current_user',
      });

      console.log('✅ accessToken', accessToken);

      const res = await axios.get('http://localhost:8080/users/private', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setApiResponse(JSON.stringify(res.data));
    } catch (e) {
      console.log(e.message);
      setApiResponse(JSON.stringify(e.message));
    }
  };

  const LoginButton = () => {
    return (
      <button
        className="p-2 bg-gray-200 rounded-md shadow hover:bg-gray-300"
        onClick={() => loginWithRedirect()}
      >
        ログイン
      </button>
    );
  };

  const LogoutButton = () => {
    return (
      <button
        className="p-2 ml-2 bg-gray-200 rounded-md shadow hover:bg-gray-300"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        ログアウト
      </button>
    );
  };

  const Profile = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <div className="my-4">
            <p>お名前: {user.name}</p>
            <p>メールアドレス: {user.email}</p>
            <p>カード情報: </p>
            <p>プラン: </p>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <Head>
        <title>Nest.js Prisma Next.js</title>
      </Head>
      <div className="justify-center max-w-4xl mx-auto">
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="inline-flex items-center my-4 text-2xl">
            <div className="p-1 text-white bg-gray-900 rounded-md">
              <LockClosedIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="ml-2 font-bold">認証(Auth0)</span>
          </h2>
          <div>
            <LoginButton />
            <LogoutButton />
            <button
              className="p-2 ml-2 text-white bg-red-600 rounded-md hover:bg-red-500"
              onClick={deleteUserApi}
            >
              アカウント削除
            </button>
          </div>
          <div className="p-4 my-6 text-white bg-black">{auth0User}</div>
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="inline-flex items-center my-4 text-2xl">
            <div className="p-1 text-white bg-gray-900 rounded-md">
              <UserIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="ml-2 font-bold">ユーザー情報</span>
          </h2>
          <Profile />
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="inline-flex items-center my-4 text-2xl">
            <div className="p-1 text-white bg-gray-900 rounded-md">
              <DatabaseIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="ml-2 font-bold">API Test(Nest.js)</span>
          </h2>
          <div>
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={publicApi}
            >
              Public API Call
            </button>
            <button
              className="p-2 ml-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={privateApi}
            >
              Private API Call
            </button>
          </div>
          <div className="p-4 my-6 text-white bg-black">{apiResponse}</div>
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="inline-flex items-center my-4 text-2xl">
            <div className="p-1 text-white bg-gray-900 rounded-md">
              <CreditCardIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="ml-2 font-bold">Stripe カード情報設定</span>
          </h2>
          <Elements stripe={stripePromise}>
            <CheckForm />
          </Elements>
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="inline-flex items-center my-4 text-2xl">
            <div className="p-1 text-white bg-gray-900 rounded-md">
              <NewspaperIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="ml-2 font-bold">Stripe プラン変更</span>
          </h2>
        </div>
      </div>
    </>
  );
}
