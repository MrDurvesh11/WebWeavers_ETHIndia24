import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const transactions = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    amount: "$1,250.00",
    status: "completed",
    date: "July 10, 2023",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    amount: "$850.00",
    status: "pending",
    date: "July 9, 2023",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    amount: "$2,100.00",
    status: "completed",
    date: "July 8, 2023",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    amount: "$1,800.00",
    status: "completed",
    date: "July 7, 2023",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${transaction.email}`} alt={transaction.name} />
            <AvatarFallback>{transaction.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto font-medium">
            {transaction.amount}
          </div>
          <div className={`ml-2 text-sm ${transaction.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
            {transaction.status}
          </div>
        </div>
      ))}
    </div>
  )
}
