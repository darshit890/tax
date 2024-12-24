'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Trash } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface Document {
  id: string;
  name: string;
  type: string;
  file_path: string;
  upload_date: string;
}

interface DocumentsListProps {
  refresh: boolean;
}

export function DocumentsList({ refresh }: DocumentsListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    async function fetchDocuments() {
      try {
        setLoading(true);
        const response = await fetch('/api/documents');
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error("Failed to fetch documents. Please try again.")
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      try {
        const response = await fetch('/api/documents', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete document');
        }

        // Remove the deleted document from the state
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
        toast.success("Document deleted successfully.")
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while deleting the document');
        toast.error("Failed to delete document. Please try again.")
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading documents: {error}</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No documents uploaded yet</h3>
        <p className="text-muted-foreground">
          Start by uploading your first document using the &quot;Upload Document&quot; button above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">
                Type: {doc.type} | Uploaded: {formatDate(doc.upload_date)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.open(doc.file_path)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(doc.id)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

