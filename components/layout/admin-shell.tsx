'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menus = [
  { href: '/dashboard', label: '대시보드' },
  { href: '/organization', label: '조직 관리' },
  { href: '/sales-codes', label: '세일즈 코드 관리' },
  { href: '/event-codes', label: '이벤트 코드 관리' },
  { href: '/analytics', label: '성과 분석' },
  { href: '/funnel', label: '전환 퍼널 분석' },
  { href: '/event-targets', label: '이벤트 타겟 고객 관리' },
  { href: '/messages', label: '메시지 발송 관리' },
  { href: '/permissions', label: '관리자 권한 설정' },
  { href: '/audit-log', label: '감사 로그' }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1800px]">
        <aside className="sticky top-0 hidden h-screen w-64 border-r border-border bg-white p-4 lg:block">
          <h1 className="mb-6 text-lg font-bold">송금 세일즈 어드민</h1>
          <nav className="space-y-1">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-sm',
                  pathname === menu.href ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                )}
              >
                {menu.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-h-screen flex-1 p-4 lg:p-6">
          <header className="mb-4 flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">Head Office Admin</p>
              <p className="font-semibold">계층형 세일즈 운영센터</p>
            </div>
            <p className="text-sm text-muted-foreground">운영일자: 2026-04-07</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
