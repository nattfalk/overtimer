import React, { useState, useEffect } from 'react';
import { GLOBAL_CONFIG } from '../config/globals';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirm Delete",
  confirmText = "Yes",
  cancelText = "No"
}) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

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

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-xs transform transition-all duration-${GLOBAL_CONFIG.ANIMATIONS.MODAL_TRANSITION_DURATION} ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-secondary text-white py-2 rounded hover:bg-secondary-dimmed transition"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal; 