'use client'

import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useUser,UserButton } from '@clerk/nextjs'
import Link from 'next/link'



const HeaderBar = () => {
    const {user, isSignedIn} = useUser()

    return (
        <div className="p-5 flex justify-between items-center border shadow-md">
            <div className='flex flex-row items-center gap-2'>
                <Image src="/expenseLogo.png" height={40} width ={50} alt="logo"/>
                <span className='hidden sm:block  text-green-700 font-bold text-2xl italic  '>Expense Tracker</span>
            </div>

            {isSignedIn ? <UserButton/> :(
                <div className='flex gap-5 items-center'>
                <Link href="/dashboard">
                    <Button variant='outline' className='rounded-full italic'>Dashboard</Button>
                </Link>
                <Link href="/sign-in">
                    <Button  className='rounded-full italic'>Getting Started</Button>
                </Link>
                </div>
            )}
        </div>
    )
}

export default HeaderBar