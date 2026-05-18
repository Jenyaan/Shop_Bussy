"use client";

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Ticket, Users, Bus, 
  Plus, ArrowRight, Calendar, MapPin,
  Settings, ArrowUpRight, ArrowDownRight,
  User, BarChart3
} from 'lucide-react';

// Мокові дані для найближчих рейсів
const UPCOMING_TRIPS = [
  { id: '1', route: 'KLR-105', from: 'Київ', to: 'Львів', time: '14:30', date: 'Сьогодні', totalSeats: 54, soldSeats: 48, status: 'boarding' },
  { id: '2', route: 'KLR-208', from: 'Львів', to: 'Краків', time: '18:00', date: 'Сьогодні', totalSeats: 54, soldSeats: 52, status: 'scheduled' },
  { id: '3', route: 'KLR-301', from: 'Житомир', to: 'Варшава', time: '08:15', date: 'Завтра', totalSeats: 128, soldSeats: 45, status: 'scheduled' },
  { id: '4', route: 'KLR-106', from: 'Львів', to: 'Київ', time: '10:00', date: 'Завтра', totalSeats: 54, soldSeats: 12, status: 'scheduled' },
];

// Дані для міні-графіка продажів
const WEEKLY_SALES = [
  { day: 'Пн', value: 60 },
  { day: 'Вт', value: 45 },
  { day: 'Ср', value: 75 },
  { day: 'Чт', value: 50 },
  { day: 'Пт', value: 100 }, // Пік
  { day: 'Сб', value: 85 },
  { day: 'Нд', value: 40 },
];

export default function FirmDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12 text-gray-900">
      
      {/* Header панелі керування */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
              KLR
            </div>
            <h1 className="text-xl font-bold">Огляд KLR Bus</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Кнопка переходу в налаштування профілю */}
            <Link 
              href="/admin/profile" 
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              title="Налаштування профілю"
            >
              <User size={20} />
            </Link>

            <Link 
              href="/admin/create-route" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> <span className="hidden sm:inline">Створити рейс</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* --- KPI Картки --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Виручка */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">Виручка за місяць</div>
            <div className="text-2xl font-extrabold text-gray-900">425 800 ₴</div>
          </div>

          {/* Продані квитки */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Ticket size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <ArrowUpRight size={14} /> +5%
              </span>
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">Продані квитки</div>
            <div className="text-2xl font-extrabold text-gray-900">1 240 шт.</div>
          </div>

          {/* Заповнюваність */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Users size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">
                <ArrowDownRight size={14} /> -2%
              </span>
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">Сер. заповнюваність</div>
            <div className="text-2xl font-extrabold text-gray-900">82%</div>
          </div>

          {/* Активні автобуси */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Bus size={20} />
              </div>
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">Автобуси в рейсі</div>
            <div className="text-2xl font-extrabold text-gray-900">8 / 12</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- ЛІВА ЧАСТИНА (Найближчі рейси) --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Найближчі відправлення</h2>
                <Link 
                  href="/admin/routes" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  Усі рейси <ArrowRight size={16} />
                </Link>
              </div>
              
              <Link href={"/admin/ticket"} className="divide-y divide-gray-50">
                {UPCOMING_TRIPS.map((trip) => {
                  const occupancyRate = (trip.soldSeats / trip.totalSeats) * 100;
                  const isHighOccupancy = occupancyRate > 80;
                  const isLowOccupancy = occupancyRate < 40;

                  return (
                    <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                      
                      {/* Маршрут та час */}
                      <div className="flex items-center gap-4 min-w-[240px]">
                        <div className="w-12 text-center shrink-0">
                          <div className="font-bold text-lg text-gray-900">{trip.time}</div>
                          <div className="text-[10px] uppercase font-bold text-gray-400">{trip.date}</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-2">
                            {trip.from} <ArrowRight size={14} className="text-gray-400" /> {trip.to}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Bus size={12} /> {trip.route}
                          </div>
                        </div>
                      </div>

                      {/* Прогрес бар заповнюваності */}
                      <div className="flex-1 max-w-[200px] w-full">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-medium text-gray-600">Квитки</span>
                          <span className="font-bold text-gray-900">{trip.soldSeats} / {trip.totalSeats}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isHighOccupancy ? 'bg-green-500' : isLowOccupancy ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${occupancyRate}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Статус та дія (Шестірня для редагування) */}
                      <div className="flex items-center gap-4 sm:ml-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold w-24 text-center ${
                          trip.status === 'boarding' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {trip.status === 'boarding' ? 'Посадка' : 'Очікується'}
                        </div>
                        
                        {/* Змінено на Settings з переходом на редагування */}
                        <Link 
                          href={`/admin/edit-route`} 
                          className="text-gray-300 hover:text-blue-600 hover:bg-blue-50 transition-colors p-2 rounded-lg"
                          title="Редагувати рейс"
                        >
                          <Settings size={18} />
                        </Link>
                      </div>

                    </div>
                  );
                })}
              </Link>
            </div>
          </div>

          {/* --- ПРАВА ЧАСТИНА (Графік та швидкі дії) --- */}
          <div className="flex flex-col gap-6">
            
            {/* Графік продажів */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Продажі за тиждень</h2>
                <div className="text-gray-400"><Calendar size={20}/></div>
              </div>
              
              <div className="h-40 flex items-end justify-between gap-2 mt-4">
                {WEEKLY_SALES.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 group">
                    <div className="w-full flex justify-center relative">
                      <div className="absolute -top-8 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {stat.value}%
                      </div>
                      <div 
                        className={`w-full max-w-[32px] rounded-t-md transition-all duration-500 ${
                          stat.day === 'Пт' ? 'bg-blue-600' : 'bg-blue-100 group-hover:bg-blue-200'
                        }`}
                        style={{ height: `${stat.value}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-gray-500 mt-2">{stat.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Швидкі посилання */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Керування</h2>
              <div className="space-y-3">
                <Link 
                  href="/admin/routes" 
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Маршрути та ціни</div>
                    <div className="text-xs text-gray-500 mt-0.5">Додати або змінити рейси</div>
                  </div>
                </Link>
                
                <Link 
                  href="/admin/fleet" 
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                    <Bus size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Автопарк</div>
                    <div className="text-xs text-gray-500 mt-0.5">Керування автобусами та місцями</div>
                  </div>
                </Link>

                {/* Нове посилання: Фінанси та Звіти */}
                <Link 
                  href="/admin/finance" 
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Фінанси та звіти</div>
                    <div className="text-xs text-gray-500 mt-0.5">Виплати, статистика та акти</div>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}