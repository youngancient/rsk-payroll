import { useCallback, useState } from "react";
import { usePayrollContract } from "../useContracts";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "react-toastify";

// will contain write functions
export const useWriteFunctions = () => {
  const payrollContract = usePayrollContract(true);
  const [isPaying, setIsPaying] = useState(false);
  const errorDecoder = ErrorDecoder.create();
  const { address } = useAppKitAccount();

  const pay = useCallback(
    async (addresses: string[], amounts: bigint[], totalAmount: bigint) => {
      if (!payrollContract) {
        toast.error("token contract not found");
        return false;
      }
      if (!address) {
        toast.error("address not found");
        return false;
      }
      try {
        setIsPaying(true);
        const payTx = await payrollContract.distribute(addresses, amounts, {
          value: totalAmount,
        });
        const receipt = await payTx.wait();
        return receipt.status === 1;
      } catch (error) {
        console.error(error);
        const decodedError: DecodedError = await errorDecoder.decode(error);
        toast.error(decodedError.reason);
        return false;
      } finally {
        setIsPaying(false);
      }
    },
    [payrollContract, address]
  );
  return { pay, isPaying };
};
