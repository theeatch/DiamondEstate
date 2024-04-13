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
        setUsername(userProfile.username);
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

  const handleUpdateUsername = async () => {
    await updateUserProfile(currentUser.uid, { username });
    alert("Username updated!");
  };

  const handleUpdateMemberSince = async () => {
    await updateUserProfile(currentUser.uid, { memberSince });
    alert("Member Since date updated!");
  };

  const handleUpdateApartmentsRented = async () => {
    await updateUserProfile(currentUser.uid, { apartmentsRented });
    alert("Flats Rented count updated!");
  };

  const handleUpdatePropertiesBought = async () => {
    await updateUserProfile(currentUser.uid, { propertiesBought });
    alert("Properties Bought count updated!");
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
    }
    else{
      console.log("logged in", userLoggedIn)
    }
    
  }, [userLoggedIn, router]);

  return (
    <>
      {userData && (
        <>
          <div className="w-full py-6">
            <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6 ">
              <div className="space-y-4">
                <h1 className="text-3xl p-2 font-bold tracking-tighter sm:text-4xl md:text-7xl text-blue-600">
                  {userData.firstName} {userData.lastName}
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
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-sm text-gray-700 truncate">
                    {userData.email}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 w-1/4 p-4 bg-gray-300 rounded-xl">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <p className="text-sm text-gray-700 truncate">
                    {userData.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-6 border-t-4 border-black">
            <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium underline ">Username</h3>
                  <input
                    className="text-2xl p-2 rounded-xl w-1/2 mx-auto"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300" onClick={handleUpdateUsername}>Update</button>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium underline ">Member Since</h3>
                  <input
                  type="date"
                    className="text-2xl  p-2 rounded-xl w-1/2 mx-auto"
                    value={memberSince}
                    onChange={(e) => setMemberSince(e.target.value)}
                  />
                  <button className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300" onClick={handleUpdateMemberSince}>Update</button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-6">
            <div className="container flex flex-col gap-2 px-4 text-center md:gap-4 md:px-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-10">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium underline ">Flats Rented</h3>
                  <input
                    type="number"
                    className="text-2xl  p-2 rounded-xl w-1/2 mx-auto"
                    value={apartmentsRented}
                    onChange={(e) => setApartmentsRented(e.target.value)}
                  />
                  <button className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300" onClick={handleUpdateApartmentsRented}>Update</button>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-medium underline ">Properties Boughts</h3>
                  <input
                    type="number"
                    className="text-2xl  p-2 rounded-xl w-1/2 mx-auto"
                    value={propertiesBought}
                    onChange={(e) => setPropertiesBought(e.target.value)}
                  />
                  <button className="p-4 w-1/3 mx-auto rounded-xl bg-blue-200 duration- border-2 hover:scale-110 hover:bg-green-300" onClick={handleUpdatePropertiesBought}>Update</button>
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
      )}
    </>
  );
}
