'use client'

import { useState, FormEvent } from 'react'
import Modal from '@/components/ui/Modal/Modal'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister
}: LoginModalProps) {
  // Добавляем стейты для полей и ошибки
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // Предотвращаем перезагрузку страницы

    // Простая проверка на пустые поля
    if (!email.trim() || !password.trim()) {
      setError('Будь ласка, заповніть всі поля')
      return
    }

    // Если всё хорошо, очищаем ошибку и продолжаем логику входа
    setError('')
    console.log('Дані для входу:', { email, password })
    // Здесь будет вызов вашего API для авторизации
  }

  // Очищаем ошибку, если пользователь начал вводить текст
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    if (error) setError('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[360px] mx-auto w-full">

        {/* Шапка модального окна */}
        <div className="relative flex justify-center items-center mb-7">
          <h2 className="text-3xl font-bold text-gray-900">Вхід</h2>
          <button
            onClick={onClose}
            className="absolute right-0 p-2 text-gray-400 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-600 transition-colors"
            aria-label="Закрити "
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

        {/* Оборачиваем в форму для обработки submit */}
        <form onSubmit={handleSubmit}>
          {/* Поля ввода */}
          <div className="space-y-3 mb-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleInputChange(setEmail)}
              className={`w-full bg-[#f4f4f5] text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:bg-white transition-all ${
                error && !email.trim() ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handleInputChange(setPassword)}
              className={`w-full bg-[#f4f4f5] text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:bg-white transition-all ${
                error && !password.trim() ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Вывод ошибки */}
          {error && (
            <p className="text-red-500 text-sm font-medium mb-4 text-center">
              {error}
            </p>
          )}

          {/* Главная кнопка */}
          <button 
            type="submit" 
            className="w-full bg-[#1a73e8] hover:bg-blue-600 text-white font-medium py-3.5 rounded-xl transition-colors mb-5 shadow-sm cursor-pointer"
          >
            Увійти
          </button>
        </form>

        {/* Ссылка на регистрацию */}
        <div className="text-center text-gray-500 text-sm">
          Ще немає акаунта?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#1a73e8] font-medium hover:underline transition-all cursor-pointer"
          >
            Створіть акаунт
          </button>
        </div>

      </div>
    </Modal>
  )
}