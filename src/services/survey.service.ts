/**
 * Survey Service
 * Handles all survey-related API operations
 */

import { httpClient } from "./http.service";
import {
  Survey,
  SurveyQuestion,
  CreateSurveyRequest,
  UpdateSurveyRequest,
  ApiResponse,
  SurveyAnalytics,
} from "@/types";
import { API_ENDPOINTS } from "@/constants";

class SurveyService {
  /**
   * Get all surveys
   */
  async getSurveys(): Promise<ApiResponse<Survey[]>> {
    return httpClient.get<Survey[]>(API_ENDPOINTS.surveys);
  }

  /**
   * Get survey by ID
   */
  async getSurvey(id: string): Promise<ApiResponse<Survey>> {
    return httpClient.get<Survey>(`${API_ENDPOINTS.surveys}/${id}`);
  }

  /**
   * Create new survey
   */
  async createSurvey(data: CreateSurveyRequest): Promise<ApiResponse<Survey>> {
    return httpClient.post<Survey>(API_ENDPOINTS.surveys, data);
  }

  /**
   * Update existing survey
   */
  async updateSurvey(data: UpdateSurveyRequest): Promise<ApiResponse<Survey>> {
    return httpClient.put<Survey>(`${API_ENDPOINTS.surveys}/${data.id}`, data);
  }

  /**
   * Delete survey
   */
  async deleteSurvey(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<void>(`${API_ENDPOINTS.surveys}/${id}`);
  }

  /**
   * Duplicate survey
   */
  async duplicateSurvey(id: string): Promise<ApiResponse<Survey>> {
    return httpClient.post<Survey>(`${API_ENDPOINTS.surveys}/${id}/duplicate`);
  }

  /**
   * Update survey status
   */
  async updateSurveyStatus(
    id: string,
    status: "draft" | "active" | "paused" | "archived"
  ): Promise<ApiResponse<Survey>> {
    return httpClient.patch<Survey>(`${API_ENDPOINTS.surveys}/${id}/status`, {
      status,
    });
  }

  /**
   * Save survey as draft to local storage
   */
  saveDraft(survey: Partial<Survey>): void {
    try {
      localStorage.setItem(
        "survey_draft",
        JSON.stringify({
          ...survey,
          lastSaved: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.warn("Failed to save survey draft to local storage:", error);
    }
  }

  /**
   * Load survey draft from local storage
   */
  loadDraft(): Partial<Survey> | null {
    try {
      const draft = localStorage.getItem("survey_draft");
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.warn("Failed to load survey draft from local storage:", error);
      return null;
    }
  }

  /**
   * Clear survey draft from local storage
   */
  clearDraft(): void {
    try {
      localStorage.removeItem("survey_draft");
    } catch (error) {
      console.warn("Failed to clear survey draft from local storage:", error);
    }
  }

  /**
   * Export survey data
   */
  async exportSurvey(
    id: string,
    format: "json" | "csv" = "json"
  ): Promise<Blob> {
    const response = await fetch(
      `${API_ENDPOINTS.export}/${id}?format=${format}`
    );

    if (!response.ok) {
      throw new Error("Failed to export survey");
    }

    return response.blob();
  }

  /**
   * Import survey data
   */
  async importSurvey(file: File): Promise<ApiResponse<Survey>> {
    return httpClient.upload<Survey>(`${API_ENDPOINTS.surveys}/import`, file);
  }

  /**
   * Get survey analytics
   */
  async getSurveyAnalytics(id: string): Promise<ApiResponse<SurveyAnalytics>> {
    return httpClient.get(`${API_ENDPOINTS.analytics}/${id}`);
  }
}

// Create and export a singleton instance
export const surveyService = new SurveyService();
