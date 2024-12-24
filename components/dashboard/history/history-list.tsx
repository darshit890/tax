'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export function HistoryList() {


  return (
    <div className="space-y-4">
      {/* {history.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.type}</h3>
              <p className="text-sm text-muted-foreground">
                Assessment Year: {item.assessment_year}
              </p>
            </div>
            <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
              {item.status}
            </Badge>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Last Updated: {formatDate(item.upload_date)}
          </div>
        </Card>
      ))} */}
    </div>
  );
}