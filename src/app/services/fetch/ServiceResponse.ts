import ErrorResponse from "./ErrorResponse";
import { GenericErrors } from "../../shared/Constants";

export default class ServiceResponse<T> {
    public data!: T;
    public error!: string;
    public errorResponse!: ErrorResponse;

    public status = () => {
        return (
            (this.error === "" ||
                this.error === null ||
                this.error === undefined) &&
            (this.errorResponse === undefined || this.errorResponse === null)
        );
    };

    public addError = (error: string) => {
        this.error = error;
    };

    public getParsedError = () => {
        return (
            this.errorResponse?.errors[0]?.errorMessage ||
            this.error ||
            GenericErrors.WRONG
        );
    };
}
