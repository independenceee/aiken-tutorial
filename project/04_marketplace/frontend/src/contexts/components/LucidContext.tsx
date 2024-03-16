import { createContext } from "react";
import { LucidContextType } from "@/types/LucidContextType";

const LucidContext = createContext<LucidContextType>(null!);

export default LucidContext;
