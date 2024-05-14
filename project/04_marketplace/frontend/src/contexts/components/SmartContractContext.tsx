"use client";

import { createContext } from "react";
import { SmartContractContextType } from "~/types/contexts/SmartContractContextType.d";

const SmartContractContext = createContext<SmartContractContextType>(null!);

export default SmartContractContext;
