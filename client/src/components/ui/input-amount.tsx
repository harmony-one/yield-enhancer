import { Input } from "./input";
import { Button } from "./button";
import { Label } from "./label";

interface InputAmountProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onMaxClick: () => void;
  placeholder?: string;
}

export function InputAmount({
  id,
  label,
  value,
  onChange,
  onMaxClick,
  placeholder = "0.00000"
}: InputAmountProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-lg py-5 bg-black/40 border-cyan-500/20 text-white"
        />
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-auto py-1 text-cyan-400 hover:text-cyan-300"
          onClick={onMaxClick}
        >
          max
        </Button>
      </div>
    </div>
  );
}