'use client'

import { useState } from 'react'
import { Headphones, User } from 'lucide-react' // Використовуємо lucide-react для іконок
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import VerifyEmailModal from '@/components/modals/VerifyEmailModal'
import Link from 'next/link'

interface HeaderProps {
  auth?: boolean; // Зробив опціональним, щоб не викликало помилок, якщо не передати
}

export default function Header({ auth }: HeaderProps) {
  const [activeModal, setActiveModal] = useState<
    'login' | 'register' | 'verify' | null
  >(null)

  return (
    // Додано синій фон (колір взято зі скріншота) та білий колір тексту
    <header className="w-full bg-[#1E66F5] text-white">
      {/* Висота хедера фіксована або задається через padding, тут використовуємо h-[90px] згідно з вашим leading-[90px] */}
      <div className="max-w-7xl mx-auto px-6 h-[90px] flex items-center justify-between">
        
        <Link href="/" className="text-[33px] font-bold tracking-wide cursor-pointer">
          Bussy
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/firm/fleet"  className="flex items-center gap-2 text-[15px] font-medium hover:opacity-80 transition-opacity cursor-pointer">
            <Headphones size={20} strokeWidth={2.5} />
            Підтримка
          </Link>

          <button
            className="flex items-center gap-2 text-[15px] font-medium hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => setActiveModal('login')}
          >
            <User size={20} strokeWidth={2.5} />
            Профіль
          </button>
        </div>
      </div>

      {/* --- МОДАЛЬНІ ВІКНА --- */}
      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={() => setActiveModal(null)}
        onSwitchToRegister={() => setActiveModal('register')}
      />

      <RegisterModal
        isOpen={activeModal === 'register'}
        onClose={() => setActiveModal(null)}
        onSwitchToLogin={() => setActiveModal('login')}
        onSuccessRegister={() => setActiveModal('verify')}
      />

      <VerifyEmailModal
        isOpen={activeModal === 'verify'}
        onClose={() => setActiveModal(null)}
        onBack={() => setActiveModal('register')}
      />
    </header>
  )
}