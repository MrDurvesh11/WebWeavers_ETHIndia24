"yuse client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function IPOPage() {
  const [walletAddress, setWalletAddress] = useState("");
  const [ipoDetails, setIpoDetails] = useState({
    ipoName: "Tata",
    walletAddress: "0xes54sdfs6656445sd",
    issuePrice: 120,
    totalShares: 144000,
    lotSize: 12,
    companySector: "Power",
    biddingStartTime: new Date(1733551264700).toLocaleString(),
    biddingEndTime: new Date(1733551400900).toLocaleString(),
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install a Web3 wallet extension like MetaMask.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0] || "");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-700 text-white p-6">
      <div className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-4">
          IPO Allocation - {ipoDetails.ipoName}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Wallet Address</label>
            <input
              type="text"
              value={walletAddress || ipoDetails.walletAddress}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={connectWallet}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            {walletAddress ? "Wallet Connected" : "Connect Wallet"}
          </button>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Issue Price</label>
              <p>{ipoDetails.issuePrice} ₹</p>
            </div>
            <div>
              <label className="block font-semibold">Total Shares</label>
              <p>{ipoDetails.totalShares}</p>
            </div>
            <div>
              <label className="block font-semibold">Lot Size</label>
              <p>{ipoDetails.lotSize}</p>
            </div>
            <div>
              <label className="block font-semibold">Company Sector</label>
              <p>{ipoDetails.companySector}</p>
            </div>
            <div>
              <label className="block font-semibold">Bidding Start Time</label>
              <p>{ipoDetails.biddingStartTime}</p>
            </div>
            <div>
              <label className="block font-semibold">Bidding End Time</label>
              <p>{ipoDetails.biddingEndTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
