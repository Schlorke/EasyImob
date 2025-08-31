"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentsByPropertyChart } from "@/components/charts/payments-by-property-chart"
import { SalesByMonthChart } from "@/components/charts/sales-by-month-chart"
import { SalesShareChart } from "@/components/charts/sales-share-chart"

export function ChartsSection() {
  return (
    <div className="space-y-6">
      {/* Top row - Two column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Imóvel</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentsByPropertyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesByMonthChart />
          </CardContent>
        </Card>
      </div>

      {/* Bottom row - Full width */}
      <Card>
        <CardHeader>
          <CardTitle>Participação por Tipo de Imóvel</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesShareChart />
        </CardContent>
      </Card>
    </div>
  )
}
