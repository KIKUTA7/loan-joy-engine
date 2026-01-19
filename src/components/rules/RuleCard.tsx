import { Rule } from '@/types/loan';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, Trash2, Copy, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RuleCardProps {
  rule: Rule;
  onToggle: (id: string, isActive: boolean) => void;
  onEdit: (rule: Rule) => void;
}

const categoryLabels = {
  credit_score: 'საკრედიტო ქულა',
  income: 'შემოსავალი',
  debt_ratio: 'ვალის თანაფარდობა',
  employment: 'დასაქმება',
  amount: 'თანხა',
  custom: 'მორგებული',
};

const actionColors = {
  approve: 'bg-success/10 text-success border-success/20',
  reject: 'bg-destructive/10 text-destructive border-destructive/20',
  partial: 'bg-warning/10 text-warning border-warning/20',
  conditional: 'bg-pending/10 text-pending border-pending/20',
  manual_review: 'bg-muted text-muted-foreground border-border',
};

const actionLabels = {
  approve: 'დამტკიცება',
  reject: 'უარყოფა',
  partial: 'ნაწილობრივ',
  conditional: 'პირობით',
  manual_review: 'ხელით განხილვა',
};

export function RuleCard({ rule, onToggle, onEdit }: RuleCardProps) {
  return (
    <Card className={cn('transition-all duration-200', !rule.isActive && 'opacity-60')}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
              {rule.priority}
            </div>
            <div>
              <h4 className="font-semibold">{rule.name}</h4>
              <p className="text-sm text-muted-foreground">{rule.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={rule.isActive}
              onCheckedChange={(checked) => onToggle(rule.id, checked)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(rule)}>
                  <Edit className="w-4 h-4 mr-2" />
                  რედაქტირება
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  დუბლირება
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History className="w-4 h-4 mr-2" />
                  ისტორია
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  წაშლა
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{categoryLabels[rule.category]}</Badge>
          <Badge variant="outline" className={cn('border', actionColors[rule.action])}>
            {actionLabels[rule.action]}
          </Badge>
        </div>

        {/* Condition Preview */}
        <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm mb-4">
          <code className="text-muted-foreground">{rule.condition}</code>
        </div>

        {/* Parameters */}
        {rule.parameters.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              პარამეტრები
            </p>
            <div className="flex flex-wrap gap-2">
              {rule.parameters.map((param) => (
                <div
                  key={param.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-sm"
                >
                  <span className="text-muted-foreground">{param.label}:</span>
                  <span className="font-semibold">
                    {param.value}
                    {param.type === 'percentage' && '%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs text-muted-foreground">
          <span>შექმნა: {rule.createdBy}</span>
          <span>განახლება: {rule.updatedAt.toLocaleDateString('ka-GE')}</span>
        </div>
      </CardContent>
    </Card>
  );
}
