import Head from 'next/head';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckForm from '@/components/molecules/check-form';

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
        console.log('✅ user: ', user);

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

        console.log('✅ res', res);
        setApiResponse(JSON.stringify(res.data));
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const publicApi = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users/public');
      console.log('✅ res', res);
      setApiResponse(JSON.stringify(res.data));
    } catch (e) {
      console.log(e.message);
      setApiResponse(JSON.stringify(e.message));
    }
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
      console.log('✅ res', res);
      setApiResponse(JSON.stringify(res.data));
    } catch (e) {
      console.log(e.message);
      setApiResponse(JSON.stringify(e.message));
    }
  };

  const LoginButton = () => {
    return (
      <button
        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
  };

  const LogoutButton = () => {
    return (
      <button
        className="p-2 ml-2 bg-gray-200 rounded-md hover:bg-gray-300"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log Out
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
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
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
          <h2 className="my-4 text-2xl">Auth0</h2>
          <LoginButton />
          <LogoutButton />
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="my-4 text-2xl">Login User Info</h2>
          <Profile />
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="my-4 text-2xl">
            API Testing(Nest.js Server api root)
          </h2>
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
          <pre>{apiResponse}</pre>
        </div>
        <div className="p-4 my-4 shadow bg-gray-50">
          <h2 className="my-4 text-2xl">Stripe</h2>
          <Elements stripe={stripePromise}>
            <CheckForm />
          </Elements>
        </div>
      </div>
    </>
  );
}
