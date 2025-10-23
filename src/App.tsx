import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./connection.ts";
import { useState } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { formatAddress } from "./utils.ts";

type PaymentRow = {
  address: string;
  amount: string;
};

function App() {
  const [rows, setRows] = useState<PaymentRow[]>([
    { address: "", amount: "" }, // Start with one empty row
  ]);
  const addRow = () => {
    setRows([...rows, { address: "", amount: "" }]);
  };
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    // Create a new array by mapping over the old one
    const newRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const deleteRow = (indexToDelete: number) => {
    // Prevent deleting the last row
    if (rows.length === 1) {
      setRows([{ address: "", amount: "" }]);
      return;
    }
    const newRows = rows.filter((_, index) => index !== indexToDelete);
    setRows(newRows);
  };

  const { isConnected, address } = useAppKitAccount();
  const {open} = useAppKit();

  const sendPayment =()=>{
    if (!isConnected){
      toast.error("Connect wallet first!");
      return;
    }
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      // Check for empty fields
      if (!row.address || !row.amount) {
        toast.error(`Row #${i + 1} is incomplete. Please fill all fields.`);
        return;
      }

      // Check for valid address format
      if (!addressRegex.test(row.address)) {
        toast.error(`Row #${i + 1} has an invalid recipient address.`);
        return;
      }

      // Check for valid amount
      const amountNumber = Number(row.amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        toast.error(`Row #${i + 1} has an invalid amount. Must be > 0.`);
        return;
      }
    }
    toast.success("All checks pass, sending shortly!")
  }
  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-12 font-sans text-gray-100">
      <header className="flex w-full max-w-5xl items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-white">RSK Payroll</h1>
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          onClick={() => open()}
        >
          {isConnected ? formatAddress(address ?? "") : <>Connect Wallet</>}
        </button>
      </header>

      <div className="w-full max-w-lg p-4">
        <div className="inner rounded-lg bg-gray-800 p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Batch Payment
          </h2>

          {/* This container will hold all the payment rows */}
          <div className="inputs flex flex-col gap-4">
            {rows.map((row, index) => (
              <div
                key={index}
                className="input flex flex-col gap-4 sm:flex-row"
              >
                <input
                  type="text"
                  name="address" // This 'name' must match a key in PaymentRow
                  placeholder="Recipient Address (0x...)"
                  className="flex-grow rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-2/3"
                  value={row.address}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <input
                  type="number"
                  name="amount" // This 'name' must match a key in PaymentRow
                  placeholder="Amount"
                  className="rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-1/3"
                  value={row.amount}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => deleteRow(index)}
                  className="flex-shrink-0 rounded-md bg-red-600 px-3 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          
          <div className="btns mt-6 flex gap-4">
            <button
              type="button"
              className="flex-1 rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-700"
              onClick={addRow}
            >
              Add Row
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              onClick={sendPayment}
            >
              Send Payment
            </button>
          </div>
        </div>
      </div>

  
      <ToastContainer position="bottom-right" theme="dark" autoClose={3000} />
    </div>
  );
}

export default App;
