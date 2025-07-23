import React from 'react';
import StepperInput from './StepperInput';

interface TimeInputFieldsProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

const TimeInputFields: React.FC<TimeInputFieldsProps> = ({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}) => (
  <div className="flex gap-4 mb-4">
    <div className="flex-1">
      <StepperInput
        label="Timmar"
        value={hours}
        min={0}
        onChange={onHoursChange}
        placeholder="0"
      />
    </div>
    <div className="flex-1">
      <StepperInput
        label="Minuter"
        value={minutes}
        min={0}
        max={59}
        onChange={onMinutesChange}
        placeholder="0"
      />
    </div>
  </div>
);

export default TimeInputFields; 