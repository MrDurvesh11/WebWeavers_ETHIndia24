// components/sidebar.js
import Link from 'next/link';
import { Home, PieChart, FileText, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          IPO Allocator
        </h1>
      </div>
      <nav className="mt-6">
        <Link
          href="/"
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link
          href="/profile"
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <PieChart className="h-5 w-5 mr-3" />
          Profile
        </Link>
        <Link
          href="/transactions"
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FileText className="h-5 w-5 mr-3" />
          Transactions
        </Link>
        <Link
          href="/settings"
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </Link>
        <Link
          href="/help"
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <HelpCircle className="h-5 w-5 mr-3" />
          Help
        </Link>
      </nav>
    </aside>
  );
}
