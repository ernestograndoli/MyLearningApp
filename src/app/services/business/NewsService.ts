import { ApiNewsModel } from "../../models";
import { FetchService, ServiceResponse } from "../fetch";

export default class NewsService {

    public static GetTopHeadlines(page = 1): Promise<ServiceResponse<ApiNewsModel>>  {
        return FetchService.get<ApiNewsModel>({
            url: "https://newsapi.org/v2/top-headlines?country=us&page="+page
        })
    } 

}