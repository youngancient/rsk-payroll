import { useMemo } from "react";
import useRunners from "./useRunners";
import { Contract } from "ethers";
import { PAYROLL_ABI } from "../ABI/payroll";



export const usePayrollContract = (withSigner = false) => {
    const { readOnlyProvider, signer } = useRunners();

    return useMemo(() => {
        if (withSigner) {
            if (!signer) return null;
            return new Contract(
                import.meta.env.VITE_PAYROLL_CONTRACT_ADDRESS,
                PAYROLL_ABI,
                signer
            );
        }
        return new Contract(
            import.meta.env.VITE_PAYROLL_CONTRACT_ADDRESS,
            PAYROLL_ABI,
            readOnlyProvider
        );
    }, [readOnlyProvider, signer, withSigner]);
};
