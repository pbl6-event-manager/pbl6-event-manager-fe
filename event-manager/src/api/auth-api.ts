import type { ApiResponse } from "../models/api-models";

export interface CheckEmailResponse extends ApiResponse<{ exists: boolean }> { }

const MOCK_USERS = [
    { id: "1", email: "john@example.com", password: "123456", firstName: "John", lastName: "Doe" },
    { id: "2", email: "jane@example.com", password: "password", firstName: "Jane", lastName: "Smith" },
    { id: "3", email: "test@eventbrite.com", password: "test123", firstName: "Test", lastName: "User" },
    { id: "4", email: "user@gmail.com", password: "user123", firstName: "Demo", lastName: "User" },
]

//Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    // Check if email exists
    checkEmail: async (email: string): Promise<CheckEmailResponse> => {
        await delay(500); // Simulate network delay
        try {
            //Mock API call - replace with real API call
            const exists = MOCK_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());
            return {
                success: true,
                data: { exists },
                message: "Email check successful",
            }
        } catch (error) {
            return {
                success: false,
                data: { exists: false },
                message: "Failed to check email",
            }
        }
    },

    // Login user
    login:
    {

    },
    
    // register user
    register:
    {

    },

    // logout user
    logout:
    {

    },

}