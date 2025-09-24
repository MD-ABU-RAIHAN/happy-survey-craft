/**
 * Core Survey Type Definitions
 * Centralized type definitions for all survey-related entities
 */

export type QuestionType =
  | "multiple-choice"
  | "text"
  | "rating"
  | "nps"
  | "email"
  | "phone";

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
  imageUrl?: string;
  imageName?: string;
  customAnswer?: CustomAnswerConfig;
}

export interface CustomAnswerConfig {
  enabled: boolean;
  displayMode: "always" | "on-select";
  placeholder: string;
  description?: string;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "active" | "paused" | "archived";
  settings: SurveySettings;
}

export interface SurveySettings {
  branding: BrandingSettings;
  distribution: DistributionSettings;
  incentives: IncentiveSettings;
  advanced: AdvancedSettings;
}

export interface BrandingSettings {
  customUrl: string;
  useCustomDomain: boolean;
  customDomain: string;
  headerLogo: LogoConfig;
  sideLogo: LogoConfig;
  button: ButtonConfig;
  section: SectionColorConfig;
  background: BackgroundConfig;
  typography: TypographyConfig;
  progressBar: ProgressBarConfig;
  animations: AnimationConfig;
  trustSignals: TrustSignalConfig;
  thankYouPage: ThankYouPageConfig;
  customCss: CustomCSSConfig;
}

export interface LogoConfig {
  enabled: boolean;
  url: string;
  file: File | null;
  size: "small" | "medium" | "large";
  position: "left" | "center" | "right";
  minimized: boolean;
}

export interface ButtonConfig {
  textColor: string;
  backgroundColor: string;
  backgroundHoverColor: string;
  borderRadius: number;
  fontSize: number;
  fontWeight: "normal" | "medium" | "semibold" | "bold";
  minimized: boolean;
  shadow: boolean;
}

export interface SectionColorConfig {
  primaryTextColor: string;
  secondaryTextColor: string;
  headingColor: string;
  linkColor: string;
}

export interface BackgroundConfig {
  type: "solid" | "gradient" | "image";
  solidColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection:
    | "to-r"
    | "to-l"
    | "to-t"
    | "to-b"
    | "to-br"
    | "to-bl"
    | "to-tr"
    | "to-tl";
  imageUrl: string;
  imageFile: File | null;
  imagePosition: "center" | "top" | "bottom" | "left" | "right";
  imageSize: "cover" | "contain" | "auto";
  overlay: boolean;
  overlayColor: string;
  overlayOpacity: number;
}

export interface TypographyConfig {
  fontFamily: string;
  headingFont: string;
  bodyFont: string;
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  lineHeight: number;
  letterSpacing: number;
}

export interface ProgressBarConfig {
  enabled: boolean;
  color: string;
  backgroundColor: string;
  style: "linear" | "circular" | "steps";
  position: "top" | "bottom" | "floating";
  showPercentage: boolean;
}

export interface AnimationConfig {
  enabled: boolean;
  transitionSpeed: "slow" | "normal" | "fast";
  slideDirection:
    | "fade"
    | "slide-right"
    | "slide-left"
    | "slide-up"
    | "slide-down";
}

export interface TrustSignalConfig {
  showSSL: boolean;
  showPrivacyBadge: boolean;
  showDataProtection: boolean;
  customBadgeText: string;
}

export interface ThankYouPageConfig {
  enabled: boolean;
  title: string;
  message: string;
  backgroundColor: string;
  textColor: string;
  showSocialShare: boolean;
  redirectUrl: string;
  autoRedirect: boolean;
  redirectDelay: number;
}

export interface CustomCSSConfig {
  enabled: boolean;
  css: string;
}

export interface DistributionSettings {
  enabled: string[];
  collapsed: string[];
  settings: Record<string, DistributionChannelSettings>;
}

export interface DistributionChannelSettings {
  triggerDelay: string;
  displayDuration: string;
  targetAudience: string;
}

export interface IncentiveSettings {
  enabled: boolean;
  type: "percentage" | "fixed";
  value: string;
  prefix: string;
  expiry: string;
}

export interface AdvancedSettings {
  analytics: boolean;
  dataExport: boolean;
  apiAccess: boolean;
  webhooks: string[];
}

// Preview related types
export type PreviewDevice = "desktop" | "mobile" | "full";
export type DistributionType =
  | "branded-survey"
  | "post-purchase"
  | "onsite"
  | "exit-intent"
  | "email-campaign";

// Question Builder types
export interface QuestionTemplate {
  type: QuestionType;
  title: string;
  description?: string;
  placeholder?: string;
  options?: string[];
  customAnswer?: CustomAnswerConfig;
}

export interface QuestionTypeConfig {
  id: string;
  label: string;
  icon: string;
  description: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
