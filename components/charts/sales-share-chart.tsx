"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useSalesShare } from "@/hooks/use-sales"

const COLORS = [
  "hsl(var(--chart-1))", // Apartamento
  "hsl(var(--chart-2))", // Casa
  "hsl(var(--chart-3))", // Sala Comercial
  "hsl(var(--chart-4))", // Galpão
  "hsl(var(--chart-5))", // Terreno
]

export function SalesShareChart() {
  const { data, isLoading, error } = useSalesShare()

  if (isLoading) {
    return <div className="h-80 bg-muted animate-pulse rounded" />
  }

  if (error) {
    return <div className="h-80 flex items-center justify-center text-muted-foreground">Erro ao carregar dados</div>
  }

  const chartData =
    data?.share?.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
    })) || []

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="quantidade"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [value, "Quantidade"]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>
                {value} ({entry.payload.percentual.toFixed(1)}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {data?.total && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{data.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>
      )}
    </div>
  )
}
