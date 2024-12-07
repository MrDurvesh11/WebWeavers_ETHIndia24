
import "../globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";

// Ensure correct import path

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          {/* Sidebar component */}
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header component */}
            <Header />
            {/* Main content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              {children} {/* This will render the nested page content */}
            </main>
          </div>
        </div>
  
  );
}