import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsByOwner } from "../../../store/actions/event-action";
import type { RootState } from "../../../store/store";
import { generateRandomCode } from "../../../utils/Organizer/voucher-utils";
import { showLoadingAlert, closeLoadingAlert, showErrorAlert, showWarningAlert, showSuccessAlert, showConfirmAlert } from "../../../helpers/alert-helpers";
import { createNewVoucher, deleteVoucher, duplicateVoucher, getAllVoucher, getVoucherById, updateVoucher, getVouchersByEventId } from "../../../store/actions/voucher-action";
import { convertToISODateTime } from "../../../utils/Organizer/date-format";
import type { CreateVoucherDto } from "../../../dtos/voucher-dto";
import type { VoucherModel } from "../../../models/bean/voucher-models";
import { set } from "react-hook-form";

export const useVoucherViewModel = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const eventSelectionList = useSelector((root: RootState) => root.eventReducer.eventSelectionList);
    const { isLoading, error, voucherListDto, eventVoucherListDto } = useSelector((root: RootState) => root.voucherReducer);
    const [q, setQ] = useState<string>("");
    const [discountType, setDiscountType] = useState<"all" | "PERCENTAGE" | "FIXED_AMOUNT">("all");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [stepTypeSelected, setStepTypeSelected] = useState<"PERCENTAGE" | "FIXED_AMOUNT" | null>(null);
    const [voucherId, setVoucherId] = useState<number>(0);
    const [voucherCode, setVoucherCode] = useState<string>("");
    const [formName, setFormName] = useState<string>("");
    const [formDesc, setFormDesc] = useState<string>("");
    const [formDiscountType, setFormDiscountType] = useState<"PERCENTAGE" | "FIXED_AMOUNT">("PERCENTAGE");
    const [formDiscountValue, setFormDiscountValue] = useState<number | undefined>(undefined);
    const [formMinOrderAmount, setFormMinOrderAmount] = useState<number | undefined>(undefined);
    const [formMaxDiscountAmount, setFormMaxDiscountAmount] = useState<number | undefined>(undefined);
    const [formTotalUsageLimit, setFormTotalUsageLimit] = useState<number | undefined>(undefined);
    const [formUsagePerUser, setFormUsagePerUser] = useState<number | undefined>(undefined);
    const [formValidFrom, setFormValidFrom] = useState<string | undefined>(undefined);
    const [formValidTo, setFromValidTo] = useState<string | undefined>(undefined);
    const [formEventId, setFormEventId] = useState<string | undefined>(undefined);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<string | undefined>(undefined);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [selectedTimezone, setSelectedTimezone] = useState<string | undefined>();
    const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const openCreateModal = () => {
        setVoucherCode("");
        setFormName("");
        setFormDesc("");
        setFormDiscountType("PERCENTAGE");
        setFormDiscountValue(20);
        setFormMinOrderAmount(undefined);
        setFormMaxDiscountAmount(undefined);
        setFormTotalUsageLimit(undefined);
        setFormUsagePerUser(undefined);
        setFormValidFrom(undefined);
        setFromValidTo(undefined);
        setFormEventId(undefined);
        setSelectedEvent(undefined);
        setStepTypeSelected(null);
        setShowForm(true);
        setIsCreate(true);
        loadEventsIfNeeded();
    };

    useEffect(() => {
        const getVouchersInfo = async () => {
            try {
                showLoadingAlert();
                await dispatch<any>(getAllVoucher());
                closeLoadingAlert();
            } catch (error: any) {
                showErrorAlert(error?.message || "Failed to fetch vouchers");
            }
        }
        if (!isCreate) {
            getVouchersInfo();
        }
    }, [dispatch]);

    useEffect(() => {
        const getVouchersByEvent = async () => {
            if (eventId) {
                try {
                    showLoadingAlert();
                    await dispatch<any>(getVouchersByEventId(Number.parseInt(eventId)));
                    closeLoadingAlert();
                } catch (error: any) {
                    showErrorAlert(error?.message || "Failed to fetch vouchers");
                }
            }
        }
        getVouchersByEvent();
    }, [dispatch, eventId]);

    const closeCreateModal = () => {
        setShowForm(false);
        setIsCreate(false);
        setIsUpdate(false);
    }

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();

        //return voucherListDto.filter((v) => v.code.toLowerCase().includes(term));
        return voucherListDto.filter((voucher) => {
            const matchesSearch = !term ||
                voucher.code.toLowerCase().includes(term) ||
                voucher.amount?.toString().includes(term);

            const matchesType = discountType === "all" || voucher.type === discountType;

            return matchesSearch && matchesType;
        });
    }, [q, discountType, voucherListDto]);

    const eventFiltered = useMemo(() => {
        const term = q.trim().toLowerCase();

        //return voucherListDto.filter((v) => v.code.toLowerCase().includes(term));
        return eventVoucherListDto.filter((voucher) => {
            const matchesSearch = !term ||
                voucher.code.toLowerCase().includes(term) ||
                voucher.amount?.toString().includes(term);

            const matchesType = discountType === "all" || voucher.type === discountType;

            return matchesSearch && matchesType;
        });
    }, [q, discountType, eventVoucherListDto]);

    useEffect(() => {
        setCurrentPage(1);
    }, [q, filtered?.length]);

    const totalItems = (filtered || []).length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paged = useMemo(() => {
        const list = filtered || [];
        const start = (currentPage - 1) * pageSize;
        return list.slice(start, start + pageSize);
    }, [filtered, currentPage, pageSize]);

    const loadEventsIfNeeded = async () => {
        try {
            showLoadingAlert();
            await dispatch<any>(getEventsByOwner());
            setIsCreate(false);
            closeLoadingAlert();
        } catch (err: any) {
            await showErrorAlert(err?.message || "An error occurs when getting your events");
        }
    };

    const handleRandomCode = () => {
        const code = generateRandomCode();
        setVoucherCode(code);
    };

    const handleCreateFromModal = async () => {
        if (!voucherCode.trim()) {
            showWarningAlert("Code is required");
            return;
        }

        if(!formMinOrderAmount || !formUsagePerUser || (formDiscountType === "PERCENTAGE" && !formMaxDiscountAmount)) {
            showWarningAlert("Please fill all required fields");
            return;
        }

        let validFromISO: string | undefined;
        let validToISO: string | undefined;

        try {
            if (formValidFrom) {
                const [datePart, timePart] = formValidFrom.split("T");
                validFromISO = convertToISODateTime(datePart, timePart, selectedTimezone);
            }
            if (formValidTo) {
                const [datePart, timePart] = formValidTo.split("T");
                validToISO = convertToISODateTime(datePart, timePart, selectedTimezone);
            }
        } catch (err: any) {
            showWarningAlert(err.message || "Invalid date/time format");
            return;
        }

        const newVoucher : CreateVoucherDto = {
            code: voucherCode,
            name: formName,
            description: formDesc,
            discountType: formDiscountType,
            discountValue: formDiscountValue,
            minOrderAmount: formMinOrderAmount,
            maxDiscountAmount: formMaxDiscountAmount,
            totalUsageLimit: formTotalUsageLimit,
            usagePerUser: formUsagePerUser,
            validFrom: validFromISO,
            validTo: validToISO
        }

        if (formEventId !== "all") {
            newVoucher.eventId = formEventId
        }

        try {
            showLoadingAlert();
            await dispatch<any>(createNewVoucher(newVoucher));
            await showSuccessAlert("Create new voucher successfully");
            closeLoadingAlert();
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to create new voucher");
        }
        closeCreateModal();
    };

    const handleDuplicateVoucher = (voucherId: number) => {
        showConfirmAlert("Duplicate all information of this voucher?").then((confirmed) => {
            if (confirmed) {
                setDuplicateModalOpen(true);
                setVoucherId(voucherId);
            }
        })
    }

    const _duplicateVoucher = async () => {
        try {
            showLoadingAlert();
            await dispatch<any>(duplicateVoucher(voucherId, voucherCode));
            await showSuccessAlert("Duplicate this voucher successfully");
            setDuplicateModalOpen(false);
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to duplicate this voucher");
        }
        closeLoadingAlert();
    }

    const toDateTimeLocal = (iso?: string | null) => {
        if (!iso) return "";
        const d = new Date(iso);
        if (isNaN(d.getTime())) return "";
        const pad = (n: number) => String(n).padStart(2, "0");
        const yyyy = d.getFullYear();
        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const hh = pad(d.getHours());
        const min = pad(d.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    };

    const handleEditVoucher = async (voucherType: any, voucherId: number, timeZone: string) => {
        setIsUpdate(true);
        setShowForm(true);
        setStepTypeSelected(voucherType);

        try {
            loadEventsIfNeeded();
            const voucherModel: VoucherModel = await dispatch<any>(getVoucherById(voucherId));
            setVoucherId(voucherId);
            setVoucherCode(voucherModel.code);
            setFormName(voucherModel.name);
            setFormDesc(voucherModel.description);
            setFormDiscountType(voucherModel.discountType === "PERCENTAGE" ? "PERCENTAGE" : "FIXED_AMOUNT");
            setFormDiscountValue(Number.parseInt(voucherModel.discountValue.toString()));
            setFormMinOrderAmount(Number.parseInt(voucherModel.minOrderAmount.toString()));
            setFormMaxDiscountAmount(voucherModel.maxDiscountAmount ? Number.parseInt(voucherModel.maxDiscountAmount.toString()) : undefined);
            setFormTotalUsageLimit(voucherModel.totalUsageLimit);
            setFormUsagePerUser(voucherModel.usagePerUser);
            setFromValidTo(toDateTimeLocal(voucherModel.validTo));
            setFormValidFrom(toDateTimeLocal(voucherModel.validFrom));
            if(voucherModel.eventId) {
                setFormEventId(voucherModel.eventId.toString());
            } else {
                setFormEventId("all");
            }
            setSelectedTimezone(timeZone);
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to open edit form of this voucher");
        }
    }

    const editVoucher = async () => {
        if (!voucherCode.trim()) {
            showWarningAlert("Code is required");
            return;
        }

        let validFromISO: string | undefined;
        let validToISO: string | undefined;

        try {
            if (formValidFrom) {
                const [datePart, timePart] = formValidFrom.split("T");
                validFromISO = convertToISODateTime(datePart, timePart, selectedTimezone);
            }
            if (formValidTo) {
                const [datePart, timePart] = formValidTo.split("T");
                validToISO = convertToISODateTime(datePart, timePart, selectedTimezone);
            }
        } catch (err: any) {
            showWarningAlert(err.message || "Invalid date/time format");
            return;
        }

        const _updateVoucher: CreateVoucherDto = {
            code: voucherCode,
            name: formName,
            description: formDesc,
            discountType: formDiscountType,
            discountValue: formDiscountValue,
            minOrderAmount: formMinOrderAmount,
            maxDiscountAmount: formMaxDiscountAmount,
            totalUsageLimit: formTotalUsageLimit,
            usagePerUser: formUsagePerUser,
            validFrom: validFromISO,
            validTo: validToISO,
        }

        if (formEventId !== "all") {
            _updateVoucher.eventId = formEventId
        }

        try {
            showLoadingAlert();
            await dispatch<any>(updateVoucher(voucherId, _updateVoucher));
            await showSuccessAlert("Update voucher successfully");
        }
        catch (error: any) {
            showErrorAlert(error?.message || "Failed to update this voucher");
        }
        closeLoadingAlert();
        setShowForm(false);
        setIsUpdate(false);
    }

    const handleDeleteVoucher = async (voucherId: number) => {
        showConfirmAlert("Do you want to delete this voucher?").then(async (confirmed) => {
            if (confirmed) {
                try {
                    showLoadingAlert();
                    await dispatch<any>(deleteVoucher(voucherId));
                    await showSuccessAlert("Delete voucher successfully");
                    await dispatch<any>(getVouchersByEventId(Number.parseInt(eventId as string)));
                } catch (error: any) {
                    showErrorAlert(error?.message || "Failed to update this voucher");
                }
                closeLoadingAlert();
            }
        })
    }
    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code)
    }

    const handleNavigateToManageVouchers = () => {
        showConfirmAlert("Do you want to change to Manage Vouchers ?").then((confirmed) => {
            if (confirmed) {
                navigate("/organizer/vouchers");
            }
        })
    }

    return {
        q,
        setQ,
        discountType,
        setDiscountType,
        filtered,
        eventFiltered,

        showForm,
        openCreateModal,
        closeCreateModal,
        stepTypeSelected,
        setStepTypeSelected,
        isUpdate,
        setIsUpdate,

        voucherId,
        setVoucherId,
        voucherCode,
        setVoucherCode,
        formName,
        setFormName,
        formDesc,
        setFormDesc,
        formDiscountType,
        setFormDiscountType,
        formDiscountValue,
        setFormDiscountValue,
        formMinOrderAmount,
        setFormMinOrderAmount,
        formMaxDiscountAmount,
        setFormMaxDiscountAmount,
        formTotalUsageLimit,
        setFormTotalUsageLimit,
        formUsagePerUser,
        setFormUsagePerUser,
        formValidFrom,
        setFormValidFrom,
        formValidTo,
        setFromValidTo,
        formEventId,
        setFormEventId,
        handleRandomCode,
        handleCreateFromModal,

        loadEventsIfNeeded,
        eventSelectionList,
        selectedEvent,
        setSelectedEvent,
        voucherListDto,
        selectedTimezone,
        setSelectedTimezone,
        handleEditVoucher,
        handleDeleteVoucher,
        handleDuplicateVoucher,
        duplicateModalOpen,
        setDuplicateModalOpen,
        _duplicateVoucher,
        editVoucher,

        paged,
        totalPages,
        setPageSize,
        pageSize,
        setCurrentPage,
        currentPage,
        totalItems,

        isLoading,
        error,
        handleCopyCode,
        handleNavigateToManageVouchers
    };
};

export default useVoucherViewModel;
