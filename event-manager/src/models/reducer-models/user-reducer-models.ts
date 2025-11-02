import type { ListUserDto } from "../../dtos/user-dto";
import type { ListOrganizerDto } from "../../dtos/organizer-dto";
import type { OrganizerModel } from "../bean/organizer-models";

//#region Reducer Models
export interface UserState {
  users: ListUserDto[];
  user: any;
  selectedUserEmail: string | null; 
  loading: boolean;
  error: string | null;
  activeOrganizers: ListOrganizerDto[];
  inActiveOrganizers: ListOrganizerDto[];
  organizers: OrganizerModel[];
}

export const DEFAULT_USERS_STATE: UserState = {
  users: [],
  user: null,
  selectedUserEmail: null,
  loading: false,
  error: null,
  activeOrganizers: [],
  inActiveOrganizers: [],
  organizers: []
};
//#endregion