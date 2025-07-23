import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaySalary = () => {
    return (
        <Elements stripe={stripePromise}>
        
        <PaymentForm></PaymentForm>
        
        </Elements>
    );
};

export default PaySalary;