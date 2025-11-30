import type { CreateVoucherDto } from "../dtos/voucher-dto";
import apiClient from "./api-config";

export const getAllVoucherApi = () => apiClient.get(`/vouchers`);

export const createVoucherApi = (createVoucherDto: CreateVoucherDto) => apiClient.post(`/vouchers`, createVoucherDto);

export const getVoucherByIdApi = (voucherId: number) => apiClient.get(`/vouchers/${voucherId}`);

export const updateVoucherApi = (voucherId: number, updateVoucherDto: CreateVoucherDto) => apiClient.put(`/vouchers/${voucherId}`, updateVoucherDto);

export const deleteVoucherApi = (voucherId: number) => apiClient.delete(`/vouchers/${voucherId}`);