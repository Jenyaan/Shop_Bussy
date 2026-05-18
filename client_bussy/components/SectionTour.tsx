'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tour } from '@/app/page';

interface SectionTourProps {
  Name: string;
  ColorTextNameStyle: string;
  Items: Tour[];
}

export default function SectionTour({ Name, ColorTextNameStyle, Items }: SectionTourProps) {
  // Стан для поточного індексу слайдера
  const [currentIndex, setCurrentIndex] = useState(0);

  // Кількість карток, які показуються одночасно
  const itemsToShow = 4;
  
  // Максимальний індекс, до якого можна гортати
  const maxIndex = Math.max(0, Items.length - itemsToShow);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Ширина однієї картки (280px) + відступ gap-8 (32px) = 312px
  const cardWidthWithGap = 312;

  return (
    <section className="py-12 font-manrope">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок та кнопки */}
        <div className="flex justify-between items-center mb-10">
          <h2 className={`${ColorTextNameStyle} font-extrabold text-[52px] m-0`}>
            {Name}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`bg-white text-black rounded-[12px] flex items-center justify-center shadow-sm w-10 h-10 transition-colors ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
                <Image src="/ArrowLeft.svg" alt="Prev" width={26} height={26}/>
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`bg-white text-black rounded-[12px] flex items-center justify-center shadow-sm w-10 h-10 transition-colors ${
                currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              <Image src="/ArrowRight.svg" alt="Next" width={26} height={26}/>
            </button>
          </div>
        </div>

        {/* Обгортка слайдера з прихованим overflow */}
        <div className="overflow-hidden w-full pb-4">
          {/* Трек слайдера, який рухається за допомогою transform */}
          <div 
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * cardWidthWithGap}px)` }}
          >
            {Items.map((tour) => (
              <div 
                key={tour.id} 
                // Додано: group (для відстеження наведення на всю картку) та cursor-pointer (курсор миші)
                className="group cursor-pointer bg-white shadow-sm shrink-0 rounded-[16px] w-[280px] hover:shadow-md transition-shadow"
              >
                <div className="pt-2 px-2 w-full">
                  <div className="relative w-full rounded-xl overflow-hidden h-[160px]">
                    <Image
                      src={tour.imageUrl}
                      alt={tour.city}
                      fill
                      className="object-cover" 
                      sizes="280px"
                    />
                  </div>
                </div>

                <div className="p-4 pt-3">
                  {/* Додано: transition-colors та group-hover:text-blue-600 */}
                  <h5 className={`font-bold text-xl mb-2 transition-colors ${
                    tour.isActive 
                      ? 'text-blue-600' 
                      : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {tour.city}
                  </h5>
                  
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-500 mr-2" viewBox="0 0 16 16">
                      <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14v-5H.5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1.717zM15 9.5H1v4.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5zM4 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-4-1h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1"/>
                    </svg>
                    <span className="font-medium text-gray-900">
                      від {tour.price.toLocaleString('uk-UA')} ₴
                    </span>
                  </div>
                  
                  <small className="text-gray-500 text-sm">
                    {tour.duration}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}