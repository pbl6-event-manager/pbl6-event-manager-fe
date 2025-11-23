import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsByOwner } from "../../../store/actions/event-action";
import type { RootState } from "../../../store/store";
import { generateRandomCode } from "../../../utils/voucher-code";
import { showLoadingAlert, closeLoadingAlert, showErrorAlert } from "../../../helpers/alert-helpers";
import { getAllVoucher } from "../../../store/actions/voucher-action";

export type Voucher = {
    id: string;
    code: string;
    type: "Percentage" | "Fixed";
    amount: number;
    uses: number;
    maxUses?: number;
    expiresAt?: string;
    status: "Active" | "Expired" | "Used Up" | "Draft";
};

export const useVoucherViewModel = () => {
    const dispatch = useDispatch();
    const eventSelectionList = useSelector((root: RootState) => root.eventReducer.eventSelectionList);
    const { voucherListDto } = useSelector((root: RootState) => root.voucherReducer);
    const [q, setQ] = useState<string>("");
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [stepTypeSelected, setStepTypeSelected] = useState<"Percentage" | "Fixed" | null>(null);
    const [voucherCode, setVoucherCode] = useState<string>("");
    const [formName, setFormName] = useState<string>("");
    const [formDesc, setFormDesc] = useState<string>("");
    const [formType, setFormType] = useState<"Percentage" | "Fixed">("Percentage");
    const [formAmount, setFormAmount] = useState<number>(10);
    const [formMaxUses, setFormMaxUses] = useState<number | undefined>(undefined);
    const [formExpires, setFormExpires] = useState<string | undefined>(undefined);
    const [eventsFetched, setEventsFetched] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<string | undefined>(undefined);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [isCreate, setIsCreate] = useState<boolean>(false);

    const openCreateModal = () => {
        setStepTypeSelected(null);
        setVoucherCode("");
        setFormName("");
        setFormDesc("");
        setFormType("Percentage");
        setFormAmount(10);
        setFormMaxUses(undefined);
        setFormExpires(undefined);
        setSelectedEvent(undefined);
        setShowCreate(true);
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
        if(!isCreate) {
            getVouchersInfo();
        }
      }, [dispatch]);

    const closeCreateModal = () => {
        setShowCreate(false);
        setIsCreate(false);
    }

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return voucherListDto;
        return voucherListDto.filter((v) => v.code.toLowerCase().includes(term));
    }, [q, voucherListDto]);

    const loadEventsIfNeeded = async () => {
        try {
            showLoadingAlert();
            await dispatch<any>(getEventsByOwner());
        } catch (err: any) {
            showErrorAlert(err?.message || "An error occurs when getting your events");
        } finally {
            setIsCreate(false);
            closeLoadingAlert();
        }
    };

    const handleRandomCode = () => {
        const code = generateRandomCode();
        setVoucherCode(code);
    };

    const handleCreateFromModal = () => {
        if (!voucherCode.trim()) {
            alert("Code is required");
            return;
        }
        const newV: Voucher = {
            id: `v${Date.now()}`,
            code: voucherCode.trim().toUpperCase(),
            type: formType,
            amount: Number(formAmount || 0),
            uses: 0,
            maxUses: formMaxUses,
            expiresAt: formExpires,
            status: "Active",
        };
        closeCreateModal();
    };

    return {
        q,
        setQ,
        filtered,

        showCreate,
        openCreateModal,
        closeCreateModal,
        stepTypeSelected,
        setStepTypeSelected,

        voucherCode,
        setVoucherCode,
        formName,
        setFormName,
        formDesc,
        setFormDesc,
        formType,
        setFormType,
        formAmount,
        setFormAmount,
        formMaxUses,
        setFormMaxUses,
        formExpires,
        setFormExpires,
        handleRandomCode,
        handleCreateFromModal,

        loadEventsIfNeeded,
        eventSelectionList,
        selectedEvent,
        setSelectedEvent,
        loadingEvents,
        voucherListDto,
    };
};

export default useVoucherViewModel;
