import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { API } from "../config"
import { Outlet } from "react-router-dom";

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    const [stripeAPIKey, setStripeAPIKey] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${API}/processpayment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: sessionStorage.getItem("total") }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));

        fetch(`${API}/getStripeKey`)
            .then(response => response.json())
            .then(data => setStripeAPIKey(data.STRIPE_API_KEY))
    }, []);

    const appearance = {
        theme: 'stripe',
      };
      // Enable the skeleton loader UI for optimal loading.
      const loader = 'auto';


     return (
        stripeAPIKey && clientSecret && 
        <Elements options={{clientSecret, appearance, loader}} stripe={loadStripe(stripeAPIKey)}>
          <Outlet/>
        </Elements>
     
    )

}