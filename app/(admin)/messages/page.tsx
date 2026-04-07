import { Card } from '@/components/ui/card';

export default function MessagesPage() {
  return (
    <Card className="p-4">
      <h2 className="mb-2 font-semibold">메시지 발송 관리</h2>
      <p className="text-sm text-muted-foreground">템플릿 승인, 예약 발송, 채널별 발송 이력을 관리하는 화면 예시입니다.</p>
    </Card>
  );
}
