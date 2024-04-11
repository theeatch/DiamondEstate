"use client";
import React, { useState } from "react";
import  {doPasswordReset} from "@/firebase/auth";
import { useRouter } from "next/navigation";


const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendPasswordReset = (e) => {
    e.preventDefault();
      doPasswordReset(email);
      alert("Password reset email sent successfully");
      router.push("/login");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10 mt-20">
      <h1 className="text-4xl">Forgot Password</h1>
      <div className="flex gap-4 p-6">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          
          value={email}
          onChange={handleEmailChange}
          required
          className="border-2  border-black px-2"
        />
      </div>
      <button onClick={handleSendPasswordReset} className="bg-blue-500 text-white p-5 rounded-xl hover:scale-110">
        Send Password Reset Email
      </button>
    </div>
  );
};

export default ForgotPasswordPage;
