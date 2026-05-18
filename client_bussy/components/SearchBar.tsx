"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import "react-day-picker/dist/style.css";

export default function SearchBar() {
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [openCalendar, setOpenCalendar] =
    useState<"departure" | "return" | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        openCalendar &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenCalendar(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openCalendar]);

  const formatDate = (date?: Date) =>
    date ? format(date, "dd.MM.yyyy", { locale: uk }) : "";

  return (
    <div className="w-full text-black px-8">
      <div 
        ref={wrapperRef}
        // ЗМІНЕНО ТУТ: max-w-7xl замінено на max-w-5xl, щоб зробити вужче
        className="max-w-[1220px] mx-auto relative"      >
        {/* ЗМІНЕНО ТУТ: прибрано mx-8 в кінці, залишено тільки w-full */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-xl p-3 gap-3 w-full">

          {/* FROM */}
          <input
            placeholder="Звідки"
            className="w-full md:flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* TO */}
          <input
            placeholder="Куди"
            className="w-full md:flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* DEPARTURE */}
          <div className="w-full md:flex-1 relative">
            <input
              readOnly
              onClick={() => setOpenCalendar("departure")}
              value={formatDate(departureDate)}
              placeholder="Туди"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
            />

            {openCalendar === "departure" && (
              <div className="absolute mt-2 bg-white rounded-2xl shadow-2xl p-4 z-50">
                <DayPicker
                  mode="single"
                  selected={departureDate}
                  onSelect={(date) => {
                    setDepartureDate(date);
                    setReturnDate(undefined);
                    setOpenCalendar("return");
                  }}
                  locale={uk}
                  disabled={{ before: new Date() }}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>

          {/* RETURN */}
          <div className="w-full md:flex-1 relative">
            <input
              readOnly
              onClick={() => {
                if (!departureDate) {
                  setOpenCalendar("departure");
                } else {
                  setOpenCalendar("return");
                }
              }}
              value={formatDate(returnDate)}
              placeholder="Назад"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
            />

            {openCalendar === "return" && (
              <div className="absolute mt-2 bg-white rounded-2xl shadow-2xl p-4 z-50 left-0 md:right-0 md:left-auto">
                <DayPicker
                  mode="single"
                  selected={returnDate}
                  onSelect={(date) => {
                    setReturnDate(date);
                    setOpenCalendar(null);
                  }}
                  locale={uk}
                  disabled={{
                    before: departureDate || new Date(),
                  }}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 transition text-white px-8 py-3 rounded-xl font-medium whitespace-nowrap">
            Знайти квитки
          </button>
        </div>
      </div>
    </div>
  );
}