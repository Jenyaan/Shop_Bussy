"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Download, Search, Users, 
  UserCheck, Ticket, Banknote, Bus, 
  MoreVertical, Phone, MapPin, CheckCircle2, Clock, Mail // Додали Mail
} from 'lucide-react';

// Мокові дані пасажирів (додано поле email)
const MOCK_PASSENGERS = [
  { id: '1', seat: '1', name: 'Олександр Петренко', phone: '+380 50 123 4567', email: 'oleksandr.p@gmail.com', ticket: '#98742130', from: 'Київ', to: 'Львів', status: 'boarded' },
  { id: '2', seat: '2', name: 'Марія Ковальчук', phone: '+380 67 987 6543', email: 'm.kovalchuk@ukr.net', ticket: '#98742131', from: 'Київ', to: 'Краків', status: 'expected' },
  { id: '3', seat: '5', name: 'Іван Сидоренко', phone: '+380 63 456 7890', email: 'ivan.sydorenko@gmail.com', ticket: '#98742135', from: 'Житомир', to: 'Львів', status: 'expected' },
  { id: '4', seat: '6', name: 'Олена Ткач', phone: '+380 99 111 2233', email: 'olena.tkach.99@yahoo.com', ticket: '#98742136', from: 'Київ', to: 'Львів', status: 'boarded' },
  { id: '5', seat: '12', name: 'Дмитро Бойко', phone: '+380 50 555 6677', email: 'boyko.dima@gmail.com', ticket: '#98742140', from: 'Рівне', to: 'Краків', status: 'cancelled' },
  { id: '6', seat: '14', name: 'Анна Лисенко', phone: '+380 67 888 9900', email: 'anna.lysenko@ukr.net', ticket: '#98742142', from: 'Київ', to: 'Краків', status: 'expected' },
];

export default function TripManifestPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'expected' | 'boarded'>('all');

  const handleDownloadPDF = () => {
    // В реальному проекті тут буде виклик API для генерації PDF (напр. через jsPDF або бекенд)
    console.log('Генерація PDF для водія...');
    alert('Почалося завантаження PDF-відомості для водія');
  };

  // Фільтрація пасажирів
  const filteredPassengers = MOCK_PASSENGERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.ticket.includes(searchTerm);
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && p.status === activeTab;
  });

  // Статистика
  const totalSeats = 54;
  const soldSeats = 48;
  const boardedCount = 2; // З мокових даних
  const expectedCount = 45; 
  const revenue = 42500;

  return (
    <div className="min-h-screen bg-gray-50 font-manrope pb-12 text-gray-900">
      
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
              <Download size={18} /> Скачати PDF для водія
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
              <div className="text-gray-500 text-sm font-medium">Продано місць</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{soldSeats} <span className="text-gray-400 text-lg font-medium">/ {totalSeats}</span></div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(soldSeats/totalSeats)*100}%` }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><UserCheck size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Пасажирів сіло</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{boardedCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Clock size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Очікуються</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{expectedCount}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><Banknote size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Виручка рейсу</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{revenue.toLocaleString()} ₴</div>
          </div>
        </div>

        {/* --- СПИСОК ПАСАЖИРІВ --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Фільтри та пошук */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Всі ({MOCK_PASSENGERS.length})
              </button>
              <button 
                onClick={() => setActiveTab('expected')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'expected' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Очікуються
              </button>
              <button 
                onClick={() => setActiveTab('boarded')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'boarded' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                На борту
              </button>
            </div>

            {/* Search */}
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
          <div className="overflow-x-auto">
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
                  <tr key={passenger.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 pl-6 align-top pt-5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-lg">
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
                      {passenger.status === 'boarded' && (
                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          <CheckCircle2 size={14} /> На борту
                        </span>
                      )}
                      {passenger.status === 'expected' && (
                        <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                          <Clock size={14} /> Очікується
                        </span>
                      )}
                      {passenger.status === 'cancelled' && (
                        <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                          Скасовано
                        </span>
                      )}
                    </td>
                    <td className="p-4 pr-6 text-right align-top pt-4">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredPassengers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
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