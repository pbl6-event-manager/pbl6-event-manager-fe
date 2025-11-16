//#region User Dtos
export interface ListUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive: boolean;
  roles: string;
};

export interface CreateUserDto {
  phone?: string | null;
  role: string
};

export interface UserDashBoardDto {
  id: number;
  createdAt: string;
}
//#endregion