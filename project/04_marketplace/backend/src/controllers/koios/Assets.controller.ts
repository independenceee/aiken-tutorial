import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { get, post } from "../../utils/koios";
import { BadRequest, NotFound } from "../../errors";
import paginate from "../../utils/paginate";

class AssetsController {
    /**
     * @method POST => DONE
     * @description Get the current address holding the asset
     * @param request body: { policyId, assetName } required
     * @param response json { address: current address}
     * @returns
     */
    async assetNftAddress(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;
            if (!policyId && !assetName)
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("policyId and assetName has been required."));
            const data = await get(`/asset_nft_address?_asset_policy=${policyId}&_asset_name=${assetName}`, {});
            if (!data) return response.status(StatusCodes.NOT_FOUND).json(new NotFound("assets from policyId and assetName not exist."));
            response.status(StatusCodes.OK).json({ address: data[0].payment_address });
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get asset information from policyId and assetName
     * @param request body: { policyId, assetName } required
     * @param response json:  array[{ information assets }]
     * @returns
     */

    async assetInfomation(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;
            if (!policyId && !assetName) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("policyId and assetName has been required."));
            }

            const data = await get(`/asset_info?_asset_policy=${policyId}&_asset_name=${assetName}`, {});

            response.status(StatusCodes.OK).json(data);
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get asset information from policyId and assetName
     * @param request body: { policyId, assetName } required
     * @param response json: array[{ information assets }]
     * @returns
     */

    async policyAssetInfomation(request: Request, response: Response) {
        try {
            const { policyId } = request.body;
            const { page, pageSize } = request.query;

            if (!policyId) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("policyId  has been required."));
            }

            const data = await get(`/policy_asset_info?_asset_policy=${policyId}`, {});
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            response.status(StatusCodes.OK).json(results);
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get the existing attribute in PolicyId
     * @param request body: { policyId: require } query: {page: default = 8}
     * @param response json: array[{ decimals, total_supply, fingerprint, asset_name}]
     * @returns
     */

    async assetPolicyInfomation(request: Request, response: Response) {
        try {
            const { policyId } = request.body;
            const { page, pageSize } = request.query;

            if (!policyId) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("policyId  has been required."));
            }

            const data = await get(`/asset_policy_info?_asset_policy=${policyId}`, {});
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });

            response.status(StatusCodes.OK).json(results);
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get the total transaction stake wallet unstake address from asset
     * @param request body: { policyId: require, assetName: required } query: {page: default = 8}
     * @param response json: array[{ total_transactions, total_supply, fingerprint, asset_name, staked_wallets, unstaked_addresses}]
     * @returns
     */

    async assetSummary(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;

            if (!policyId && !assetName) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("policyId and assetName has been required."));
            }
            const data = await get(`/asset_summary?_asset_policy=${policyId}&_asset_name=${assetName}`, {});
            response.status(StatusCodes.OK).json(data);
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get the existing attribute in PolicyId
     * @param request body: { policyId: require } query: {page: default = 8}
     * @param response json: array[{ decimals, total_supply, fingerprint, asset_name}]
     * @returns
     */
    async policyAssetList(request: Request, response: Response) {
        try {
            const { policyId } = request.body;
            const { page, pageSize } = request.query;

            if (!policyId) {
                return response.status(StatusCodes.NOT_FOUND).json(new NotFound("policyId has been required."));
            }
            const data = await get(`/policy_asset_list?_asset_policy=${policyId}`, {});
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            response.status(StatusCodes.OK).json({ totalPage: 0, paginatedData: data });
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }

    /**
     * @method GET => DONE
     * @description Retrieve the currently active stakeKey
     * @param request query: { page: default = 8 }
     * @param response json: array[{ id: stakeKey }]
     * @returns
     */
    async accountList(request: Request, response: Response) {
        try {
            const { page, pageSize } = request.query;

            const data = await get("/account_list", {});
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            response.status(StatusCodes.OK).json(results);
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get all assets from address
     * @param request body: { address } query: { page: default = 8  }
     * @param response json: array [{ fingerprint, asset_name, policy_id, quantity}]
     */
    async addressAsset(request: Request, response: Response) {
        try {
            const { address } = request.body;
            const { page, pageSize } = request.query;
            if (!address) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required."));
            const data = await post("/address_assets", { _addresses: [address] });
            const results = paginate({ data: data[0].asset_list, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            response.status(StatusCodes.OK).json({
                totalPage: 0,
                paginatedData: data[0].asset_list,
            });
        } catch (error) {
            response.status(StatusCodes.BAD_REQUEST).json({ error });
        }
    }
}

export default new AssetsController();
