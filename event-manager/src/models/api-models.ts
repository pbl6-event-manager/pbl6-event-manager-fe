export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    error?: string[];
}

export interface ApiError {
    message: string;
    code: string
    details?: any;
}

export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}