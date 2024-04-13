"use client";
import React from "react";
import { AuthProvider } from "@/contexts/authContext";

const provider = ({children}) => {
  return (
    <AuthProvider>
      

       
    </AuthProvider>
  );
};

export default provider;
