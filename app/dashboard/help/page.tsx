import { HelpTopics } from '@/components/dashboard/help/help-topics';
import { SearchHelp } from '@/components/dashboard/help/search-help';

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Help Center</h2>
        <p className="text-muted-foreground">
          Find answers to common questions about tax filing
        </p>
      </div>
      <SearchHelp />
      <HelpTopics />
    </div>
  );
}