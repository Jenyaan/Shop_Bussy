"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Search, Bus, 
  Settings, MoreVertical, Wrench, 
  CheckCircle, AlertTriangle, Wifi, 
  Wind, Zap, Tv, Coffee, UtilityPole, Hash
} from 'lucide-react';

// Типізація
type BusStatus = 'active' | 'maintenance' | 'inactive';

interface BusData {
  id: string;
  model: string;
  plate: string;
  seats: number;
  type: string; // напр. 'Двоповерховий', 'Стандарт'
  status: BusStatus;
  amenities: string[]; // id зручностей
}

// Доступні зручності для мапінгу іконок
const AMENITIES_MAP: Record<string, { icon: React.ElementType, label: string }> = {
  'wifi': { icon: Wifi, label: 'Wi-Fi' },
  'ac': { icon: Wind, label: 'Кондиціонер' },
  'power': { icon: Zap, label: 'Розетки 220V/USB' },
  'wc': { icon: UtilityPole, label: 'Туалет' },
  'tv': { icon: Tv, label: 'Мультимедіа' },
  'drinks': { icon: Coffee, label: 'Напої' },
};

// Мокові дані автопарку
const MOCK_FLEET: BusData[] = [
  { id: 'b1', model: 'Van Hool Astromega', plate: 'KA 1234 XX', seats: 128, type: '2 поверхи • Розсадка 2x2', status: 'active', amenities: ['wifi', 'ac', 'power', 'wc', 'tv', 'drinks'] },
  { id: 'b2', model: 'Neoplan Tourliner', plate: 'BC 5678 OO', seats: 54, type: '1 поверх • Розсадка 2x2', status: 'active', amenities: ['wifi', 'ac', 'power', 'tv'] },
  { id: 'b3', model: 'Setra S 531 DT', plate: 'AA 1111 BB', seats: 78, type: '2 поверхи • Розсадка 2x2', status: 'maintenance', amenities: ['wifi', 'ac', 'wc', 'power'] },
  { id: 'b4', model: 'Mercedes-Benz Tourismo', plate: 'CE 9999 XX', seats: 48, type: '1 поверх • Розсадка 2x2', status: 'active', amenities: ['wifi', 'ac'] },
  { id: 'b5', model: 'Mercedes Sprinter VIP', plate: 'AX 7777 KP', seats: 18, type: 'Мікроавтобус • Розсадка 1x2', status: 'inactive', amenities: ['ac', 'power', 'tv'] },
];

export default function FleetPage() {
  const [buses, setBuses] = useState<BusData[]>(MOCK_FLEET);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'maintenance'>('all');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Фільтрація
  const filteredBuses = buses.filter(bus => {
    const matchesSearch = 
      bus.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bus.plate.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && bus.status === 'active';
    if (activeTab === 'maintenance') return matchesSearch && (bus.status === 'maintenance' || bus.status === 'inactive');
    return matchesSearch;
  });

  // Зміна статусу
  const handleStatusChange = (id: string, newStatus: BusStatus) => {
    setBuses(prev => prev.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
    setOpenDropdownId(null);
  };

  // Статистика
  const activeBuses = buses.filter(b => b.status === 'active').length;
  const maintenanceBuses = buses.filter(b => b.status === 'maintenance').length;
  const totalCapacity = buses.filter(b => b.status === 'active').reduce((acc, bus) => acc + bus.seats, 0);

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
              Автопарк
            </h1>
          </div>
          <Link 
            href="/admin/add-bus" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Додати автобус</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Заголовок сторінки */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Наявні автобуси</h2>
          <p className="text-gray-500 text-sm">Переглядайте та керуйте своїм транспортом. Призначайте автобуси на рейси або відправляйте на ТО.</p>
        </div>

        {/* --- KPI Картки --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><Bus size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Всього автобусів</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{buses.length}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">Готові до рейсів</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{activeBuses}</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Wrench size={18} /></div>
              <div className="text-gray-500 text-sm font-medium">На ремонті / ТО</div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{maintenanceBuses}</div>
          </div>
        </div>

        {/* Фільтри та пошук */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Всі
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'active' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Активні
            </button>
            <button 
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'maintenance' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              На ремонті
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Пошук за моделлю або номером..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* --- СІТКА АВТОБУСІВ --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative transition-opacity ${bus.status === 'inactive' ? 'opacity-60' : ''}`}>
              
              {/* Шапка картки: Статус і кнопка Дії */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  {bus.status === 'active' && (
                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <CheckCircle size={14} /> Активний
                    </span>
                  )}
                  {bus.status === 'maintenance' && (
                    <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <Wrench size={14} /> На ТО
                    </span>
                  )}
                  {bus.status === 'inactive' && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle size={14} /> Списаний
                    </span>
                  )}
                </div>

                <div className="relative z-20">
                  <button 
                    onClick={() => setOpenDropdownId(openDropdownId === bus.id ? null : bus.id)}
                    className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-50"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {/* Dropdown Меню */}
                  {openDropdownId === bus.id && (
                    <div className="absolute right-0 top-8 w-44 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 py-2 z-50 overflow-hidden text-left">
                      <Link 
                        href={`/admin/edit-bus/${bus.id}`} 
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition-colors border-b border-gray-50 pb-3 mb-1"
                      >
                        <Settings size={16} className="text-gray-400" /> Редагувати
                      </Link>

                      <div className="px-3 pb-1 pt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Змінити статус
                      </div>
                      <button 
                        onClick={() => handleStatusChange(bus.id, 'active')}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center gap-2 transition-colors"
                      >
                        <CheckCircle size={16} className="text-gray-400" /> Активний
                      </button>
                      <button 
                        onClick={() => handleStatusChange(bus.id, 'maintenance')}
                        className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 transition-colors"
                      >
                        <Wrench size={16} className="text-gray-400" /> На ремонт / ТО
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Основна інформація */}
              <div className="mb-5">
                <h3 className="text-[20px] font-extrabold text-gray-900 leading-tight mb-2 pr-4">
                  {bus.model}
                </h3>
                <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-sm font-mono font-bold text-gray-700 uppercase">
                  <Hash size={14} className="text-gray-400" /> {bus.plate}
                </div>
              </div>

              {/* Характеристики */}
              <div className="space-y-2.5 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Кількість місць:</span>
                  <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded shadow-sm">{bus.seats}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Тип салону:</span>
                  <span className="font-semibold text-gray-900">{bus.type}</span>
                </div>
              </div>

              {/* Зручності */}
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Доступні зручності
                </div>
                <div className="flex flex-wrap gap-2">
                  {bus.amenities.map(amenityId => {
                    const amenity = AMENITIES_MAP[amenityId];
                    if (!amenity) return null;
                    const Icon = amenity.icon;
                    return (
                      <div 
                        key={amenityId} 
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center cursor-help transition-colors hover:bg-blue-100"
                        title={amenity.label}
                      >
                        <Icon size={16} />
                      </div>
                    );
                  })}
                  {bus.amenities.length === 0 && (
                    <span className="text-sm text-gray-400 italic">Не вказано</span>
                  )}
                </div>
              </div>

            </div>
          ))}

          {/* Пустий стан */}
          {filteredBuses.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 text-gray-400">
                <Bus size={32} />
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">Автобусів не знайдено</div>
              <div className="text-sm text-gray-500">Спробуйте змінити фільтри або додайте новий транспорт.</div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}