'use client';

import React from 'react';
// Якщо ви використовуєте Next.js Link, розкоментуйте:
// import Link from 'next/link';

// Мокові дані для прикладу (зазвичай ви отримуєте їх з API)
const tripDetails = {
  id: '1',
  routeTitle: 'Київ — Одеса',
  date: '15 серпня 2026, Четвер',
  price: 2400,
  duration: '6 год. 30 хв. в дорозі',
  busName: 'Mercedes-Benz Sprinter (VIP)',
  carrier: 'AutoTrans Express',
  stops: [
    {
      id: 1,
      time: '08:00',
      city: 'Київ',
      address: 'Автостанція "Київ", вул. Симона Петлюри, 32',
      type: 'departure' // 'departure' | 'stop' | 'arrival'
    },
    {
      id: 2,
      time: '10:30',
      city: 'Жашків',
      address: 'Автостанція, вул. Макаренка, 2',
      type: 'stop'
    },
    {
      id: 3,
      time: '12:00',
      city: 'Умань',
      address: 'Автовокзал, вул. Київська, 1',
      type: 'stop'
    },
    {
      id: 4,
      time: '14:30',
      city: 'Одеса',
      address: 'Центральний автовокзал, вул. Колонтаївська, 58',
      type: 'arrival'
    }
  ]
};

export default function Info() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-manrope py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Кнопка Назад */}
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Назад до пошуку
        </button>

        {/* Заголовок сторінки */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {tripDetails.routeTitle}
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            {tripDetails.date}
          </p>
        </div>

        {/* Основний контент (2 колонки) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ліва колонка: Маршрут (Таймлайн) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Маршрут поїздки</h2>
              
              <div className="relative">
                {/* Вертикальна лінія таймлайну */}
                <div className="absolute left-[88px] sm:left-[104px] top-3 bottom-3 w-0.5 bg-gray-200"></div>

                <div className="space-y-8">
                  {tripDetails.stops.map((stop, index) => (
                    <div key={stop.id} className="relative flex items-start">
                      
                      {/* Час */}
                      <div className="w-[72px] sm:w-[88px] shrink-0 pt-0.5">
                        <span className="font-bold text-lg text-gray-900">{stop.time}</span>
                      </div>

                      {/* Точка на лінії */}
                      <div className="relative flex items-center justify-center w-8 shrink-0 mr-4 z-10">
                        {stop.type === 'departure' || stop.type === 'arrival' ? (
                          <div className="w-4 h-4 rounded-full bg-white border-[3px] border-[#1a73e8] shadow-sm"></div>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        )}
                      </div>

                      {/* Інформація про зупинку */}
                      <div className="flex-1 pb-2">
                        <h3 className={`text-xl font-bold mb-1 ${
                          stop.type === 'departure' || stop.type === 'arrival' ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {stop.city}
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base">
                          {stop.address}
                        </p>
                        
                        {/* Показуємо час в дорозі між зупинками (опціонально) */}
                        {index < tripDetails.stops.length - 1 && (
                          <div className="mt-4 inline-flex items-center px-3 py-1 bg-[#f4f4f5] rounded-lg text-sm text-gray-500 font-medium">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                            в дорозі
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Права колонка: Деталі автобуса та купівля (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[16px] p-6 shadow-sm sticky top-8">
              
              {/* Ціна */}
              <div className="mb-6">
                <span className="text-gray-500 text-sm font-medium">Вартість квитка</span>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">
                  {tripDetails.price.toLocaleString('uk-UA')} ₴
                </div>
              </div>

              {/* Характеристики поїздки */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] flex items-center justify-center text-gray-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Час в дорозі</p>
                    <p className="font-semibold text-gray-900">{tripDetails.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] flex items-center justify-center text-gray-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Транспорт</p>
                    <p className="font-semibold text-gray-900">{tripDetails.busName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f4f4f5] flex items-center justify-center text-gray-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Перевізник</p>
                    <p className="font-semibold text-gray-900">{tripDetails.carrier}</p>
                  </div>
                </div>
              </div>

              {/* Кнопка бронювання */}
              <button className="w-full bg-[#1a73e8] hover:bg-blue-600 text-white font-medium text-lg py-4 rounded-xl transition-colors shadow-sm">
                Вибрати місця
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}