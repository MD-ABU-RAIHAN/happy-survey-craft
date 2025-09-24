/**
 * File Upload Service
 * Handles file uploads and image processing
 */

import { httpClient } from "./http.service";
import { ApiResponse, FileUploadResponse } from "@/types";
import { validateImageFile, fileToDataUrl } from "@/utils";
import { API_ENDPOINTS } from "@/constants";

class FileService {
  /**
   * Upload file to server
   */
  async uploadFile(
    file: File,
    folder?: string
  ): Promise<ApiResponse<FileUploadResponse>> {
    // Validate file before upload
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    return httpClient.upload<FileUploadResponse>(
      API_ENDPOINTS.upload,
      file,
      folder ? { folder } : undefined
    );
  }

  /**
   * Convert file to base64 for preview
   */
  async fileToPreview(file: File): Promise<string> {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    return fileToDataUrl(file);
  }

  /**
   * Resize image (client-side)
   */
  async resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw resized image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert back to file
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error("Failed to resize image"));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Delete uploaded file
   */
  async deleteFile(url: string): Promise<ApiResponse<void>> {
    return httpClient.delete<void>(
      `${API_ENDPOINTS.upload}?url=${encodeURIComponent(url)}`
    );
  }

  /**
   * Get file metadata
   */
  getFileMetadata(file: File): {
    name: string;
    size: number;
    type: string;
    lastModified: Date;
    extension: string;
  } {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified),
      extension: file.name.split(".").pop()?.toLowerCase() || "",
    };
  }

  /**
   * Format file size for display
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  /**
   * Check if file type is supported
   */
  isImageFile(file: File): boolean {
    return file.type.startsWith("image/");
  }

  /**
   * Generate thumbnail from image file
   */
  async generateThumbnail(file: File, size: number = 150): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;

        // Calculate crop dimensions for square thumbnail
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        // Draw cropped and resized image
        ctx?.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        resolve(canvas.toDataURL());
      };

      img.onerror = () => reject(new Error("Failed to generate thumbnail"));
      img.src = URL.createObjectURL(file);
    });
  }
}

// Create and export a singleton instance
export const fileService = new FileService();
