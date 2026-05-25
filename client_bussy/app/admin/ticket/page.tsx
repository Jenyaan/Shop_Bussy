"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Download, Search, Users, 
  UserCheck, Ticket, Banknote, Bus, 
  MoreVertical, Phone, MapPin, CheckCircle2, Mail, XCircle
} from 'lucide-react';

// Типізація для пасажира (лише два статуси)
type PassengerStatus = 'active' | 'cancelled';

interface Passenger {
  id: string;
  seat: string;
  name: string;
  phone: string;
  email: string;
  ticket: string;
  from: string;
  to: string;
  status: PassengerStatus;
}

// Мокові дані пасажирів
const INITIAL_PASSENGERS: Passenger[] = [
  { id: '1', seat: '1', name: 'Олександр Петренко', phone: '+380 50 123 4567', email: 'oleksandr.p@gmail.com', ticket: '#98742130', from: 'Київ', to: 'Львів', status: 'active' },
  { id: '2', seat: '2', name: 'Марія Ковальчук', phone: '+380 67 987 6543', email: 'm.kovalchuk@ukr.net', ticket: '#98742131', from: 'Київ', to: 'Краків', status: 'active' },
  { id: '3', seat: '5', name: 'Іван Сидоренко', phone: '+380 63 456 7890', email: 'ivan.sydorenko@gmail.com', ticket: '#98742135', from: 'Житомир', to: 'Львів', status: 'active' },
  { id: '4', seat: '6', name: 'Олена Ткач', phone: '+380 99 111 2233', email: 'olena.tkach.99@yahoo.com', ticket: '#98742136', from: 'Київ', to: 'Львів', status: 'active' },
  { id: '5', seat: '12', name: 'Дмитро Бойко', phone: '+380 50 555 6677', email: 'boyko.dima@gmail.com', ticket: '#98742140', from: 'Рівне', to: 'Краків', status: 'cancelled' },
  { id: '6', seat: '14', name: 'Анна Лисенко', phone: '+380 67 888 9900', email: 'anna.lysenko@ukr.net', ticket: '#98742142', from: 'Київ', to: 'Краків', status: 'active' },
];

export default function TripManifestPage() {
  const [passengers, setPassengers] = useState<Passenger[]>(INITIAL_PASSENGERS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'cancelled'>('all');
  
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    console.log('Генерація PDF для водія...');
    alert('Почалося завантаження PDF-відомості для водія');
  };

  const handleStatusChange = (passengerId: string, newStatus: PassengerStatus) => {
    setPassengers(prev => 
      prev.map(p => p.id === passengerId ? { ...p, status: newStatus } : p)
    );
    setOpenDropdownId(null);
  };

  const filteredPassengers = passengers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ticket.includes(searchTerm);
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && p.status === activeTab;
  });

  // Динамічна статистика
  const totalSeats = 54;
  const activeCount = passengers.filter(p => p.status === 'active').length;
  const cancelledCount = passengers.filter(p => p.status === 'cancelled').length;
  const revenue = activeCount * 885; // Орієнтовна виручка лише за активні квитки

  return (
    <div className="min-h-screen bg-gray-50 font-manrope pb-12 text-gray-900">
      
      {/* Прозорий оверлей на весь екран для закриття меню */}
      {openDropdownId && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenDropdownId(null)} 
        />
      )}

      {/* Header панелі керування */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                Відомість рейсу KLR-105
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Активний</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download size={18} /> Скачати PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Заголовок маршруту */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">Сьогодні, 14:30</div>
            <div className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              Київ <ArrowLeft className="text-gray-300 rotate-180" size={24} /> Краків
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1.5"><Bus size={16} className="text-gray-400"/> Van Hool (KA 1234 XX)</div>
              <div className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400"/> Платформа 4</div>
            </div>
          </div>
        </div>

        {/* --- KPI Картки --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Ticket size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Всього квитків</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{activeCount + cancelledCount} <span className="text-gray-400 text-lg font-medium">/ {totalSeats}</span></div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${((activeCount + cancelledCount)/totalSeats)*100}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><UserCheck size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Активні пасажири</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{activeCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><XCircle size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Скасовані квитки</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{cancelledCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><Banknote size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Орієнт. виручка</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{revenue.toLocaleString()} ₴</div>
          </div>
        </div>

        {/* --- СПИСОК ПАСАЖИРІВ --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
          
          {/* Фільтри та пошук */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Всі ({passengers.length})
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'active' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Активні
              </button>
              <button 
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'cancelled' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Скасовані
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Пошук пасажира..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Таблиця */}
          <div className="overflow-x-visible">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6 w-20">Місце</th>
                  <th className="p-4">Пасажир</th>
                  <th className="p-4">Маршрут</th>
                  <th className="p-4">Квиток</th>
                  <th className="p-4">Статус</th>
                  <th className="p-4 pr-6 text-right">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPassengers.map((passenger) => (
                  <tr key={passenger.id} className={`hover:bg-gray-50/50 transition-colors group ${passenger.status === 'cancelled' ? 'opacity-60' : ''}`}>
                    <td className="p-4 pl-6 align-top pt-5">
                      <div className={`w-10 h-10 rounded-xl font-extrabold flex items-center justify-center text-lg ${passenger.status === 'cancelled' ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
                        {passenger.seat}
                      </div>
                    </td>
                    <td className="p-4 align-top pt-4">
                      <div className="font-bold text-gray-900 mb-1.5">{passenger.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 mb-1">
                        <Phone size={12} className="text-gray-400" /> {passenger.phone}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Mail size={12} className="text-gray-400" /> {passenger.email}
                      </div>
                    </td>
                    <td className="p-4 align-top pt-4">
                      <div className="font-medium text-gray-900 text-sm mb-0.5">{passenger.from}</div>
                      <div className="text-xs text-gray-400">→ {passenger.to}</div>
                    </td>
                    <td className="p-4 align-top pt-4">
                      <div className="text-sm font-mono font-medium text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded">
                        {passenger.ticket}
                      </div>
                    </td>
                    <td className="p-4 align-top pt-4">
                      {passenger.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          <CheckCircle2 size={14} /> Активний
                        </span>
                      )}
                      {passenger.status === 'cancelled' && (
                        <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                          <XCircle size={14} /> Скасовано
                        </span>
                      )}
                    </td>
                    
                    {/* Кнопка "Дії" з випадаючим меню */}
                    <td className="p-4 pr-6 text-right align-top pt-4 relative">
                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === passenger.id ? null : passenger.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 relative z-50"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Dropdown Меню */}
                      {openDropdownId === passenger.id && (
                        <div className="absolute right-6 top-14 w-44 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 py-2 z-50 overflow-hidden text-left">
                          <div className="px-3 pb-2 mb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                            Змінити статус
                          </div>
                          <button 
                            onClick={() => handleStatusChange(passenger.id, 'active')}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-2 transition-colors"
                          >
                            <CheckCircle2 size={16} className={passenger.status === 'active' ? 'text-green-600' : 'text-gray-400'} /> Активний
                          </button>
                          <button 
                            onClick={() => handleStatusChange(passenger.id, 'cancelled')}
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <XCircle size={16} className={passenger.status === 'cancelled' ? 'text-red-500' : 'text-red-400'} /> Скасовано
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredPassengers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                      Пасажирів не знайдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}