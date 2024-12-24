'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { taxReturns } from '@/lib/data/tax-returns';
import { formatDate, } from '@/lib/utils';
import { FileText, Calendar, Clock, DollarSign, IndianRupee } from 'lucide-react';

export function TaxReturnsList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {taxReturns.map((taxReturn) => (
        <Card key={taxReturn.id} className="p-6 transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{taxReturn.type}</h3>
            </div>
            <Badge variant={taxReturn.status === 'Filed' ? 'default' : 'secondary'}>
              {taxReturn.status}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Assessment Year: {taxReturn.assessmentYear}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              <span>Last Updated: {formatDate(taxReturn.lastUpdated)}</span>
            </div>
              <div className="flex items-center font-medium">
                <IndianRupee className="w-4 h-4 mr-2 text-green-600" />
                <span>Amount: 1000</span>
              </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

