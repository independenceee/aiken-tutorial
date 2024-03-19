import { createContext } from "react";
import { ModalContextType } from "@/types/ModalContextType";

const ModalContext = createContext<ModalContextType>(null!);

export default ModalContext;
