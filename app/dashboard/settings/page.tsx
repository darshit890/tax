import { SettingsForm } from '@/components/dashboard/settings/settings-form';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}