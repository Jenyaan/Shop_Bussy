"use client";
import Headers from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SectionTour from "@/components/SectionTour";
import Image from "next/image";

export interface Tour {
  id: number;
  city: string;
  price: number;
  duration: string;
  imageUrl: string;
  isActive?: boolean;
}

const toursData: Tour[] = [
  {
    id: 1,
    city: 'Київ',
    price: 2400,
    duration: '2 год. в дорозі',
    imageUrl: '/test/image1.png',
    isActive: true,
  },
  {
    id: 2,
    city: 'Одеса',
    price: 2400,
    duration: '2 год. в дорозі',
    imageUrl: '/test/image1.png',
  },
  {
    id: 3,
    city: 'Дніпро',
    price: 2400,
    duration: '2 год. в дорозі',
    imageUrl: '/test/image1.png',
  },
  {
    id: 4,
    city: 'Харків',
    price: 2400,
    duration: '2 год. в дорозі',
    imageUrl: '/test/image1.png',
  },
];

export default function Home() {
  
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 -z-10">

        <div className="h-[650px] bg-[#1E66F5]"></div>

        <div className="h-[50vh] bg-[#EFF1F4]"></div>

        <div className="h-full bg-[#FA742D]"></div>

      </div>

      <Headers auth={true} />

      <section className="font-manrope relative min-h-[450px] flex items-center justify-center px-6 py-20 overflow-hidden">
        
        <div className="relative text-center max-w-5xl">
          <h1 className="text-white font-extrabold leading-[1.2] tracking-tight
                          text-3xl sm:text-5xl md:text-6xl lg:text-[74px]">
            Простий спосіб купити <br className="hidden md:block" />
            квитки на автобус
          </h1>

          <div className="absolute -top-3 left-[380px] rotate-[-10deg] bg-[#FAD1E7] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <Image src="/Smile.svg" alt="Smile" width={26} height={26}/>
            <p className="text-[#E8248F]">Зручно</p>
          </div>

          <div className="absolute -bottom-7 left-16 rotate-[10deg] bg-[#FFDECC] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <Image src="/Flash.svg" alt="Flash" width={26} height={26}/>
            <p className="text-[#FA742D]">Швидко</p>
          </div>

          <div className="absolute top-20 right-14 rotate-[15deg] bg-[#E9FAD1] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <Image src="/Sale.svg" alt="Sale" width={26} height={26}/>
            <p className="text-[#25A106]">Вигідно</p>
          </div>
        </div>

      </section>

      <SearchBar />

      <div className="pt-[50px]">
       <SectionTour Name="Популярні напрямки" ColorTextNameStyle="text-black" Items={toursData}/>
      </div>

      <div className="pt-[50px]">
       <SectionTour Name="Гарячі тури" ColorTextNameStyle="text-white" Items={toursData}/>
      </div>



    </div>
  );
}
