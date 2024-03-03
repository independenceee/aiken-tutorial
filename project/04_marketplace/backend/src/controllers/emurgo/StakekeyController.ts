import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError, BadRequest } from "../../errors";
import { Address, BaseAddress, RewardAddress } from "@emurgo/cardano-serialization-lib-nodejs";

class StakekeyController {
    /**
     * @method POST => DONE
     * @description Get stake key from address
     * @param request  body: { address: required }
     * @param response json: { stakeKey }
     * @returns
     */
    async getStakekeyFromAddress(request: Request, response: Response) {
        try {
            const { address } = request.body;
            if (!address) {
                return response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address has been required"));
            }
            const addr = Address.from_bech32(address);
            const baseAddress = BaseAddress.from_address(addr);
            const stakeCred = baseAddress?.stake_cred();
            const rewardAddressBytes = new Uint8Array(29);
            rewardAddressBytes.set([0xe1], 0);
            if (stakeCred) {
                rewardAddressBytes.set(stakeCred.to_bytes().slice(4, 32), 1);
                const rewardAddress = RewardAddress.from_address(Address.from_bytes(rewardAddressBytes));
                return response.status(StatusCodes.OK).json({
                    stakeKey: rewardAddress?.to_address().to_bech32(),
                });
            }

            response.status(StatusCodes.BAD_REQUEST).json(new BadRequest("Address is incorrect"));
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new InternalServerError({ error }));
        }
    }
}

export default new StakekeyController();
