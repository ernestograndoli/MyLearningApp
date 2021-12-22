export interface ApiError {
    errorCode: string;
    errorMessage: string;
}

export default interface ErrorResponse {
    errors: ApiError[];
    data: string;
    status: boolean;
    returnValue: number;
}
