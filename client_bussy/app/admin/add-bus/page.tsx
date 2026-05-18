"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Bus, Hash, 
  Wifi, Wind, Zap, Tv, Coffee, UtilityPole,
  Grid, LayoutTemplate, Eraser, Plus, Minus
} from 'lucide-react';

// Доступні зручності
const AVAILABLE_AMENITIES = [
  { id: 'wifi', icon: Wifi, label: 'Безкоштовний Wi-Fi' },
  { id: 'ac', icon: Wind, label: 'Кондиціонер' },
  { id: 'power', icon: Zap, label: 'Розетки / USB' },
  { id: 'wc', icon: UtilityPole, label: 'Туалет' },
  { id: 'tv', icon: Tv, label: 'Мультимедіа / ТБ' },
  { id: 'drinks', icon: Coffee, label: 'Гарячі напої' },
];

const SEAT_TEMPLATES = [
  { id: 'std-54', name: 'Стандарт (54 місця)', type: '1 поверх • Розсадка 2x2', icon: '🚐' },
  { id: 'vip-32', name: 'VIP Клас (32 місця)', type: '1 поверх • Розсадка 2x1', icon: '✨' },
];

// --- НАЛАШТУВАННЯ КОНСТРУКТОРА ---
const INITIAL_GRID_ROWS = 14;
const GRID_COLS = 5; // 0:ліве, 1:ліве, 2:прохід, 3:праве, 4:праве

type CellType = 'seat' | 'empty' | 'door' | 'wc';

interface GridCell {
  id: string;
  type: CellType;
  number?: number;
}

export default function AddBusPage() {
  const [busData, setBusData] = useState({
    name: '',
    plateNumber: '',
    templateId: 'std-54',
  });
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['wifi', 'ac']);
  const [layoutMode, setLayoutMode] = useState<'template' | 'custom'>('template');
  const [activeTool, setActiveTool] = useState<CellType>('seat');

  // Ініціалізація динамічної сітки
  const [grid, setGrid] = useState<GridCell[][]>(() => {
    const initialGrid: GridCell[][] = [];
    let seatCounter = 1;
    for (let r = 0; r < INITIAL_GRID_ROWS; r++) {
      const row: GridCell[] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        if (c === 2) {
          row.push({ id: `r${r}-c${c}`, type: 'empty' });
        } else {
          row.push({ id: `r${r}-c${c}`, type: 'seat', number: seatCounter++ });
        }
      }
      initialGrid.push(row);
    }
    return initialGrid;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  // Малювання на сітці
  const handleCellClick = (rIndex: number, cIndex: number) => {
    const newGrid = [...grid];
    // Створюємо копію рядка і клітинки, щоб не мутувати стан напряму
    const newRow = [...newGrid[rIndex]];
    newRow[cIndex] = { 
      ...newRow[cIndex], 
      type: activeTool,
      number: activeTool === 'seat' ? 0 : undefined
    };
    newGrid[rIndex] = newRow;
    setGrid(newGrid);
  };

  // Автоматична нумерація
  const autoNumberSeats = () => {
    let counter = 1;
    const newGrid = grid.map(row => 
      row.map(cell => {
        if (cell.type === 'seat') {
          return { ...cell, number: counter++ };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  // --- ДОДАВАННЯ ТА ВИДАЛЕННЯ РЯДІВ ---
  const handleAddRow = () => {
    setGrid(prev => {
      const newRowIndex = prev.length;
      const newRow: GridCell[] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        if (c === 2) { // Прохід по центру
          newRow.push({ id: `r${newRowIndex}-c${c}-${Date.now()}`, type: 'empty' });
        } else {
          newRow.push({ id: `r${newRowIndex}-c${c}-${Date.now()}`, type: 'seat', number: 0 }); // Без номера, щоб потім натиснути "Автонумерація"
        }
      }
      return [...prev, newRow];
    });
  };

  const handleRemoveRow = () => {
    setGrid(prev => {
      if (prev.length <= 1) return prev; // Залишаємо хоча б один ряд
      return prev.slice(0, -1);
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Новий автобус:', { 
      ...busData, 
      amenities: selectedAmenities,
      layoutMode,
      customGrid: layoutMode === 'custom' ? grid : null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12 text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-bold">Додавання автобуса</h1>
          </div>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm">
            <Save size={18} /> Зберегти транспорт
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ЛІВА КОЛОНКА */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Bus size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold">Параметри транспортного засобу</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Марка та модель</label>
                  <input type="text" name="name" placeholder="Напр. Neoplan Tourliner" value={busData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Державний номерний знак</label>
                  <div className="relative">
                    <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" name="plateNumber" placeholder="KA 1234 XX" value={busData.plateNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 text-sm font-mono uppercase" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-800">Зручності в салоні</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_AMENITIES.map((amenity) => {
                  const isSelected = selectedAmenities.includes(amenity.id);
                  const Icon = amenity.icon;
                  return (
                    <button key={amenity.id} type="button" onClick={() => toggleAmenity(amenity.id)} className={`flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all ${isSelected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}><Icon size={18} className={isSelected ? 'text-blue-600' : 'text-gray-500'} /></div>
                      <span className="text-sm font-semibold">{amenity.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ПРАВА КОЛОНКА (Схема салону) */}
          <div className="lg:col-span-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              
              {/* Перемикач режимів */}
              <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button onClick={() => setLayoutMode('template')} className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${layoutMode === 'template' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                  <LayoutTemplate size={16} /> Зі списку
                </button>
                <button onClick={() => setLayoutMode('custom')} className={`flex-1 py-2 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${layoutMode === 'custom' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Grid size={16} /> Своя схема
                </button>
              </div>

              {layoutMode === 'template' ? (
                <div className="space-y-3">
                  {SEAT_TEMPLATES.map((template) => {
                    const isSelected = busData.templateId === template.id;
                    return (
                      <label key={template.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50/30' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                        <div className="relative flex items-center justify-center shrink-0 w-5 h-5">
                          <input type="radio" name="templateId" value={template.id} checked={isSelected} onChange={handleChange} className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-blue-600 transition-colors cursor-pointer" />
                          <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-sm flex items-center gap-2"><span>{template.icon}</span> {template.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{template.type}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  
                  {/* Панель інструментів */}
                  <div className="w-full bg-gray-50 p-2 rounded-xl border border-gray-200 flex gap-2 mb-6">
                    <button onClick={() => setActiveTool('seat')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTool === 'seat' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                      Крісло
                    </button>
                    <button onClick={() => setActiveTool('empty')} className={`flex-1 py-2 flex justify-center rounded-lg text-xs font-bold transition-all ${activeTool === 'empty' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                      <Eraser size={16} />
                    </button>
                    <button onClick={() => setActiveTool('door')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTool === 'door' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                      Двері
                    </button>
                    <button onClick={() => setActiveTool('wc')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTool === 'wc' ? 'bg-purple-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
                      WC
                    </button>
                  </div>

                  {/* Сітка автобуса */}
                  <div className="bg-[#f1f3f5] p-6 rounded-[32px] border border-gray-200 inline-block transition-all duration-300">
                    <div className="flex flex-col gap-2">
                      {/* Лобове скло (візуально) */}
                      <div className="h-6 border-b-2 border-gray-300 mx-4 mb-2 flex justify-between px-2">
                        <div className="w-8 h-8 rounded-full border-4 border-gray-300 -mt-2 opacity-50"></div> {/* Руль */}
                      </div>

                      {grid.map((row, rIndex) => (
                        <div key={rIndex} className="flex gap-2">
                          {row.map((cell, cIndex) => {
                            let cellStyle = "";
                            let cellContent = null;

                            if (cell.type === 'seat') {
                              cellStyle = "bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-500 hover:bg-blue-200";
                              cellContent = <span className="font-bold text-[11px]">{cell.number || '+'}</span>;
                            } else if (cell.type === 'empty') {
                              cellStyle = "bg-transparent border-transparent hover:border-gray-300 border-dashed";
                            } else if (cell.type === 'door') {
                              cellStyle = "bg-orange-100 border-orange-300 text-orange-600";
                              cellContent = <span className="text-[10px] font-bold">EXIT</span>;
                            } else if (cell.type === 'wc') {
                              cellStyle = "bg-purple-100 border-purple-300 text-purple-600";
                              cellContent = <UtilityPole size={16} />;
                            }

                            return (
                              <button
                                key={cell.id}
                                onClick={() => handleCellClick(rIndex, cIndex)}
                                className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-colors ${cellStyle}`}
                              >
                                {cellContent}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Керування розміром і нумерацією */}
                  <div className="mt-6 flex flex-col items-center gap-4 w-full">
                    {/* Кнопки Додати / Видалити ряд */}
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-1.5 rounded-xl">
                      <button 
                        onClick={handleRemoveRow}
                        disabled={grid.length <= 1}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Minus size={16} /> Видалити ряд
                      </button>
                      <div className="w-px h-6 bg-gray-300"></div>
                      <button 
                        onClick={handleAddRow}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <Plus size={16} /> Додати ряд
                      </button>
                    </div>

                    <button 
                      onClick={autoNumberSeats}
                      className="text-sm font-bold text-blue-600 hover:underline bg-blue-50 px-6 py-2.5 rounded-xl w-full text-center transition-colors hover:bg-blue-100"
                    >
                      Автоматично пронумерувати місця
                    </button>
                  </div>

                </div>
              )}
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}