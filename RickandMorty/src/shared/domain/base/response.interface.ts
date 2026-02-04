export interface ResponseGeneric<T> {
    code: number;
    message: string;
    data: T[];
}
export interface ResponseDetailGeneric<T> {
    code: number;
    message: string;
    data: T;
}
