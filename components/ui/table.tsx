import { cn } from '@/lib/utils';

export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={cn('w-full text-sm', className)} {...props} />
);
export const THead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} className="bg-muted/60" />;
export const TBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
export const TR = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn('border-b border-border', className)} {...props} />
);
export const TH = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn('px-3 py-2 text-left text-xs font-semibold text-muted-foreground', className)} {...props} />
);
export const TD = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn('px-3 py-2 align-top', className)} {...props} />
);
