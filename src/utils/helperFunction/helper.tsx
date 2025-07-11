import { AxiosRequestConfig } from "axios";
import { RequestType } from "../enum/enum";

export const requestTypeToString = (requestType: RequestType): string => {
    switch(requestType){
        case RequestType.GET:
            return 'get'

        case RequestType.POST:
            return 'post'

        case RequestType.DELETE:
            return 'delete'

        case RequestType.PATCH:
            return 'patch'

        case RequestType.PUT:
            return 'put'
    }
}

export const handleDataRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    switch (config.method) {
        case 'get':
            console.warn('GET request should not have a body. Ignoring data.');
            delete config.data
            return config

        case 'post':
            return config

        case 'put':
            return config

        case 'patch':
            return config

        case 'delete':
            console.warn('DELETE request should not have a body. Ignoring data.');
            delete config.data
            return config

        default:
            throw new Error(`Unsupported request type: ${config.method}`);
    }

}