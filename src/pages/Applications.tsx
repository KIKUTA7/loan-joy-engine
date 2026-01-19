import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ApplicationFilters } from '@/components/applications/ApplicationFilters';
import { ApplicationsTable } from '@/components/applications/ApplicationsTable';
import { mockApplications } from '@/data/mockData';
import { LoanStatus, LoanSource } from '@/types/loan';

export default function Applications() {
  const [statusFilter, setStatusFilter] = useState<LoanStatus | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<LoanSource | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">სესხის განაცხადები</h1>
          <p className="text-muted-foreground">მართეთ და განიხილეთ სესხის მოთხოვნები</p>
        </div>

        {/* Filters */}
        <ApplicationFilters
          onStatusChange={setStatusFilter}
          onSourceChange={setSourceFilter}
          onSearch={setSearchQuery}
        />

        {/* Table */}
        <ApplicationsTable
          applications={mockApplications}
          statusFilter={statusFilter}
          sourceFilter={sourceFilter}
          searchQuery={searchQuery}
        />
      </div>
    </MainLayout>
  );
}
