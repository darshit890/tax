'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Receipt,
  FileText,
  History,
  Settings,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Receipt, label: 'Tax Returns', href: '/dashboard/returns' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: History, label: 'History', href: '/dashboard/history' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href ? 'bg-accent' : 'transparent'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}