import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { LoanStatus, LoanSource } from '@/types/loan';

interface ApplicationFiltersProps {
  onStatusChange: (status: LoanStatus | 'all') => void;
  onSourceChange: (source: LoanSource | 'all') => void;
  onSearch: (query: string) => void;
}

export function ApplicationFilters({
  onStatusChange,
  onSourceChange,
  onSearch,
}: ApplicationFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ძიება..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <Select onValueChange={(value) => onStatusChange(value as LoanStatus | 'all')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="სტატუსი" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ყველა სტატუსი</SelectItem>
            <SelectItem value="pending">მოლოდინში</SelectItem>
            <SelectItem value="approved">დამტკიცებული</SelectItem>
            <SelectItem value="rejected">უარყოფილი</SelectItem>
            <SelectItem value="partial">ნაწილობრივ</SelectItem>
            <SelectItem value="conditional">პირობით</SelectItem>
          </SelectContent>
        </Select>

        {/* Source Filter */}
        <Select onValueChange={(value) => onSourceChange(value as LoanSource | 'all')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="წყარო" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ყველა წყარო</SelectItem>
            <SelectItem value="mobile">მობაილი</SelectItem>
            <SelectItem value="web">ვებ</SelectItem>
            <SelectItem value="internal">შიდა</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="branch">ფილიალი</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          ექსპორტი
        </Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          ახალი განაცხადი
        </Button>
      </div>
    </div>
  );
}
