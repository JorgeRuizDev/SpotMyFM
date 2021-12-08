import DatePicker from "components/core/input/atoms/DatePicker";
import React from "react";
import Styled from "./AnyIntervalPicker.styles";

interface IAnyIntervalPickerProps {
  oldestDate: Date;
  newestDate: Date;
  setMin(d: Date): void;
  setMax(d: Date): void;
}
function AnyIntervalPicker({
  oldestDate,
  newestDate,
  setMin,
  setMax,
}: IAnyIntervalPickerProps) {
  return (
    <>
      <Styled.CenterRow>
        <Styled.Col>
          <p>Start Date</p>
          <DatePicker
            onDayChange={(d) => setMin(d)}
            defaultDate={oldestDate}
            dayPickerProps={{
              disabledDays: {
                before: oldestDate,
              },
            }}
          />
        </Styled.Col>

        <Styled.Col>
          <p>End Date</p>
          <DatePicker
            onDayChange={(d) => setMax(d)}
            defaultDate={newestDate}
            dayPickerProps={{
              disabledDays: {
                after: newestDate,
              },
            }}
          />
        </Styled.Col>
      </Styled.CenterRow>
    </>
  );
}

export default AnyIntervalPicker;
