"use client";

import React, { ReactNode, useState, useEffect, useContext } from "react";
import CartContext from "@/contexts/components/CartContext";
import AccountContext from "@/contexts/components/AccountContext";
import { AccountContextType } from "@/types/AccountContextType";
import { toast } from "react-toastify";
import { NftItemType, RevalidateType } from "@/types/GenericsType";
import { LucidContextType } from "@/types/LucidContextType";
import LucidContext from "@/contexts/components/LucidContext";
import { SmartContractType } from "@/types/SmartContextType";
import SmartContractContext from "@/contexts/components/SmartContractContext";
import { ModalContextType } from "@/types/ModalContextType";
import ModalContext from "@/contexts/components/ModalContext";
import { get } from "@/utils/http-request";
import { GlobalStateContextType } from "@/types/GlobalStateContextType";
import GlobalStateContext from "../components/GlobalStateContext";

type Props = {
    children: ReactNode;
};

const CartProvider = function ({ children }: Props) {
    const { account } = useContext<AccountContextType>(AccountContext);
    const { lucidWallet } = useContext<LucidContextType>(LucidContext);
    const { toggleNotificationConnectWallet } = useContext<ModalContextType>(ModalContext);
    const { buyMoreAssetsService } = useContext<SmartContractType>(SmartContractContext);
    const { revalidate, setRevalidate } = useContext<GlobalStateContextType>(GlobalStateContext);

    const [cartItem, setCartItem] = useState<{
        itemsList: NftItemType[];
        totalPrice: number;
        totalQuantity: number;
        changed: boolean;
    }>({
        itemsList: [],
        totalPrice: 0,
        totalQuantity: 0,
        changed: true,
    });

    useEffect(() => {
        const fetchAssetsCartFromAccount = async function () {
            try {
                const data = await get("/nft/cart", {
                    walletAddress: account.walletAddress,
                    page: 1,
                });
            } catch (error) {
                console.log(error);
            }
        };
        if (account) {
            fetchAssetsCartFromAccount();
        }
    }, [account]);

    const addToCart = async function (newItem: NftItemType) {
        setCartItem((prev: any) => {
            const existingItem: NftItemType[] = prev.itemsList.find(
                (item: NftItemType) => item.assetName === newItem.assetName && item.policyId === newItem.policyId,
            );

            if (existingItem) {
                toast.warn("Asset already exits to cart");
                return { ...prev, changed: false };
            } else {
                toast.success("Add to cart asset successfully");
                return {
                    ...prev,
                    itemsList: [...prev.itemsList, newItem],
                    totalQuantity: prev.totalQuantity + 1,
                    totalPrice: prev.totalPrice + Number(newItem.price) / 1000000,
                    changed: true,
                };
            }
        });
    };

    const removeFromCart = async function ({ id, policyId, assetName }: NftItemType) {
        setCartItem((prev: any) => {
            const updatedItemsList: NftItemType[] = prev.itemsList.filter(
                (item: any) => item.id !== id || (item.policyId !== policyId && item.assetName !== assetName),
            );
            const updatedTotalPrice = updatedItemsList.reduce(function (total: number, item: any) {
                return total + Number(item.price);
            }, 0);

            return {
                ...prev,
                itemsList: updatedItemsList,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedItemsList.length,
                changed: true,
            };
        });
    };

    const clearCart = async function () {
        setCartItem((prev) => {
            return {
                ...prev,
                itemsList: [],
                totalPrice: 0,
                totalQuantity: 0,
                changed: true,
            };
        });
    };

    const completePurchase = async function () {
        try {
            if (lucidWallet) {
                await buyMoreAssetsService({ lucid: lucidWallet, assets: cartItem.itemsList });

                setRevalidate(function (previous: RevalidateType) {
                    return {
                        ...previous,
                        account: !revalidate.account,
                    };
                });

                toast.success("Sell assets successfully.");
            } else {
                toggleNotificationConnectWallet();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <CartContext.Provider value={{ completePurchase, cartItem, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};

export default CartProvider;
