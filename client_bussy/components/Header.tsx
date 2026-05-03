'use client'

import Image from "next/image"
import { useState } from 'react'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import VerifyEmailModal from '@/components/modals/VerifyEmailModal'


interface HeaderProps {
  auth: true
}

export default function MyComponent({ auth }: HeaderProps) {
  const [activeModal, setActiveModal] = useState<
    'login' | 'register' | 'verify' | null
  >(null)

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <h1 className="text-[33px] leading-[90px] font-bold">
          Bussy
        </h1>

        <div className="flex items-center gap-8">

          <button className="flex items-center gap-2 text-base font-medium hover:opacity-70 transition">
            <Image src="/help.svg" alt="Support" width={24} height={24} />
            Підтримка
          </button>

          <button
            className="flex items-center gap-2 text-base font-medium hover:opacity-70 transition"
            onClick={() => setActiveModal('login')}
          >
            <Image src="/profile.svg" alt="Profile" width={24} height={24} />
            Профіль
          </button>

        </div>
      </div>

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