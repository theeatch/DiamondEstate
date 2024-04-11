"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const paymentAmount = 2500000; // Hardcoded payment amount
    const router = useRouter();

    const goBack = () => {
        router.push("/");
    };


  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl text-black font-semibold">Payment Page</h1>
      <p className="text-blue-500 font-semibold">Payment Amount: <span className="text-black">Rs {paymentAmount} </span></p>
      <div className="border-8 rounded-xl flex flex-col p-6 gap-6 w-1/4">
        <label className="font-semibold" htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" className="border-2 border-gray-400 p-2" required />
        <label className="font-semibold" htmlFor="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" className="border-2 border-gray-400 p-2" required />
        <label className="font-semibold" htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" className="border-2 border-gray-400 p-2" required />
        <button className="bg-blue-400 text-white hover:scale-110 rounded-xl duration-300 w-1/3 mx-auto p-1">Pay Now</button>
        <button onClick={goBack} className="bg-gray-400 text-black hover:scale-110 rounded-xl duration-300 w-1/3 mx-auto p-1">Go Back</button>
      </div>
    </div>
  );
};

export default PaymentPage;
