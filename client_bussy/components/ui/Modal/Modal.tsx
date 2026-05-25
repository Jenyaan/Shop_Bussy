'use client'

import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-manrope "
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-xl min-w-[320px] "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}