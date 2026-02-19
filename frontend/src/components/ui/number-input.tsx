import React from 'react';
import { Input, InputProps } from '@/components/ui/input';

interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  onChange: (value: number | undefined) => void;
  value: number | undefined;
  min?: number;
  max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  value,
  min,
  max,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? undefined : Number(e.target.value);

    if (newValue !== undefined) {
      if (min !== undefined && newValue < min) return;
      if (max !== undefined && newValue > max) return;
    }

    onChange(newValue);
  };

  return (
    <Input
      type="number"
      onChange={handleChange}
      value={value ?? ''}
      min={min}
      max={max}
      {...props}
    />
  );
};

export default NumberInput;
