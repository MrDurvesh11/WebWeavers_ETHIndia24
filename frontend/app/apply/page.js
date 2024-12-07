"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddIPO() {
  const [formData, setFormData] = useState({
    ipoName: "",
    walletAddress: "",
    issuePrice: "",
    totalShares: "",
    lotSize: "",
    companySector: "",
    biddingStartTime: "",
    biddingEndTime: "",
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (Number(formData.issuePrice) <= 0) newErrors.issuePrice = "Price must be positive.";
    if (Number(formData.totalShares) <= 0) newErrors.totalShares = "Shares must be positive.";
    if (Number(formData.lotSize) <= 0) newErrors.lotSize = "Lot size must be positive.";
    if (new Date(formData.biddingStartTime) >= new Date(formData.biddingEndTime)) {
      newErrors.biddingTimes = "Start time must be before end time.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setFormData((prev) => ({ ...prev, walletAddress: address }));
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to proceed.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      connectWallet();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted IPO Data:", formData);
      // Add API integration logic here to save the IPO details
    }
  };

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Add New IPO
      </h1>
      <Card className="shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-semibold text-white">
            IPO Information
          </CardTitle>
          <CardDescription className="text-white">
            Fill in the required details and connect your wallet to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-gray-50 dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Inputs */}
              {[
                { name: "ipoName", type: "text", label: "IPO Name", placeholder: "Enter IPO Name" },
                { name: "issuePrice", type: "number", label: "Issue Price", placeholder: "Enter Issue Price" },
                { name: "totalShares", type: "number", label: "Total Shares", placeholder: "Enter Total Shares" },
                { name: "lotSize", type: "number", label: "Lot Size", placeholder: "Enter Lot Size" },
                { name: "companySector", type: "text", label: "Company Sector", placeholder: "Enter Company Sector" },
                { name: "biddingStartTime", type: "datetime-local", label: "Bidding Start Time" },
                { name: "biddingEndTime", type: "datetime-local", label: "Bidding End Time" },
              ].map((input) => (
                <div key={input.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={input.placeholder}
                    required
                  />
                  {errors[input.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[input.name]}</p>
                  )}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Wallet Address
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="text"
                    name="walletAddress"
                    value={formData.walletAddress}
                    readOnly
                    className="block w-full rounded-lg bg-gray-100 dark:bg-gray-700 shadow-sm sm:text-sm dark:text-gray-300"
                    placeholder="Connect your wallet"
                  />
                  <Button
                    onClick={connectWallet}
                    className={`${
                      walletConnected
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white px-6 py-2 rounded-lg`}
                  >
                    {walletConnected ? "Connected" : "Connect Wallet"}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 shadow-lg"
            >
              Submit IPO Details
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
