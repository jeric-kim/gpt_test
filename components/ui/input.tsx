import { cn } from '@/lib/utils';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn('h-9 w-full rounded-md border border-input bg-white px-3 text-sm', props.className)} />;
}
