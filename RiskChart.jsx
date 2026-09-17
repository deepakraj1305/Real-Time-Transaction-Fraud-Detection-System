import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const tooltipStyle = {
  background: '#0b1120',
  border: '1px solid rgba(34,211,238,0.3)',
  borderRadius: 12,
  color: '#e2e8f0',
  fontSize: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
};

export function DonutChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={64}
          outerRadius={92}
          paddingAngle={4}
          cornerRadius={6}
          animationDuration={900}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: '#e2e8f0' }} />
        <Legend
          verticalAlign="bottom"
          height={32}
          iconType="circle"
          wrapperStyle={{ fontSize: 12, color: '#94a3b8' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ActivityChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
        <Bar dataKey="low" name="Low Risk" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} animationDuration={900} />
        <Bar dataKey="suspicious" name="Suspicious" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} animationDuration={900} />
        <Bar dataKey="high" name="High Risk" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} animationDuration={900} />
      </BarChart>
    </ResponsiveContainer>
  );
}
