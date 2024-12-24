'use client';

import { useState } from 'react';
import { DocumentsList } from '@/components/dashboard/documents/documents-list';
import { UploadButton } from '@/components/dashboard/documents/upload-button';

export default function DocumentsPage() {
  const [refresh, setRefresh] = useState(false);

  const handleUploadSuccess = () => {
    setRefresh((prev) => !prev); // Toggle refresh state
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">
            Manage your tax-related documents
          </p>
        </div>
        <UploadButton onUploadSuccess={handleUploadSuccess} />
      </div>
      <DocumentsList refresh={refresh} />
    </div>
  );
}
