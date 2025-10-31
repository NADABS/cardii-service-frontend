import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

// Common headers configuration
const getBaseHeaders = () => ({
    Accept: "application/json",
    "ngrok-skip-browser-browser-warning": "zj",
    [process.env.NEXT_PUBLIC_REQUEST_VALIDATOR_KEY] : process.env.NEXT_PUBLIC_REQUEST_VALIDATOR_SECRET || "",
});

/**
 * Sends an HTTP GET request to the specified URL with authentication.
 * @param {string | URL} url - The URL to send the HTTP GET request to.
 * @param _headers
 * @param token
 * @return {Promise<Response>} - A Promise that resolves to the Response object of the HTTP GET request.
 */
export async function httpGET(
    url: string | URL,
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<AxiosResponse> {
    return await httpClient(url, { method: "GET" }, _headers, token);
}

/**
 * Makes a POST request to the specified URL with the provided data with authentication.
 * @param {string | URL} url - The URL to send the POST request to.
 * @param {*} data - The data to send in the request body.
 * @param _headers
 * @param token
 * @return {Promise} - A Promise that resolves with the response from the POST request.
 */
export async function httpPOST(
    url: string | URL,
    data: any,
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<AxiosResponse> {
    return await httpClient(url, { data, method: "POST" }, _headers, token);
}

/**
 * Sends an HTTP PUT request to the specified URL with the provided data with authentication.
 * @param {string | URL} url - The URL to send the PUT request to.
 * @param {any} data - The data to send in the request body.
 * @param _headers
 * @param token
 * @return {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function httpPUT(
    url: string | URL,
    data: any,
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<AxiosResponse> {
    return await httpClient(url, {data, method: "PUT"}, _headers, token);
}

/**
 * Sends an HTTP PATCH request to the specified URL with the provided data with authentication.
 * @param {string | URL} url - The URL to send the PATCH request to.
 * @param {any} data - The data to send in the request body.
 * @param _headers
 * @param token
 * @return {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function httpPATCH(
    url: string | URL,
    data: any,
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<AxiosResponse> {
    return await httpClient(url, {data, method: "PATCH"}, _headers, token);
}

/**
 * Make an HTTP DELETE request with authentication.
 * @param {string | URL} url - The URL to send the request to.
 * @param {any | null} [data] - The data to send with the request.
 * @param _headers
 * @param token
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 */
export async function httpDELETE(
    url: string | URL,
    data?: any | null,
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<AxiosResponse> {
    return await httpClient(url, {data, method: "DELETE"}, _headers, token);
}


/**
 * Sends an HTTP request to the specified URL with the given options (with authentication).
 * @param {string | URL} url - The URL to send the request to.
 * @param {object | null} options - The options for the request. Default is null.
 * @param _headers
 * @param token
 * @returns {Promise<Response>} - A Promise that resolves to a Response object representing the response to the request.
 */

export default async function httpClient(
    url: string | URL,
    options: AxiosRequestConfig = {},
    _headers: Record<string, string> = {},
    token: string | null = null
): Promise<Promise<AxiosResponse<any, any, {}>> | any> {
    const headers = {
        ...getBaseHeaders(),
        ..._headers,
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
    };

    const config: AxiosRequestConfig = {
        url: url.toString(),
        headers,
        ...options,
    };

    return axios(config);
}

/**
 * External service client with requestValidator but without Bearer token from admin
 */
export async function httpExternalServiceClient(
    url: string | URL,
    options?: object | null,
    _headers: object = {},
): Promise<Response> {

    const headers = {
        ...getBaseHeaders(),
        ..._headers,
    };

    const _options = {...options, headers};
    return await fetch(url, _options);
}