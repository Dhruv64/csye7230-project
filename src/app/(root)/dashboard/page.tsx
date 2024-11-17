'use client';

import { useEffect,useState } from "react";
import {useUser } from "@clerk/nextjs";



const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome, {user.fullName || `${user.firstName} ${user.lastName}`}</h1>

    </div>
  );
}

export default Dashboard