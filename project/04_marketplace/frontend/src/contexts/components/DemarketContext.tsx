import { createContext } from "react";
import { DemarketContextType } from "@/types/DemarketContextType";

const DemarketContext = createContext<DemarketContextType>(null!);

export default DemarketContext;
