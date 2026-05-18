"use client";

import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, FileText, 
  CreditCard, Lock, Save, ArrowLeft, Camera
} from 'lucide-react';

const FirmProfilePage: React.FC = () => {
  // Состояния для полей профиля
  const [profileData, setProfileData] = useState({
    companyName: 'KLR Bus',
    legalName: 'ТОВ "КЛР Бус Україна"',
    taxId: '12345678',
    supportPhone: '+380 44 123 45 67',
    supportEmail: 'support@klr.com.ua',
    iban: 'UA123456789012345678901234567',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Збережені дані:', profileData);
    // Тут буде логіка відправки на бекенд
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12 text-gray-900">
      
      {/* Header панелі керування */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Налаштування профілю</h1>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-md shadow-blue-500/20"
          >
            <Save size={18} /> Зберегти зміни
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* ЛІВА КОЛОНКА - Основні дані */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Карточка: Основна інформація */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Building2 size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold">Інформація про компанію</h2>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                {/* Заглушка для логотипа */}
                <div className="w-24 h-24 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                  <Camera size={24} className="mb-1" />
                  <span className="text-[10px] font-medium uppercase">Логотип</span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Публічна назва (бачать пасажири)</label>
                    <input 
                      type="text" name="companyName" value={profileData.companyName} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Юридична назва (ТОВ, ФОП)</label>
                  <input 
                    type="text" name="legalName" value={profileData.legalName} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Код ЄДРПОУ / ІПН</label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" name="taxId" value={profileData.taxId} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Карточка: Контакти підтримки */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Phone size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold">Контакти служби підтримки</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Телефон для пасажирів</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" name="supportPhone" value={profileData.supportPhone} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Email служби підтримки</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" name="supportEmail" value={profileData.supportEmail} onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>
            </section>
            
          </div>

          {/* ПРАВА КОЛОНКА - Фінанси та Безпека */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Карточка: Фінанси */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-5 text-gray-800">
                <CreditCard size={20} className="text-blue-500" />
                <h2 className="text-lg font-bold">Банківські реквізити</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">Сюди ми будемо перераховувати кошти за продані квитки.</p>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Рахунок IBAN</label>
                <input 
                  type="text" name="iban" value={profileData.iban} onChange={handleChange} placeholder="UA..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-mono text-gray-700"
                />
              </div>
            </section>

            {/* Карточка: Безпека */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 border-t-4 border-t-orange-500">
              <div className="flex items-center gap-2 mb-5 text-gray-800">
                <Lock size={20} className="text-orange-500" />
                <h2 className="text-lg font-bold">Безпека</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Поточний пароль</label>
                  <input 
                    type="password" name="currentPassword" value={profileData.currentPassword} onChange={handleChange} placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:bg-white transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Новий пароль</label>
                  <input 
                    type="password" name="newPassword" value={profileData.newPassword} onChange={handleChange} placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:bg-white transition-colors text-sm"
                  />
                </div>
              </div>
            </section>

          </div>

        </form>
      </main>
    </div>
  );
};

export default FirmProfilePage;