import { useState } from 'react';
import { LoanApplication, LoanStatus, LoanSource } from '@/types/loan';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  MoreHorizontal,
  Edit,
  Smartphone,
  Globe,
  Building,
  Zap,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { format } from 'date-fns';
import { ka } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface ApplicationsTableProps {
  applications: LoanApplication[];
  statusFilter: LoanStatus | 'all';
  sourceFilter: LoanSource | 'all';
  searchQuery: string;
}

const sourceIcons = {
  mobile: { icon: Smartphone, label: 'მობაილი' },
  web: { icon: Globe, label: 'ვებ' },
  internal: { icon: Building, label: 'შიდა' },
  api: { icon: Zap, label: 'API' },
  branch: { icon: MapPin, label: 'ფილიალი' },
};

export function ApplicationsTable({
  applications,
  statusFilter,
  sourceFilter,
  searchQuery,
}: ApplicationsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const filteredApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || app.source === sourceFilter;
    const matchesSearch =
      searchQuery === '' ||
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.personalId.includes(searchQuery);

    return matchesStatus && matchesSource && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredApplications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredApplications.map((app) => app.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === filteredApplications.length && filteredApplications.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>განაცხადი</TableHead>
            <TableHead>განმცხადებელი</TableHead>
            <TableHead>სესხის ტიპი</TableHead>
            <TableHead>თანხა</TableHead>
            <TableHead>წყარო</TableHead>
            <TableHead>სტატუსი</TableHead>
            <TableHead>თარიღი</TableHead>
            <TableHead className="text-right">მოქმედება</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                განაცხადები ვერ მოიძებნა
              </TableCell>
            </TableRow>
          ) : (
            filteredApplications.map((app) => {
              const source = sourceIcons[app.source];
              const SourceIcon = source.icon;
              return (
                <TableRow
                  key={app.id}
                  className="group"
                  data-selected={selectedRows.includes(app.id)}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(app.id)}
                      onCheckedChange={() => toggleSelectRow(app.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{app.applicationNumber}</span>
                      {app.isOverridden && (
                        <RefreshCw className="w-3.5 h-3.5 text-warning" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.applicantName}</p>
                      <p className="text-xs text-muted-foreground">{app.personalId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{app.loanType}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">
                        {app.requestedAmount.toLocaleString()} {app.currency}
                      </p>
                      {app.approvedAmount && app.approvedAmount !== app.requestedAmount && (
                        <p className="text-xs text-success">
                          დამტკიც.: {app.approvedAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <SourceIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{source.label}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} size="sm" />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(app.createdAt, 'dd MMM yyyy, HH:mm', { locale: ka })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>მოქმედებები</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link to={`/applications/${app.id}`}>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            დეტალები
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Override
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
