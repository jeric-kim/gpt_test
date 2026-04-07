import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '송금 세일즈 관리 어드민',
  description: '계층형 세일즈 조직 관리 어드민'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
