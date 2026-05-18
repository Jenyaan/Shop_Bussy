"use client";

import React, { useState } from 'react';
import { 
  User, ChevronRight, Bell, Mail, 
  Info, Clock, ArrowRightLeft, Check, ChevronUp,
  Wifi, Wind, Zap, Tv, Coffee, UtilityPole
} from 'lucide-react';
import Header from '@/components/Header';
import SeatSelectionModal from '@/components/modals/SeatSelectionModal';

// Масив доступних зручностей
const AVAILABLE_AMENITIES = [
  { id: 'wifi', icon: Wifi, label: 'Безкоштовний Wi-Fi' },
  { id: 'ac', icon: Wind, label: 'Кондиціонер' },
  { id: 'power', icon: Zap, label: 'Розетки / USB' },
  { id: 'wc', icon: UtilityPole, label: 'Туалет' },
  { id: 'tv', icon: Tv, label: 'Мультимедіа / ТБ' },
  { id: 'drinks', icon: Coffee, label: 'Гарячі напої' },
];

// Вспомогательный компонент для заголовков
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1.5 h-6 bg-orange-500 rounded-full shrink-0"></div>
    <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
  </div>
);

// Компонент для отрисовки одной точки на маршруте (остановка)
const TimelineNode = ({ 
  time, date, title, subtitle, isFirst, isLast 
}: { 
  time: string, date?: string, title: string, subtitle?: string, isFirst?: boolean, isLast?: boolean 
}) => (
  <div className="grid grid-cols-[60px_24px_1fr] gap-x-2">
    {/* Время и дата */}
    <div className="text-right pt-[2px]">
      <div className="font-bold text-gray-900 text-sm md:text-base">{time}</div>
      {date && <div className="text-[10px] text-gray-400 leading-tight mt-0.5">{date}</div>}
    </div>
    
    {/* Линия и маркер */}
    <div className="flex flex-col items-center h-full">
      {!isFirst && <div className="w-[2px] bg-gray-200 h-2 -mb-1 shrink-0"></div>}
      
      {isFirst ? (
        <div className="w-3.5 h-3.5 bg-orange-500 rounded-full z-10 shrink-0"></div>
      ) : (
        <div className="w-3.5 h-3.5 bg-white border-[2.5px] border-orange-500 rounded-full z-10 shrink-0"></div>
      )}
      
      {!isLast && <div className="w-[2px] bg-gray-200 grow -mt-1"></div>}
    </div>
    
    {/* Информация о станции */}
    <div className="pb-6">
      <div className="font-semibold text-gray-900">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  </div>
);

const CheckoutPage: React.FC = () => {
  const [agreed, setAgreed] = useState(false);
  const [showStops1, setShowStops1] = useState(false);
  const [showStops2, setShowStops2] = useState(false);
  
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const stopsList1 = [
    { time: "14:30", name: "Дунаївці", address: "Автостанція, вул. Шевченка, 50" },
    { time: "15:10", name: "Ярмолинці", address: "Автостанція, площа Леніна" },
    { time: "16:00", name: "Хмельницький", address: "Автовокзал №1, Вінницьке шосе, 23" },
  ];

  const stopsList2 = [
    { time: "01:00", name: "Краків", address: "Dworzec Autobusowy MDA" },
    { time: "05:30", name: "Вроцлав", address: "Dworzec Wrocław" },
  ];

  return (
    // Заменили font-sans на font-manrope
    <div className="min-h-screen bg-gray-100 font-manrope pb-12">
      <Header />

      <main className="max-w-6xl mx-auto pt-8 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- ЛЕВАЯ КОЛОНКА --- */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <SectionTitle>Пасажир №1</SectionTitle>
            <p className="text-gray-500 text-sm mb-6">Ці дані необхідні для бронювання та перевірки під час посадки в автобус.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Ім'я *</label>
                <input type="text" placeholder="Введіть ім'я" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors placeholder-gray-300 text-gray-900" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Прізвище *</label>
                <input type="text" placeholder="Введіть прізвище" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors placeholder-gray-300 text-gray-900" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <SectionTitle>Бронювання місця</SectionTitle>
            <button 
              onClick={() => setIsSeatModalOpen(true)}
              className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition border border-gray-100 rounded-xl p-4 mt-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                  <User size={20} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {selectedSeat ? `Місце: ${selectedSeat}` : 'Виберіть місце'}
                  </div>
                  <div className="text-sm text-gray-500">Вартість від 600 ₴</div>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </button>
          </section>

          {/* --- ОБНОВЛЕННАЯ СЕКЦИЯ ПОКУПАТЕЛЯ --- */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <SectionTitle>Інформація про покупця</SectionTitle>
            <p className="text-gray-500 text-sm mb-6">Введіть електронну пошту та телефон для ідентифікації, входу в особистий кабінет і повернення квитка. Квиток буде надіслано на електронну пошту.</p>
            
            {/* Единый контейнер для инпутов */}
            <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden mb-6 focus-within:border-blue-500 transition-colors">
              
              {/* Блок с телефоном */}
              <div className="flex flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex items-center gap-2 px-4 bg-gray-50 border-r border-gray-200">
                  <span className="text-sm font-medium text-gray-400">UA</span>
                  <ChevronRight size={14} className="rotate-90 text-gray-400" />
                </div>
                <div className="flex-1 px-4 py-2 bg-white">
                  <label className="block text-xs text-gray-500 mb-0.5">Ваш номер телефону *</label>
                  <input type="tel" defaultValue="+380" className="w-full bg-transparent outline-none text-gray-900 text-sm" />
                </div>
              </div>
              
              {/* Блок с email */}
              <div className="flex-1 px-4 py-2 bg-white">
                <label className="block text-xs text-gray-500 mb-0.5">Ваш email *</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-300 text-sm" />
              </div>
              
            </div>

            {/* Информационные плашки внизу */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-orange-500" /> Будемо на зв'язку під час подорожі
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500" /> Надішлемо квиток на пошту
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-6 mt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors shrink-0 ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`} onClick={() => setAgreed(!agreed)}>
                {agreed && <Check size={14} className="text-white" />}
              </div>
              <span className="text-sm text-gray-600 leading-tight">
                <span className="text-red-500">*</span> Я приймаю <a href="#" className="text-blue-600 hover:underline">Правила та умови</a>, <a href="#" className="text-blue-600 hover:underline">Політику конфіденційності</a>, <a href="#" className="text-blue-600 hover:underline">Договір оферти і погоджуюсь</a> на розсилку по електронній пошті, від якої я можу відмовитись в будь-який час.
              </span>
            </label>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Продовжити <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- ПРАВАЯ КОЛОНКА (С БИЛЕТОМ) --- */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-orange-200 rounded-xl p-4 flex items-start gap-3 shadow-sm">
            <Info className="text-orange-500 shrink-0 mt-0.5" size={20} />
            <div className="text-sm">
              <p className="text-gray-800 mb-1">Для перетину кордону, будь ласка, ознайомтесь з переліком необхідних документів.</p>
              <a href="#" className="text-blue-600 hover:underline">Правила перетину</a>
            </div>
          </div>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <SectionTitle>Про рейс</SectionTitle>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <Clock size={14} /> <span className="font-medium text-gray-900">26 год 40 хв</span>
              </div>
            </div>

            {/* --- ЧАСТЬ 1 --- */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">KLR</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">KLR Bus [BA 5678 KI]</div>
                  <div className="text-gray-500 text-xs">Van Hool • 128 місць</div>
                </div>
              </div>
              {/* Блок з іконками зручностей */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={amenity.id} className="text-gray-400 hover:text-blue-500 transition-colors cursor-help" title={amenity.label}>
                      <Icon size={16} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Таймлайн первой части маршрута */}
            <div className="mb-2">
              <TimelineNode 
                time="13:50" date="05 трав, нд" 
                title="Кам'янець-Подільський" 
                subtitle={`Автовокзал "Кам'янець-Подільський", вул. Князів Коріатовичів, 19`}
                isFirst={true} 
              />
              
              {showStops1 ? (
                <>
                  {stopsList1.map((stop, idx) => (
                    <TimelineNode 
                      key={idx} time={stop.time} title={stop.name} subtitle={stop.address}
                    />
                  ))}
                  <div className="grid grid-cols-[60px_24px_1fr] gap-x-2">
                    <div></div>
                    <div className="flex flex-col items-center h-full"><div className="w-[2px] bg-gray-200 h-full"></div></div>
                    <div className="pb-6">
                      <button onClick={() => setShowStops1(false)} className="text-blue-600 text-sm flex items-center gap-1 hover:underline select-none">
                        Сховати зупинки <ChevronUp size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-[60px_24px_1fr] gap-x-2">
                  <div></div>
                  <div className="flex flex-col items-center h-full"><div className="w-[2px] bg-gray-200 h-full"></div></div>
                  <div className="pb-6">
                    <button onClick={() => setShowStops1(true)} className="text-blue-600 text-sm flex items-center gap-1 hover:underline select-none">
                      Показати проміжні зупинки ({stopsList1.length}) <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              <TimelineNode 
                time="23:20" date="05 трав, нд"
                title="Львів" subtitle="KLR Bus Terminal, вул. Скнилівська 10, Сокільники"
                isLast={true}
              />
            </div>

            {/* Плашка пересадки */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
                <ArrowRightLeft size={14} /> Пересадка
              </div>
            </div>

            {/* --- ЧАСТЬ 2 --- */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0">KLR</div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">KLR Bus [BA 5678 KI]</div>
                  <div className="text-gray-500 text-xs">Van Hool • 128 місць</div>
                </div>
              </div>
              {/* Блок з іконками зручностей */}
              <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-200">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={amenity.id} className="text-gray-400 hover:text-blue-500 transition-colors cursor-help" title={amenity.label}>
                      <Icon size={16} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Таймлайн второй части маршрута */}
            <div>
              <TimelineNode 
                time="23:20" date="05 трав, нд"
                title="Львів" subtitle="KLR Bus Terminal, вул. Скнилівська 10, Сокільники"
                isFirst={true} 
              />
              
              {showStops2 ? (
                <>
                  {stopsList2.map((stop, idx) => (
                    <TimelineNode 
                      key={idx} time={stop.time} title={stop.name} subtitle={stop.address}
                    />
                  ))}
                  <div className="grid grid-cols-[60px_24px_1fr] gap-x-2">
                    <div></div>
                    <div className="flex flex-col items-center h-full"><div className="w-[2px] bg-gray-200 h-full"></div></div>
                    <div className="pb-6">
                      <button onClick={() => setShowStops2(false)} className="text-blue-600 text-sm flex items-center gap-1 hover:underline select-none">
                        Сховати зупинки <ChevronUp size={16} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-[60px_24px_1fr] gap-x-2">
                  <div></div>
                  <div className="flex flex-col items-center h-full"><div className="w-[2px] bg-gray-200 h-full"></div></div>
                  <div className="pb-6">
                    <button onClick={() => setShowStops2(true)} className="text-blue-600 text-sm flex items-center gap-1 hover:underline select-none">
                      Показати проміжні зупинки ({stopsList2.length}) <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              <TimelineNode 
                time="16:30" date="06 трав, пн"
                title="Берлін" subtitle="ZOB, Masurenallee, 4-6"
                isLast={true}
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between items-center text-gray-900">
                <span>Пасажир №1</span><span className="font-medium">4 270 ₴</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Місце: {selectedSeat ? selectedSeat : '(не вибрано)'}</span><span>+ 0 ₴</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">До сплати:</span>
              <span className="text-2xl font-bold text-orange-500">4 270 ₴</span>
            </div>
          </section>

        </div>
      </main>

      <SeatSelectionModal 
        isOpen={isSeatModalOpen} 
        onClose={() => setIsSeatModalOpen(false)}
        onSelect={(seat) => setSelectedSeat(seat)}
      />
    </div>
  );
};

export default CheckoutPage;