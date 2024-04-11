"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCreateUserWithEmailAndPassword } from "@/firebase/auth";

export default function Component() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      // Redirect to the login page after successful registration
      router.push("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="m-auto max-w-md h-full ">
      <div className="text-center mt-6 mr-4">
        <Image
          alt="Logo"
          className="mx-auto"
          height={40}
          src="/logos.svg"
          width={200}
        />
      </div>
      <div className="space-y-2 text-center ">
        <h1 className="text-3xl font-bold mr-8">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto max-w-[300px] md:max-w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
        {error && <p className="text-red-300 text-center">{error}</p>}
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
