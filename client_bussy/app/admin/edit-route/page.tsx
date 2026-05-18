"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, Clock, CalendarDays, 
  Plus, Trash2, Bus, DollarSign, Save, AlertTriangle
} from 'lucide-react';

// Типы для нашего маршрута
interface RouteStop {
  id: string;
  city: string;
  station: string;
  arrivalTime: string;
  departureTime: string;
  priceFromStart: number;
}

const DAYS_OF_WEEK = [
  { id: 'mo', label: 'Пн' },
  { id: 'tu', label: 'Вт' },
  { id: 'we', label: 'Ср' },
  { id: 'th', label: 'Чт' },
  { id: 'fr', label: 'Пт' },
  { id: 'sa', label: 'Сб' },
  { id: 'su', label: 'Нд' },
];

export default function EditRoutePage() {
  // Имитация уже заполненных данных, пришедших с бэкенда
  const [originalName] = useState('KLR-105');
  const [routeName, setRouteName] = useState('KLR-105');
  const [selectedBus, setSelectedBus] = useState('bus1');
  
  // Тип рейса: регулярный или одноразовый
  const [routeType, setRouteType] = useState<'regular' | 'onetime'>('regular');
  const [selectedDays, setSelectedDays] = useState<string[]>(['mo', 'we', 'fr', 'su']); // Предзаполненные дни
  const [singleDate, setSingleDate] = useState<string>(''); 
  
  // Предзаполненные остановки маршрута
  const [stops, setStops] = useState<RouteStop[]>([
    { id: 'start-1', city: 'Київ', station: 'Автостанція "Київ", вул. С. Петлюри 32', arrivalTime: '', departureTime: '14:30', priceFromStart: 0 },
    { id: 'stop-2', city: 'Житомир', station: 'Центральний автовокзал', arrivalTime: '16:20', departureTime: '16:30', priceFromStart: 250 },
    { id: 'stop-3', city: 'Рівне', station: 'Автовокзал, вул. Київська 40', arrivalTime: '18:40', departureTime: '18:50', priceFromStart: 450 },
    { id: 'end-1', city: 'Львів', station: 'Стрийський автовокзал', arrivalTime: '21:30', departureTime: '', priceFromStart: 800 },
  ]);

  // Обработчик дней недели
  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  // Добавление промежуточной остановки
  const addStop = () => {
    const newStop: RouteStop = {
      id: `stop-${Date.now()}`,
      city: '',
      station: '',
      arrivalTime: '',
      departureTime: '',
      priceFromStart: 0,
    };
    
    setStops(prev => {
      const newStops = [...prev];
      newStops.splice(newStops.length - 1, 0, newStop);
      return newStops;
    });
  };

  // Удаление промежуточной остановки
  const removeStop = (idToRemove: string) => {
    setStops(prev => prev.filter(stop => stop.id !== idToRemove));
  };

  // Обновление данных конкретной остановки
  const updateStop = (id: string, field: keyof RouteStop, value: string | number) => {
    setStops(prev => prev.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const handleSave = () => {
    console.log('Оновлені дані:', { routeName, selectedBus, routeType, selectedDays, singleDate, stops });
    // Логика PUT/PATCH запроса на сервер
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12 text-gray-900">
      
      {/* Header панели управления */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"  
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Редагування рейсу {originalName}</h1>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Save size={18} /> Зберегти зміни
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ЛЕВАЯ КОЛОНКА (Настройки) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Базовая информация */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-5 text-gray-800">
              <Bus size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold">Загальна інформація</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Номер або назва рейсу</label>
                <input 
                  type="text" 
                  placeholder="Напр. KLR-105"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Призначений автобус</label>
                <select 
                  value={selectedBus}
                  onChange={(e) => setSelectedBus(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm appearance-none font-medium"
                >
                  <option value="" disabled>Оберіть транспорт...</option>
                  <option value="bus1">Van Hool Astromega (128 місць) - KA 1234 XX</option>
                  <option value="bus2">Neoplan Tourliner (54 місця) - BC 5678 OO</option>
                </select>
              </div>
            </div>
          </section>

          {/* Расписание (Тип рейса) */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-5 text-gray-800">
              <CalendarDays size={20} className="text-blue-500" />
              <h2 className="text-lg font-bold">Розклад рейсу</h2>
            </div>
            
            {/* Переключатель типа рейса */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-5">
              <button
                onClick={() => setRouteType('regular')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  routeType === 'regular' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Регулярний
              </button>
              <button
                onClick={() => setRouteType('onetime')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  routeType === 'onetime' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Одноразовий
              </button>
            </div>

            {/* Контент в зависимости от типа */}
            {routeType === 'regular' ? (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-3">Дні відправлення</label>
                <div className="flex justify-between gap-1">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = selectedDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        onClick={() => toggleDay(day.id)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                          isSelected 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {day.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Дата відправлення</label>
                <input 
                  type="date" 
                  value={singleDate}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                />
              </div>
            )}
          </section>

          {/* Опасная зона (Удаление) */}
          <section className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <div className="flex items-center gap-2 mb-3 text-red-600">
              <AlertTriangle size={20} />
              <h2 className="text-lg font-bold">Небезпечна зона</h2>
            </div>
            <p className="text-xs text-red-700/80 mb-4 leading-relaxed">
              Видалення рейсу призведе до того, що пасажири більше не зможуть купувати на нього квитки. Вже куплені квитки залишаться дійсними.
            </p>
            <button className="w-full bg-white text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 font-semibold py-3 rounded-xl transition-colors text-sm">
              Видалити рейс
            </button>
          </section>

        </div>

        {/* ПРАВАЯ КОЛОНКА (Конструктор маршрута) */}
        <div className="lg:col-span-2">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold">Маршрут та ціни</h2>
              </div>
              <button 
                onClick={addStop}
                className="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Plus size={16} /> Додати зупинку
              </button>
            </div>

            {/* Контейнер таймлайна */}
            <div className="relative pl-6">
              {/* Вертикальная линия */}
              <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-gray-200"></div>

              {stops.map((stop, index) => {
                const isFirst = index === 0;
                const isLast = index === stops.length - 1;
                
                return (
                  <div key={stop.id} className="relative mb-6 bg-gray-50 rounded-xl p-5 border border-gray-100 group">
                    {/* Точка на линии */}
                    <div className={`absolute -left-[32px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 ${
                      isFirst || isLast ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>

                    {/* Заголовок карточки и кнопка удаления */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-800">
                        {isFirst ? 'Початкова точка (Відправлення)' : isLast ? 'Кінцева точка (Прибуття)' : `Проміжна зупинка ${index}`}
                      </h3>
                      {!isFirst && !isLast && (
                        <button 
                          onClick={() => removeStop(stop.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Видалити зупинку"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Локация (Город + Станция) */}
                      <div className="md:col-span-6 space-y-3">
                        <input 
                          type="text" 
                          placeholder="Місто (напр. Київ)"
                          value={stop.city}
                          onChange={(e) => updateStop(stop.id, 'city', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                        />
                        <input 
                          type="text" 
                          placeholder="Станція / Адреса"
                          value={stop.station}
                          onChange={(e) => updateStop(stop.id, 'station', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                      </div>

                      {/* Время */}
                      <div className="md:col-span-3 flex flex-col justify-between">
                        {!isFirst && (
                          <div className="relative">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Прибуття</label>
                            <div className="flex items-center relative">
                              <Clock size={14} className="absolute left-3 text-gray-400" />
                              <input 
                                type="time" 
                                value={stop.arrivalTime}
                                onChange={(e) => updateStop(stop.id, 'arrivalTime', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                              />
                            </div>
                          </div>
                        )}
                        {!isLast && (
                          <div className={`relative ${!isFirst ? 'mt-3' : ''}`}>
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Відправлення</label>
                            <div className="flex items-center relative">
                              <Clock size={14} className="absolute left-3 text-gray-400" />
                              <input 
                                type="time" 
                                value={stop.departureTime}
                                onChange={(e) => updateStop(stop.id, 'departureTime', e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm font-medium"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Цена */}
                      <div className="md:col-span-3">
                        {!isFirst && (
                          <div className="h-full flex flex-col justify-end">
                            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Ціна від старту (₴)</label>
                            <div className="flex items-center relative">
                              <DollarSign size={14} className="absolute left-3 text-gray-400" />
                              <input 
                                type="number" 
                                placeholder="0"
                                value={stop.priceFromStart || ''}
                                onChange={(e) => updateStop(stop.id, 'priceFromStart', Number(e.target.value))}
                                className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 outline-none focus:border-blue-500 transition-colors text-sm font-bold text-gray-900"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        </div>

      </main>
    </div>
  );
}