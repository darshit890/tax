import { TaxReturnsList } from '@/components/dashboard/returns/tax-returns-list';
import { NewReturnButton } from '@/components/dashboard/returns/new-return-button';

export default function ReturnsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tax Returns</h2>
          <p className="text-muted-foreground">Manage and file your tax returns</p>
        </div>
        <NewReturnButton />
      </div>
      <TaxReturnsList />
    </div>
  );
}