import { NftItemType } from "./GenericsType";

export type CartContextType = {
    cartItem: {
        itemsList: Array<NftItemType>;
        totalQuantity: number;
        totalPrice: number;
    };

    removeFromCart: ({ id, policyId, assetName }: NftItemType) => Promise<any>;
    addToCart: (newItem: NftItemType) => Promise<any>;
    clearCart: () => Promise<any>;
    completePurchase: () => Promise<any>;
};
