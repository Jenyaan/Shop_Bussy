'use client';

import React, { useState } from 'react';
import { 
  User, 
  History, 
  Settings, 
  LogOut, 
  Bus, 
  Armchair, 
  Info, 
  Share2, 
  Download,
  Signpost
} from 'lucide-react';
import RouteModal from '@/components/modals/RouteModal';
import ProfileModal from '@/components/modals/ProfileModal';
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal'; // 1. Імпортуємо нову модалку
import Headers from "@/components/Header";

// ... ТИПІЗАЦІЯ І МОКОВІ ДАНІ ЗАЛИШАЮТЬСЯ БЕЗ ЗМІН ...
interface RouteStop {
  time: string;
  date?: string;
  city: string;
  address: string;
}

interface Ticket {
  id: string;
  route: string;
  price: number;
  status: 'active' | 'used';
  departure: { time: string; date: string; city: string; station: string; };
  arrival: { time: string; date: string; city: string; station: string; };
  duration: string;
  seat: string;
  passenger: string;
  stops: RouteStop[];
  carrier?: { name: string; plate: string; model: string; seats: string; };
}

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

export default function TicketsPage() {
  const [filter, setFilter] = useState<'active' | 'all'>('all');
  
  // 2. Додаємо 'logout' в можливі стани активної модалки
  const [activeModal, setActiveModal] = useState<'route' | 'profile' | 'logout' | null>(null);
  const [currentRouteStops, setCurrentRouteStops] = useState<RouteStop[]>([]);

  const openRouteModal = (stops: RouteStop[]) => {
    setCurrentRouteStops(stops);
    setActiveModal('route');
  };

  const handleLogout = () => {
    // Тут буде логіка очищення токенів/кукі та редірект
    console.log('Користувач вийшов з акаунта');
    setActiveModal(null);
    // window.location.href = '/'; 
  };

  return (
    <div>
        <Headers auth={true} />
 
        <div className="min-h-screen bg-[#F3F4F6] px-8 pb-8 pt-21 font-manrope text-slate-800 flex justify-center">                
            <div className="max-w-6xl w-full flex gap-8">
                
                {/* --- SIDEBAR --- */}
                <aside className="w-72 flex-shrink-0 space-y-4">
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <User size={24} />
                    </div>
                    <div className="overflow-hidden">
                    <h3 className="font-semibold truncate">Євгеній Мищенко</h3>
                    <p className="text-sm text-gray-500 truncate">jekaniks34@gmail.com</p>
                    </div>
                </div>

                <nav className="bg-white rounded-2xl p-2 shadow-sm flex flex-col gap-1">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-gray-50 text-gray-900 font-medium transition-colors">
                    <History size={20} className="text-orange-500" />
                    Історія покупок
                    </button>
                    
                    <button 
                      onClick={() => setActiveModal('profile')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                    >
                      <Settings size={20} className="text-gray-400" />
                      Змінити дані
                    </button>

                    {/* 3. Вішаємо відкриття модалки на кнопку виходу */}
                    <button 
                      onClick={() => setActiveModal('logout')}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 text-red-500 font-medium mt-2 transition-colors cursor-pointer"
                    >
                      <LogOut size={20} className="text-red-400" />
                      Вийти з акаунта
                    </button>
                </nav>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Історія покупок</h1>
                    <div className="bg-white rounded-xl p-1 flex ">
                    <button 
                        onClick={() => setFilter('active')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'active' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Активні
                    </button>
                    <button 
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Усі квитки
                    </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {MOCK_TICKETS.map((ticket) => (
                    <div 
                        key={ticket.id} 
                        className="bg-white rounded-t-[24px] border-x border-t border-gray-100 relative mb-6"
                    >
                        {/* --- ШАПКА БИЛЕТА --- */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                        <div className="text-[22px] font-medium text-gray-900 flex items-center gap-2.5">
                            {ticket.route} <span className="text-gray-400 text-lg">•</span> {ticket.price} ₴
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${
                            ticket.status === 'active' 
                            ? 'bg-[#E8F5E9] text-[#2E7D32]' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                            {ticket.status === 'active' ? 'Активний' : 'Використаний'}
                        </span>
                        </div>

                        {/* --- ТЕЛО БИЛЕТА --- */}
                        <div className="px-6 pt-6 pb-4">
                        {/* Время */}
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[32px] leading-none font-medium text-gray-900">{ticket.departure.time}</span>
                            <span className="text-[32px] leading-none font-medium text-gray-900">{ticket.arrival.time}</span>
                        </div>

                        {/* Таймлайн с линией и плашками */}
                        <div className="relative py-2.5">
                            <div className="absolute top-1/2 -translate-y-1/2 left-[7px] right-[7px] border-t-[2px] border-dashed border-gray-200"></div>

                            <div className="flex items-center justify-between relative z-10">
                            <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-orange-500 bg-white shrink-0"></div>

                            <div className="bg-white px-3 flex gap-2">
                                <div className="flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-[13px] font-medium tracking-wide leading-none">
                                <Bus size={14} /> {ticket.duration}
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-[13px] font-medium tracking-wide leading-none">
                                <Armchair size={14} /> {ticket.seat}
                                </div>
                            </div>

                            <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-orange-500 bg-white shrink-0"></div>
                            </div>
                        </div>

                        {/* Города, даты и кнопка Маршрут */}
                        <div className="relative flex justify-between mt-2">
                            <div className="text-[14px] leading-tight">
                            <p className="text-gray-500 mb-0.5">{ticket.departure.city} <span className="mx-1">•</span> {ticket.departure.date}</p>
                            <p className="font-medium text-gray-900">{ticket.departure.station}</p>
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 -top-1.5">
                            <button 
                                onClick={() => openRouteModal(ticket.stops)}
                                className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer"
                            >
                                <Signpost size={14} /> Маршрут
                            </button>
                            </div>

                            <div className="text-[14px] leading-tight text-right">
                            <p className="text-gray-500 mb-0.5">{ticket.arrival.city} <span className="mx-1">•</span> {ticket.arrival.date}</p>
                            <p className="font-medium text-gray-900">{ticket.arrival.station}</p>
                            </div>
                        </div>
                        </div>

                        {/* --- ПОДВАЛ БИЛЕТА --- */}
                        <div className="flex items-center justify-between px-6 py-[18px] border-t border-gray-100 text-[13px] text-gray-500 pb-10">
                        <div className="flex items-center gap-2">
                            <span>{ticket.id}</span>
                            <span className="text-gray-300">•</span>
                            <span className="uppercase">{ticket.passenger}</span>
                        </div>
                        
                        <div className="flex items-center gap-5">
                            <div className="relative group flex items-center gap-1.5 cursor-pointer hover:text-gray-900 transition-colors">
                            <Info size={16} /> 
                            <span>Перевізник</span>

                            {ticket.carrier && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[250px] bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-50 p-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none transition-all duration-200 z-50 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#D32F2F] rounded-full flex items-center justify-center text-white shrink-0 font-bold text-[10px] leading-tight italic">
                                    <div className="text-center">KLR<br/><span className="text-[8px] font-medium not-italic">bus</span></div>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-[13px] font-semibold text-gray-900 leading-tight">
                                    {ticket.carrier.name} [{ticket.carrier.plate}]
                                    </span>
                                    <span className="text-[12px] text-gray-500 mt-0.5 leading-none">
                                    {ticket.carrier.model} <span className="mx-0.5">•</span> {ticket.carrier.seats}
                                    </span>
                                </div>
                                </div>
                            )}
                            </div>

                            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                            <Share2 size={16} /> Відправити
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                            <Download size={16} /> Завантажити PDF
                            </button>
                        </div>
                        </div>

                        {/* --- ЗУБЧАТЫЙ (ОТРЫВНОЙ) КРАЙ --- */}
                        <div 
                        className="absolute -bottom-px left-0 right-0 h-[12px] z-10 pointer-events-none" 
                        style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12L12 0L24 12H0Z' fill='%23F3F4F6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat-x'
                        }}
                        ></div>
                    </div>
                    ))}
                </div>
                </main>
            </div>

            <RouteModal 
                isOpen={activeModal === 'route'}
                onClose={() => setActiveModal(null)}
                stops={currentRouteStops}
            />

            <ProfileModal 
                isOpen={activeModal === 'profile'}
                onClose={() => setActiveModal(null)}
            />

            {/* 4. Рендеримо модалку виходу */}
            <LogoutConfirmModal 
                isOpen={activeModal === 'logout'}
                onClose={() => setActiveModal(null)}
                onConfirm={handleLogout}
            />

            <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
            `}} />
            </div>
    </div>
  );
}