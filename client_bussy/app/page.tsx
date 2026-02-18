"use client";
import Headers from "@/components/Header";

export default function Home() {
  return (
    <div>
      <Headers auth={true} />

      <section className="font-manrope relative min-h-[450px] flex items-center justify-center px-6 py-20 overflow-hidden">
        
        {/* Контейнер для текста и Badge */}
        <div className="relative text-center max-w-5xl">
          {/* Title */}
          <h1 className="text-white font-extrabold leading-[1.2] tracking-tight
                          text-3xl sm:text-5xl md:text-6xl lg:text-[74px]">
            Простий спосіб купити <br className="hidden md:block" />
            квитки на автобус
          </h1>

          {/* Badge 1 */}
          <div className="absolute -top-3 left-[380px] rotate-[-10deg] bg-[#F7C6DC] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <span className="text-pink-600 text-lg">😊</span>
            <p className="text-pink-600">Зручно</p>
          </div>

          {/* Badge 2 */}
          <div className="absolute -bottom-7 left-16 rotate-[10deg] bg-[#F5D0B5] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <span className="text-orange-500 text-lg">⚡</span>
            <p className="text-orange-600">Швидко</p>
          </div>

          {/* Badge 3 */}
          <div className="absolute top-20 right-14 rotate-[15deg] bg-[#D4F2D0] px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <span className="text-green-600 text-lg">🍀</span>
            <p className="text-green-700">Вигідно</p>
          </div>
        </div>

      </section>
    </div>
  );
}
