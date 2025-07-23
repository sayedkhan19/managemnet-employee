import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const {Idsalary}  = useParams();
    // console.log(Idsalary);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: salaryInfo = {} } = useQuery({
        queryKey: ['payment', Idsalary],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payment/${Idsalary}`);
            return res.data;
        }
    });
       

    if(isPending){
        return <span className="loading loading-spinner text-primary"></span>
    };

console.log(salaryInfo);
const salary = salaryInfo.salary;
const amountInCents = salary*100;
console.log(amountInCents)

    const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!stripe || !elements){
        return ;
    }

    const card = elements.getElement(CardElement);
    if(!card){
        return ;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type : "card",
        card,
    });

    if(error){
        setError(error.message)
    }
    else{
        setError('');
        console.log('paymentMethod:', paymentMethod);
    }

    /// create payment intent step-2
    const res = await axiosSecure.post('/payment-intent', {
        amountInCents,
        Idsalary,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'Jenney Rosen',
            },
        },
    });

    if(result.error){
        console.log(result.error.message)
    } else{
        if(result.paymentIntent.status === "succeeded"){
            console.log("Payment succeed");
            console.log(result);
        }
    }
   
   
    // console.log('res form intent:',res)
};


    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'>
                   
                </CardElement>

                 <button type='submit' disabled={!stripe} className='btn btn-primary w-full'>
                        Pay Salary ${salary}
                    </button>
                    {error && <p className='text-red-600'>{error}</p>}


            </form>
        </div>
    );
};

export default PaymentForm;