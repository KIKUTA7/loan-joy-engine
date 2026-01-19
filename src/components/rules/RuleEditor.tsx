import { useState } from 'react';
import { Rule, RuleParameter } from '@/types/loan';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface RuleEditorProps {
  rule?: Rule | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Partial<Rule>) => void;
}

export function RuleEditor({ rule, isOpen, onClose, onSave }: RuleEditorProps) {
  const [formData, setFormData] = useState<Partial<Rule>>(
    rule || {
      name: '',
      description: '',
      category: 'credit_score',
      condition: '',
      action: 'approve',
      priority: 1,
      isActive: true,
      parameters: [],
    }
  );

  const [parameters, setParameters] = useState<RuleParameter[]>(rule?.parameters || []);

  const handleSave = () => {
    onSave({ ...formData, parameters });
    onClose();
  };

  const addParameter = () => {
    setParameters([
      ...parameters,
      { name: '', type: 'number', value: 0, label: '' },
    ]);
  };

  const removeParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const updateParameter = (index: number, field: keyof RuleParameter, value: string | number | boolean) => {
    const updated = [...parameters];
    updated[index] = { ...updated[index], [field]: value };
    setParameters(updated);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{rule ? 'წესის რედაქტირება' : 'ახალი წესი'}</SheetTitle>
          <SheetDescription>
            განსაზღვრეთ წესის პარამეტრები და პირობები
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">წესის სახელი</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="მაგ: მინიმალური საკრედიტო ქულა"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">აღწერა</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="წესის დეტალური აღწერა..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>კატეგორია</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Rule['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_score">საკრედიტო ქულა</SelectItem>
                    <SelectItem value="income">შემოსავალი</SelectItem>
                    <SelectItem value="debt_ratio">ვალის თანაფარდობა</SelectItem>
                    <SelectItem value="employment">დასაქმება</SelectItem>
                    <SelectItem value="amount">თანხა</SelectItem>
                    <SelectItem value="custom">მორგებული</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>მოქმედება</Label>
                <Select
                  value={formData.action}
                  onValueChange={(value) => setFormData({ ...formData, action: value as Rule['action'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">დამტკიცება</SelectItem>
                    <SelectItem value="reject">უარყოფა</SelectItem>
                    <SelectItem value="partial">ნაწილობრივ დამტკიცება</SelectItem>
                    <SelectItem value="conditional">პირობითი დამტკიცება</SelectItem>
                    <SelectItem value="manual_review">ხელით განხილვა</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">პრიორიტეტი</Label>
              <Input
                id="priority"
                type="number"
                min={1}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">პირობა (Expression)</Label>
              <Textarea
                id="condition"
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                placeholder="credit_score >= threshold AND income > min_income"
                className="font-mono text-sm"
                rows={3}
              />
            </div>
          </div>

          {/* Parameters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">პარამეტრები</Label>
              <Button variant="outline" size="sm" onClick={addParameter}>
                <Plus className="w-4 h-4 mr-2" />
                დამატება
              </Button>
            </div>

            {parameters.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                პარამეტრები არ არის დამატებული
              </p>
            ) : (
              <div className="space-y-3">
                {parameters.map((param, index) => (
                  <div
                    key={index}
                    className="flex items-end gap-3 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">სახელი</Label>
                      <Input
                        value={param.name}
                        onChange={(e) => updateParameter(index, 'name', e.target.value)}
                        placeholder="threshold"
                        className="h-9"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">ლეიბელი</Label>
                      <Input
                        value={param.label}
                        onChange={(e) => updateParameter(index, 'label', e.target.value)}
                        placeholder="მინიმალური ქულა"
                        className="h-9"
                      />
                    </div>
                    <div className="w-28 space-y-2">
                      <Label className="text-xs">ტიპი</Label>
                      <Select
                        value={param.type}
                        onValueChange={(value) => updateParameter(index, 'type', value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="number">რიცხვი</SelectItem>
                          <SelectItem value="percentage">პროცენტი</SelectItem>
                          <SelectItem value="string">ტექსტი</SelectItem>
                          <SelectItem value="boolean">ლოგიკური</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Label className="text-xs">მნიშვნელობა</Label>
                      <Input
                        type={param.type === 'number' || param.type === 'percentage' ? 'number' : 'text'}
                        value={param.value as string}
                        onChange={(e) => updateParameter(index, 'value', e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive"
                      onClick={() => removeParameter(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Switch */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">აქტიური</p>
              <p className="text-sm text-muted-foreground">
                გააქტიურეთ წესი მის გამოსაყენებლად
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            გაუქმება
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            შენახვა
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
