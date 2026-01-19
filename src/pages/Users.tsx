import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, Shield, Edit, Trash2, Key } from 'lucide-react';

const users = [
  {
    id: '1',
    name: 'გიორგი ადმინი',
    email: 'giorgi.admin@bank.ge',
    role: 'ადმინისტრატორი',
    department: 'IT',
    status: 'active',
    lastActive: '2 წუთის წინ',
  },
  {
    id: '2',
    name: 'ნინო რისკი',
    email: 'nino.risk@bank.ge',
    role: 'საკრედიტო რისკები',
    department: 'რისკების მართვა',
    status: 'active',
    lastActive: '15 წუთის წინ',
  },
  {
    id: '3',
    name: 'დავით ოპერატორი',
    email: 'davit.op@bank.ge',
    role: 'ოპერატორი',
    department: 'საკრედიტო განყოფილება',
    status: 'active',
    lastActive: '1 საათის წინ',
  },
  {
    id: '4',
    name: 'მარიამ მენეჯერი',
    email: 'mariam.m@bank.ge',
    role: 'მენეჯერი',
    department: 'საკრედიტო განყოფილება',
    status: 'inactive',
    lastActive: '3 დღის წინ',
  },
];

const roleColors: Record<string, string> = {
  ადმინისტრატორი: 'bg-destructive/10 text-destructive border-destructive/20',
  'საკრედიტო რისკები': 'bg-primary/10 text-primary border-primary/20',
  ოპერატორი: 'bg-success/10 text-success border-success/20',
  მენეჯერი: 'bg-warning/10 text-warning border-warning/20',
};

export default function Users() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">მომხმარებლები</h1>
            <p className="text-muted-foreground">სისტემის მომხმარებლების მართვა</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            ახალი მომხმარებელი
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">სულ მომხმარებელი</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">აქტიური</p>
            <p className="text-2xl font-bold text-success">
              {users.filter((u) => u.status === 'active').length}
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">ადმინები</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'ადმინისტრატორი').length}
            </p>
          </div>
          <div className="p-4 rounded-xl border bg-card">
            <p className="text-sm text-muted-foreground">ოპერატორები</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'ოპერატორი').length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="ძიება მომხმარებლებში..." className="pl-10" />
        </div>

        {/* Users Table */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>მომხმარებელი</TableHead>
                <TableHead>როლი</TableHead>
                <TableHead>დეპარტამენტი</TableHead>
                <TableHead>სტატუსი</TableHead>
                <TableHead>ბოლო აქტივობა</TableHead>
                <TableHead className="text-right">მოქმედება</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={roleColors[user.role] || ''}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === 'active' ? 'status-approved' : 'status-pending'
                      }
                    >
                      {user.status === 'active' ? 'აქტიური' : 'არააქტიური'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          რედაქტირება
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="w-4 h-4 mr-2" />
                          პაროლის შეცვლა
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          წაშლა
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
