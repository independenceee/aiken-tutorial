import React, {
    ReactNode,
    useState,
    createContext,
    useEffect,
    useContext,
} from "react";
import { ProductType } from "./SmartcontractProvider";
import { post } from "../utils/http-request";
import { WalletContext, WalletContextType } from "./WalletProvider";
import fetchInformationAsset from "../utils/fetchInformationAsset";

type Props = {
    children: ReactNode;
};

export type AccountContextType = {
    assetsFromAddress: ProductType[];
};

export const AccountContext = createContext<AccountContextType>(null!);

const AccountProvider = function ({ children }: Props) {
    const { wallet } = useContext<WalletContextType>(WalletContext);
    const [assetsFromAddress, setAssetsFromAddress] = useState<ProductType[]>(
        []
    );

    console.log(wallet?.address);
    const [currentPageAssetsFromAddress, setCurrentPageAssetsFromAddress] =
        useState<number>(1);
    const [totalPagesAssetsFromAddress, setTotalPagesAssetsFromAddress] =
        useState<number>(1);
    const [loadingAssetsFromAddress, setLoadingAssetsFromAddress] =
        useState<boolean>(false);
    useEffect(() => {
        const fetchAssetsFromAddress = async function () {
            setLoadingAssetsFromAddress(true);

            const { paginatedData, totalPage } = await post(
                `/koios/assets/address-assets?page=${currentPageAssetsFromAddress}&pageSize=${12}`,
                {
                    address: wallet?.address,
                }
            );

            const assetsFromAddress = await Promise.all(
                paginatedData.map(
                    async ({ policy_id, asset_name, quantity }: any) => {
                        if (
                            policy_id !== "" &&
                            asset_name !== "" &&
                            quantity === "1"
                        ) {
                            const data = await fetchInformationAsset({
                                policyId: policy_id,
                                assetName: asset_name,
                            });
                            if (data) return { ...data };
                            return null;
                        }
                    }
                )
            );

            setAssetsFromAddress(assetsFromAddress.filter(Boolean));

            setLoadingAssetsFromAddress(false);
        };
        if (wallet?.address) {
            fetchAssetsFromAddress();
        }
    }, [wallet?.address, currentPageAssetsFromAddress]);
    return (
        <AccountContext.Provider value={{ assetsFromAddress }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
