import { useState } from "react";
import dayjs from "dayjs";

import SubmitIcon from '../assets/submit.svg';

interface InputProps {
  title: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const numberFiler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
    e.preventDefault();
  }
};

function Input({ title, placeholder, onChange }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm tracking-[2px] text-zinc-500	font-semibold">
        {title}
      </label>
      <input
        className="w-20 sm:w-[160px] px-4 py-2  border border-gray-300 focus:border-primary-color rounded-md outline-none duration-300 font-bold tracking-wider"
        placeholder={placeholder}
        onKeyDown={numberFiler}
        onChange={onChange}
      />
    </div>
  );
}

interface DateInputProps {
  onDateChange: (date: dayjs.Dayjs) => void;
}

export default function DateInput({ onDateChange }: DateInputProps) {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(parseInt(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value));
  };

  const handleSubmit = () => {
    if (!day || !month || !year) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const date = dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    if (!date.isValid()) {
      setErrorMessage('Please enter a valid date');
      return;
    }

    if (year > 9999) {
      setErrorMessage('Please enter a year less than 9999');
      return;
    }

    if (month < 1 || month > 12) {
      setErrorMessage('Please enter a valid month');
      return;
    }

    const maxDays = dayjs(`${year}-${month}`, 'YYYY-MM').daysInMonth();
    if (day < 1 || day > maxDays) {
      setErrorMessage('Please enter a valid day');
      return;
    }

    setErrorMessage('');
    if (typeof onDateChange === 'function') {
      onDateChange(date);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-4 sm:gap-8">
        <Input title="DAY" placeholder="DD" onChange={handleDayChange} />
        <Input title="MONTH" placeholder="MM" onChange={handleMonthChange} />
        <Input title="YEAR" placeholder="YYYY" onChange={handleYearChange} />
      </div>

      {errorMessage && (
        <p className=" absolute text-red-500 italic mt-4">{errorMessage}</p>)
      }

      <div className="flex items-center">
        <div className="h-[1px] w-10/12 bg-zinc-200 my-16" />
        <img
          src={SubmitIcon} alt="submit"
          onClick={handleSubmit}
          className="w-16 h-16 sm:h-24 sm:w-24 cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
}
