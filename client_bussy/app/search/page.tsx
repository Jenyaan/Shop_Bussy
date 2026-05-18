"use client";
import React from "react";
import Headers from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import TicketCard, { Ticket } from "@/components/TicketCard";
import { 
  ArrowRight, 
  SlidersHorizontal, 
  ChevronDown, 
  Clock, 
  Banknote, 
  MapPin
} from "lucide-react";

const MOCK_TICKETS: Ticket[] = [
  {
    id: '#98742130',
    route: 'Умань → Штутгарт',
    price: 3766,
    status: 'active',
    departure: { time: '08:30', date: '12 жов, вс', city: 'Умань', station: 'Уманський автовокзал' },
    arrival: { time: '20:35', date: '13 жов, пн', city: 'Штутгарт', station: 'SAB Echterdingen Flughafen' },
    duration: '2 дні',
    seat: '53',
    passenger: 'ЄВГЕНІЙ МИЩЕНКО',
    carrier: { name: 'KLR Bus', plate: 'BA 5678 KI', model: 'Van Hool', seats: '128 місць' },
    stops: [
      { time: '08:30', date: '12 жов, вс', city: 'Умань', address: 'Ул. Пушкина, д. Колотушкина' },
      { time: '12:00', city: 'Вінниця', address: 'Центральний автовокзал' },
      { time: '16:45', city: 'Хмельницький', address: 'Автовокзал №1' },
      { time: '21:30', city: 'Львів', address: 'Стрийський автовокзал' },
      { time: '05:00', date: '13 жов, пн', city: 'Краків', address: 'Dworzec Autobusowy MDA' },
      { time: '20:35', city: 'Штутгарт', address: 'SAB Echterdingen Flughafen' },
    ]
  },
  {
    id: '#12345678',
    route: 'Київ → Варшава',
    price: 7521,
    status: 'used',
    departure: { time: '09:00', date: '15 жов, нд', city: 'Київ', station: 'Київський автовокзал' },
    arrival: { time: '22:15', date: '16 жов, вів', city: 'Варшава', station: 'Аеропорт Варшава' },
    duration: '1 день',
    seat: '45',
    passenger: 'ОЛЕГ ІВАНЕНКО',
    stops: [
      { time: '09:00', date: '15 жов, нд', city: 'Київ', address: 'Київський автовокзал' },
      { time: '22:15', date: '16 жов, вів', city: 'Варшава', address: 'Аеропорт Варшава' },
    ]
  }
];

// Мокові дані для стрічки дат
const DATES_RIBBON = [
  { date: '10 жов, пт', price: '4 100 ₴', active: false },
  { date: '11 жов, сб', price: '3 950 ₴', active: false },
  { date: '12 жов, нд', price: '3 766 ₴', active: true },
  { date: '13 жов, пн', price: '4 200 ₴', active: false },
  { date: '14 жов, вт', price: '4 500 ₴', active: false },
];

export default function SearchResultsPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] font-manrope">
      
      {/* Шапка и блок поиска */}
      <div className="bg-[#1E66F5] pb-12 pt-4">
        <Headers auth={true} />
        
        <div className="container mx-auto px-6 mt-10">
          {/* Контекстний заголовок маршруту */}
          <div className="flex flex-col items-center justify-center text-white mb-8">
            <div className="flex items-center gap-4 text-3xl font-bold tracking-wide">
              <span>Умань</span>
              <ArrowRight className="text-blue-200" size={28} />
              <span>Штутгарт</span>
            </div>
            <p className="text-blue-100 font-medium mt-2">12 жовтня • 1 пасажир</p>
          </div>

          <SearchBar />
        </div>
      </div>

      {/* Основной контент */}
      <main className="container mx-auto px-6 pt-10 pb-24">
        
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* =========================================
              САЙДБАР (Фільтри)
              ========================================= */}
          <aside className="w-full lg:w-[280px] shrink-0 sticky top-6 hidden lg:flex flex-col gap-6">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-bold text-gray-900">Фільтри</h3>
                <SlidersHorizontal size={18} className="text-gray-400" />
              </div>

              {/* Блок фільтру: Час */}
              <div className="border-b border-gray-100 pb-5 mb-5">
                <h4 className="flex items-center gap-2 text-[15px] font-semibold text-gray-800 mb-4">
                  <Clock size={16} className="text-[#1E66F5]" /> Час відправлення
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1E66F5] focus:ring-[#1E66F5]" />
                    <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">Ранкові (06:00 - 12:00)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#1E66F5] focus:ring-[#1E66F5]" />
                    <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">Денні (12:00 - 18:00)</span>
                  </label>
                </div>
              </div>

              {/* Блок фільтру: Ціна */}
              <div className="border-b border-gray-100 pb-5 mb-5">
                <h4 className="flex items-center gap-2 text-[15px] font-semibold text-gray-800 mb-4">
                  <Banknote size={16} className="text-[#1E66F5]" /> Вартість
                </h4>
                <input type="range" className="w-full accent-[#1E66F5]" />
                <div className="flex justify-between text-[13px] text-gray-500 mt-2 font-medium">
                  <span>1 000 ₴</span>
                  <span>10 000+ ₴</span>
                </div>
              </div>

              {/* Блок фільтру: Пересадки */}
              <div>
                <h4 className="flex items-center gap-2 text-[15px] font-semibold text-gray-800 mb-4">
                  <MapPin size={16} className="text-[#1E66F5]" /> Пересадки
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="stops" className="w-4 h-4 text-[#1E66F5] focus:ring-[#1E66F5]" defaultChecked />
                    <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">Всі рейси</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="stops" className="w-4 h-4 text-[#1E66F5] focus:ring-[#1E66F5]" />
                    <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">Без пересадок</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-[#EFF1F4] hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl text-[14px] transition-colors">
                Скинути фільтри
              </button>
            </div>
          </aside>

          {/* =========================================
              КОЛОНКА З РЕЗУЛЬТАТАМИ 
              ========================================= */}
          <div className="w-full flex-1 space-y-6">
            
            {/* Стрічка дат (Date Ribbon) */}
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {DATES_RIBBON.map((day, idx) => (
                <button 
                  key={idx}
                  className={`flex flex-col items-center justify-center min-w-[100px] py-2 px-4 rounded-2xl border transition-all ${
                    day.active 
                      ? 'bg-[#1E66F5] border-[#1E66F5] text-white shadow-md' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#1E66F5] hover:text-[#1E66F5]'
                  }`}
                >
                  <span className={`text-[13px] mb-0.5 ${day.active ? 'font-medium' : ''}`}>{day.date}</span>
                  <span className={`text-[15px] font-bold ${day.active ? 'text-white' : 'text-gray-900'}`}>{day.price}</span>
                </button>
              ))}
            </div>

            {/* Плашка з кількістю та сортуванням */}
            <div className="bg-white rounded-[20px] p-4 px-6 shadow-sm border border-gray-100 flex items-center justify-between">
              <span className="text-[15px] text-gray-600">
                Знайдено <span className="font-bold text-gray-900 text-[16px]">{MOCK_TICKETS.length}</span> рейси
              </span>
              
              <button className="flex items-center gap-2 text-[14px] font-medium text-gray-700 hover:text-[#1E66F5] transition-colors group cursor-pointer">
                Сортувати: <span className="text-[#1E66F5]">Найдешевші</span>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-[#1E66F5] transition-colors" />
              </button>
            </div>
            
            {/* Вывод списка билетов */}
            <div className="flex flex-col gap-6">
              {MOCK_TICKETS.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}