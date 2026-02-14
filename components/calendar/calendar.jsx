import { useContext, useMemo } from 'react';
import { LocaleContext } from './context';
import classes from './calendar.module.css'

/**
 * @param {object} props
 * @param {Date} props.date
 * @returns {JSX.Element}
 */
export function Calendar({ date, className = classes.default }) {
  const
    locale = useContext(LocaleContext),
    caption = date.toLocaleDateString(locale, { year: "numeric", month: "long" }),
    dayNames = useMemo(() =>
      Array.from({ length: 7 }, (_, index) =>
        <td key={index}>{(new Date(2019, 0, index)).toLocaleDateString(locale, { weekday: 'short' })}</td>),
      [locale]),
    year = date.getFullYear(),
    month = date.getMonth(),
    selected = date.getDate(),
    max = (new Date(year, month + 1, 0)).getDate(), // число предшествующее 1 числу (нулевое) следующего месяца и есть число дней в текущем    
    firstDayOfWeek = (new Date(year, month, 1)).getDay(),   // ВС=0 ПН=1 ВТ=2 .. СБ=6 
    shift = (-1 + firstDayOfWeek + 7) % 7;                  //      ПН=0 ВТ=1 .. СБ=5 ВС=6

  return <table className={className}>
    <caption>{caption}</caption>
    <thead>
      <tr>{dayNames}</tr>
    </thead>
    <tbody>
      <Month shift={shift} max={max} selected={selected} />
    </tbody>
  </table>


}




function Month({ shift, max, selected }) {
  const
    result = [];
  for (let start = 1 - shift; start <= max; start += 7) {
    result.push(<Week key={start} start={start} max={max} selected={selected} />)
  }
  return <>{result}</>;
}


function Week({ start, max, selected }) {
  return <tr>
    {Array.from({ length: 7 }, (_, index) => {
      const
        day = start + index;
      return <td
        {...(day >= 1 && day <= max ? { 'data-day': day } : {})}
        key={day}
        {...(+day === +selected ? { 'data-selected': '' } : {})}
      >
        {day >= 1 && day <= max && day}
      </td>
    })}
  </tr>
}