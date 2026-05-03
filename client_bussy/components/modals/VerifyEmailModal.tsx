'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Modal from '@/components/ui/Modal/Modal'

interface VerifyEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  onSuccess?: () => void // Добавлено для действия после успешной проверки
  email?: string
}

export default function VerifyEmailModal({
  isOpen,
  onClose,
  onBack,
  onSuccess,
  email = 'e*****le@gmail.com'
}: VerifyEmailModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  // Обработчик ввода кода
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    // Разрешаем вводить только цифры и ограничиваем длину до 6 символов
    if (/^\d{0,6}$/.test(val)) {
      setCode(val)
      if (error) setError('') // Убираем ошибку, если пользователь начал вводить заново
    }
  }

  // Обработчик отправки
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Если введено меньше 6 цифр (хотя кнопка и так заблокирована, это дополнительная защита)
    if (code.length !== 6) {
      setError('Код має містити 6 цифр')
      return
    }

    // Проверка на правильный код (шесть единиц)
    if (code !== '111111') {
      setError('Невірний код підтвердження')
      return
    }

    // Если код верный:
    setError('')
    console.log('Код вірний! Створення акаунту...')
    if (onSuccess) onSuccess()
  }

  // Кнопка неактивна, пока не введено 6 символов
  const isButtonDisabled = code.length !== 6

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[360px] mx-auto w-full">

        {/* Шапка модального вікна (Назад + Закрити) */}
        <div className="flex justify-between items-center mb-7">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-gray-400 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-600 transition-colors"
            aria-label="Закрити"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Форма для обробки натискання Enter */}
        <form onSubmit={handleSubmit}>
          {/* Поле вводу з кнопкою "Повторити" */}
          <div className="relative mb-3">
            <input
              type="text"
              inputMode="numeric" // Показывает цифровую клавиатуру на мобильных
              placeholder="Код"
              value={code}
              onChange={handleCodeChange}
              className={`w-full bg-[#f4f4f5] text-gray-900 placeholder-gray-500 pl-4 pr-24 py-3.5 rounded-xl outline-none focus:ring-2 focus:bg-white transition-all tracking-[0.2em] font-medium ${
                error ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a73e8] font-medium text-sm hover:underline transition-all"
            >
              Повторити
            </button>
          </div>

          {/* Вивід помилки, якщо вона є */}
          {error && (
            <p className="text-red-500 text-sm mb-3 font-medium">
              {error}
            </p>
          )}

          {/* Інформаційний текст */}
          <p className="text-gray-500 text-sm mb-8 leading-relaxed text-left">
            Код підтвердження був надісланий на пошту <br />
            {email}
          </p>

          {/* Головна кнопка (Динамічно змінює колір) */}
          <button 
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full font-medium py-3.5 rounded-xl mb-2 transition-colors ${
              isButtonDisabled 
                ? 'bg-[#b8bcc5] text-white cursor-not-allowed' // Сіра, якщо коду немає або він коротший за 6
                : 'bg-[#1a73e8] hover:bg-blue-600 text-white shadow-sm' // Синя, якщо введено 6 цифр
            }`}
          >
            Створити акаунт
          </button>
        </form>

      </div>
    </Modal>
  )
}