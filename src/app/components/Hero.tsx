"use client";

import Image from 'next/image';
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import { Typewriter } from 'react-simple-typewriter'
import React from 'react';



const Hero = () => {
  return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                <>
                    <h1 className="text-4xl font-semibold text-black dark:text-white">
                    Transform Your Financial Journey with an AI-Driven 
                    <br />
                    <span className="text-4xl md:text-[6rem] text-green-500 font-bold mt-1 leading-none">
                    <Typewriter
                        words={['FINANCIAL ADVISOR']}
                        loop={1}
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        />
                    </span>
                    </h1>
                </>
                }
            >
                <Image
                src='/dummyImage.png'
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
                />
            </ContainerScroll>
        </div>
  )
}

export default Hero