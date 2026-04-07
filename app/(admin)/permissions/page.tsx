import { Card } from '@/components/ui/card';

export default function PermissionsPage() {
  return (
    <Card className="p-4">
      <h2 className="mb-2 font-semibold">관리자 권한 설정</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>본사 관리자: 전체 CRUD + 감사 로그 접근</li>
        <li>조직 리더: 하위 마켓/개인 및 코드 관리</li>
        <li>마켓 리더: 이벤트 코드 발급 및 타겟 발송</li>
      </ul>
    </Card>
  );
}
