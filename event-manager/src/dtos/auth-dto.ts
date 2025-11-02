//#region Auth Dtos
export interface SignUpDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
export interface LoginRequestDto {
    email: string;
    password: string;
};
//#endregion