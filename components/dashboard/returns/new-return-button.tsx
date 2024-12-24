'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { itrTypes } from '@/lib/data/itr-types';
import { Plus } from 'lucide-react';

export function NewReturnButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Return
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select ITR Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {itrTypes.map((itr) => (
            <Button key={itr.type} variant="outline" className="justify-start">
              <div className="text-left">
                <div className="font-semibold">{itr.type}</div>
                <div className="text-sm text-muted-foreground">
                  {itr.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}