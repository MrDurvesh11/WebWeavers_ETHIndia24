"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const transactions = [
  { id: "TX001", company: "Tech Innovators Inc.", date: "2023-07-15", amount: 10000, status: "completed" },
  { id: "TX002", company: "Green Energy Co.", date: "2023-07-14", amount: 5000, status: "pending" },
  { id: "TX003", company: "HealthTech Solutions", date: "2023-07-13", amount: 7500, status: "completed" },
  { id: "TX004", company: "AI Dynamics", date: "2023-07-12", amount: 15000, status: "failed" },
  { id: "TX005", company: "Sustainable Foods Ltd.", date: "2023-07-11", amount: 12500, status: "completed" },
  { id: "TX006", company: "Quantum Computing Corp", date: "2023-07-10", amount: 20000, status: "pending" },
  { id: "TX007", company: "Blockchain Innovations", date: "2023-07-09", amount: 8000, status: "completed" },
  { id: "TX008", company: "Space Exploration Tech", date: "2023-07-08", amount: 25000, status: "pending" },
]

export function TransactionTable({ searchTerm, statusFilter }) {
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.id}</TableCell>
            <TableCell>{transaction.company}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell className="text-right">${transaction.amount.toLocaleString()}</TableCell>
            <TableCell>
              <Badge
                variant={transaction.status === "completed" ? "success" :
                         transaction.status === "pending" ? "warning" : "destructive"}
              >
                {transaction.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
