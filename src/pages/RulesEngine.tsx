import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RuleCard } from '@/components/rules/RuleCard';
import { RuleEditor } from '@/components/rules/RuleEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRules } from '@/data/mockData';
import { Rule } from '@/types/loan';
import { Plus, Search, Download, Upload, History, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RulesEngine() {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const { toast } = useToast();

  const handleToggleRule = (id: string, isActive: boolean) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, isActive } : rule))
    );
    toast({
      title: isActive ? 'წესი გააქტიურდა' : 'წესი გაითიშა',
      description: `წესი ${isActive ? 'ახლა აქტიურია' : 'გათიშულია'}`,
    });
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setIsEditorOpen(true);
  };

  const handleSaveRule = (ruleData: Partial<Rule>) => {
    if (editingRule) {
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === editingRule.id
            ? { ...rule, ...ruleData, updatedAt: new Date() }
            : rule
        )
      );
      toast({
        title: 'წესი განახლდა',
        description: 'ცვლილებები შენახულია',
      });
    } else {
      const newRule: Rule = {
        id: Date.now().toString(),
        ...ruleData,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'admin',
      } as Rule;
      setRules((prev) => [...prev, newRule]);
      toast({
        title: 'ახალი წესი შეიქმნა',
        description: 'წესი დამატებულია სიაში',
      });
    }
    setEditingRule(null);
  };

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeRules = filteredRules.filter((rule) => rule.isActive);
  const inactiveRules = filteredRules.filter((rule) => !rule.isActive);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Rule Engine</h1>
            <p className="text-muted-foreground">
              მართეთ სესხების ავტომატური დამუშავების წესები
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <History className="w-4 h-4 mr-2" />
              ისტორია
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              იმპორტი
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              ექსპორტი
            </Button>
            <Button
              onClick={() => {
                setEditingRule(null);
                setIsEditorOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              ახალი წესი
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">სულ წესები</p>
            <p className="text-2xl font-bold">{rules.length}</p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">აქტიური</p>
            <p className="text-2xl font-bold text-success">{activeRules.length}</p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">გათიშული</p>
            <p className="text-2xl font-bold text-muted-foreground">{inactiveRules.length}</p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">ბოლო განახლება</p>
            <p className="text-2xl font-bold">დღეს</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ძიება წესებში..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <PlayCircle className="w-4 h-4" />
            ტესტირება
          </Button>
        </div>

        {/* Rules Tabs */}
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">
              აქტიური ({activeRules.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              გათიშული ({inactiveRules.length})
            </TabsTrigger>
            <TabsTrigger value="all">ყველა ({filteredRules.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {activeRules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  onToggle={handleToggleRule}
                  onEdit={handleEditRule}
                />
              ))}
            </div>
            {activeRules.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                აქტიური წესები ვერ მოიძებნა
              </div>
            )}
          </TabsContent>

          <TabsContent value="inactive" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {inactiveRules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  onToggle={handleToggleRule}
                  onEdit={handleEditRule}
                />
              ))}
            </div>
            {inactiveRules.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                გათიშული წესები ვერ მოიძებნა
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRules
                .sort((a, b) => a.priority - b.priority)
                .map((rule) => (
                  <RuleCard
                    key={rule.id}
                    rule={rule}
                    onToggle={handleToggleRule}
                    onEdit={handleEditRule}
                  />
                ))}
            </div>
            {filteredRules.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                წესები ვერ მოიძებნა
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Rule Editor */}
        <RuleEditor
          rule={editingRule}
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingRule(null);
          }}
          onSave={handleSaveRule}
        />
      </div>
    </MainLayout>
  );
}
