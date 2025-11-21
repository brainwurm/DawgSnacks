import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#3B0270] bg-opacity-50 backdrop-blur-sm border border-gray-500 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
