import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe("pk_test_51RkSZjIiHFTxBs6paQ8Wa5ScFm52aUKKCBmti3wLOpJL7wtieVBeY5E9XRCbuxX9MpmJvEwNG0jepZTm99kKeidi00ZwBGnX10");

const PaySalary = () => {
    return (
        <Elements stripe={stripePromise}>
        
        <PaymentForm></PaymentForm>
        
        </Elements>
    );
};

export default PaySalary;