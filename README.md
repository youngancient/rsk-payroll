# rsk-payroll
A simple UI that allows users to send rBTC (Rootstock's native token) to multiple addresses in one go with just a click of a button.

## Purpose of this Repository

This repository is the starting point for a **video tutorial**.  
It provides a **pre-configured scaffold branch** with all the necessary setup, allowing you to follow along with the tutorial and build the DApp from a clean slate without worrying about configuration.

- **To start the tutorial:** Follow the setup instructions below to use the scaffold branch.  
- **For the final code:** The completed code for the tutorial can be found on the feature branch.

---

## Tech Stack

- **Vite** – A high-performance, next-generation frontend build tool.  
- **React** – A JavaScript library for building user interfaces.  
- **Tailwind CSS** – A utility-first CSS framework for rapid UI development.  
- **Ethers.js** – A complete and compact library for interacting with the Ethereum blockchain and EVM-compatible chains like Rootstock.  
- **Rootstock (rBTC)** – The smart contract platform secured by the Bitcoin network.

---

## Getting Started

Follow these steps to get your local development environment set up and ready for the tutorial.

### 1. Prerequisites

Before you begin, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- A browser wallet like Metamask or Rabbywallet.

Also you must have some smart contract development knowledge.
---

### 2. Configure MetaMask for Rootstock Testnet

You'll need to add the **Rootstock Testnet** to MetaMask to interact with the DApp.

1. Open MetaMask and click on the network dropdown.
2. Select **“Add network”** or **“Add a network manually.”**
3. Enter the following information:

| Field | Value |
|-------|--------|
| **Network Name** | Rootstock Testnet |
| **New RPC URL** | https://public-node.testnet.rootstock.io |
| **Chain ID** | 31 |
| **Currency Symbol** | tRBTC |
| **Block Explorer URL** | https://explorer.testnet.rootstock.io |

---

### 3. Get Testnet rBTC

You'll need some test **rBTC (tRBTC)** to pay for transactions.  
Get some from the official Rootstock faucet:

[https://faucet.rootstock.io/](https://faucet.rootstock.io/)

---

### 4. Setup Instructions

Now, let's set up the project itself.

#### **Step 1: Clone the repository**

```bash
git clone https://github.com/youngancient/rsk-payroll.git
```

#### **Step 2: Navigate to the project directory**

```bash
cd rsk-payroll
```

#### **Step 3: Switch to the scaffold branch**

```bash
git checkout scaffold
```

#### **Step 4: Install dependencies**

```bash
git checkout scaffold
```

#### **Step 5: Set up environment variables**
Create a .env file by copying the example file

#### **Step 6: Run the development server**

```bash
npm run dev
```