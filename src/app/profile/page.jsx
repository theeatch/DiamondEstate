"use client";
import Link from "next/link";
import Image from "next/image";
import { doSignOut } from "@/firebase/auth";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await doSignOut();
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    
  return (
    <div className="w-full py-6 space-y-4">
      <div className="mx-auto max-w-5xl flex flex-col items-center space-y-2">
        <div className="space-y-1 text-center">
          <h1 className="text-6xl font-bold">Dhruv Negi</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome to my profile! 🌟
          </p>
        </div>
      </div>
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-5xl grid gap-4 p-4 md:grid-cols-2 md:gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold ">Contact Information</h2>
            <dl className="grid gap-2 text-sm md:grid-cols-2">
              <div>First Name</div>
              <div>Dhruv</div>
              <div>Last Name</div>
              <div>Negi</div>
              <div>Email</div>
              <div>dhclub03@gmail.com</div>
            </dl>
          </div>
        </div>
      </div>
      <div className="border-t border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-5xl grid gap-4 p-4 md:grid-cols-2 md:gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold ">Properties Information</h2>
            <dl className="grid gap-2 text-sm md:grid-cols-2">
              <div>Email</div>
              <div>dhclub03@gmail.com</div>
              <div>Website</div>
              <div>example.com</div>
              <div>Properties Bought</div>
              <div>0</div>
              <div>Properties Wanted</div>
              <div>0</div>
              <div>Flats Rental </div>
              <div>0</div>
              <div>Address</div>
              <div>123 Main St, City</div>
            </dl>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white font-semibold p-4 px-4 rounded hover:scale-110 duration-300">
          Log Out
        </button>
      </div>
    </div>
  );
}
