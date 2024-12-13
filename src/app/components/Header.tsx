'use client';
import React from "react";

interface Props{
    title: string,
    subTitle?: string
}
const Header: React.FC <Props> = ({title,subTitle}) => {
  return (
    <>
        <h2 className="h2-bold text-dark-600">{title}</h2>
        {subTitle && <p className="p-16-regular mt-4">{subTitle}</p>}
    </>
  )
}

export default Header