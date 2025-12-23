'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Wallet,
  FileText,
  Clock,
  MessageSquare,
  Database,
  FolderOpen,
  Clipboard,
  Activity,
  LogOut,
  User,
  ChevronDown,
  Bell,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  {
    icon: Users,
    label: 'Employee',
    href: '/employee',
    subItems: [
      { label: 'Employee Database', href: '/employee/database' },
      { label: 'Add New Employee', href: '/employee/add' },
      { label: 'Performance Report', href: '/employee/performance' },
      { label: 'Performance History', href: '/employee/history' },
    ],
  },
  { icon: Wallet, label: 'Payroll', href: '/payroll' },
  { icon: FileText, label: 'Pay Slip', href: '/pay-slip' },
  { icon: Clock, label: 'Attendance', href: '/attendance' },
  { icon: MessageSquare, label: 'Request Center', href: '/request-center' },
  {
    icon: Database,
    label: 'Career Database',
    href: '/career-database',
  },
  { icon: FolderOpen, label: 'Document manager', href: '/document-manager' },
  { icon: Clipboard, label: 'Notice Board', href: '/notice-board' },
  { icon: Activity, label: 'Activity Log', href: '/activity-log' },
  { icon: LogOut, label: 'Exit Interview', href: '/exit-interview' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export default function NoticeBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [employeeOpen, setEmployeeOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b h-16 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded"></div>
              <span className="text-xl font-bold">Nebs-IT</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <p className="text-sm text-gray-600">Good Afternoon Asif</p>
              <p className="text-xs text-gray-500">13 June, 2026</p>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="" alt="Asif Riaj" />
                <AvatarFallback className="bg-teal-500 text-white">
                  AR
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Asif Riaj</p>
                <p className="text-xs text-gray-500">Hr</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r overflow-y-auto transition-transform lg:translate-x-0 z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            if (item.subItems) {
              return (
                <Collapsible
                  key={item.href}
                  open={employeeOpen}
                  onOpenChange={setEmployeeOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        employeeOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-7 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="lg:ml-64 pt-16">{children}</main>
    </div>
  );
}
