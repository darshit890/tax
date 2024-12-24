'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const documentTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'itr-1', label: 'ITR-1' },
  { value: 'itr-2', label: 'ITR-2' },
  { value: 'form-16', label: 'Form-16' },
  { value: 'form-15g', label: 'Form 15G' },
];

const years = Array.from({ length: 3 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: `${year}-${year + 1}` };
});

export function HistoryFilter() {

  return (
    <div className="flex gap-4">
      <Select
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {documentTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assessment Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year.value} value={year.value}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}