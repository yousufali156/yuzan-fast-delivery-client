import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.error('[Stripe Error]', error);
        toast.error(error.message || 'Payment failed');
      } else {
        console.log('[Stripe PaymentMethod]', paymentMethod);
        toast.success('Payment method created!');
        // You would now send `paymentMethod.id` to your server to create a PaymentIntent
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setProcessing(false);
    }
  };
// this is true 
  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">💳 Enter your card details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || processing}
          className={`btn btn-primary w-full ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
