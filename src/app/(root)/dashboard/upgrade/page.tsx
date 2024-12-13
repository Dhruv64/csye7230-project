'use client';

import React, { useEffect,useState } from 'react';

import { useUser } from "@clerk/nextjs";

import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../hooks/use-toast"



const Credits = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activePlan, setActivePlan] = useState('');

    const {toast} = useToast();



    useEffect(() => {
      const fetchUserPlan = async () => {
        if (!user) return;

        try {
          // Fetch the current plan for the user
          const response = await fetch(`/api/user/${user?.id}`);
          const data = await response.json();

          if (response.ok && data.plan) {
            setActivePlan(data.plan);
            if (data.plan === 'pro') {
              setSuccess(true); // Automatically mark as success if already "pro"
            }
          }
        } catch (error) {
          console.error('Error fetching user plan:', error);
        }
      };

      fetchUserPlan();
    }, [user]);




    const handleUpgradeToPro = async () => {
      if (!user) return;

      setLoading(true);
      setSuccess(false);

      try {
        // Make API call to upgrade the plan
        const response = await fetch(`/api/user/${user?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: 'pro'
          }),
        });

        if (response.ok) {
          setActivePlan('pro');
          setSuccess(true);
          toast({
            description: "Your plan has been successfully upgraded to Pro!",
        });
        } else {
          toast({
            variant: "destructive",
            description: "Failed to upgrade plan",
          });
        }
      } catch (error) {
        console.error('Error upgrading plan:', error);
      }
      
      finally {
        setLoading(false);
      }
    };


    const handleUpgradeToBasic = async () => {
      if (!user) return;

      setLoading(true);
      setSuccess(false);

      try {
        // Make API call to upgrade the plan
        const response = await fetch(`/api/user/${user?.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: 'basic'
          }),
        });

        if (response.ok) {
          setActivePlan('basic');
          setSuccess(true);
          toast({
            description: "Your plan has been reverted back to Basic!",
        });
        } else {
          toast({
            variant: "destructive",
            description: "Failed to upgrade plan",
          });
        }
      } catch (error) {
        console.error('Error upgrading plan:', error);
      }
      
      finally {
        setLoading(false);
      }
    };



  return (

    <div className="">
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">



{/* Pro Pack */}

        <div className="rounded-2xl border border-green-500 p-6 shadow-sm ring-1 ring-green-600 sm:order-last sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Pro Package (Open AI)
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                $5{" "}
              </strong>

              <span className="text-sm font-medium text-gray-700">
                /month
              </span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 20 users included </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 5GB of storage </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Help center access </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Phone support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Community access </span>
            </li>
          </ul>

          <div className='text-center mt-5'>
              <Button onClick={handleUpgradeToPro} disabled={activePlan === 'pro'}>
                  {loading ? 'Upgrading...' : activePlan === 'pro' ? 'Pro Activated' : 'Purchase Now'}
              </Button>
        </div>
        </div>




{/* Starter Pack */}

        <div className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Basic Package (Groq AI)
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                Free{" "}
              </strong>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 10 users included </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 2GB of storage </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Email support </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Help center access </span>
            </li>
          </ul>


          <div className='text-center mt-5'>
           <Button  onClick={handleUpgradeToBasic} disabled={activePlan === 'basic'}>
                  {loading ? 'Upgrading...' : activePlan === 'basic' ? 'Basic Activated' : 'Switch to Basic Plan'}
            </Button>
        </div>

        </div>


      </div>
    </div>
  </div>
);
  
}

export default Credits