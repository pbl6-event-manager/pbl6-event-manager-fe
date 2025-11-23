import { getAllVoucherApi } from "../api/voucher-api";
import { convertVoucherModelToVoucherListDto } from "../converters/voucher-converter";
import { mapResponseToVoucherModel } from "../mappers/voucher-mapper";

export const getAllVoucherService = async () => {
    try {
        const response = await getAllVoucherApi();
        const voucherModelList = response.data.data.map(mapResponseToVoucherModel);
        const voucherDtoList = voucherModelList.map(convertVoucherModelToVoucherListDto);
        return voucherDtoList;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}