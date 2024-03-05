import React, { createContext } from "react";
import { SmartcontractContextType } from "~/types/contexts/SmartcontractContextType";

const SmartcontractContext = createContext<SmartcontractContextType>(null!);

export default SmartcontractContext;
