"use client";

import { createContext } from "react";
import { SmartcontractContextType } from "~/types/contexts/SmartcontractContextType";

const SmartcontextContext = createContext<SmartcontractContextType>(null!);

export default SmartcontextContext;
