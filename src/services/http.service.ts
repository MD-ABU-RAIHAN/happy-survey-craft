/**
 * HTTP Client Service
 * Centralized API communication with error handling
 */

import { ApiResponse, ApiError } from "@/types";

class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Remove authorization header
   */
  removeAuthToken(): void {
    delete this.defaultHeaders["Authorization"];
  }

  /**
   * Generic request method
   */
  private async request<T>(
    method: string,
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const config: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
      };

      if (data && method !== "GET") {
        if (data instanceof FormData) {
          // Remove Content-Type for FormData (browser will set it with boundary)
          delete config.headers!["Content-Type"];
          config.body = data;
        } else {
          config.body = JSON.stringify(data);
        }
      }

      const response = await fetch(`${this.baseUrl}${url}`, config);

      if (!response.ok) {
        throw await this.handleErrorResponse(response);
      }

      const result = await response.json();

      return {
        data: result.data || result,
        message: result.message,
        status: response.status,
        success: true,
      };
    } catch (error) {
      if (error instanceof Error && "status" in error) {
        throw error; // Re-throw API errors
      }

      // Handle network or other errors
      throw new Error(
        "Network error occurred. Please check your connection and try again."
      );
    }
  }

  /**
   * Handle error responses
   */
  private async handleErrorResponse(response: Response): Promise<ApiError> {
    let errorMessage = "An error occurred";
    let errorCode = "UNKNOWN_ERROR";
    let details = {};

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      errorCode = errorData.code || errorCode;
      details = errorData.details || {};
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    const apiError: ApiError = {
      message: errorMessage,
      code: errorCode,
      status: response.status,
      details,
    };

    return apiError;
  }

  /**
   * GET request
   */
  async get<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, headers);
  }

  /**
   * POST request
   */
  async post<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, headers);
  }

  /**
   * PUT request
   */
  async put<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, headers);
  }

  /**
   * PATCH request
   */
  async patch<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, data, headers);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, headers);
  }

  /**
   * Upload file
   */
  async upload<T>(
    url: string,
    file: File,
    additionalData?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return this.request<T>("POST", url, formData);
  }
}

// Create and export a singleton instance
export const httpClient = new HttpClient();
