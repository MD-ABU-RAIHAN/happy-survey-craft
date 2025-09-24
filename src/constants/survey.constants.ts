/**
 * Survey Configuration Constants
 */

import { QuestionType, QuestionTemplate, QuestionTypeConfig } from "@/types";
import {
  CheckSquare,
  Type,
  Star,
  BarChart3,
  Mail,
  Phone,
  Monitor,
  ShoppingCart,
  MousePointer,
  Globe,
  Layout,
  Minimize,
  Palette,
} from "lucide-react";

// Question type configurations
export const QUESTION_TYPES: Record<QuestionType, QuestionTypeConfig> = {
  "multiple-choice": {
    id: "multiple-choice",
    label: "Multiple Choice",
    icon: "CheckSquare",
    description: "Allow users to select from predefined options",
  },
  text: {
    id: "text",
    label: "Text Response",
    icon: "Type",
    description: "Free-form text input for detailed responses",
  },
  rating: {
    id: "rating",
    label: "Rating Scale",
    icon: "Star",
    description: "1-5 star rating system",
  },
  nps: {
    id: "nps",
    label: "NPS Score",
    icon: "BarChart3",
    description: "0-10 Net Promoter Score rating",
  },
  email: {
    id: "email",
    label: "Email Address",
    icon: "Mail",
    description: "Email input with validation",
  },
  phone: {
    id: "phone",
    label: "Phone Number",
    icon: "Phone",
    description: "Phone number input with formatting",
  },
};

// Question templates for quick setup
export const QUESTION_TEMPLATES: Record<string, QuestionTemplate> = {
  satisfaction: {
    type: "rating",
    title: "How satisfied are you with your overall experience?",
    description: "Please rate your experience from 1 to 5 stars",
  },
  recommendation: {
    type: "nps",
    title: "How likely are you to recommend us to a friend or colleague?",
    description: "Please rate on a scale of 0-10",
  },
  feedback: {
    type: "text",
    title: "What could we improve?",
    description: "Please share any suggestions or feedback",
    placeholder: "Your feedback helps us improve...",
  },
  "product-rating": {
    type: "multiple-choice",
    title: "How would you rate this product?",
    options: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
  },
  "purchase-reason": {
    type: "multiple-choice",
    title: "What motivated your purchase today?",
    options: [
      "Price",
      "Quality",
      "Brand reputation",
      "Recommendation",
      "Features",
    ],
    customAnswer: {
      enabled: true,
      displayMode: "on-select",
      placeholder: "Please specify your reason...",
      description: "Tell us what specifically motivated your purchase",
    },
  },
  "support-quality": {
    type: "multiple-choice",
    title: "How would you rate our customer support?",
    options: ["Excellent", "Good", "Average", "Poor", "Did not use support"],
  },
  "website-ease": {
    type: "rating",
    title: "How easy was it to find what you were looking for on our website?",
    description: "Rate from 1 (very difficult) to 5 (very easy)",
  },
  "contact-preference": {
    type: "multiple-choice",
    title: "How would you prefer us to contact you?",
    options: ["Email", "Phone", "SMS", "Mail", "No contact please"],
  },
};

// Distribution channel configurations
export const DISTRIBUTION_CHANNELS = [
  {
    id: "branded-survey",
    name: "Branded Survey",
    description: "Customized survey with your brand colors and logo",
    icon: "Monitor",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    id: "post-purchase",
    name: "Post-Purchase Survey",
    description: "Collect feedback immediately after purchase completion",
    icon: "ShoppingCart",
    color: "text-secondary-brand",
    bgColor: "bg-secondary-brand/10",
    borderColor: "border-secondary-brand/20",
  },
  {
    id: "exit-intent",
    name: "Exit-Intent Survey",
    description: "Capture feedback when visitors are about to leave",
    icon: "MousePointer",
    color: "text-survey-purple",
    bgColor: "bg-survey-purple/10",
    borderColor: "border-survey-purple/20",
  },
  {
    id: "email-campaign",
    name: "Email Campaign",
    description: "Send survey links via email to your customer base",
    icon: "Mail",
    color: "text-survey-success",
    bgColor: "bg-survey-success/10",
    borderColor: "border-survey-success/20",
  },
  {
    id: "onsite-popup",
    name: "On-Site Popup",
    description: "Display survey as popup on your website",
    icon: "Globe",
    color: "text-survey-warning",
    bgColor: "bg-survey-warning/10",
    borderColor: "border-survey-warning/20",
  },
];

// Brand presets for quick styling
export const BRAND_PRESETS = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
    icon: "Layout",
    settings: {
      button: {
        textColor: "#ffffff",
        backgroundColor: "#6366f1",
        backgroundHoverColor: "#4f46e5",
        borderRadius: 8,
      },
      section: {
        primaryTextColor: "#111827",
        secondaryTextColor: "#6b7280",
        headingColor: "#1f2937",
        linkColor: "#6366f1",
      },
      background: {
        type: "gradient" as const,
        gradientStart: "#ffffff",
        gradientEnd: "#f8fafc",
        gradientDirection: "to-br" as const,
      },
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design",
    icon: "Minimize",
    settings: {
      button: {
        textColor: "#374151",
        backgroundColor: "#ffffff",
        backgroundHoverColor: "#f9fafb",
        borderRadius: 4,
      },
      section: {
        primaryTextColor: "#111827",
        secondaryTextColor: "#4b5563",
        headingColor: "#000000",
        linkColor: "#374151",
      },
      background: {
        type: "solid" as const,
        solidColor: "#ffffff",
      },
    },
  },
  {
    id: "vibrant",
    name: "Vibrant",
    description: "Bold and energetic colors",
    icon: "Palette",
    settings: {
      button: {
        textColor: "#ffffff",
        backgroundColor: "#ec4899",
        backgroundHoverColor: "#db2777",
        borderRadius: 12,
      },
      section: {
        primaryTextColor: "#1f2937",
        secondaryTextColor: "#6b7280",
        headingColor: "#ec4899",
        linkColor: "#ec4899",
      },
      background: {
        type: "gradient" as const,
        gradientStart: "#fdf2f8",
        gradientEnd: "#fce7f3",
        gradientDirection: "to-br" as const,
      },
    },
  },
];

// Default survey settings
export const DEFAULT_SURVEY_SETTINGS = {
  branding: {
    customUrl: "",
    useCustomDomain: false,
    customDomain: "",
    headerLogo: {
      enabled: false,
      url: "",
      file: null,
      size: "medium" as const,
      position: "left" as const,
      minimized: false,
    },
    sideLogo: {
      enabled: false,
      url: "",
      file: null,
      size: "small" as const,
      position: "right" as const,
      minimized: false,
    },
    button: {
      textColor: "#ffffff",
      backgroundColor: "#3b82f6",
      backgroundHoverColor: "#2563eb",
      borderRadius: 6,
      fontSize: 14,
      fontWeight: "medium" as const,
      minimized: false,
      shadow: true,
    },
    section: {
      primaryTextColor: "#1f2937",
      secondaryTextColor: "#6b7280",
      headingColor: "#111827",
      linkColor: "#3b82f6",
    },
    background: {
      type: "solid" as const,
      solidColor: "#ffffff",
      gradientStart: "#f8fafc",
      gradientEnd: "#e2e8f0",
      gradientDirection: "to-br" as const,
      imageUrl: "",
      imageFile: null,
      imagePosition: "center" as const,
      imageSize: "cover" as const,
      overlay: false,
      overlayColor: "#000000",
      overlayOpacity: 0.3,
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
      bodyFont: "Inter",
      fontSize: {
        small: 12,
        medium: 14,
        large: 16,
        xlarge: 24,
      },
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    progressBar: {
      enabled: true,
      color: "#3b82f6",
      backgroundColor: "#e5e7eb",
      style: "linear" as const,
      position: "top" as const,
      showPercentage: true,
    },
    animations: {
      enabled: true,
      transitionSpeed: "normal" as const,
      slideDirection: "fade" as const,
    },
    trustSignals: {
      showSSL: true,
      showPrivacyBadge: true,
      showDataProtection: false,
      customBadgeText: "Your data is secure",
    },
    thankYouPage: {
      enabled: true,
      title: "Thank you!",
      message:
        "We appreciate your feedback and will use it to improve our services.",
      backgroundColor: "#ffffff",
      textColor: "#1f2937",
      showSocialShare: false,
      redirectUrl: "",
      autoRedirect: false,
      redirectDelay: 3,
    },
    customCss: {
      enabled: false,
      css: "/* Custom CSS */\n",
    },
  },
  distribution: {
    enabled: ["branded-survey"],
    collapsed: [
      "post-purchase",
      "exit-intent",
      "email-campaign",
      "onsite-popup",
    ],
    settings: {
      "branded-survey": {
        triggerDelay: "3",
        displayDuration: "30",
        targetAudience: "all-customers",
      },
      "post-purchase": {
        triggerDelay: "3",
        displayDuration: "30",
        targetAudience: "all-customers",
      },
      "exit-intent": {
        triggerDelay: "5",
        displayDuration: "15",
        targetAudience: "all-customers",
      },
      "email-campaign": {
        triggerDelay: "0",
        displayDuration: "0",
        targetAudience: "all-customers",
      },
      "onsite-popup": {
        triggerDelay: "10",
        displayDuration: "20",
        targetAudience: "all-customers",
      },
    },
  },
  incentives: {
    enabled: false,
    type: "percentage" as const,
    value: "10",
    prefix: "SURVEY",
    expiry: "30",
  },
  advanced: {
    analytics: true,
    dataExport: true,
    apiAccess: false,
    webhooks: [],
  },
};

// Validation rules
export const VALIDATION_RULES = {
  survey: {
    title: {
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    description: {
      required: false,
      maxLength: 500,
    },
  },
  question: {
    title: {
      required: true,
      minLength: 3,
      maxLength: 300,
    },
    description: {
      required: false,
      maxLength: 500,
    },
    options: {
      minOptions: 2,
      maxOptions: 10,
      optionMaxLength: 100,
    },
  },
  file: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
};

// API endpoints
export const API_ENDPOINTS = {
  surveys: "/api/surveys",
  questions: "/api/questions",
  upload: "/api/upload",
  analytics: "/api/analytics",
  export: "/api/export",
};

// Local storage keys
export const STORAGE_KEYS = {
  survey: "survey_draft",
  settings: "survey_settings",
  theme: "app_theme",
};
