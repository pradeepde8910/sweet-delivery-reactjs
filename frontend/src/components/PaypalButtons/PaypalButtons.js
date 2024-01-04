// paypalbutton.js

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import Razorpay from 'razorpay';
import React, { useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { pay } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PaymentButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'AUWcnaHjOUoXVI3IjLpMkM0Kk0Sigq1CUAWP-finHI950yQD2Qni8XPkRbs76Q-_JIT8hJFhKD8YVy3u',
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  });

  const razorpay = new Razorpay({
    key_id: 'your-razorpay-key-id',
    key_secret: 'your-razorpay-key-secret',
  });

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success('Payment Saved Successfully', 'Success');
      navigate('/track/' + orderId);
    } catch (error) {
      toast.error('Payment Save Failed', 'Error');
    }
  };

  const onError = err => {
    toast.error('Payment Failed', 'Error');
  };

  const razorpayHandler = async () => {
    try {
      const options = {
        amount: order.totalPrice * 100,
        currency: 'USD',
        receipt: 'order_receipt_' + order.id,
        payment_capture: 1,
      };

      const response = await razorpay.orders.create(options);

      razorpay.open(); // This will open the Razorpay checkout form

      razorpay.on('payment.success', async (response) => {
        const orderId = await pay(response.razorpay_payment_id);
        clearCart();
        toast.success('Razorpay Payment Successful', 'Success');
        navigate('/track/' + orderId);
      });

      razorpay.on('payment.error', (error) => {
        toast.error('Razorpay Payment Failed', 'Error');
      });
    } catch (error) {
      toast.error('Razorpay Payment Failed', 'Error');
    }
  };

  return (
    <>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />

      {/* Razorpay Button */}
      <button onClick={razorpayHandler}>Pay with Razorpay</button>
    </>
  );
}
