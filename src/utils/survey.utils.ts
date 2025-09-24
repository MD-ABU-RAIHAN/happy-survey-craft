/**
 * Survey-specific utility functions
 */

import {
  SurveyQuestion,
  ValidationError,
  ValidationResult,
  BackgroundConfig,
  SectionColorConfig,
  ButtonConfig,
  TypographyConfig,
} from "@/types";
import { VALIDATION_RULES } from "@/constants";

/**
 * Generate a unique ID for survey questions
 */
export const generateQuestionId = (): string => {
  return `question-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
};

/**
 * Generate a unique survey URL slug
 */
export const generateSurveySlug = (): string => {
  return `survey-${Math.random().toString(36).substring(2, 8)}`;
};

/**
 * Validate survey data
 */
export const validateSurvey = (
  title: string,
  questions: SurveyQuestion[]
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate title
  if (!title || title.trim().length === 0) {
    errors.push({
      field: "title",
      message: "Survey title is required",
    });
  } else if (title.length < VALIDATION_RULES.survey.title.minLength) {
    errors.push({
      field: "title",
      message: `Survey title must be at least ${VALIDATION_RULES.survey.title.minLength} characters`,
    });
  } else if (title.length > VALIDATION_RULES.survey.title.maxLength) {
    errors.push({
      field: "title",
      message: `Survey title must not exceed ${VALIDATION_RULES.survey.title.maxLength} characters`,
    });
  }

  // Validate questions
  if (questions.length === 0) {
    errors.push({
      field: "questions",
      message: "At least one question is required",
    });
  }

  questions.forEach((question, index) => {
    const questionErrors = validateQuestion(question, index);
    errors.push(...questionErrors);
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate individual question
 */
export const validateQuestion = (
  question: SurveyQuestion,
  index: number
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const fieldPrefix = `questions[${index}]`;

  // Validate title
  if (!question.title || question.title.trim().length === 0) {
    errors.push({
      field: `${fieldPrefix}.title`,
      message: `Question ${index + 1}: Title is required`,
    });
  } else if (
    question.title.length < VALIDATION_RULES.question.title.minLength
  ) {
    errors.push({
      field: `${fieldPrefix}.title`,
      message: `Question ${index + 1}: Title must be at least ${
        VALIDATION_RULES.question.title.minLength
      } characters`,
    });
  } else if (
    question.title.length > VALIDATION_RULES.question.title.maxLength
  ) {
    errors.push({
      field: `${fieldPrefix}.title`,
      message: `Question ${index + 1}: Title must not exceed ${
        VALIDATION_RULES.question.title.maxLength
      } characters`,
    });
  }

  // Validate description
  if (
    question.description &&
    question.description.length >
      VALIDATION_RULES.question.description.maxLength
  ) {
    errors.push({
      field: `${fieldPrefix}.description`,
      message: `Question ${index + 1}: Description must not exceed ${
        VALIDATION_RULES.question.description.maxLength
      } characters`,
    });
  }

  // Validate multiple choice options
  if (question.type === "multiple-choice" && question.options) {
    if (
      question.options.length < VALIDATION_RULES.question.options.minOptions
    ) {
      errors.push({
        field: `${fieldPrefix}.options`,
        message: `Question ${index + 1}: At least ${
          VALIDATION_RULES.question.options.minOptions
        } options are required`,
      });
    }

    if (
      question.options.length > VALIDATION_RULES.question.options.maxOptions
    ) {
      errors.push({
        field: `${fieldPrefix}.options`,
        message: `Question ${index + 1}: Maximum ${
          VALIDATION_RULES.question.options.maxOptions
        } options allowed`,
      });
    }

    question.options.forEach((option, optionIndex) => {
      if (!option || option.trim().length === 0) {
        errors.push({
          field: `${fieldPrefix}.options[${optionIndex}]`,
          message: `Question ${index + 1}, Option ${
            optionIndex + 1
          }: Option text is required`,
        });
      } else if (
        option.length > VALIDATION_RULES.question.options.optionMaxLength
      ) {
        errors.push({
          field: `${fieldPrefix}.options[${optionIndex}]`,
          message: `Question ${index + 1}, Option ${
            optionIndex + 1
          }: Option text must not exceed ${
            VALIDATION_RULES.question.options.optionMaxLength
          } characters`,
        });
      }
    });

    // Check for duplicate options
    const uniqueOptions = new Set(
      question.options.map((opt) => opt.toLowerCase().trim())
    );
    if (uniqueOptions.size !== question.options.length) {
      errors.push({
        field: `${fieldPrefix}.options`,
        message: `Question ${index + 1}: Duplicate options are not allowed`,
      });
    }
  }

  return errors;
};

/**
 * Calculate survey completion percentage
 */
export const calculateCompletionPercentage = (
  currentStep: number,
  totalSteps: number
): number => {
  if (totalSteps === 0) return 0;
  return Math.min(Math.round((currentStep / totalSteps) * 100), 100);
};

/**
 * Estimate survey completion time
 */
export const estimateCompletionTime = (questions: SurveyQuestion[]): number => {
  const baseTimePerQuestion = 15; // seconds
  const timeMultipliers = {
    "multiple-choice": 1,
    text: 2,
    rating: 0.8,
    nps: 0.7,
    email: 1.2,
    phone: 1.2,
  };

  const totalTime = questions.reduce((acc, question) => {
    const multiplier = timeMultipliers[question.type] || 1;
    return acc + baseTimePerQuestion * multiplier;
  }, 0);

  return Math.ceil(totalTime);
};

/**
 * Format completion time for display
 */
export const formatCompletionTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes > 1 ? "s" : ""}`;
};

/**
 * Deep clone survey question (for duplicating)
 */
export const cloneQuestion = (question: SurveyQuestion): SurveyQuestion => {
  return {
    ...question,
    id: generateQuestionId(),
    title: `${question.title} (Copy)`,
    options: question.options ? [...question.options] : undefined,
    customAnswer: question.customAnswer
      ? { ...question.customAnswer }
      : undefined,
  };
};

/**
 * Reorder array items (for drag and drop)
 */
export const reorderArray = <T>(
  array: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Check if file is valid image
 */
export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > VALIDATION_RULES.file.maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${
        VALIDATION_RULES.file.maxSize / (1024 * 1024)
      }MB`,
    };
  }

  // Check file type
  if (!VALIDATION_RULES.file.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.",
    };
  }

  return { isValid: true };
};

/**
 * Convert file to base64 data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Generate CSS for branding settings
 */
export const generateBrandingCSS = (settings: {
  background: BackgroundConfig;
  section: SectionColorConfig;
  button: ButtonConfig;
  typography: TypographyConfig;
}): string => {
  const { background, section, button, typography } = settings;

  let css = "";

  // Background styles
  if (background.type === "solid") {
    css += `background-color: ${background.solidColor};`;
  } else if (background.type === "gradient") {
    const directions: Record<string, string> = {
      "to-r": "to right",
      "to-l": "to left",
      "to-t": "to top",
      "to-b": "to bottom",
      "to-br": "to bottom right",
      "to-bl": "to bottom left",
      "to-tr": "to top right",
      "to-tl": "to top left",
    };
    const direction = directions[background.gradientDirection] || "to right";
    css += `background: linear-gradient(${direction}, ${background.gradientStart}, ${background.gradientEnd});`;
  }

  return css;
};
