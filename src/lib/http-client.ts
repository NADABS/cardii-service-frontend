import {getItem} from "@/src/lib/storage";
import AdminType from "@/src/types/AdminType";

// Common headers configuration
const getBaseHeaders = () => ({
    Accept: "application/json",
    "ngrok-skip-browser-wrowser-warning": "zj",
    requestValidator: process.env.NEXT_PUBLIC_REQUEST_VALIDATOR || "",
});

// ==================== WITH AUTH (Bearer Token) ====================

/**
 * Sends an HTTP GET request to the specified URL with authentication.
 * @param {string | URL} url - The URL to send the HTTP GET request to.
 * @param _headers
 * @param token
 * @return {Promise<Response>} - A Promise that resolves to the Response object of the HTTP GET request.
 */
export async function httpGET(
    url: string | URL,
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
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
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
    return await httpClient(url, { body: data, method: "POST" }, _headers, token);
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
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
    return await httpClient(url, { body: data, method: "PUT" }, _headers, token);
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
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
    return await httpClient(url, { body: data, method: "PATCH" }, _headers, token);
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
    _headers: object = {},
    token: string | null = null
): Promise<Response> {
    return await httpClient(url, { body: data, method: "DELETE" }, _headers, token);
}

// ==================== WITHOUT AUTH ====================

/**
 * Sends an HTTP GET request to the specified URL without authentication.
 * @param {string | URL} url - The URL to send the HTTP GET request to.
 * @param _headers
 * @return {Promise<Response>} - A Promise that resolves to the Response object of the HTTP GET request.
 */
export async function httpGETWithoutAuth(
    url: string | URL,
    _headers: object = {}
): Promise<Response> {
    return await httpClientWithoutAuth(url, { method: "GET" }, _headers);
}

/**
 * Makes a POST request to the specified URL with the provided data without authentication.
 * @param {string | URL} url - The URL to send the POST request to.
 * @param {*} data - The data to send in the request body.
 * @param _headers
 * @return {Promise} - A Promise that resolves with the response from the POST request.
 */
export async function httpPOSTWithoutAuth(
    url: string | URL,
    data: any,
    _headers: object = {}
): Promise<Response> {
    return await httpClientWithoutAuth(url, { body: data, method: "POST" }, _headers);
}

/**
 * Sends an HTTP PUT request to the specified URL with the provided data without authentication.
 * @param {string | URL} url - The URL to send the PUT request to.
 * @param {any} data - The data to send in the request body.
 * @param _headers
 * @return {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function httpPUTWithoutAuth(
    url: string | URL,
    data: any,
    _headers: object = {}
): Promise<Response> {
    return await httpClientWithoutAuth(url, { body: data, method: "PUT" }, _headers);
}

/**
 * Sends an HTTP PATCH request to the specified URL with the provided data without authentication.
 * @param {string | URL} url - The URL to send the PATCH request to.
 * @param {any} data - The data to send in the request body.
 * @param _headers
 * @return {Promise<Response>} - A promise that resolves with the response from the server.
 */
export async function httpPATCHWithoutAuth(
    url: string | URL,
    data: any,
    _headers: object = {}
): Promise<Response> {
    return await httpClientWithoutAuth(url, { body: data, method: "PATCH" }, _headers);
}

/**
 * Make an HTTP DELETE request without authentication.
 * @param {string | URL} url - The URL to send the request to.
 * @param {any | null} [data] - The data to send with the request.
 * @param _headers
 * @return {Promise<Response>} A Promise that resolves to a Response object.
 */
export async function httpDELETEWithoutAuth(
    url: string | URL,
    data?: any | null,
    _headers: object = {}
): Promise<Response> {
    return await httpClientWithoutAuth(url, { body: data, method: "DELETE" }, _headers);
}

// ==================== BASE CLIENTS ====================

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
    options?: object | null,
    _headers: object = {},
    token: string | null = null
): Promise<Response> {

    if(token == null){
        const admin: AdminType | null = await getItem("admin");
        token = admin?.token as string;
    }

    const headers = {
        ...getBaseHeaders(),
        Authorization: `Bearer ${token}`,
        ..._headers,
    };

    const _options = { ...options, headers };
    return await fetch(url, _options);
}

/**
 * Sends an HTTP request to the specified URL with the given options (without authentication).
 * @param {string | URL} url - The URL to send the request to.
 * @param {object | null} options - The options for the request. Default is null.
 * @param _headers
 * @returns {Promise<Response>} - A Promise that resolves to a Response object representing the response to the request.
 */
export async function httpClientWithoutAuth(
    url: string | URL,
    options?: object | null,
    _headers: object = {}
): Promise<Response> {

    const headers = {
        ...getBaseHeaders(),
        ..._headers,
    };

    const _options = { ...options, headers };
    return await fetch(url, _options);
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

    const _options = { ...options, headers };
    return await fetch(url, _options);
}