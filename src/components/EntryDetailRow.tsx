import React from 'react';
import type { LogItem } from '../common/types';

interface EntryDetailRowProps {
  logItem: LogItem;
  onEdit: (logItem: LogItem) => void;
}

const EntryDetailRow: React.FC<EntryDetailRowProps> = ({
  logItem,
  onEdit,
}) => {
  return (
    <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-100">
      <span className="text-gray-700">{logItem.date}</span>
      <div className="flex items-center">
        <span className={`${logItem.type === 'add' ? 'text-primary' : 'text-secondary'} font-medium mr-3`}>
          {logItem.type === 'add' ? '+' : '-'} {logItem.hours}t {logItem.minutes}m
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(logItem);
          }}
          className="text-primary hover:text-primary-dimmed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EntryDetailRow; 