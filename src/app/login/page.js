"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { doSignInWithEmailAndPassword } from "@/firebase/auth";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Component() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        // Redirect to home page after successful login
        console.log("logged in", userLoggedIn)
        router.push("/");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/");
      console.log("logged in", userLoggedIn)

    }
    else{
      console.log("Not logged in", userLoggedIn);
    }
    
  }, [userLoggedIn, router]);
  if (!isClient) return null; // Guard clause for server-side rendering

  return (
    <div className="w-full h-full ">
      
      <div className="text-center mt-6">
        <Image
          alt="Logo"
          className="mx-auto"
          height={40}
          src="/logos.svg"
          width={200}
        />
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full max-w-md  space-y-6 mt-4  px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl  font-bold">Login</h1>
            <p className="text-gray-500 ">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="space-y-8 flex flex-col">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  className="ml-auto inline-block text-sm underline"
                  href="/forgotpass"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              className="mx-auto border-2 border-white rounded-lg bg-blue-500 text-white "
              variant="primary"
              type="submit"
              onClick={onSubmit}
            >
              {isSigningIn ? "Signing In..." : "Login"}
            </Button>
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link className="underline ml-2" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
