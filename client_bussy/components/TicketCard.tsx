"use client";
import React from "react";
import { 
  Bus, 
  Info, 
  Share2, 
  Signpost
} from 'lucide-react';

export interface RouteStop {
  time: string;
  date?: string;
  city: string;
  address: string;
}

export interface Ticket {
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
  carrier?: { name: string; plate: string; model: string; seats: string | number; };
}

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  // Функція-заглушка для відкриття модального вікна
  const openRouteModal = (stops: RouteStop[]) => {
    console.log("Відкриття маршруту для зупинок:", stops);
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 relative shadow-sm">
        {/* --- ШАПКА БІЛЕТА --- */}
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

        {/* --- ТІЛО БІЛЕТА --- */}
        <div className="px-6 pt-6 pb-4">
          {/* Час */}
          <div className="flex justify-between items-end mb-2">
              <span className="text-[32px] leading-none font-medium text-gray-900">{ticket.departure.time}</span>
              <span className="text-[32px] leading-none font-medium text-gray-900">{ticket.arrival.time}</span>
          </div>

          {/* Таймлайн з лінією і плашкою */}
          <div className="relative py-2.5">
              {/* Пунктирна лінія */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[7px] right-[7px] border-t-[2px] border-dashed border-gray-200"></div>

              {/* Точки і центральна плашка */}
              <div className="flex items-center justify-between relative z-10">
                <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-orange-500 bg-white shrink-0"></div>

                <div className="bg-white px-3">
                    <div className="flex items-center gap-1.5 bg-[#FFF3E0] text-[#E65100] px-3 py-1.5 rounded-full text-[13px] font-medium tracking-wide leading-none">
                      <Bus size={14} /> {ticket.duration}
                    </div>
                </div>

                <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-orange-500 bg-white shrink-0"></div>
              </div>
          </div>

          {/* Міста, дати та кнопка "Маршрут" */}
          <div className="relative flex justify-between mt-2">
              {/* Звідки */}
              <div className="text-[14px] leading-tight">
                <p className="text-gray-500 mb-0.5">{ticket.departure.city} <span className="mx-1">•</span> {ticket.departure.date}</p>
                <p className="font-medium text-gray-900">{ticket.departure.station}</p>
              </div>

              {/* Кнопка "Маршрут" */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0">
                <button 
                    onClick={() => openRouteModal(ticket.stops)}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 text-[13px] font-medium transition-colors cursor-pointer"
                >
                    <Signpost size={14} /> Маршрут
                </button>
              </div>

              {/* Куди */}
              <div className="text-[14px] leading-tight text-right">
                <p className="text-gray-500 mb-0.5">{ticket.arrival.city} <span className="mx-1">•</span> {ticket.arrival.date}</p>
                <p className="font-medium text-gray-900">{ticket.arrival.station}</p>
              </div>
          </div>
        </div>

        {/* --- ПІДВАЛ БІЛЕТА --- */}
        <div className="flex items-center justify-between px-6 py-5 border-t border-gray-100 text-[14px] text-gray-500 relative">
          
          {/* Ліва частина: Тултип Перевізника */}
          <div className="relative group flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors">
            <Info size={18} className="text-[#E65100]" /> 
            <span className="font-medium text-gray-800">Перевізник</span>

            {ticket.carrier && (
                <div className="absolute bottom-full left-0 mb-3 w-[260px] bg-white rounded-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none transition-all duration-200 z-50 flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#D32F2F] rounded-full flex items-center justify-center text-white shrink-0 font-bold text-[10px] leading-tight italic mt-0.5">
                      <div className="text-center">KLR<br/><span className="text-[8px] font-medium not-italic">bus</span></div>
                  </div>
                  <div className="flex flex-col text-left">
                      {/* Використовуємо optional chaining (?.) щоб TypeScript не сварився */}
                      <span className="text-[14px] font-semibold text-gray-900 leading-tight">
                        {ticket.carrier?.name} [{ticket.carrier?.plate}]
                      </span>
                      <span className="text-[13px] text-gray-500 mt-1 leading-none">
                        {ticket.carrier?.model} <span className="mx-0.5">•</span> {ticket.carrier?.seats}
                      </span>
                  </div>
                </div>
            )}
          </div>
          
          {/* Права частина: Кнопки дій */}
          <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-gray-900 transition-colors font-medium">
                <Share2 size={16} /> Відправити
              </button>
          </div>
        </div>

    </div>
  );
}