import Image from "next/image";
import HeaderBar from '@/app/components/HeaderBar'
import Hero from "./components/Hero";
import CarouselSlider from "./components/CarouselSlider";

export default function Home() {
  return (
    <>
    <HeaderBar/>
    <section className='bg-gray-100 flex-col overflow-hidden'>
        <Hero/>
        <CarouselSlider/>
    </section>
    </>
  );
}
