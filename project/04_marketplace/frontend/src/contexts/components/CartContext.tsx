import { createContext } from "react";
import { CartContextType } from "@/types/CartContextType";

const CartContext = createContext<CartContextType>(null!);

export default CartContext;
