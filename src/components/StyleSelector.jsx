import { STYLE_OPTIONS } from "@/utils/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from 'react';

export default function StyleSelector({ value, onChange }) {
  // Use React.forwardRef internally for testing compatibility if needed, but Shadcn uses it standardly
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full md:w-[280px]">
        <SelectValue placeholder="Select a visual style" />
      </SelectTrigger>
      <SelectContent>
        {STYLE_OPTIONS.map((style) => (
          <SelectItem key={style.value} value={style.value}>
            {style.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
