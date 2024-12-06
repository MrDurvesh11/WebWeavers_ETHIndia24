"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InvestmentHistory } from "@/components/investment-history";

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://avatar.vercel.sh/john@example.com" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">john@example.com</p>
            <Button className="mt-4">Edit Profile</Button>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Investment Summary</CardTitle>
            <CardDescription>Overview of your IPO investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Total Invested</p>
                <p className="text-2xl font-bold">$50,000</p>
              </div>
              <div>
                <p className="text-sm font-medium">Current Value</p>
                <p className="text-2xl font-bold">$62,500</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Profit</p>
                <p className="text-2xl font-bold text-green-600">$12,500</p>
              </div>
              <div>
                <p className="text-sm font-medium">ROI</p>
                <p className="text-2xl font-bold text-green-600">25%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Investment History</CardTitle>
          <CardDescription>Your past IPO allocations and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentHistory />
        </CardContent>
      </Card>
    </div>
  );
}