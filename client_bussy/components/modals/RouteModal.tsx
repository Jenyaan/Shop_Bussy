'use client';

import { X } from 'lucide-react';
import Modal from '@/components/ui/Modal/Modal'

interface RouteStop {
  time: string;
  date?: string;
  city: string;
  address: string;
}

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stops: RouteStop[];
}

export default function RouteModal({ isOpen, onClose, stops }: RouteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Шапка */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-bold text-[#111827] leading-none">Маршрут</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 bg-[#F3F4F6] hover:bg-gray-200 rounded-[10px] flex items-center justify-center text-gray-500 transition-colors"
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Контейнер с таймлайном и градиентом */}
      <div className="relative">
        
        {/* Сам скроллящийся список */}
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar pr-3 pb-4">
          <div className="flex flex-col">
            {stops.map((stop, index) => (
              <div key={index} className="flex gap-4 min-h-[64px]">
                
                {/* Левая колонка: Время и дата */}
                <div className="w-[52px] shrink-0 text-right pt-[1px]">
                  <div className="text-[14px] font-bold text-[#111827] leading-none">{stop.time}</div>
                  {stop.date && (
                    <div className="text-[11px] font-medium text-gray-400 mt-1.5 leading-none">
                      {stop.date}
                    </div>
                  )}
                </div>
                
                {/* Центральная колонка: Точки и линия */}
                <div className="relative flex flex-col items-center w-3.5 shrink-0">
                  {/* Точка (Первая - залитая, остальные - с рамкой) */}
                  <div 
                    className={`w-3.5 h-3.5 rounded-full z-10 shrink-0 mt-[1px] ${
                      index === 0 
                        ? 'bg-[#FF6B00]' 
                        : 'bg-white border-[2.5px] border-[#FF6B00]'
                    }`}
                  ></div>
                  
                  {/* Линия до следующего элемента */}
                  {index !== stops.length - 1 && (
                    <div className="absolute top-[15px] bottom-[-5px] w-[2px] bg-[#E5E7EB]"></div>
                  )}
                </div>
                
                {/* Правая колонка: Город и адрес */}
                <div className="flex-1 pb-7">
                  <div className="text-[15px] font-bold text-[#111827] leading-none">{stop.city}</div>
                  <div className="text-[13px] text-gray-500 mt-1.5 leading-tight">{stop.address}</div>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Белый градиент внизу для эффекта плавного растворения списка */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-xl"></div>
      </div>

      {/* Кнопка закрытия */}
      <button 
        onClick={onClose}
        className="w-full mt-2 py-3.5 bg-[#F3F4F6] text-[#111827] rounded-2xl text-[15px] font-bold hover:bg-gray-200 transition-colors"
      >
        Закрыть
      </button>

      {/* Стили скроллбара */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
      `}} />
    </Modal>
  );
}