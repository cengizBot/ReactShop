import axios, {AxiosError, AxiosRequestConfig} from "axios";

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

// ⚡ Configurable axios instance
const apiClient = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Simulates an artificial API delay
 * @param minMs minimum delay in milliseconds (default: 1000ms)
 * @param maxMs maximum delay in milliseconds (default: 2000ms)
 * @returns Promise<void> resolved after a random delay
 */
export const fakeApiDelay = async (minMs = 500, maxMs = 800): Promise<void> => {
    const delay = minMs + Math.random() * (maxMs - minMs);
    return new Promise(res => setTimeout(res, delay));
};

/**
 * Builds a URL with dynamic parameters
 * Example:
 * buildUrl("/users/:id", { id: 42 }) => "/users/42"
 */
export const buildUrl = (
    url: string,
    params: Record<string, string | number> = {}
): string => {
    let builtUrl = url;

    Object.entries(params).forEach(([key, value]) => {
        builtUrl = builtUrl.replace(
            new RegExp(`:${key}`, "g"),
            encodeURIComponent(String(value))
        );
    });

    return builtUrl;
};

/**
 * Generic request handler
 * @param url - endpoint URL
 * @param config - Axios request configuration
 * @returns ApiResponse<T> containing either data or an error
 */
async function request<T>(
    url: string,
    config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        await fakeApiDelay(1000); // Simulate network latency
        const response = await apiClient<T>(url, config);
        return {data: response.data, error: null};
    } catch (err) {
        const error = err as AxiosError;
        return {data: null, error: error.message};
    }
}

/**
 * API client with typed methods
 */
export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        request<T>(url, {...config, method: "GET"}),

    post: <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        request<T>(url, {...config, method: "POST", data: body}),

    put: <T>(url: string, body: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        request<T>(url, {...config, method: "PUT", data: body}),

    delete: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
        request<T>(url, {...config, method: "DELETE"}),
};
