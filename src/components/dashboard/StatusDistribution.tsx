import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'დამტკიცებული', value: 892, color: 'hsl(152 69% 40%)' },
  { name: 'უარყოფილი', value: 198, color: 'hsl(0 72% 51%)' },
  { name: 'ნაწილობრივ', value: 89, color: 'hsl(38 92% 50%)' },
  { name: 'პირობით', value: 45, color: 'hsl(200 80% 50%)' },
  { name: 'მოლოდინში', value: 23, color: 'hsl(215 16% 47%)' },
];

export function StatusDistribution() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-semibold">სტატუსის განაწილება</h3>
        <p className="text-sm text-muted-foreground">განაცხადების სტატუსი პროცენტულად</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [`${value} განაცხადი`, '']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
