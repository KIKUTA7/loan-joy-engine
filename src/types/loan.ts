export type LoanStatus = 'pending' | 'approved' | 'rejected' | 'partial' | 'conditional';

export type LoanSource = 'mobile' | 'web' | 'internal' | 'api' | 'branch';

export interface LoanApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  personalId: string;
  email: string;
  phone: string;
  requestedAmount: number;
  approvedAmount?: number;
  currency: string;
  loanType: string;
  term: number; // in months
  interestRate?: number;
  monthlyIncome: number;
  employmentStatus: string;
  employer?: string;
  creditScore: number;
  existingLoans: number;
  status: LoanStatus;
  source: LoanSource;
  conditions?: string[];
  rejectionReasons?: string[];
  createdAt: Date;
  processedAt?: Date;
  processedBy?: string;
  overrideReason?: string;
  isOverridden: boolean;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  category: 'credit_score' | 'income' | 'debt_ratio' | 'employment' | 'amount' | 'custom';
  condition: string;
  action: 'approve' | 'reject' | 'partial' | 'conditional' | 'manual_review';
  priority: number;
  isActive: boolean;
  parameters: RuleParameter[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface RuleParameter {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'percentage';
  value: string | number | boolean;
  label: string;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  partialApprovals: number;
  conditionalApprovals: number;
  totalApprovedAmount: number;
  averageProcessingTime: number; // in minutes
  autoApprovalRate: number; // percentage
  overrideRate: number; // percentage
}

export interface ProcessingLog {
  id: string;
  applicationId: string;
  action: string;
  ruleId?: string;
  ruleName?: string;
  result: string;
  details: string;
  timestamp: Date;
  performedBy: 'system' | string;
}
