'use client'

import React, {useEffect } from "react";
import SidebarNav from '@/app/components/SideBarNav';
import DashboardHeader from '@/app/components/DashboardHeader';



const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div className="fixed md:w-64 hidden md:block">
            <SidebarNav/>
        </div>
    
        <div className="md:ml-64">
            <DashboardHeader/>
            {children}
        </div>
    </div>
  )
}

export default layout