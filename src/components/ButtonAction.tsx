import React from 'react';

interface ButtonActionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  labelStyle?: React.CSSProperties;
  className?: string;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ label, icon, onClick, labelStyle, className }) => (
  <button
    className={className ? className : "flex flex-col items-center justify-center w-full aspect-square p-0"}
    onClick={onClick}
  > 
    {icon}
    <span className="text-sm" style={labelStyle}>{label}</span>
  </button>
);

export default ButtonAction; 