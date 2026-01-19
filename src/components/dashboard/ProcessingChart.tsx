import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { name: 'ორშ', დამტკიცებული: 45, უარყოფილი: 12, ნაწილობრივ: 8 },
  { name: 'სამ', დამტკიცებული: 52, უარყოფილი: 15, ნაწილობრივ: 10 },
  { name: 'ოთხ', დამტკიცებული: 48, უარყოფილი: 18, ნაწილობრივ: 6 },
  { name: 'ხუთ', დამტკიცებული: 61, უარყოფილი: 14, ნაწილობრივ: 12 },
  { name: 'პარ', დამტკიცებული: 55, უარყოფილი: 20, ნაწილობრივ: 9 },
  { name: 'შაბ', დამტკიცებული: 32, უარყოფილი: 8, ნაწილობრივ: 5 },
  { name: 'კვი', დამტკიცებული: 28, უარყოფილი: 6, ნაწილობრივ: 4 },
];

export function ProcessingChart() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-semibold">კვირის სტატისტიკა</h3>
        <p className="text-sm text-muted-foreground">დამუშავებული განაცხადები დღეების მიხედვით</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152 69% 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152 69% 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 72% 51%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0 72% 51%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPartial" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38 92% 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="name" stroke="hsl(215 16% 47%)" fontSize={12} />
            <YAxis stroke="hsl(215 16% 47%)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="დამტკიცებული"
              stroke="hsl(152 69% 40%)"
              fillOpacity={1}
              fill="url(#colorApproved)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="უარყოფილი"
              stroke="hsl(0 72% 51%)"
              fillOpacity={1}
              fill="url(#colorRejected)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="ნაწილობრივ"
              stroke="hsl(38 92% 50%)"
              fillOpacity={1}
              fill="url(#colorPartial)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
