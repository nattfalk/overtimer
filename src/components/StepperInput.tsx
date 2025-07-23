import React, { useRef, useEffect } from 'react';

interface StepperInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const buttonClasses =
  'w-10 h-10 aspect-square flex items-center justify-center bg-primary text-white rounded transition text-2xl hover:bg-primary-dimmed';

const StepperInput: React.FC<StepperInputProps> = ({
  label,
  value,
  min = 0,
  max = Infinity,
  onChange,
  placeholder = '0',
}) => {
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const valueRef = useRef(value);

  // Always keep the latest value in the ref
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStep = (delta: number) => {
    let newValue = valueRef.current + delta;
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
  };

  const handlePointerDown = (delta: number) => {
    handleStep(delta); // Step once immediately
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        handleStep(delta);
      }, 200);
    }, 500);
  };

  const handlePointerUp = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = Number(e.target.value);
    if (isNaN(v)) v = min;
    v = Math.max(min, Math.min(max, v));
    onChange(v);
  };

  return (
    <div>
      <label className="block text-primary mb-1">{label}</label>
      <div className="flex items-center">
        <button
          type="button"
          className={`${buttonClasses} rounded-l`}
          onPointerDown={() => handlePointerDown(-1)}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onContextMenu={e => e.preventDefault()}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          -
        </button>
        <input
          type="number"
          className="w-full px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
          style={{ borderLeft: 'none', borderRight: 'none' }}
          value={value === 0 ? '' : value}
          placeholder={placeholder}
          min={min}
          max={max !== Infinity ? max : undefined}
          onChange={handleInput}
        />
        <button
          type="button"
          className={`${buttonClasses} rounded-r`}
          onPointerDown={() => handlePointerDown(1)}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onContextMenu={e => e.preventDefault()}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default StepperInput; 