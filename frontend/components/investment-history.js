"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

// Sample investments data
const investments = [
  { id: 1, company: "Tech Innovators Inc.", date: "2023-05-15", amount: 10000, currentValue: 12500, profit: 2500, profitPercentage: 25 },
  { id: 2, company: "Green Energy Co.", date: "2023-04-22", amount: 5000, currentValue: 5750, profit: 750, profitPercentage: 15 },
  { id: 3, company: "HealthTech Solutions", date: "2023-03-10", amount: 7500, currentValue: 6750, profit: -750, profitPercentage: -10 },
  { id: 4, company: "AI Dynamics", date: "2023-02-05", amount: 15000, currentValue: 19500, profit: 4500, profitPercentage: 30 },
  { id: 5, company: "Sustainable Foods Ltd.", date: "2023-01-20", amount: 12500, currentValue: 13750, profit: 1250, profitPercentage: 10 },
]

export function InvestmentHistory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* Table Headers */}
          <TableHead>Company</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount Invested</TableHead>
          <TableHead className="text-right">Current Value</TableHead>
          <TableHead className="text-right">Profit/Loss</TableHead>
          <TableHead className="text-right">%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment) => (
          <TableRow key={investment.id}>
            {/* Table Data Cells */}
            <TableCell className="font-medium">{investment.company}</TableCell>
            <TableCell>{investment.date}</TableCell>
            <TableCell className="text-right">${investment.amount.toLocaleString()}</TableCell>
            <TableCell className="text-right">${investment.currentValue.toLocaleString()}</TableCell>
            <TableCell className={`text-right ${investment.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(investment.profit).toLocaleString()}
            </TableCell>
            <TableCell className={`text-right ${investment.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {/* Conditional Arrow Icon and Profit Percentage */}
              {investment.profitPercentage >= 0 ? (
                <ArrowUpIcon className="inline mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="inline mr-1 h-4 w-4" />
              )}
              {Math.abs(investment.profitPercentage)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
