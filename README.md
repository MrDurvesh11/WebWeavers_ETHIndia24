# EquiChain  
**Dynamic Initial Public Offering (IPO) Allocations in Web3**  

## Overview  
EquiChain revolutionizes the traditional Initial Public Offering (IPO) process by introducing a **decentralized**, **transparent**, and **unbiased** platform. It ensures fair participation for all investors, especially retail participants, by leveraging blockchain technology. The platform uses innovative tools to make IPO allocations efficient, equitable, and secure.  

## Problem Solved  
The current IPO allocation systems are manual, opaque, and biased, often favoring institutional investors over retail participants. This lack of transparency and fairness discourages broad participation and undermines trust.  

EquiChain resolves these issues by:  
- Leveraging *randomness* for unbiased allocations.  
- Ensuring *transparency* and *security* through decentralized protocols.  
- Simplifying the process for retail investors, enabling *equal opportunities* for participation.  

## Key Features  
- **Randomized Allocation**: Ensures fair distribution of IPO shares using *Supra L1 DVRF* for unbiased randomization.  
- **Secure File Management**: Uses *Lit* Protocol for encrypting and decrypting `.txt`, `.json`, and `.pdf` files, safeguarding sensitive data.  
- **Seamless Transactions**: Processes payments securely and efficiently via *Coinbase*.  
- **User-Friendly Onboarding**: Simplifies registration for new users with integrations like *Octa* and *CoinDCX*.  
- **Decentralized Storage**: Ensures reliable and secure storage of IPO-related data with *Akaave*.  
- **Transparency**: Provides full transparency in the allocation process, ensuring that all actions and decisions are verifiable and visible to all participants.  

## Challenges Faced  
While building EquiChain, we encountered the following challenges:  
1. [**Supra Whitelisting**](https://docs.google.com/forms/d/e/1FAIpQLSfYdEhR2Sk22joYH_86IGAArMrvQvUM6K99iYBnqTV18uTrxw/viewform): Delays in implementing the randomization feature due to whitelisting requirements.  
2. [**Lit Protocol Conflicts**](https://developer.litprotocol.com/category/migrating-from-earlier-versions): Dependency issues caused integration challenges with Lit Protocol.  
3. **Inter-Smart Contract Communication**: Required the creation of a new cryptocurrency to facilitate interactions between smart contracts.  
4. [**Naming Inconsistencies**](https://docs.supra.com/move/getting-started/your-first-move-contract): Discrepancies in function names between Supra and Aptos Move led to confusion.
  


## Tech Stack  
- **Blockchain**: Supra L1  
  - [Supra L1 Documentation](https://docs.supra.com/)
- **Encryption**: Lit Protocol  
  - [Lit Protocol Documentation](https://www.litprotocol.com/)
- **Transactions**: Coinbase  
  - [Coinbase API Documentation](https://docs.cdp.coinbase.com/get-started/docs/overview)
- **Registration**: Octa CoinDCX  
  - [Octa Documentation](https://coindcx.com/api/help/)
- **Storage**: Akaave  
  - [Akaave Documentation](https://docs.akave.ai/)


## Getting Started  

### Prerequisites  
Before you begin, ensure you have the following installed on your machine:  
- **Node.js** (v14 or higher)  
- **Coinbase** and **OctaFX** accounts for transaction and registration functionalities  
- **Lit Protocol** npm libraries for secure encryption and decryption  

Follow the steps below to run the project successfully:

### 1. Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone https://github.com/MrDurvesh11/WebWeavers_ETHIndia24.git
cd WebWeavers_ETHIndia24
```

### 2. Install Dependencies
Navigate to both the frontend and backend directories and install the required dependencies.

### Front End
Go to the frontend directory:

```bash
cd frontend
```

Then, install the required dependencies:

```bash
npm install
```

### Back End
Go to the backend directory:

```bash
cd ../backend
```
Then, install the required dependencies:

```bash
npm install
```

### 3. Set Up the Backend
Ensure you have your Akave and Lit Protocol integrations correctly configured in the backend. The backend will handle data storage and encryption.

***3.1. Akave Integration***
To integrate Akave for secure storage of IPO-related data, follow these steps:

Install Akave SDK:

```bash
npm install @akaave/sdk
```
Refer to the official documentation for additional configuration steps:
Akave Installation

 ***3.2. Lit Protocol Integration***
To use Lit Protocol for secure encryption and decryption of files, follow these steps:

Install Lit Protocol SDK:

```bash
npm install @lit-protocol/sdk
```
Refer to the official documentation for setup and usage instructions:
Lit Installation

### 4. Run the Development Server
Frontend:
Once the dependencies are installed, start the frontend development server:

```bash
cd frontend
npm run dev
```

Backend:
To run the backend, you can use the following command in the backend directory:

```bash
cd backend
npm run dev
```
Ensure that your backend services (Akave, Coinbase, OctaFX, Lit Protocol) are properly connected and configured.

### 5. Open the Application
After both the frontend and backend are running, open your browser and go to:
```bash
http://localhost:3000
```

## Troubleshooting

- **Port Conflict**: If you see an error related to port 3000 when running the development server, make sure no other processes are using that port. You can change the port in the `package.json` file under `start` scripts.

- **Akave API Errors**: If you receive authentication errors while connecting to Akave, double-check that your API keys are correctly configured in the `.env` file.
