import {AdminUser} from "@/types/adminUser";

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

export interface SliceState {
    status: Status;
}

export interface PageInfo{
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface PageResponse<T>{
    meta: PageInfo;
    data: Array<T>;
}

export interface JsonResponseDTO<T>{
    success: string;
    data: T;
}

// admin ~
export interface ApiMeta {
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface ApiResponse {
    data: AdminUser[];
    meta: ApiMeta;
}

type ChipStatus = {
    label: string;
    color: 'success' | 'error' | 'warning' | 'primary' | 'default';
};
export type StatusMapping = {
    [key: string]: ChipStatus;
};

// ~admin