import { useState } from "react"
import { generateRandomCode } from "../../../utils/voucher-code"

export const useVoucherViewModel = () => {
    const [voucherCode, setVoucherCode] = useState<string>("")
    const [showVoucherForm, setShowVoucherForm] = useState(false)
    const [selectedVoucherType, setSelectedVoucherType] = useState<"percentage" | "fixed" | null>(null)

    const [voucherFormData, setVoucherFormData] = useState<any>({
        code: "",
        type: "",
        value: 0,
        discountType: "",
    })

    const handleVoucherTypeSelect = (type: "percentage" | "fixed") => {
        setSelectedVoucherType(type)
        setVoucherFormData({
            ...voucherFormData,
            discountType: type,
        })
        setShowVoucherForm(true)
    }

    const handleRandomCode = () => {
        const code = generateRandomCode()
        setVoucherCode(code)
    }

    const handleSaveVoucher = () => {
        // Logic to save the voucher
    }

    const handleCancel = () => {
        setShowVoucherForm(false)
        setSelectedVoucherType(null)
        setVoucherCode("")
    }

    return {
        voucherCode,
        showVoucherForm,
        selectedVoucherType,
        voucherFormData,
        setShowVoucherForm,
        setVoucherFormData,
        setVoucherCode,
        handleVoucherTypeSelect,
        handleRandomCode,
        handleSaveVoucher,
        handleCancel,
    }
}
