import React, { useState, useEffect } from 'react';
import { GLOBAL_CONFIG } from '../config/globals';
import TimeInputFields from './TimeInputFields';
import { DatePicker } from './ui/date-picker';
import type { LogItem } from '../common/types';

interface EditLogItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (logItem: LogItem) => void;
  logItem: LogItem;
  onDelete?: () => void;
}

const EditLogItemModal: React.FC<EditLogItemModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  logItem,
  onDelete,
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [hours, setHours] = useState(logItem.hours);
  const [minutes, setMinutes] = useState(logItem.minutes);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setHours(logItem.hours);
      setMinutes(logItem.minutes);
      // Start animation after a brief delay to ensure the element is rendered
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timeout = setTimeout(() => setShow(false), GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, logItem.hours, logItem.minutes]);

  if (!show) return null;

  const handleHoursChange = (h: number) => setHours(h);
  const handleMinutesChange = (m: number) => setMinutes(m);

  const handleSubmit = () => {
    onUpdate({ ...logItem, hours, minutes });
  };

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xs transform transition-all duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <h2 className="text-lg font-bold mb-4">Edit Entry</h2>
        <div className="mb-3">
          <label className="block text-primary mb-1">Date</label>
          <DatePicker
            date={logItem.date ? new Date(logItem.date) : undefined}
            onChange={() => {}} // Read-only
          />
        </div>
        <TimeInputFields
          hours={hours}
          minutes={minutes}
          onHoursChange={handleHoursChange}
          onMinutesChange={handleMinutesChange}
        />
        <button
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dimmed transition mb-2"
          onClick={handleSubmit}
        >
          Uppdatera post
        </button>
        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition mb-2"
          onClick={onClose}
        >
          Avbryt
        </button>
        {onDelete && (
          <button
            className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary-dimmed transition"
            onClick={onDelete}
          >
            Ta bort post
          </button>
        )}
      </div>
    </div>
  );
};

export default EditLogItemModal; 