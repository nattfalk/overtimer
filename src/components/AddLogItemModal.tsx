import React, { useEffect, useState } from 'react';
import { GLOBAL_CONFIG } from '../config/globals';
import TimeInputFields from './TimeInputFields';
import { DatePicker } from './ui/date-picker';
import type { LogItem } from '../common/types';

interface AddLogItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (logItem: LogItem) => void;
  error?: string | null;
}

const AddLogItemModal: React.FC<AddLogItemModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  error,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [date, setDate] = useState(() => new Date().toLocaleDateString('sv-SE').slice(0, 10));

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      // Start animation after a brief delay to ensure the element is rendered
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  const handleSubmit = () => {
    onAdd({ type: 'add', date, hours, minutes });
  };

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xs transform transition-all duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <h2 className="text-lg font-bold mb-4">Lägg till</h2>
        {error && (
          <div className="text-red-600 text-center mb-3">{error}</div>
        )}
        <div className="mb-3">
          <label className="block text-primary mb-1">Datum</label>
          <DatePicker
            date={date ? new Date(date) : undefined}
            onChange={(newDate: Date | undefined) => setDate(newDate ? newDate.toLocaleDateString('sv-SE') : '')}
          />
        </div>
        <TimeInputFields
          hours={hours}
          minutes={minutes}
          onHoursChange={setHours}
          onMinutesChange={setMinutes}
        />
        <button
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dimmed transition mb-2"
          onClick={handleSubmit}
        >
          Lägg till
        </button>
        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          onClick={onClose}
        >
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default AddLogItemModal; 