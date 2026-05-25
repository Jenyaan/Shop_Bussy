'use client';

import React from 'react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  // Якщо модалка закрита, нічого не рендеримо
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-manrope">
      {/* Контейнер модалки */}
      <div className="bg-white rounded-[32px] w-full max-w-[380px] p-8 sm:p-10 relative shadow-xl text-center animate-in fade-in zoom-in duration-200">
        
        {/* Заголовок */}
        <h2 className="text-[26px] sm:text-[28px] font-extrabold text-gray-900 leading-tight mb-8 tracking-tight">
          Ви впевнені,<br />
          що хочете вийти<br />
          з акаунта?
        </h2>

        {/* Кнопки */}
        <div className="flex gap-3">
          <button 
            onClick={onConfirm} 
            className="flex-1 py-4 bg-[#FFF0F0] hover:bg-[#FFE4E4] text-[#FF5252] rounded-[20px] font-bold text-[16px] transition-colors"
          >
            Так, вийти
          </button>
          <button 
            onClick={onClose} 
            className="flex-1 py-4 bg-[#1a73e8] hover:bg-blue-600 text-white rounded-[20px] font-bold text-[16px] transition-colors shadow-sm"
          >
            Залишитися
          </button>
        </div>
        
      </div>
    </div>
  );
}