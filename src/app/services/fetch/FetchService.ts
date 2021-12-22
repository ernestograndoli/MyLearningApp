import ServiceResponse from "./ServiceResponse";
import ErrorResponse from "./ErrorResponse";

export interface IExtraParams {
    key: string;
    value: any;
}

export class PaginationParams {
    pageIndex?: number;
    createdDateFrom?: Date;
    createdDateTo?: Date;
    extraParams?: string;

    // private buildExtraParams = () => {
    //     let extra = "";

    //     this.extraParams?.forEach(x => {
    //         extra+= `${x.key}=${x.value}&`
    //     });

    //     extra.substring(extra.lastIndexOf('&'));
    //     return extra;
    // }

    public getQueryString = () => {
        let query = `?pageIndex=${
            this.pageIndex ? this.pageIndex : "0"
        }&pageSize=10`;

        if (this.createdDateFrom) {
            query += `createdDateFrom=${this.createdDateFrom}`;
        }

        if (this.createdDateTo) {
            query += `createdDateTo=${this.createdDateTo}`;
        }

        if (this.extraParams) {
            query += this.extraParams;
        }

        return query;
    };
}

interface FetchParams {
    url: string;
    body?: object;
    paginationParams?: PaginationParams;
}

class FetchService {
    public static async get<T>(
        params: FetchParams
    ): Promise<ServiceResponse<T>> {
        const { paginationParams } = params;
        let url = params.url;

        if (paginationParams) url += paginationParams.getQueryString();
        
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: FetchService.getHeaders(),
            });

            return FetchService.processResponse<T>(response);
        } catch (error: any) {
            const sr = new ServiceResponse<T>();
            sr.addError(error.message);
            return sr;
        }
    }

    public static async post<T>(
        params: FetchParams
    ): Promise<ServiceResponse<T>> {
        const { url, body } = params;

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: FetchService.getHeaders(),
            });

            return FetchService.processResponse<T>(response);
        } catch (error: any) {
            const sr = new ServiceResponse<T>();
            sr.addError(error.message);
            return sr;
        }
    }

    public static async put<T>(
        params: FetchParams
    ): Promise<ServiceResponse<T>> {
        const { url, body } = params;

        try {
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: FetchService.getHeaders(),
            });

            return FetchService.processResponse<T>(response);
        } catch (error: any) {
            const sr = new ServiceResponse<T>();
            sr.addError(error.message);
            return sr;
        }
    }

    private static async processResponse<T>(
        response: Response
    ): Promise<ServiceResponse<T>> {
        const sr = new ServiceResponse<T>();

        if (response.status === 400) {
            sr.errorResponse = (await response.json()) as ErrorResponse;
            return sr;
        }

        if (response.status === 401) {
            //store.dispatch(Actions.RESET_STATE());
            sr.error = "Unauthorized";
            return sr;
        }

        if (response.status === 404) {
            sr.error = "Resource Not Found";
            return sr;
        }

        if (response.ok) {
            if (response.status === 200) {
                sr.data = (await response.json()) as T;
                return sr;
            }
        }

        const error = new Error(await response.text());
        sr.error = error.message;
        return sr;
    }

    private static getHeaders() {
        return new Headers({
            Authorization: "54e44880bc734d0b8ac5d414904d8e03",
        });
    }
}

export default FetchService;
