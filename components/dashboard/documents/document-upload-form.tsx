'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const formSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.string().min(1, 'Document type is required'),
  fileUrl: z.string().url('Valid file URL is required'),
});

export function DocumentUploadForm({ onClose, onUploadSuccess }: { onClose?: () => void; onUploadSuccess?: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      fileUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload document');
      }

      form.reset();
      onUploadSuccess?.();
      onClose?.();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error("failed to upload document");
    } finally {
      toast.success("document is uploaded successfully")
      setIsUploading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter document name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter document type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <UploadButton<OurFileRouter, "documentUploader">
                  endpoint="documentUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      field.onChange(res[0].url);
                      toast.success("File uploaded successfully")
                    }
                  }}
                  onUploadError={(error) => {
                    toast.error("Error uploading file")
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </form>
    </Form>
  );
}

