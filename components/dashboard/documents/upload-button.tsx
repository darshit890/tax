'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Upload } from 'lucide-react';
import { DocumentUploadForm } from './document-upload-form';
import { useToast } from '@/components/ui/use-toast';

export function UploadButton({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUploadSuccess = () => {
    toast({
      title: 'Success',
      description: 'Document uploaded successfully.',
    });
    onUploadSuccess();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Tax Document</DialogTitle>
        </DialogHeader>
        <DocumentUploadForm onClose={handleClose} onUploadSuccess={handleUploadSuccess} />
      </DialogContent>
    </Dialog>
  );
}

