"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentTime = new Date();
      const oneHourLater = new Date(currentTime.getTime() + 3600 * 1000);
      setFormData((prev) => ({
        ...prev,
        biddingStartTime: currentTime.toISOString().slice(0, 16),
        biddingEndTime: oneHourLater.toISOString().slice(0, 16),
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("IPO Details Submitted Successfully!");
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const walletAddress = accounts[0];
        setFormData((prev) => ({ ...prev, walletAddress }));
        setWalletConnected(true);
        alert("Wallet connected successfully!");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-4xl p-8">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              IPO Allocation Form
            </h1>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-end mb-6">
            <button
              onClick={connectWallet}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              {walletConnected ? "Wallet Connected" : "Connect Wallet"}
            </button>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Row 1: IPO Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                IPO Name
              </label>
              <input
                type="text"
                name="ipoName"
                value={formData.ipoName}
                onChange={handleChange}
                placeholder="Enter IPO Name"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Row 2: Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Wallet Address
              </label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                readOnly
                placeholder="Connect Wallet to Autofill"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>

            {/* Row 3: Issue Price and Total Shares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Issue Price
                </label>
                <input
                  type="number"
                  name="issuePrice"
                  value={formData.issuePrice}
                  onChange={handleChange}
                  placeholder="Enter Issue Price"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Shares
                </label>
                <input
                  type="number"
                  name="totalShares"
                  value={formData.totalShares}
                  onChange={handleChange}
                  placeholder="Enter Total Shares"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Row 4: Lot Size and Company Sector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Lot Size
                </label>
                <input
                  type="number"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleChange}
                  placeholder="Enter Lot Size"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Company Sector
                </label>
                <input
                  type="text"
                  name="companySector"
                  value={formData.companySector}
                  onChange={handleChange}
                  placeholder="Enter Company Sector"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Row 5: Bidding Start and End Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Bidding Start Time
                </label>
                <input
                  type="datetime-local"
                  name="biddingStartTime"
                  value={formData.biddingStartTime}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Bidding End Time
                </label>
                <input
                  type="datetime-local"
                  name="biddingEndTime"
                  value={formData.biddingEndTime}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white text-sm font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              Submit IPO Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
