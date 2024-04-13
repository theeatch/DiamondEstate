"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const paymentAmount = 23000; // Hardcoded payment amount
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);


    const goBack = () => {
        router.push("/");
    };


    const handlePayNowClick = (e) => {
      e.preventDefault();
      setShowModal(true);
  
      setTimeout(() => {
        setShowModal(false);
      }, 3000); 
    };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-6xl text-black font-semibold">Payment Page for your 2BHK Flat!</h1>
      <p className="text-blue-500 font-semibold text-2xl">Payment Amount: <span className="text-black text-2xl">Rs {paymentAmount} </span></p>
      <p className="text-red-500 font-semibold">Note : this is only booking amount!</p>
      <form onSubmit={handlePayNowClick} className="border-8 rounded-xl flex flex-col p-6 gap-6 w-1/4">
        <label className="font-semibold" htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" className="border-2 border-gray-400 p-2" required />
        <label className="font-semibold" htmlFor="expiryDate">Expiry Date:</label>
        <input type="text" id="expiryDate" className="border-2 border-gray-400 p-2" required />
        <label className="font-semibold" htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" className="border-2 border-gray-400 p-2" required />
        <button type="submit" className="bg-blue-400 text-white hover:scale-110 rounded-xl duration-300 w-1/3 mx-auto p-1">Pay Now</button>
        <button onClick={goBack} className="bg-gray-400 text-black hover:scale-110 rounded-xl duration-300 w-1/3 mx-auto p-1">Go Back</button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Amount payed : {paymentAmount}</h2>
            <h1 className="text-4xl text-green-500 font-semibold mb-4">Flat is booked!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
