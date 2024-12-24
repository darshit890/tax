import { HistoryList } from '@/components/dashboard/history/history-list';
import { HistoryFilter } from '@/components/dashboard/history/history-filter';

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">History</h2>
        <p className="text-muted-foreground">
          View your tax filing history and past returns
        </p>
      </div>
      <HistoryFilter />
      <HistoryList />
    </div>
  );
}