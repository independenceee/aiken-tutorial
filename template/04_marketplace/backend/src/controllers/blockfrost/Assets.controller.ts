import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import apiBlockfrost from "../../utils/blockfrost";
import { BadRequest, NotFound } from "../../errors";
import paginate from "../../utils/paginate";

class AssetsController {
    /**
     * @method POST => DONE
     * @description Get amount asset from stake adress
     * @param request body { stakeAddress } query: { page: default: 0, pageSize: default: 8}
     * @param response json: array[{ uint, amount}]
     */
    async getAllAssetsFromAddress(request: Request, response: Response) {
        const { stakeAddress } = request.body;
        const { page, pageSize } = request.query;
        if (!stakeAddress) {
            return response.status(StatusCodes.BAD_GATEWAY).json(new BadRequest("Stake address has been required."));
        }
        const data = await apiBlockfrost.accountsAddressesAssets(stakeAddress);
        if (!data) {
            return response.status(StatusCodes.NOT_FOUND).json(new NotFound("Stake address wrong  or no data from stake address."));
        }
        const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
        return response.status(StatusCodes.OK).json(results);
    }

    /**
     * @method POST => DONE
     * @description Get infomation assets from policyId and assetName
     * @param request body: { assetName: required, policyId: required }
     * @param response json: { information assets}
     * @return
     */
    async getAllInformationAssets(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;

            if (!policyId) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("PolicyId and assetName has been required."));
            }

            const data = await apiBlockfrost.assetsById(policyId + assetName);
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get asset minted from policyId
     * @param request  body: { policyId : required } query: { page: default: 0, pageSize: default: 8}
     * @param response json: { uint, amount}
     */
    async getMintedAssets(request: Request, response: Response) {
        try {
            const { policyId } = request.body;
            const { page, pageSize } = request.query;
            if (!policyId) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("PolicyId  has been required."));
            }
            const data = await apiBlockfrost.assetsPolicyById(policyId);
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            return response.status(StatusCodes.OK).json(results);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }
}

export default new AssetsController();
