export interface ListUserDto {
  id: number;
  email: string;
  fullName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  isActive: boolean;
  roles: string;
}