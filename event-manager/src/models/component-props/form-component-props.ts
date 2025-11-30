import type { UserFormData } from "../form-models/user-form-models";
import type { ListCategoryDto } from "../../dtos/category-dto";
import type { EventFormData, EventFormErrors } from "../form-models/event-form-models";
import type { PermissionListItem } from "../form-models/permission-form-models";
import type { EventSelectionDto } from "../../dtos/event-dto";
//#region Form Props
//#region User Form
export interface RegisterFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}
//#endregion

//#region Category Form
export interface CategoryFormProps {
  category?: any;
  handleChange: (field: keyof ListCategoryDto, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isUpdate?: boolean;
}
//#endregion

export interface PermissionsFormProps {
  permission?: any;
  handleChange: (field: keyof PermissionListItem, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isUpdate?: boolean;
}

//#region  Event Form
export interface EventBasicInfoFormProps {
  eventData: EventFormData
  onUpdate: (data: EventFormData) => void
  errors: EventFormErrors
}
//#endregion

//#region Voucher Form
type VoucherDiscountType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface VoucherFormProps {
  voucherCode: string;
  setVoucherCode: (s: string) => void;
  formName: string;
  setFormName: (s: string) => void;
  formDesc: string;
  setFormDesc: (s: string) => void;
  formDiscountType: VoucherDiscountType;
  setFormDiscountType: React.Dispatch<
    React.SetStateAction<VoucherDiscountType>
  >;
  formDiscountValue: number | undefined;
  setFormDiscountValue: (n: number | undefined) => void;
  formMinOrderAmount: number | undefined;
  setFormMinOrderAmount: (n: number | undefined) => void;
  formMaxDiscountAmount: number | undefined;
  setFormMaxDiscountAmount: (n: number | undefined) => void;
  formTotalUsageLimit: number | undefined;
  setFormTotalUsageLimit: (n: number | undefined) => void;
  formUsagePerUser: number | undefined;
  setFormUsagePerUser: (n: number | undefined) => void;
  formValidFrom: string | undefined;
  setFormValidFrom: (s: string | undefined) => void;
  formValidTo: string | undefined;
  setFormValidTo: (s: string | undefined) => void;
  formEventId: string | undefined;
  setFormEventId: (s: string | undefined) => void;
  selectedTimezone: string | undefined;
  setSelectedTimezone: (s?: string) => void;
  onSave: () => void;
  onBack: () => void;
  loadingEvents?: boolean;
  handleRandomCode: () => void;
  eventSelectionList: EventSelectionDto[];
}

export interface VoucherDuplicateFormProps {
  duplicateVoucher: () => void;
  onCancel?: () => void;
  handleRandomCode: () => void;
  voucherCode: string;
  setVoucherCode: (s: string) => void;
  loading?: boolean;
}
//#endregion