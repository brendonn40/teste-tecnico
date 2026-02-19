import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, LucideIcon, X } from 'lucide-react';
import { AsYouType, CountryCode } from 'libphonenumber-js';
import { countries } from '@/lib/countries';

function MultipleTextInput({
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  startIcon,
  endIcon,
  type = 'text',
  min = 0,
  defaultCountry = 'BR',
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  type?: string;
  min?: number;
  defaultCountry?: CountryCode;
}) {
  const asYouType = new AsYouType(defaultCountry);

  return (
    <div className="space-y-2">
      {value.map((field, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Input
            startIcon={startIcon}
            endIcon={endIcon}
            value={type === 'tel' ? asYouType.input(field) : field}
            onChange={(e) => {
              const newValue = [...value];
              newValue[index] = e.target.value;
              onChange(newValue);
            }}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              const newValue = value.filter((_, i) => i !== index);
              onChange(newValue);
            }}
            disabled={disabled || value.length <= min}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => {
          onChange([...value, '']);
        }}
        disabled={disabled}
      >
        <PlusIcon className="h-4 w-4 mr-2" />
        Adicionar
      </Button>
    </div>
  );
}

export default MultipleTextInput;
