import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Activity,
  Server,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const responseTimeData = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 85 },
  { time: '08:00', value: 250 },
  { time: '12:00', value: 320 },
  { time: '16:00', value: 280 },
  { time: '20:00', value: 190 },
  { time: '24:00', value: 130 },
];

const throughputData = [
  { hour: '09:00', განაცხადები: 45 },
  { hour: '10:00', განაცხადები: 78 },
  { hour: '11:00', განაცხადები: 92 },
  { hour: '12:00', განაცხადები: 65 },
  { hour: '13:00', განაცხადები: 48 },
  { hour: '14:00', განაცხადები: 85 },
  { hour: '15:00', განაცხადები: 95 },
  { hour: '16:00', განაცხადები: 72 },
];

const recentEvents = [
  {
    id: '1',
    type: 'success',
    message: 'სესხი LN-2024-001245 დამტკიცებულია',
    time: '2 წუთის წინ',
  },
  {
    id: '2',
    type: 'warning',
    message: 'Rule Engine დაგვიანებული პასუხი: 850ms',
    time: '5 წუთის წინ',
  },
  {
    id: '3',
    type: 'success',
    message: 'API Gateway - ყველა სერვისი აქტიურია',
    time: '10 წუთის წინ',
  },
  {
    id: '4',
    type: 'error',
    message: 'ბაზასთან კავშირი დროებით შეწყდა',
    time: '15 წუთის წინ',
  },
  {
    id: '5',
    type: 'success',
    message: 'ბაზასთან კავშირი აღდგენილია',
    time: '14 წუთის წინ',
  },
];

const apiEndpoints = [
  { endpoint: '/api/v1/applications', requests: 12450, avgTime: 145, status: 'healthy' },
  { endpoint: '/api/v1/decisions', requests: 8920, avgTime: 230, status: 'healthy' },
  { endpoint: '/api/v1/rules', requests: 3245, avgTime: 85, status: 'healthy' },
  { endpoint: '/api/v1/users', requests: 1890, avgTime: 62, status: 'healthy' },
  { endpoint: '/api/v1/reports', requests: 567, avgTime: 450, status: 'warning' },
];

export default function Monitoring() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">მონიტორინგი</h1>
            <p className="text-muted-foreground">
              სისტემის ჯანმრთელობა და პერფორმანსი
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              განახლება
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              რეპორტი
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10">
                  <Server className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">API Gateway</p>
                  <p className="text-xl font-bold">ონლაინ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10">
                  <Database className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">მონაცემთა ბაზა</p>
                  <p className="text-xl font-bold">ონლაინ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/10">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rule Engine</p>
                  <p className="text-xl font-bold">ონლაინ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-warning/10">
                  <Activity className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">დატვირთვა</p>
                  <p className="text-xl font-bold">67%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                საპასუხო დრო (ms)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="time" stroke="hsl(215 16% 47%)" fontSize={12} />
                    <YAxis stroke="hsl(215 16% 47%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(220 70% 45%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(220 70% 45%)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                დამუშავებული განაცხადები (საათში)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="hour" stroke="hsl(215 16% 47%)" fontSize={12} />
                    <YAxis stroke="hsl(215 16% 47%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(220 13% 91%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar
                      dataKey="განაცხადები"
                      fill="hsl(152 69% 40%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Events and Endpoints */}
        <Tabs defaultValue="events">
          <TabsList>
            <TabsTrigger value="events">ბოლო ივენთები</TabsTrigger>
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="alerts">ალერტები</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      {event.type === 'success' && (
                        <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      )}
                      {event.type === 'warning' && (
                        <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                      )}
                      {event.type === 'error' && (
                        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{event.message}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>მოთხოვნები (24სთ)</TableHead>
                      <TableHead>საშ. დრო (ms)</TableHead>
                      <TableHead>სტატუსი</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiEndpoints.map((endpoint) => (
                      <TableRow key={endpoint.endpoint}>
                        <TableCell className="font-mono text-sm">
                          {endpoint.endpoint}
                        </TableCell>
                        <TableCell>{endpoint.requests.toLocaleString()}</TableCell>
                        <TableCell>{endpoint.avgTime}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              endpoint.status === 'healthy'
                                ? 'status-approved'
                                : 'status-partial'
                            }
                          >
                            {endpoint.status === 'healthy' ? 'ჯანსაღი' : 'ნელი'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12 text-muted-foreground">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>აქტიური ალერტები არ არის</p>
                  <p className="text-sm">სისტემა მუშაობს ნორმალურად</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
