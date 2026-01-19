import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentApplicationsTable } from '@/components/dashboard/RecentApplicationsTable';
import { ProcessingChart } from '@/components/dashboard/ProcessingChart';
import { StatusDistribution } from '@/components/dashboard/StatusDistribution';
import { mockApplications, mockStats } from '@/data/mockData';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Zap,
  DollarSign,
  Timer,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">დეშბორდი</h1>
            <p className="text-muted-foreground">სესხების ავტომატური განხილვის მოდული</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 text-success">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-sm font-medium">სისტემა აქტიურია</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="სულ განაცხადები"
            value={mockStats.totalApplications.toLocaleString()}
            icon={<FileText className="w-6 h-6 text-primary" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="დამტკიცებული"
            value={mockStats.approvedApplications.toLocaleString()}
            icon={<CheckCircle className="w-6 h-6 text-success-foreground" />}
            trend={{ value: 8.2, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="მოლოდინში"
            value={mockStats.pendingApplications}
            icon={<Clock className="w-6 h-6 text-warning-foreground" />}
            subtitle="საჭიროებს ყურადღებას"
            variant="warning"
          />
          <StatCard
            title="უარყოფილი"
            value={mockStats.rejectedApplications}
            icon={<XCircle className="w-6 h-6 text-destructive-foreground" />}
            trend={{ value: -2.4, isPositive: true }}
            variant="destructive"
          />
        </div>

        {/* Performance Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="დამტკიცებული თანხა"
            value={`₾${(mockStats.totalApprovedAmount / 1000000).toFixed(1)}M`}
            icon={<DollarSign className="w-6 h-6 text-primary" />}
            subtitle="ჯამური მოცულობა"
          />
          <StatCard
            title="საშუალო დრო"
            value={`${mockStats.averageProcessingTime} წთ`}
            icon={<Timer className="w-6 h-6 text-primary" />}
            subtitle="დამუშავების დრო"
          />
          <StatCard
            title="ავტო-დამტკიცება"
            value={`${mockStats.autoApprovalRate}%`}
            icon={<Zap className="w-6 h-6 text-primary" />}
            trend={{ value: 5.3, isPositive: true }}
          />
          <StatCard
            title="Override რეიტი"
            value={`${mockStats.overrideRate}%`}
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            trend={{ value: -1.2, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProcessingChart />
          </div>
          <StatusDistribution />
        </div>

        {/* Recent Applications */}
        <RecentApplicationsTable applications={mockApplications.slice(0, 5)} />
      </div>
    </MainLayout>
  );
}
