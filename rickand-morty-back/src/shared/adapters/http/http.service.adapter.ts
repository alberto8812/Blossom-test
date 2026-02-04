import { Injectable } from '@nestjs/common';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


@Injectable()
export class HttpServiceAdapter {
    private readonly axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create({});
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    async post<T>(
        url: string,
        data: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        try {

            const response = await this.axiosInstance.post<T>(url, data, config ?? {});
            return response.data;


        } catch (error) {
            return error.response.data;
        }


    }
}
