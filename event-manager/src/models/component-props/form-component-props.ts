import type { UserFormData } from "../form-models/user-form-models";
import type { ListCategoryDto } from "../../dtos/category-dto";
import type { EventFormData, EventFormErrors } from "../form-models/event-form-models";
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

  //#region  Event Form
  export interface EventBasicInfoFormProps {
    eventData: EventFormData
    onUpdate: (data: EventFormData) => void
    errors: EventFormErrors
  }
  //#endregion
//#endregion