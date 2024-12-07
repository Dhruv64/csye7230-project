'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuList } from "../../constants/sidebarMenuList";

const SidebarNav = () => {
  const path = usePathname();



  return (
    <div className="h-screen p-5 border shadow-md">
      <div className="flex flex-row items-center gap-4">
        <Image src="/expenseLogo.png" height={40} width={50} alt="logo" />
        <span className="hidden sm:block text-green-700 font-bold text-2xl italic">Expense Tracker</span>
      </div>

      <div className="mt-5">
        {menuList.map((menu,index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-green-100
                ${path == menu.path && 'text-primary bg-green-100'}
              `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;