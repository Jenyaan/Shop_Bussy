import { Tour } from '@/app/page';
import Image from 'next/image';

interface SectionTourProps{
    Name: string;
    ColorTextNameStyle: string;
    Items: Tour[];
}


export default function SectionTour(TourData: SectionTourProps) {
  return (
    <section className="py-12 font-manrope">
      {/* Контейнер обмежує ширину на великих екранах */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок та кнопки */}
        <div className="flex justify-between items-center mb-10">
          <h2 className={`${TourData.ColorTextNameStyle} font-extrabold text-[52px] m-0`}>
            {TourData.Name}
          </h2>
          <div className="flex gap-2">
            <button className="bg-white text-black rounded-[12px] flex items-center justify-center shadow-sm w-10 h-10 hover:bg-gray-100 transition-colors">
                <Image src="/ArrowLeft.svg" alt="Flash" width={26} height={26}/>
            </button>
            <button className="bg-white text-black rounded-[12px] flex items-center justify-center shadow-sm w-10 h-10 hover:bg-gray-100 transition-colors">
              <Image src="/ArrowRight.svg" alt="Flash" width={26} height={26}/>
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {TourData.Items.map((tour) => (
            <div 
              key={tour.id} 
              className="bg-white shadow-sm shrink-0 rounded-[16px] w-[280px]"
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
                <h5 className={`font-bold text-xl mb-2 ${tour.isActive ? 'text-blue-600' : 'text-gray-900'}`}>
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
    </section>
  );
}