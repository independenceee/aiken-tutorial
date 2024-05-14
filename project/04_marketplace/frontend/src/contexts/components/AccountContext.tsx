"use client";

import { createContext } from "react";
import { AccountContextType } from "~/types/contexts/AccountContextType";

const AccountContext = createContext<AccountContextType>(null!);

export default AccountContext;
