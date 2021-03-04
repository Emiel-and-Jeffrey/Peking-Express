import { Request } from "express";
import { ITokenData } from "@vrees/authentication";
import { IMemberModel } from "@mmp-xr/cms-package";

export interface ExtendedRequest extends Request
{
    tokenData: ITokenData;
    member?: IMemberModel;
    organizationID?: string;
}