"use client"; // Ensures client-side rendering
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function IPOForm() {
  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    panCardNumber: "",
    bidLotSize: "",
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [isClient, setIsClient] = useState(false); // Ensures client-only rendering

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.okto) {
      try {
        // Use ethers to create a provider connected to Okto
        const provider = new ethers.providers.Web3Provider(window.okto);
        
        // Request wallet connection
        const accounts = await provider.send("eth_requestAccounts", []);
        
        setFormData((prev) => ({ ...prev, walletAddress: accounts[0] }));
        setWalletConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Okto Wallet is not available. Please install it to connect.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/create-ipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse}`);
      }

      const data = await response.json();
      console.log("Response from backend:", data);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          IPO Application Form
        </h1>

        <button
          onClick={connectWallet}
          className={`mb-4 px-6 py-2 text-white rounded-lg ${
            walletConnected ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="Enter your Wallet Address"
              className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700"
              disabled={walletConnected} // Prevent manual entry after connecting wallet
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              PAN Card Number
            </label>
            <input
              type="text"
              name="panCardNumber"
              value={formData.panCardNumber}
              onChange={handleChange}
              placeholder="Enter PAN Card Number"
              className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Bid Lot Size
            </label>
            <input
              type="number"
              name="bidLotSize"
              value={formData.bidLotSize}
              onChange={handleChange}
              placeholder="Enter Bid Lot Size"
              className="w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
