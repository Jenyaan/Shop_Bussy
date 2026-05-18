'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal/Modal'
import { X } from 'lucide-react'

interface SeatSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (seat: string) => void
}

// Вспомогательные компоненты для элементов на краях автобуса
const WindowLeft = () => (
  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-[6px] h-[28px] bg-[#c5ddfa] rounded-r-[4px]"></div>
)

const WindowRight = () => (
  <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-[6px] h-[28px] bg-[#c5ddfa] rounded-l-[4px]"></div>
)

// Иконка правой двери (Выход)
const DoorRight = () => (
  <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-[28px] h-[42px] bg-[#d4d9e0] rounded-l-lg flex items-center justify-center pl-1 shadow-[inset_1px_0_2px_rgba(0,0,0,0.02)]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  </div>
)

// Иконка левой двери (Отражена по горизонтали)
const DoorLeft = () => (
  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-[28px] h-[42px] bg-[#d4d9e0] rounded-r-lg flex items-center justify-center pr-1 shadow-[inset_-1px_0_2px_rgba(0,0,0,0.02)]">
    <svg className="rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  </div>
)

// Идеально точная иконка руля (как на макете)
const SteeringWheel = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a0a5af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M7 12a5 5 0 0 0 10 0" />
  </svg>
)

export default function SeatSelectionModal({ isOpen, onClose, onSelect }: SeatSelectionModalProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)

  // Имитация занятых мест (как на макете)
  const occupiedSeats = ['A2', 'C2', 'I2']
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  const handleSeatClick = (id: string) => {
    if (occupiedSeats.includes(id)) return
    setSelectedSeat(id)
  }

  // Кнопка сиденья
  const SeatButton = ({ id }: { id: string }) => {
    const isOccupied = occupiedSeats.includes(id)
    const isSelected = selectedSeat === id

    let stateClasses = ""
    if (isOccupied) {
      stateClasses = "bg-[#d4d9e0] text-[#8b95a1] cursor-not-allowed"
    } else if (isSelected) {
      stateClasses = "bg-[#1a73e8] text-white shadow-md shadow-blue-500/30"
    } else {
      stateClasses = "bg-[#e8ebf0] text-[#717b8a] hover:bg-white hover:border hover:border-[#1a73e8] hover:text-[#1a73e8] cursor-pointer"
    }

    return (
      <button
        disabled={isOccupied}
        onClick={() => handleSeatClick(id)}
        className={`w-[40px] h-[40px] rounded-[10px] text-[13px] font-bold flex items-center justify-center transition-all border border-transparent ${stateClasses}`}
      >
        {id}
      </button>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[340px] md:w-[380px] text-gray-900 mx-auto">
        
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Місце</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Схема автобуса и направляющая стрелка */}
        <div className="relative flex justify-center mb-8 pl-2 pr-10">
          
          {/* Обертка для автобуса, решает проблему с z-index у фар */}
          <div className="relative w-[260px] mt-2">
            
            {/* Фары (Спереди) - теперь они лежат НАД фоном модалки, но ПОД автобусом */}
            <div className="absolute -top-2.5 left-[35px] w-12 h-4 bg-[#d4d9e0] rounded-t-full"></div>
            <div className="absolute -top-2.5 right-[35px] w-12 h-4 bg-[#d4d9e0] rounded-t-full"></div>

            {/* Контейнер автобуса (z-10 перекрывает нижнюю часть фар) */}
            <div className="relative bg-[#f1f3f5] rounded-[40px] px-5 py-8 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] flex flex-col gap-3.5 z-10">
              
              {/* --- РЯД 0: Окно водителя, Руль и Передняя дверь --- */}
              <div className="relative flex justify-between items-center h-[40px] mb-1">
                <WindowLeft />
                <div className="flex gap-2 w-[88px] justify-center">
                  <SteeringWheel />
                </div>
                <DoorRight />
              </div>

              {/* --- РЯДЫ A-H: Сиденья и окна --- */}
              {rows.map((row) => (
                <div key={row} className="relative flex justify-between items-center h-[40px]">
                  <WindowLeft />
                  <div className="flex gap-2">
                    <SeatButton id={`${row}1`} />
                    <SeatButton id={`${row}2`} />
                  </div>
                  <div className="flex gap-2">
                    <SeatButton id={`${row}3`} />
                    <SeatButton id={`${row}4`} />
                  </div>
                  <WindowRight />
                </div>
              ))}

              {/* --- ПРОХОД: Задние двери --- */}
              <div className="relative flex justify-between items-center h-8 my-1.5">
                <DoorLeft />
                <DoorRight />
              </div>

              {/* --- РЯД I: Последние сиденья и окна --- */}
              <div className="relative flex justify-between items-center h-[40px]">
                <WindowLeft />
                <div className="flex gap-2">
                  <SeatButton id="I1" />
                  <SeatButton id="I2" />
                </div>
                <div className="flex gap-2">
                  <SeatButton id="I3" />
                  <SeatButton id="I4" />
                </div>
                <WindowRight />
              </div>

            </div>
          </div>

          {/* Стрелка направления движения справа */}
          <div className="absolute right-0 top-[100px] bottom-[90px] flex flex-col items-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b0b5bd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
            <div className="w-px h-full border-l-2 border-dashed border-[#cbd0d6]"></div>
          </div>

        </div>

        {/* Кнопки действий */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-[#f1f3f5] hover:bg-[#e8ebf0] text-gray-900 rounded-2xl font-bold transition-colors"
          >
            Закрыть
          </button>
          <button 
            disabled={!selectedSeat}
            onClick={() => {
              if (selectedSeat) onSelect(selectedSeat);
              onClose();
            }}
            className="flex-1 py-4 bg-[#1a73e8] hover:bg-blue-600 disabled:bg-[#b0b5bd] text-white rounded-2xl font-bold transition-colors shadow-lg "
          >
            Выбрать
          </button>
        </div>

      </div>
    </Modal>
  )
}