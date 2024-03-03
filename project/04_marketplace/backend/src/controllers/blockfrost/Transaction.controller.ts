import { Request, Response } from "express";
import apiBlockfrost from "../../utils/blockfrost";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../../errors";
import paginate from "../../utils/paginate";

class TransactionController {
    /**
     * @method POST => DONE
     * @description Get details utxo block
     * @param request  body: { transactionHash : required}
     * @param response json: { description transaction}
     */
    async getUTXOsTransaction(request: Request, response: Response) {
        try {
            const { transactionHash } = request.body;

            if (!transactionHash) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Transaction hash has been required."));
            }
            const data = await apiBlockfrost.txsUtxos(transactionHash);
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get details transaction block
     * @param request body: { transactionHash : required}
     * @param response json: { description transaction}
     */
    async getDetailsTransactions(request: Request, response: Response) {
        try {
            const { transactionHash } = request.body;
            if (!transactionHash) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Transaction hash has been required."));
            }

            const data = await apiBlockfrost.txs(transactionHash);
            return response.status(StatusCodes.OK).json(data);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get transaction from account address
     * @param request body: {address: require}, , query: { page, pageSize }
     * @param response json: array[{ tx_hash }]
     */
    async getTransactionAccount(request: Request, response: Response) {
        try {
            const { address } = request.body;
            const { page, pageSize, type } = request.query;
            if (!address) return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required."));
            const data = await apiBlockfrost.addressesTransactions(address);
            if (type) return response.status(StatusCodes.OK).json(data);
            const results = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });
            return response.status(StatusCodes.OK).json(results);
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }

    /**
     * @method POST => DONE
     * @description Get transaction from assets
     * @param request body: { policyId: required, assetName: required }, query: { page, pageSize }
     * @param response json: { firstTransaction, currentTransaction, array [allTracsaction]}
     * @returns
     */
    async getTransactionAsset(request: Request, response: Response) {
        try {
            const { policyId, assetName } = request.body;
            const { page, pageSize, type } = request.query;

            if (!policyId && !assetName) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("PolicyId and assetName has been required."));
            }

            const data = await apiBlockfrost.assetsTransactions(policyId + assetName);
            if (type) return response.status(StatusCodes.OK).json(data);
            const allTransaction = paginate({ data: data, page: Number(page || 1), pageSize: Number(pageSize || 8) });

            return response.status(StatusCodes.OK).json({
                firstTransaction: data[0],
                currentTransaction: data[data.length - 1],
                allTransaction: allTransaction,
            });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error,
            });
        }
    }
}

export default new TransactionController();
