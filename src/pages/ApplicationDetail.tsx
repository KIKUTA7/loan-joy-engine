import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatusBadge } from '@/components/applications/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockApplications, mockProcessingLogs } from '@/data/mockData';
import {
  ArrowLeft,
  User,
  Briefcase,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Smartphone,
  Globe,
  Building,
  Zap,
  MapPin,
} from 'lucide-react';
import { format } from 'date-fns';
import { ka } from 'date-fns/locale';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const sourceConfig = {
  mobile: { icon: Smartphone, label: 'მობაილი' },
  web: { icon: Globe, label: 'ვებ' },
  internal: { icon: Building, label: 'შიდა სისტემა' },
  api: { icon: Zap, label: 'API' },
  branch: { icon: MapPin, label: 'ფილიალი' },
};

export default function ApplicationDetail() {
  const { id } = useParams();
  const application = mockApplications.find((app) => app.id === id);
  const [overrideStatus, setOverrideStatus] = useState('');
  const [overrideReason, setOverrideReason] = useState('');

  if (!application) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <AlertTriangle className="w-12 h-12 text-warning mb-4" />
          <h2 className="text-xl font-semibold">განაცხადი ვერ მოიძებნა</h2>
          <Link to="/applications">
            <Button variant="link">უკან დაბრუნება</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const source = sourceConfig[application.source];
  const SourceIcon = source.icon;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/applications">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{application.applicationNumber}</h1>
                <StatusBadge status={application.status} size="lg" />
                {application.isOverridden && (
                  <Badge variant="outline" className="gap-1 border-warning text-warning">
                    <RefreshCw className="w-3 h-3" />
                    Override
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <SourceIcon className="w-4 h-4" />
                {source.label} • შექმნილი {format(application.createdAt, 'dd MMMM yyyy, HH:mm', { locale: ka })}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Override
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>სტატუსის Override</DialogTitle>
                  <DialogDescription>
                    ხელით შეცვალეთ ავტომატურად მინიჭებული სტატუსი. მიუთითეთ მიზეზი.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ახალი სტატუსი</label>
                    <Select value={overrideStatus} onValueChange={setOverrideStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="აირჩიეთ სტატუსი" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">დამტკიცებული</SelectItem>
                        <SelectItem value="rejected">უარყოფილი</SelectItem>
                        <SelectItem value="partial">ნაწილობრივ</SelectItem>
                        <SelectItem value="conditional">პირობით</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">მიზეზი</label>
                    <Textarea
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      placeholder="მიუთითეთ override-ის მიზეზი..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">გაუქმება</Button>
                  <Button>დადასტურება</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              PDF ექსპორტი
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  განმცხადებლის ინფორმაცია
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">სახელი, გვარი</p>
                    <p className="font-medium">{application.applicantName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">პირადი ნომერი</p>
                    <p className="font-medium">{application.personalId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ელ-ფოსტა</p>
                    <p className="font-medium">{application.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ტელეფონი</p>
                    <p className="font-medium">{application.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  დასაქმების ინფორმაცია
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">სტატუსი</p>
                    <p className="font-medium">{application.employmentStatus}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">დამსაქმებელი</p>
                    <p className="font-medium">{application.employer || '—'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ყოველთვიური შემოსავალი</p>
                    <p className="font-semibold text-lg">
                      {application.monthlyIncome.toLocaleString()} {application.currency}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">არსებული სესხები</p>
                    <p className="font-medium">{application.existingLoans}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  სესხის დეტალები
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">სესხის ტიპი</p>
                    <p className="font-medium">{application.loanType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">მოთხოვნილი თანხა</p>
                    <p className="font-semibold text-lg">
                      {application.requestedAmount.toLocaleString()} {application.currency}
                    </p>
                  </div>
                  {application.approvedAmount && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">დამტკიცებული თანხა</p>
                      <p className="font-semibold text-lg text-success">
                        {application.approvedAmount.toLocaleString()} {application.currency}
                      </p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ვადა</p>
                    <p className="font-medium">{application.term} თვე</p>
                  </div>
                  {application.interestRate && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">საპროცენტო განაკვეთი</p>
                      <p className="font-medium">{application.interestRate}%</p>
                    </div>
                  )}
                </div>

                {/* Conditions or Rejection Reasons */}
                {application.conditions && application.conditions.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">პირობები</p>
                      <div className="space-y-2">
                        {application.conditions.map((condition, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-lg bg-pending/10 text-pending"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {application.rejectionReasons && application.rejectionReasons.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        უარყოფის მიზეზები
                      </p>
                      <div className="space-y-2">
                        {application.rejectionReasons.map((reason, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive"
                          >
                            <XCircle className="w-4 h-4" />
                            <span className="text-sm">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Processing Log */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  დამუშავების ლოგი
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProcessingLogs.map((log) => (
                    <div key={log.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            'flex items-center justify-center w-8 h-8 rounded-full',
                            log.result === 'PASS' && 'bg-success/10 text-success',
                            log.result === 'APPROVED' && 'bg-success/10 text-success',
                            log.result === 'FAIL' && 'bg-destructive/10 text-destructive'
                          )}
                        >
                          {log.result === 'PASS' || log.result === 'APPROVED' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="w-px h-full bg-border" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{log.action}</span>
                          {log.ruleName && (
                            <Badge variant="secondary" className="text-xs">
                              {log.ruleName}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(log.timestamp, 'HH:mm:ss', { locale: ka })} •{' '}
                          {log.performedBy === 'system' ? 'სისტემა' : log.performedBy}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Credit Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">საკრედიტო ქულა</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(application.creditScore / 850) * 352} 352`}
                        className={cn(
                          application.creditScore >= 700
                            ? 'text-success'
                            : application.creditScore >= 600
                            ? 'text-warning'
                            : 'text-destructive'
                        )}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">{application.creditScore}</span>
                      <span className="text-xs text-muted-foreground">850-დან</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {application.creditScore >= 700
                    ? 'შესანიშნავი'
                    : application.creditScore >= 600
                    ? 'კარგი'
                    : 'საჭიროებს გაუმჯობესებას'}
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">მოკლე სტატისტიკა</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">ვალის თანაფარდობა</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">შემოსავალი/გადახდა</span>
                  <span className="font-medium">4.2x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">დამუშავების დრო</span>
                  <span className="font-medium">1.4 წთ</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">რისკის დონე</span>
                  <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                    დაბალი
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
