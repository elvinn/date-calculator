import dayjs from 'dayjs';
import DateInput from './DateInput';
import { useState } from 'react';

function getDateDifference(d1: dayjs.Dayjs, d2: dayjs.Dayjs) {
  const isD1Earlier = d1.isBefore(d2);
  let earlyDate = isD1Earlier ? dayjs(d1) : dayjs(d2);
  const laterDate = isD1Earlier ? dayjs(d2) : dayjs(d1);

  const years = laterDate.diff(earlyDate, 'year');
  earlyDate = earlyDate.add(years, 'year');

  const months = laterDate.diff(earlyDate, 'month');
  earlyDate = earlyDate.add(months, 'month');

  const days = laterDate.diff(earlyDate, 'day');

  return { years, months, days };
}

export default function Card() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const handleDateChange = (date: dayjs.Dayjs) => {
    const difference = getDateDifference(date, dayjs());
    setDay(difference.days);
    setMonth(difference.months);
    setYear(difference.years);
  };

  return (
    <div className='w-full max-w-[850px] h-[480px] sm:h-[660px] overflow-hidden m-4 bg-white px-6 py-12 sm:px-12 rounded-3xl rounded-br-[120px] sm:rounded-br-[240px] font-[Poppins]'>
      <DateInput onDateChange={handleDateChange} />

      <div className='italic font-extrabold text-5xl sm:text-8xl'>
        <div className='flex'>
          <span className='text-primary-color mr-4 min-w-14 sm:min-w-28'>{year || '- -'}</span>
          <span>year{year > 1 && 's'}</span>
        </div>
        <div className='flex'>
          <span className='text-primary-color mr-4 min-w-14 sm:min-w-28'>{month || '- -'}</span>
          <span>month{month > 1 && 's'}</span>
        </div>
        <div className='flex'>
          <span className='text-primary-color mr-4 min-w-14 sm:min-w-28'>{day || '- -'}</span>
          <span>day{day > 1 && 's'}</span>
        </div>
      </div>
    </div>
  );
}
