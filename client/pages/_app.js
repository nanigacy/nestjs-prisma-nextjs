import '../styles/globals.css';
import '../styles/tailwind-utils.css';
import '../styles/tailwind.css';
import { Auth0Provider } from '@auth0/auth0-react';
import Layout from '@/components/organisms/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth0Provider>
  );
}

export default MyApp;
