'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [formData, setFormData] = useState({
    firstName: 'Євгеній',
    lastName: 'Мищенко',
    email: 'jekaniks34@gmail.com',
    phone: '+380 50 123 4567', // Добавлено поле телефона
    oldPassword: '',
    newPassword: ''
  });

  // Если модалка закрыта, не рендерим её
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log('Збережені дані:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-manrope">
      <div className="bg-white rounded-[32px] w-full max-w-[400px] p-6 sm:p-8 relative shadow-xl">
        
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[28px] font-extrabold text-gray-900 tracking-tight">Профіль</h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Блок Основні дані */}
          <div>
            <h3 className="text-[13px] text-gray-500 mb-3 font-medium">Основні дані</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-semibold text-gray-900 transition-shadow" 
                placeholder="Ім'я" 
              />
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-semibold text-gray-900 transition-shadow" 
                placeholder="Прізвище" 
              />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-semibold text-gray-900 transition-shadow" 
                placeholder="Email" 
              />
              {/* Новое поле телефона */}
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-semibold text-gray-900 transition-shadow" 
                placeholder="Телефон" 
              />
            </div>
          </div>

          {/* Блок Пароль */}
          <div>
            <h3 className="text-[13px] text-gray-500 mb-3 font-medium mt-2">Пароль</h3>
            <div className="space-y-3">
              <input 
                type="password" 
                name="oldPassword" 
                value={formData.oldPassword} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-medium text-gray-900 placeholder:font-normal placeholder:text-gray-500 transition-shadow" 
                placeholder="Старий пароль" 
              />
              <input 
                type="password" 
                name="newPassword" 
                value={formData.newPassword} 
                onChange={handleChange} 
                className="w-full bg-[#f1f3f5] rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 text-[15px] font-medium text-gray-900 placeholder:font-normal placeholder:text-gray-500 transition-shadow" 
                placeholder="Новий пароль" 
              />
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose} 
            className="flex-1 py-4 bg-[#f1f3f5] hover:bg-[#e8ebf0] text-gray-900 rounded-[20px] font-bold text-[16px] transition-colors"
          >
            Скасувати
          </button>
          <button 
            onClick={handleSave} 
            className="flex-1 py-4 bg-[#1a73e8] hover:bg-blue-600 text-white rounded-[20px] font-bold text-[16px] transition-colors shadow-sm"
          >
            Зберегти
          </button>
        </div>
        
      </div>
    </div>
  );
}