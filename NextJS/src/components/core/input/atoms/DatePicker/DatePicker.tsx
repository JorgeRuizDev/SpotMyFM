import React from "react";

import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils, DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";

import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
interface IDatePickerProps {
  defaultDate: Date;
  onDayChange: (d: Date) => void;
  dayPickerProps?: object;
}

function DatePicker(p: IDatePickerProps) {
  const FORMAT = "dd/MM/yyyy";

  function onDayChange(
    day: Date,
    modifiers: DayModifiers,
    dayPickerInput: DayPickerInput
  ) {
    const input = dayPickerInput.getInput();

    if (day !== undefined && input.value.length == 10) {
      p.onDayChange(day);
    }
  }

  return (
    <DayPickerInput
      formatDate={formatDate}
      format={FORMAT}
      parseDate={parseDate}
      onDayChange={onDayChange}
      value={p.defaultDate}
      placeholder={FORMAT}
      dayPickerProps={p.dayPickerProps}
    />
  );
}

export default DatePicker;

function parseDate(str: any, format: any, locale: any) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date: any, format: any, locale: any) {
  return dateFnsFormat(date, format, { locale });
}
