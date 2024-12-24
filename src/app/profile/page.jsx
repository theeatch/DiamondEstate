"use client";
import Link from "next/link";
import Image from "next/image";
import { doSignOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/firebase/auth";

export default function ProfilePage() {
  const { currentUser, userLoggedIn, setUserLoggedIn } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [apartmentsRented, setApartmentsRented] = useState("");
  const [propertiesBought, setPropertiesBought] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (userLoggedIn) {
        const userProfile = await getUserProfile(currentUser.uid);
        setUserData(userProfile);
        setUsername(userProfile.firstName + " " + userProfile.lastName);
        setMemberSince(userProfile.memberSince);
        setApartmentsRented(userProfile.apartmentsRented);
        setPropertiesBought(userProfile.propertiesBought);
      } else {
        // Redirect to login if user is not logged in
        router.push("/login");
      }
    };

    fetchUserData();
  }, [userLoggedIn, router, currentUser]);

  const showToast = (message) => {
    // Simple toast notification
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "20px";
    toast.style.backgroundColor = "#00ff00";
    toast.style.color = "#00000";
    toast.style.fontWeight = "600";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    toast.style.zIndex = "1000";

    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleUpdateUsername = async () => {
    // Simulate update
    console.log("Username updated!");
    showToast("Username updated!");
  };

  const handleUpdateMemberSince = async () => {
    // Simulate update
    console.log("Member Since date updated!");
    showToast("Member Since date updated!");
  };

  const handleUpdateApartmentsRented = async () => {
    // Simulate update
    console.log("Flats Rented count updated!");
    showToast("Flats Rented count updated!");
  };

  const handleUpdatePropertiesBought = async () => {
    // Simulate update
    console.log("Properties Bought count updated!");
    showToast("Properties Bought count updated!");
  };

  const handleSignOut = async () => {
    try {
      await doSignOut();
      router.push("/login");
      setUserLoggedIn(false);

      console.log("logged out", userLoggedIn);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userLoggedIn) {
      router.replace("/login");
      console.log("Not logged in", userLoggedIn);
    } else {
      console.log("logged in", userLoggedIn);
    }
  }, [userLoggedIn, router]);

  return (
    <>
      <>
        <div className="w-full py-6">
          <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6 ">
            <div className="space-y-4">
              <h1 className="text-3xl p-2 font-bold tracking-tighter sm:text-4xl md:text-7xl text-blue-600">
                {userData?.username}
              </h1>
              <p className="inline mx-auto text-gray-800 md:text-base/relaxed lg:text-xl/relaxed xl:text-base/relaxed">
                Welcome to my profile
              </p>
            </div>
          </div>
        </div>

        <div className="w-full py-6">
          <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6">
            <div className="flex justify-around gap-6">
              <div className="flex flex-col gap-1.5 w-1/4 p-4 bg-gray-300 rounded-xl">
                <h3 className="text-4xl text-green-700 font-medium">Email</h3>
                <p className="text-sm text-gray-700 truncate">
                  {userData?.email}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-1/4 p-4 bg-gray-300 rounded-xl">
                <h3 className="text-4xl text-green-700 font-medium">Phone</h3>
                <p className="text-sm text-gray-700 truncate">
                  {userData?.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-6 border-t-4 border-black">
          <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-4xl text-green-700 font-medium underline ">
                  Username
                </h3>
                <input
                  type="text"
                  className="text-2xl p-2 rounded-2xl w-1/2 mx-auto text-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  defaultValue={userData?.username}
                />
                <button
                  className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300"
                  onClick={handleUpdateUsername}
                >
                  Update
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-4xl text-green-700 font-medium underline ">
                  Member Since
                </h3>
                <input
                  type="date"
                  className="text-2xl  p-2 rounded-xl w-1/2 mx-auto"
                  value={memberSince}
                  onChange={(e) => setMemberSince(e.target.value)}
                  defaultValue={userData?.memberSince}
                />
                <button
                  className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300"
                  onClick={handleUpdateMemberSince}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-6">
          <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-4xl text-green-700 font-medium underline ">
                  Flats Rented
                </h3>
                <input
                  type="number"
                  className="text-2xl  p-2 rounded-xl w-1/2 mx-auto"
                  value={apartmentsRented}
                  onChange={(e) => setApartmentsRented(e.target.value)}
                  defaultValue={userData?.apartmentsRented}
                />
                <button
                  className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300"
                  onClick={handleUpdateApartmentsRented}
                >
                  Update
                </button>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-4xl text-green-900 font-medium underline ">
                  Properties Boughts
                </h3>
                <div className="text-2xl pt-2">
                  {userData?.propertiesBought}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 ">
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-400 hover:text-gray-800 text-white font-semibold p-4 px-4 rounded-lg shadow-md hover:shadow-lg duration-300"
          >
            Log Out
          </button>
        </div>
      </>
    </>
  );
}
