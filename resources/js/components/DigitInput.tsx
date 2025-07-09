// components/DigitInput.tsx
import React from 'react';

interface DigitInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
  error?: boolean;
  autoFocus?: boolean;
}

export const DigitInput = React.forwardRef<HTMLInputElement, DigitInputProps>(
  (
    { value, onChange, onKeyDown, onPaste, type = 'text', error = false, autoFocus = false },
    ref
  ) => (
    <input
      ref={ref}
      type={type}
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={1}
      required
      autoComplete="off"
      className={`h-12 w-12 rounded-md border text-center text-2xl focus:ring-1 focus:outline-none ${
        error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      }`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      autoFocus={autoFocus}
      onFocus={(e) => e.target.select()}
    />
  )
);

DigitInput.displayName = 'DigitInput';