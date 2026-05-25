"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Search, MapPin, 
  CalendarDays, Bus, MoreVertical, 
  Settings, Users, PauseCircle, PlayCircle, ArrowRight, CheckCircle
} from 'lucide-react';

// Типізація (додано статус 'used')
type RouteStatus = 'active' | 'inactive' | 'used';

interface RouteData {
  id: string;
  number: string;
  from: string;
  to: string;
  schedule: string;
  busInfo: string;
  seats: number;
  price: string;
  status: RouteStatus;
}

// Мокові дані маршрутів (додано використані/завершені рейси)
const MOCK_ROUTES: RouteData[] = [
  { id: '1', number: 'KLR-105', from: 'Київ', to: 'Краків', schedule: 'Пн, Ср, Пт, Нд', busInfo: 'Van Hool Astromega', seats: 128, price: 'від 1 200 ₴', status: 'active' },
  { id: '2', number: 'KLR-208', from: 'Львів', to: 'Варшава', schedule: 'Щодня', busInfo: 'Neoplan Tourliner', seats: 54, price: 'від 800 ₴', status: 'active' },
  { id: '3', number: 'KLR-301', from: 'Одеса', to: 'Вроцлав', schedule: 'Вт, Чт, Сб', busInfo: 'Setra S 531 DT', seats: 78, price: 'від 1 500 ₴', status: 'inactive' },
  { id: '4', number: 'KLR-106', from: 'Київ', to: 'Львів', schedule: '20.06.2024 (Один раз)', busInfo: 'Mercedes-Benz Tourismo', seats: 48, price: 'від 500 ₴', status: 'active' },
  { id: '5', number: 'KLR-404', from: 'Дніпро', to: 'Кишинів', schedule: 'Ср, Нд', busInfo: 'Neoplan Tourliner', seats: 54, price: 'від 1 800 ₴', status: 'inactive' },
  { id: '6', number: 'KLR-099', from: 'Умань', to: 'Штутгарт', schedule: '12 Жов (Завершено)', busInfo: 'Van Hool Astromega', seats: 128, price: '3 766 ₴', status: 'used' },
  { id: '7', number: 'KLR-088', from: 'Київ', to: 'Варшава', schedule: '15 Жов (Завершено)', busInfo: 'Neoplan Tourliner', seats: 54, price: '7 521 ₴', status: 'used' },
];

export default function RoutesListPage() {
  const [routes, setRoutes] = useState<RouteData[]>(MOCK_ROUTES);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'used'>('all');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Фільтрація
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = 
      route.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.to.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && route.status === activeTab;
  });

  // Зміна статусу (тільки для активних/призупинених)
  const toggleStatus = (id: string, currentStatus: RouteStatus) => {
    if (currentStatus === 'used') return;
    setRoutes(prev => prev.map(r => 
      r.id === id ? { ...r, status: currentStatus === 'active' ? 'inactive' : 'active' } : r
    ));
    setOpenDropdownId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-manrope pb-12 text-gray-900">
      
      {/* Оверлей для закриття дропдауну */}
      {openDropdownId && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenDropdownId(null)} />
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Усі маршрути
            </h1>
          </div>
          <Link 
            href="/admin/create-route" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Створити рейс</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Статистика / Заголовок сторінки */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Керування рейсами</h2>
          <p className="text-gray-500 text-sm">Тут відображаються всі ваші напрямки. Ви можете редагувати їх, призупиняти або переглядати списки пасажирів.</p>
        </div>

        {/* Контейнер таблиці */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
          
          {/* Фільтри та пошук */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto max-w-full hide-scrollbar">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Всі ({routes.length})
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'active' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Активні
              </button>
              <button 
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'inactive' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Призупинені
              </button>
              <button 
                onClick={() => setActiveTab('used')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'used' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Завершені
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Пошук за містом або номером..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Таблиця */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Маршрут</th>
                  <th className="p-4">Розклад</th>
                  <th className="p-4">Автобус та Ціна</th>
                  <th className="p-4">Статус</th>
                  <th className="p-4 pr-6 text-right">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRoutes.map((route) => (
                  <tr 
                    key={route.id} 
                    className={`hover:bg-gray-50/50 transition-colors group ${
                      route.status === 'inactive' ? 'opacity-60' : route.status === 'used' ? 'bg-gray-50/40 opacity-75' : ''
                    }`}
                  >
                    
                    {/* Маршрут */}
                    <td className="p-4 pl-6 align-top pt-5">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          route.status === 'used' ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600'
                        }`}>
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-2 mb-1 text-base">
                            {route.from} <ArrowRight size={14} className="text-gray-400" /> {route.to}
                          </div>
                          <div className="text-xs font-mono font-medium text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded">
                            {route.number}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Розклад */}
                    <td className="p-4 align-top pt-6">
                      <div className="flex items-center gap-2 text-gray-900 font-medium text-sm">
                        <CalendarDays size={16} className="text-gray-400" /> {route.schedule}
                      </div>
                    </td>

                    {/* Автобус та Ціна */}
                    <td className="p-4 align-top pt-5">
                      <div className="font-medium text-gray-900 text-sm mb-1 flex items-center gap-2">
                        <Bus size={16} className="text-gray-400" /> {route.busInfo} 
                        <span className="text-xs text-gray-400 font-normal">({route.seats} місць)</span>
                      </div>
                      <div className={`text-sm font-bold mt-1.5 ${route.status === 'used' ? 'text-gray-500 line-through' : 'text-green-600'}`}>
                        {route.price}
                      </div>
                    </td>

                    {/* Статус */}
                    <td className="p-4 align-top pt-6">
                      {route.status === 'active' && (
                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          <PlayCircle size={14} /> Активний
                        </span>
                      )}
                      {route.status === 'inactive' && (
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                          <PauseCircle size={14} /> Призупинено
                        </span>
                      )}
                      {route.status === 'used' && (
                        <span className="inline-flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                          <CheckCircle size={14} /> Завершено
                        </span>
                      )}
                    </td>
                    
                    {/* Дії */}
                    <td className="p-4 pr-6 text-right align-top pt-5 relative">
                      <button 
                        onClick={() => setOpenDropdownId(openDropdownId === route.id ? null : route.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 relative z-40"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Dropdown Меню */}
                      {openDropdownId === route.id && (
                        <div className="absolute right-6 top-14 w-48 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 py-2 z-50 overflow-hidden text-left">
                          
                          {/* Редактирование доступно только для незавершенных рейсов */}
                          {route.status !== 'used' && (
                            <Link 
                              href={`/admin/edit-route`} 
                              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition-colors"
                            >
                              <Settings size={16} className="text-gray-400" /> Редагувати
                            </Link>
                          )}
                          
                          <Link 
                            href={`/admin/manifest`} 
                            className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition-colors border-b border-gray-50"
                          >
                            <Users size={16} className="text-gray-400" /> Відомість рейсу
                          </Link>

                          {route.status !== 'used' ? (
                            <button 
                              onClick={() => toggleStatus(route.id, route.status)}
                              className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors ${
                                route.status === 'active' 
                                  ? 'text-orange-600 hover:bg-orange-50' 
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                            >
                              {route.status === 'active' ? (
                                <><PauseCircle size={16} /> Призупинити</>
                              ) : (
                                <><PlayCircle size={16} /> Відновити</>
                              )}
                            </button>
                          ) : (
                            <div className="px-4 py-2 text-xs text-gray-400 italic">
                              Архівний рейс
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredRoutes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                        <MapPin size={32} />
                      </div>
                      <div className="text-lg font-bold text-gray-900 mb-1">Маршрутів не знайдено</div>
                      <div className="text-sm text-gray-500">Спробуйте змінити параметри пошуку або додайте новий рейс.</div>
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