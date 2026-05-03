'use client'

import { useState, FormEvent } from 'react'
import Modal from '@/components/ui/Modal/Modal'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  onSuccessRegister: () => void
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSuccessRegister
}: RegisterModalProps) {
  // Стейты для всех полей
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // 1. Проверка на пустые поля
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('Будь ласка, заповніть всі поля')
      return
    }

    // 2. Проверка совпадения паролей
    if (password !== confirmPassword) {
      setError('Паролі не співпадають')
      return
    }

    // Если всё хорошо
    setError('')
    console.log('Дані для реєстрації:', { firstName, lastName, email, password })
    onSuccessRegister()
  }

  // Очистка ошибки при вводе
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    if (error) setError('')
  }

  // Вспомогательная функция для классов инпутов (подсветка ошибки)
  const getInputClass = (value: string, isPasswordMatchError = false) => {
    const baseClass = "w-full bg-[#f4f4f5] text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:bg-white transition-all"
    const isError = (error === 'Будь ласка, заповніть всі поля' && !value.trim()) || isPasswordMatchError
    
    return `${baseClass} ${isError ? 'ring-2 ring-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[360px] mx-auto w-full">
        
        {/* Шапка модального окна */}
        <div className="relative flex justify-center items-center mb-7">
          <h2 className="text-3xl font-bold text-gray-900">Реєстрація</h2>
          <button
            onClick={onClose}
            className="absolute right-0 p-2 text-gray-400 bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-600 transition-colors"
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

        {/* Форма */}
        <form onSubmit={handleSubmit}>
          {/* Поля ввода */}
          <div className="space-y-3 mb-4">
            {/* Ряд с Именем и Фамилией */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ім'я"
                value={firstName}
                onChange={handleInputChange(setFirstName)}
                className={getInputClass(firstName)}
              />
              <input
                type="text"
                placeholder="Прізвище"
                value={lastName}
                onChange={handleInputChange(setLastName)}
                className={getInputClass(lastName)}
              />
            </div>

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleInputChange(setEmail)}
              className={getInputClass(email)}
            />
            
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handleInputChange(setPassword)}
              className={getInputClass(password, error === 'Паролі не співпадають')}
            />

            <input
              type="password"
              placeholder="Підтвердження пароля"
              value={confirmPassword}
              onChange={handleInputChange(setConfirmPassword)}
              className={getInputClass(confirmPassword, error === 'Паролі не співпадають')}
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
            className="w-full bg-[#1a73e8] hover:bg-blue-600 text-white font-medium py-3.5 rounded-xl transition-colors mb-5 shadow-sm"
          >
            Далі
          </button>
        </form>

        {/* Ссылка на вход */}
        <div className="text-center text-gray-500 text-sm">
          Вже є акаунт?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#1a73e8] font-medium hover:underline transition-all"
          >
            Увійдіть
          </button>
        </div>

      </div>
    </Modal>
  )
}