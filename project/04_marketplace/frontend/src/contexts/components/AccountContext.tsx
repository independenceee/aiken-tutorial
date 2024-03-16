import { createContext } from "react";
import { AccountContextType } from "@/types/AccountContextType";

const AccountContext = createContext<AccountContextType>(null!);

export default AccountContext;
