import { createContext } from "react";
import { SmartContractType } from "@/types/SmartContextType";

const SmartContractContext = createContext<SmartContractType>(null!);

export default SmartContractContext;
