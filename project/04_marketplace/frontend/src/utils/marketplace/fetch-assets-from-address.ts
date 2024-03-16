import { NftItemType } from "@/types/GenericsType";
import { post } from "@/utils/http-request";

type Props = {
    address: string;
};

const fetchAssetsFromAddress = async function ({ address }: Props) {
    try {
        const { paginatedData, totalPage } = await post(`/koios/assets/address-assets`, {
            address: address,
        });

        return { paginatedData, totalPage };
    } catch (error) {
        console.log(error);
    }
};

export default fetchAssetsFromAddress;
