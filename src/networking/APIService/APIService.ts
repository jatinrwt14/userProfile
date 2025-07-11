import axios, { AxiosRequestConfig } from "axios";
import { handleDataRequest } from "../../utils/helperFunction/helper";
import { CommonAPIResponse } from "../ResponseDTO/CommonAPIResponse";

interface APIServiceParams {
    method: string;                             
    url: string;                                
    headers?: Record<string, string>;           
    data?: {};                                  
    params?: Record<string, any>;               
}


const APIService = async <T> (userconfig: APIServiceParams): Promise<CommonAPIResponse> => {
    const config: AxiosRequestConfig = {
        method: userconfig.method,
        url: userconfig.url,
        headers: userconfig.headers,
        params: userconfig.params,
        data: userconfig.data
    }

    const serviceConfig = handleDataRequest(config)

    try {
        const response = await axios(serviceConfig)

        return {
            success: true,
            data: response.data as T
        }
    } catch (error: unknown) {
        let errorMessage = 'unknown Error' 

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        }
    }
}

export default APIService