/**
 * Survey State Management Hook
 * Centralized state management for survey building
 */

import { useState, useCallback, useEffect } from "react";
import {
  Survey,
  SurveyQuestion,
  SurveySettings,
  ValidationError,
} from "@/types";
import {
  generateQuestionId,
  validateSurvey,
  cloneQuestion,
  reorderArray,
  generateSurveySlug,
} from "@/utils";
import { DEFAULT_SURVEY_SETTINGS } from "@/constants";
import { surveyService } from "@/services";

interface UseSurveyState {
  // State
  survey: Partial<Survey>;
  questions: SurveyQuestion[];
  settings: SurveySettings;
  isLoading: boolean;
  isDirty: boolean;
  validationErrors: ValidationError[];

  // Actions
  updateSurvey: (updates: Partial<Survey>) => void;
  addQuestion: (type: SurveyQuestion["type"]) => void;
  updateQuestion: (id: string, updates: Partial<SurveyQuestion>) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  reorderQuestions: (startIndex: number, endIndex: number) => void;
  updateSettings: (path: string, value: unknown) => void;
  saveDraft: () => void;
  loadDraft: () => void;
  clearDraft: () => void;
  validateSurvey: () => boolean;
  resetSurvey: () => void;
}

export const useSurvey = (initialSurvey?: Partial<Survey>): UseSurveyState => {
  const [survey, setSurvey] = useState<Partial<Survey>>(
    initialSurvey || {
      title: "Customer Feedback Survey",
      description: "",
      status: "draft",
    }
  );

  const [questions, setQuestions] = useState<SurveyQuestion[]>(
    initialSurvey?.questions || []
  );
  const [settings, setSettings] = useState<SurveySettings>(
    initialSurvey?.settings || DEFAULT_SURVEY_SETTINGS
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  // Mark state as dirty when changes occur
  useEffect(() => {
    setIsDirty(true);
  }, [survey, questions, settings]);

  const updateSurvey = useCallback((updates: Partial<Survey>) => {
    setSurvey((prev) => ({ ...prev, ...updates }));
  }, []);

  const addQuestion = useCallback((type: SurveyQuestion["type"]) => {
    const newQuestion: SurveyQuestion = {
      id: generateQuestionId(),
      type,
      title: "New Question",
      required: false,
      options:
        type === "multiple-choice" ? ["Option 1", "Option 2"] : undefined,
      isCollapsed: false,
      placeholder: type === "text" ? "Enter your answer..." : undefined,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }, []);

  const updateQuestion = useCallback(
    (id: string, updates: Partial<SurveyQuestion>) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
      );
    },
    []
  );

  const deleteQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const duplicateQuestion = useCallback(
    (id: string) => {
      const question = questions.find((q) => q.id === id);
      if (question) {
        const duplicated = cloneQuestion(question);
        const index = questions.findIndex((q) => q.id === id);
        setQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions.splice(index + 1, 0, duplicated);
          return newQuestions;
        });
      }
    },
    [questions]
  );

  const reorderQuestions = useCallback(
    (startIndex: number, endIndex: number) => {
      setQuestions((prev) => reorderArray(prev, startIndex, endIndex));
    },
    []
  );

  const updateSettings = useCallback((path: string, value: unknown) => {
    setSettings((prev) => {
      const keys = path.split(".");
      const newSettings = JSON.parse(JSON.stringify(prev)); // Deep clone
      let current = newSettings;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  }, []);

  const saveDraft = useCallback(() => {
    const draftData = {
      ...survey,
      questions,
      settings,
      lastSaved: new Date(),
    };
    surveyService.saveDraft(draftData);
    setIsDirty(false);
  }, [survey, questions, settings]);

  const loadDraft = useCallback(() => {
    const draft = surveyService.loadDraft();
    if (draft) {
      if (draft.title) setSurvey((prev) => ({ ...prev, ...draft }));
      if (draft.questions) setQuestions(draft.questions);
      if (draft.settings) setSettings(draft.settings);
      setIsDirty(false);
    }
  }, []);

  const clearDraft = useCallback(() => {
    surveyService.clearDraft();
    setIsDirty(false);
  }, []);

  const validateSurveyData = useCallback((): boolean => {
    const validation = validateSurvey(survey.title || "", questions);
    setValidationErrors(validation.errors);
    return validation.isValid;
  }, [survey.title, questions]);

  const resetSurvey = useCallback(() => {
    setSurvey({
      title: "Customer Feedback Survey",
      description: "",
      status: "draft",
    });
    setQuestions([]);
    setSettings(DEFAULT_SURVEY_SETTINGS);
    setValidationErrors([]);
    setIsDirty(false);
  }, []);

  // Auto-save draft every 30 seconds if dirty
  useEffect(() => {
    if (!isDirty) return;

    const autoSaveTimer = setTimeout(() => {
      saveDraft();
    }, 30000);

    return () => clearTimeout(autoSaveTimer);
  }, [isDirty, saveDraft]);

  return {
    survey,
    questions,
    settings,
    isLoading,
    isDirty,
    validationErrors,
    updateSurvey,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    reorderQuestions,
    updateSettings,
    saveDraft,
    loadDraft,
    clearDraft,
    validateSurvey: validateSurveyData,
    resetSurvey,
  };
};
