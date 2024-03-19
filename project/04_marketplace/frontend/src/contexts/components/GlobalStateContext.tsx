import { createContext } from "react";
import { GlobalStateContextType } from "@/types/GlobalStateContextType";

const GlobalStateContext = createContext<GlobalStateContextType>(null!);

export default GlobalStateContext;
