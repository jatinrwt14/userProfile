export interface CommonAPIResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}