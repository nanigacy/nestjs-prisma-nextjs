import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { user, getAccessTokenSilently } = useAuth0();

  const attachPaymentMethod = async (paymentMethod) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        scope: 'read:current_user',
      });

      await axios.post(
        'http://localhost:8080/users/attach-payment-method',
        {
          paymentMethod: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('✅ PaymentMethod', paymentMethod);
      await attachPaymentMethod(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="p-4 border rounded-sm"
        options={{
          iconStyle: 'solid',
          hidePostalCode: true,
          style: {
            base: {
              iconColor: '#c4f0ff',
              color: '#000',
              fontWeight: 500,
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
            },
            invalid: {
              iconColor: 'red',
              color: 'red',
            },
          },
        }}
      />
      <button
        className="px-2 py-3 my-6 text-white bg-blue-600 rounded-md hover:bg-blue-500"
        type="submit"
        disabled={!stripe}
      >
        保存
      </button>
    </form>
  );
}
