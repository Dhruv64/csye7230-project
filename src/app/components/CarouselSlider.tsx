"use client";
import React from "react";
import { Carousel, Card } from "../../components/ui/apple-cards-carousel";
import {carouselData} from '../../constants/data';


export default function CarouselSlider() {
  const cards = carouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true}/>
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your Application.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
