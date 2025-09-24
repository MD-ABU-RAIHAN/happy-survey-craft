/**
 * API and Service Type Definitions
 */

// HTTP types
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}

// Survey API types
export interface CreateSurveyRequest {
  title: string;
  description?: string;
  questions: Omit<import("./survey.types").SurveyQuestion, "id">[];
}

export interface UpdateSurveyRequest extends Partial<CreateSurveyRequest> {
  id: string;
}

export interface SurveyResponse {
  id: string;
  title: string;
  questions: import("./survey.types").SurveyQuestion[];
  settings: import("./survey.types").SurveySettings;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// File upload types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface FileUploadRequest {
  file: File;
  folder?: string;
  maxSize?: number;
}

// Analytics types
export interface SurveyAnalytics {
  surveyId: string;
  totalResponses: number;
  completionRate: number;
  averageTime: number;
  responsesByDate: Record<string, number>;
  questionAnalytics: QuestionAnalytics[];
}

export interface QuestionAnalytics {
  questionId: string;
  responses: number;
  skipped: number;
  averageRating?: number;
  optionCounts?: Record<string, number>;
}

// Export types
export interface ExportRequest {
  surveyId: string;
  format: "csv" | "json" | "xlsx";
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ExportResponse {
  downloadUrl: string;
  expiresAt: string;
}
