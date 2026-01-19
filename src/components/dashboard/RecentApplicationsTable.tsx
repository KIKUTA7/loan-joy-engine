import { LoanApplication } from '@/types/loan';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Smartphone, Globe, Building, Zap, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ka } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface RecentApplicationsTableProps {
  applications: LoanApplication[];
}

const statusConfig = {
  pending: { label: 'მოლოდინში', className: 'status-pending' },
  approved: { label: 'დამტკიცებული', className: 'status-approved' },
  rejected: { label: 'უარყოფილი', className: 'status-rejected' },
  partial: { label: 'ნაწილობრივ', className: 'status-partial' },
  conditional: { label: 'პირობით', className: 'status-conditional' },
};

const sourceIcons = {
  mobile: Smartphone,
  web: Globe,
  internal: Building,
  api: Zap,
  branch: MapPin,
};

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h3 className="font-semibold">ბოლო განაცხადები</h3>
          <p className="text-sm text-muted-foreground">უახლესი სესხის მოთხოვნები</p>
        </div>
        <Link to="/applications">
          <Button variant="outline" size="sm">
            ყველას ნახვა
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>განაცხადი</TableHead>
            <TableHead>განმცხადებელი</TableHead>
            <TableHead>თანხა</TableHead>
            <TableHead>წყარო</TableHead>
            <TableHead>სტატუსი</TableHead>
            <TableHead>თარიღი</TableHead>
            <TableHead className="text-right">მოქმედება</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => {
            const status = statusConfig[app.status];
            const SourceIcon = sourceIcons[app.source];
            return (
              <TableRow key={app.id} className="group">
                <TableCell className="font-medium">{app.applicationNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{app.applicantName}</p>
                    <p className="text-xs text-muted-foreground">{app.personalId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold">
                      {app.requestedAmount.toLocaleString()} {app.currency}
                    </p>
                    {app.approvedAmount && app.approvedAmount !== app.requestedAmount && (
                      <p className="text-xs text-success">
                        დამტკიცებული: {app.approvedAmount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <SourceIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('border', status.className)}>
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(app.createdAt, 'dd MMM, HH:mm', { locale: ka })}
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/applications/${app.id}`}>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
