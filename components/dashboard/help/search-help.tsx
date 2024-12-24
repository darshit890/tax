'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchHelp() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search help articles..."
        className="pl-9"
      />
    </div>
  );
}