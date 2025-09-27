import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Monitor,
  Smartphone,
  Maximize,
  Star,
  X,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings2,
} from "lucide-react";

interface SurveyQuestion {
  id: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "text"
    | "rating"
    | "satisfaction"
    | "point-scale"
    | "date";
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
  imageUrl?: string;
  imageName?: string;
  customAnswer?: {
    enabled: boolean;
    displayMode: "always" | "on-select";
    placeholder: string;
    description?: string;
  };
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  textInputType?: "single-line" | "multi-line";
  // Satisfaction properties
  satisfactionEmojis?: string[];
  // Point scale properties
  pointScale?: {
    min: number;
    max: number;
  };
}

interface PostPurchaseSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTag: string;
    };
    customerType: "all" | "new" | "return";
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  postPurchasePage: {
    shopifyCheckout: boolean;
    installationSteps: {
      orderStatusPage: string;
      thankYouPage: string;
    };
    displayLocation: "thank-you" | "order-status" | "both";
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  display: {
    delay: number;
    duration: number;
    position:
      | "center"
      | "bottom-right"
      | "bottom-left"
      | "top-right"
      | "top-left";
    animation:
      | "fade"
      | "slide-up"
      | "slide-down"
      | "slide-right"
      | "slide-left";
  };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface BrandedSurveySettings {
  customUrl: string;
  useCustomDomain: boolean;
  customDomain: string;
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: "normal" | "medium" | "semibold" | "bold";
    minimized: boolean;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
  background: {
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
  };
  typography: {
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
  };
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    style: "linear" | "circular" | "steps";
    position: "top" | "bottom" | "floating";
    showPercentage: boolean;
  };
  animations: {
    enabled: boolean;
    transitionSpeed: "slow" | "normal" | "fast";
    slideDirection:
      | "fade"
      | "slide-right"
      | "slide-left"
      | "slide-up"
      | "slide-down";
  };
  trustSignals: {
    showSSL: boolean;
    showPrivacyBadge: boolean;
    showDataProtection: boolean;
    customBadgeText: string;
  };
  thankYouPage: {
    enabled: boolean;
    title: string;
    message: string;
    backgroundColor: string;
    textColor: string;
    showSocialShare: boolean;
    redirectUrl: string;
    autoRedirect: boolean;
    redirectDelay: number;
  };
  customCss: {
    enabled: boolean;
    css: string;
  };
}

interface ExitIntentSettings {
  showPopup: {
    emptyCart: boolean;
    hasProducts: boolean;
  };
  recurrence: "only-once" | "every-incomplete";
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    minimized: boolean;
  };
  section: {
    primaryTextColor: string;
    secondaryTextColor: string;
    accentColor: string;
    backgroundColor: string;
  };
}

interface EmailCampaignSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTag: string;
    };
    customerType: "all" | "new" | "return";
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  emailConfig: {
    delayAfter: number;
    sendFrom: string;
    blockDuplicate: number;
  };
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };
  content: {
    subject: string;
    body: string;
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    minimized: boolean;
  };
  background: {
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
  };
}

interface SurveyPreviewProps {
  questions: SurveyQuestion[];
  previewDevice: "desktop" | "mobile" | "full";
  setPreviewDevice: (device: "desktop" | "mobile" | "full") => void;
  distributionType:
    | "post-purchase"
    | "onsite"
    | "exit-intent"
    | "email-campaign"
    | "branded-survey";
  previewDistribution:
    | "branded-survey"
    | "post-purchase"
    | "exit-intent"
    | "email-campaign"
    | "onsite-popup";
  setPreviewDistribution: (
    distribution:
      | "branded-survey"
      | "post-purchase"
      | "exit-intent"
      | "email-campaign"
      | "onsite-popup"
  ) => void;
  distributionTypes: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
  }>;
  discountEnabled: boolean;
  discountType: "percentage" | "fixed";
  discountValue: string;
  discountCode?: string;
  discountDescription?: string;
  discountExpiryDays?: string;
  brandedSurveySettings?: BrandedSurveySettings;
  postPurchaseSettings?: PostPurchaseSettings;
  exitIntentSettings?: ExitIntentSettings;
  emailCampaignSettings?: EmailCampaignSettings;
  // Pagination settings
  paginationEnabled?: boolean;
  questionsPerPage?: number;
  onPaginationChange?: (enabled: boolean) => void;
  onQuestionsPerPageChange?: (count: number) => void;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  questions,
  previewDevice,
  setPreviewDevice,
  distributionType,
  previewDistribution,
  setPreviewDistribution,
  distributionTypes,
  discountEnabled,
  discountType,
  discountValue,
  discountCode,
  discountDescription,
  discountExpiryDays,
  brandedSurveySettings,
  postPurchaseSettings,
  exitIntentSettings,
  emailCampaignSettings,
  paginationEnabled = false,
  questionsPerPage = 1,
  onPaginationChange,
  onQuestionsPerPageChange,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [showPaginationSettings, setShowPaginationSettings] = useState(false);

  // Calculate pagination
  const totalPages = paginationEnabled
    ? Math.ceil(questions.length / questionsPerPage)
    : 1;

  const currentQuestions = paginationEnabled
    ? questions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
      )
    : questions;

  // Reset to first page when questions change or pagination settings change
  React.useEffect(() => {
    setCurrentPage(0);
  }, [questions.length, paginationEnabled, questionsPerPage]);
  // Helper function to map previewDistribution to legacy distributionType
  const getDistributionType = (): typeof distributionType => {
    return previewDistribution === "onsite-popup"
      ? "onsite"
      : previewDistribution;
  };

  const getPreviewTitle = () => {
    const type = getDistributionType();
    switch (type) {
      case "post-purchase":
        return "Thank you for your purchase!";
      case "onsite":
        return "Help us improve your experience";
      case "exit-intent":
        return "Wait! Before you go...";
      case "email-campaign":
        return "We value your feedback";
      case "branded-survey":
        return "Customer Survey";
      default:
        return "Customer Survey";
    }
  };

  const getPreviewSubtitle = () => {
    const type = getDistributionType();
    switch (type) {
      case "post-purchase":
        return "Help us improve your experience with a quick survey";
      case "onsite":
        return "Take a moment to share your thoughts";
      case "exit-intent":
        return "Get 10% off your next order for 2 minutes of your time";
      case "email-campaign":
        return "Your feedback helps us serve you better";
      case "branded-survey":
        return "Please take a moment to answer our questions";
      default:
        return "Please answer a few quick questions";
    }
  };

  const getPreviewStyle = () => {
    const type = getDistributionType();
    if (type === "branded-survey" && brandedSurveySettings) {
      const { background } = brandedSurveySettings;

      if (background.type === "solid") {
        return "";
      } else if (background.type === "gradient") {
        const direction = background.gradientDirection.replace("to-", "");
        return "";
      } else if (background.type === "image" && background.imageUrl) {
        return "";
      }
    }

    switch (type) {
      case "post-purchase":
        return "bg-primary text-primary-foreground";
      case "onsite":
        return "bg-secondary-brand text-white";
      case "exit-intent":
        return "bg-survey-purple text-white";
      case "email-campaign":
        return "bg-gradient-to-r from-survey-success to-primary text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getBrandedBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "branded-survey" || !brandedSurveySettings) {
      return {};
    }

    const { section, background } = brandedSurveySettings;
    const style: React.CSSProperties = {};

    // Use section background settings if available, otherwise fall back to background settings
    if (section.backgroundType === "solid") {
      style.backgroundColor = section.backgroundColor;
    } else if (section.backgroundType === "gradient") {
      const directions: { [key: string]: string } = {
        "to-r": "to right",
        "to-l": "to left",
        "to-t": "to top",
        "to-b": "to bottom",
        "to-br": "to bottom right",
        "to-bl": "to bottom left",
        "to-tr": "to top right",
        "to-tl": "to top left",
      };
      const direction = directions[section.gradientDirection] || "to right";
      style.background = `linear-gradient(${direction}, ${section.gradientFrom}, ${section.gradientTo})`;
    } else if (section.backgroundType === "image" && section.backgroundImage) {
      const overlayOpacity = 1 - section.backgroundImageOpacity / 100;
      style.background = `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${section.backgroundImage})`;
      style.backgroundPosition =
        section.backgroundImagePosition === "cover" ||
        section.backgroundImagePosition === "contain"
          ? "center"
          : section.backgroundImagePosition;
      style.backgroundSize =
        section.backgroundImagePosition === "cover" ||
        section.backgroundImagePosition === "contain"
          ? section.backgroundImagePosition
          : "auto";
      style.backgroundRepeat = "no-repeat";
    } else {
      // Fallback to old background system
      if (background.type === "solid") {
        style.backgroundColor = background.solidColor;
      } else if (background.type === "gradient") {
        const directions: { [key: string]: string } = {
          "to-r": "to right",
          "to-l": "to left",
          "to-t": "to top",
          "to-b": "to bottom",
          "to-br": "to bottom right",
          "to-bl": "to bottom left",
          "to-tr": "to top right",
          "to-tl": "to top left",
        };
        const direction =
          directions[background.gradientDirection] || "to right";
        style.background = `linear-gradient(${direction}, ${background.gradientStart}, ${background.gradientEnd})`;
      } else if (background.type === "image" && background.imageUrl) {
        style.backgroundImage = `url(${background.imageUrl})`;
        style.backgroundPosition = background.imagePosition;
        style.backgroundSize = background.imageSize;
        style.backgroundRepeat = "no-repeat";

        if (background.overlay) {
          const overlayColor = background.overlayColor || "#000000";
          const overlayOpacity = background.overlayOpacity || 0.3;
          style.background = `linear-gradient(rgba(${parseInt(
            overlayColor.slice(1, 3),
            16
          )}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(
            overlayColor.slice(5, 7),
            16
          )}, ${overlayOpacity}), rgba(${parseInt(
            overlayColor.slice(1, 3),
            16
          )}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(
            overlayColor.slice(5, 7),
            16
          )}, ${overlayOpacity})), url(${background.imageUrl})`;
        }
      }
    }

    return style;
  };

  const getExitIntentBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "exit-intent" || !exitIntentSettings) {
      return {};
    }

    return {
      backgroundColor: exitIntentSettings.section.backgroundColor,
    };
  };

  const getPostPurchaseBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "post-purchase" || !postPurchaseSettings) {
      return {};
    }

    return {
      backgroundColor: postPurchaseSettings.section.backgroundColor,
      color: postPurchaseSettings.section.accentColor,
      borderRadius: `${postPurchaseSettings.button.borderRadius}px`,
      boxShadow: postPurchaseSettings.button.shadow
        ? "0 4px 6px rgba(0, 0, 0, 0.1)"
        : "none",
    };
  };

  const getBrandedTextStyle = () => {
    const type = getDistributionType();
    if (type !== "branded-survey" || !brandedSurveySettings) {
      return {};
    }

    const { section, typography } = brandedSurveySettings;
    return {
      fontFamily: typography.fontFamily,
      lineHeight: typography.lineHeight,
      letterSpacing: `${typography.letterSpacing}px`,
    };
  };

  const getButtonStyle = () => {
    const type = getDistributionType();
    if (type === "branded-survey" && brandedSurveySettings) {
      const { button } = brandedSurveySettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: `${button.borderRadius}px`,
        fontSize: `${button.fontSize}px`,
        fontWeight: button.fontWeight,
        boxShadow: button.shadow ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
      };
    }

    if (type === "exit-intent" && exitIntentSettings) {
      const { button } = exitIntentSettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "medium",
      };
    }

    return {};
  };

  const getEmailCampaignBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "email-campaign" || !emailCampaignSettings) {
      return {};
    }

    const { background } = emailCampaignSettings;

    if (background.type === "solid") {
      return {
        backgroundColor: background.solidColor,
      };
    } else if (background.type === "gradient") {
      return {
        background: `linear-gradient(${background.gradientDirection}, ${background.gradientStart}, ${background.gradientEnd})`,
      };
    } else if (background.type === "image" && background.imageUrl) {
      return {
        backgroundImage: `url(${background.imageUrl})`,
        backgroundSize: background.imageSize,
        backgroundPosition: background.imagePosition,
        backgroundRepeat: "no-repeat",
        position: "relative",
      };
    }

    return {
      backgroundColor: "#ffffff",
    };
  };

  const getEmailCampaignButtonStyle = () => {
    const type = getDistributionType();
    if (type === "email-campaign" && emailCampaignSettings) {
      const { button } = emailCampaignSettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "medium",
      };
    }

    return {};
  };

  const renderQuestionPreview = (question: SurveyQuestion, index: number) => {
    return (
      <div
        key={question.id}
        className="space-y-3 pb-4 border-b border-border last:border-b-0"
      >
        <div className="flex items-start space-x-2">
          <span className="text-sm font-medium text-muted-foreground mt-1">
            {index + 1}.
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{question.title}</p>
              {question.required && (
                <span className="text-destructive text-xs">*</span>
              )}
            </div>
            {question.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {question.description}
              </p>
            )}
          </div>
        </div>

        <div className="ml-6 space-y-2">
          {question.type === "multiple-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-muted-foreground rounded-sm"></div>
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === "single-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === "dropdown" && question.options && (
            <div className="space-y-2">
              <div className="border border-muted-foreground rounded px-3 py-2 text-sm text-muted-foreground bg-muted/20">
                Select an option...
              </div>
            </div>
          )}

          {question.type === "binary-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === "text" && (
            <div className="space-y-2">
              {question.textInputType === "single-line" ? (
                <Input
                  placeholder={question.placeholder || "Your answer..."}
                  className="h-8 text-sm"
                  disabled
                />
              ) : (
                <Textarea
                  placeholder={question.placeholder || "Your answer..."}
                  className="text-sm resize-none"
                  rows={3}
                  disabled
                />
              )}
            </div>
          )}

          {question.type === "email" && (
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === "phone" && (
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === "satisfaction" && (
            <div className="space-y-2">
              <div className="flex justify-center space-x-4">
                {(
                  question.satisfactionEmojis || ["😢", "🙁", "😐", "🙂", "😄"]
                ).map((emoji, index) => (
                  <button
                    key={index}
                    className="text-3xl p-2 rounded-lg hover:bg-muted transition-colors"
                    disabled
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Very Dissatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>
          )}

          {question.type === "point-scale" && (
            <div className="space-y-2">
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from(
                  {
                    length:
                      (question.pointScale?.max || 10) -
                      (question.pointScale?.min || 1) +
                      1,
                  },
                  (_, i) => (question.pointScale?.min || 1) + i
                ).map((value) => (
                  <button
                    key={value}
                    className="w-10 h-10 border rounded text-sm flex items-center justify-center hover:bg-muted transition-colors"
                    style={{
                      borderColor:
                        getDistributionType() === "branded-survey" &&
                        brandedSurveySettings?.section.accentColor
                          ? brandedSurveySettings.section.accentColor
                          : "#6b7280",
                    }}
                    disabled
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimum ({question.pointScale?.min || 1})</span>
                <span>Maximum ({question.pointScale?.max || 10})</span>
              </div>
            </div>
          )}

          {question.type === "date" && (
            <div className="space-y-2">
              <Input type="date" className="h-8 text-sm" disabled />
              <div className="text-xs text-muted-foreground">
                Format: {question.dateFormat || "MM/DD/YYYY"}
              </div>
            </div>
          )}

          {question.type === "rating" && (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 cursor-pointer hover:fill-current"
                  style={{
                    color:
                      getDistributionType() === "branded-survey" &&
                      brandedSurveySettings?.section.accentColor
                        ? brandedSurveySettings.section.accentColor
                        : "#f59e0b",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <Badge
              variant="secondary"
              className="bg-survey-success-light text-survey-success border-survey-success/20"
            >
              <div className="w-2 h-2 bg-survey-success rounded-full animate-pulse mr-1"></div>
              Live
            </Badge>
          </div>

          {/* Pagination Settings Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPaginationSettings(!showPaginationSettings)}
            className="flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" />
            Pagination
          </Button>
        </div>

        {/* Pagination Settings Panel */}
        {showPaginationSettings && (
          <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Question Display Mode</h4>
                <p className="text-xs text-muted-foreground">
                  Choose how questions are displayed to customers
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="show-all"
                  name="pagination-mode"
                  checked={!paginationEnabled}
                  onChange={() => onPaginationChange?.(false)}
                  className="w-4 h-4"
                />
                <label htmlFor="show-all" className="text-sm">
                  Show all questions on one page
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pagination"
                  name="pagination-mode"
                  checked={paginationEnabled}
                  onChange={() => onPaginationChange?.(true)}
                  className="w-4 h-4"
                />
                <label htmlFor="pagination" className="text-sm">
                  Use pagination (one question per page)
                </label>
              </div>

              {paginationEnabled && (
                <div className="ml-6 space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Questions per page:
                  </label>
                  <Select
                    value={questionsPerPage?.toString()}
                    onValueChange={(value) =>
                      onQuestionsPerPageChange?.(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Total pages: {totalPages}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Distribution Selector and Preview Icons Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Select
              value={previewDistribution}
              onValueChange={(value) =>
                setPreviewDistribution(value as typeof previewDistribution)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {distributionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={previewDevice === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("desktop")}
              className={`h-8 px-3 ${
                previewDevice === "desktop"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewDevice === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("mobile")}
              className={`h-8 px-3 ${
                previewDevice === "mobile"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={previewDevice === "full" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("full")}
              className={`h-8 px-3 ${
                previewDevice === "full"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className={`${
            previewDevice === "mobile"
              ? "w-full max-w-sm mx-auto"
              : previewDevice === "desktop"
              ? "w-full max-w-md mx-auto"
              : "w-full"
          } transition-all duration-300 shadow-lg rounded-lg overflow-hidden border relative`}
          style={
            getDistributionType() === "branded-survey"
              ? getBrandedBackgroundStyle()
              : getDistributionType() === "post-purchase"
              ? getPostPurchaseBackgroundStyle()
              : getDistributionType() === "exit-intent"
              ? getExitIntentBackgroundStyle()
              : getDistributionType() === "email-campaign"
              ? getEmailCampaignBackgroundStyle()
              : { backgroundColor: "white" }
          }
        >
          {/* Progress Bar */}
          {getDistributionType() === "branded-survey" &&
            brandedSurveySettings?.progressBar.enabled &&
            brandedSurveySettings.progressBar.position === "top" && (
              <div
                className="w-full h-1"
                style={{
                  backgroundColor:
                    brandedSurveySettings.progressBar.backgroundColor,
                }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      brandedSurveySettings.section.accentColor ||
                      brandedSurveySettings.progressBar.color,
                    width: questions.length > 0 ? "33%" : "0%",
                  }}
                />
              </div>
            )}

          {/* Side Logo for Branded Survey */}
          {getDistributionType() === "branded-survey" &&
            brandedSurveySettings?.sideLogo.enabled &&
            brandedSurveySettings.sideLogo.url && (
              <div
                className={`absolute top-4 z-10 ${
                  brandedSurveySettings.sideLogo.position === "left"
                    ? "left-4"
                    : "right-4"
                }`}
              >
                <img
                  src={brandedSurveySettings.sideLogo.url}
                  alt="Brand logo"
                  className={`${
                    brandedSurveySettings.sideLogo.size === "small"
                      ? "h-6"
                      : brandedSurveySettings.sideLogo.size === "medium"
                      ? "h-8"
                      : "h-10"
                  } object-contain`}
                />
              </div>
            )}

          {/* Side Logo for Post-Purchase */}
          {getDistributionType() === "post-purchase" &&
            postPurchaseSettings?.sideLogo.enabled &&
            postPurchaseSettings.sideLogo.url && (
              <div
                className={`absolute top-4 z-10 ${
                  postPurchaseSettings.sideLogo.position === "left"
                    ? "left-4"
                    : "right-4"
                }`}
              >
                <img
                  src={postPurchaseSettings.sideLogo.url}
                  alt="Side logo"
                  className={`${
                    postPurchaseSettings.sideLogo.size === "small"
                      ? "h-4"
                      : postPurchaseSettings.sideLogo.size === "medium"
                      ? "h-6"
                      : "h-8"
                  } object-contain`}
                />
              </div>
            )}

          {/* Side Logo for Exit Intent */}
          {getDistributionType() === "exit-intent" &&
            exitIntentSettings?.sideLogo.enabled &&
            exitIntentSettings.sideLogo.url && (
              <div
                className={`absolute top-4 ${
                  exitIntentSettings.sideLogo.position === "left"
                    ? "left-4"
                    : "right-4"
                } z-10`}
              >
                <img
                  src={exitIntentSettings.sideLogo.url}
                  alt="Side logo"
                  className={`${
                    exitIntentSettings.sideLogo.size === "small"
                      ? "h-4"
                      : exitIntentSettings.sideLogo.size === "medium"
                      ? "h-6"
                      : "h-8"
                  } object-contain`}
                />
              </div>
            )}

          {/* Header Logo for Email Campaign */}
          {getDistributionType() === "email-campaign" &&
            emailCampaignSettings?.headerLogo.enabled &&
            emailCampaignSettings.headerLogo.url && (
              <div
                className={`flex ${
                  emailCampaignSettings.headerLogo.position === "left"
                    ? "justify-start"
                    : emailCampaignSettings.headerLogo.position === "center"
                    ? "justify-center"
                    : "justify-end"
                } mb-4`}
              >
                <img
                  src={emailCampaignSettings.headerLogo.url}
                  alt="Header logo"
                  className={`${
                    emailCampaignSettings.headerLogo.size === "small"
                      ? "h-8"
                      : emailCampaignSettings.headerLogo.size === "medium"
                      ? "h-12"
                      : "h-16"
                  } object-contain`}
                />
              </div>
            )}

          {/* Survey Header */}
          <div
            className={`${
              getDistributionType() === "branded-survey" ||
              getDistributionType() === "post-purchase"
                ? ""
                : getPreviewStyle()
            } p-6 relative`}
            style={
              getDistributionType() === "branded-survey"
                ? getBrandedTextStyle()
                : {}
            }
          >
            {/* Header Logo for Branded Survey */}
            {getDistributionType() === "branded-survey" &&
              brandedSurveySettings?.headerLogo.enabled &&
              brandedSurveySettings.headerLogo.url && (
                <div
                  className={`mb-4 flex ${
                    brandedSurveySettings.headerLogo.position === "left"
                      ? "justify-start"
                      : brandedSurveySettings.headerLogo.position === "center"
                      ? "justify-center"
                      : "justify-end"
                  }`}
                >
                  <img
                    src={brandedSurveySettings.headerLogo.url}
                    alt="Header logo"
                    className={`${
                      brandedSurveySettings.headerLogo.size === "small"
                        ? "h-8"
                        : brandedSurveySettings.headerLogo.size === "medium"
                        ? "h-12"
                        : "h-16"
                    } object-contain`}
                  />
                </div>
              )}

            {getDistributionType() === "exit-intent" && (
              <button className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="space-y-2">
              <h3
                className="text-lg font-semibold"
                style={
                  getDistributionType() === "branded-survey" &&
                  brandedSurveySettings
                    ? { color: brandedSurveySettings.section.primaryText }
                    : getDistributionType() === "post-purchase" &&
                      postPurchaseSettings
                    ? { color: postPurchaseSettings.section.accentColor }
                    : getDistributionType() === "exit-intent" &&
                      exitIntentSettings
                    ? { color: exitIntentSettings.section.primaryTextColor }
                    : getDistributionType() === "email-campaign" &&
                      emailCampaignSettings
                    ? { color: "#1f2937" }
                    : {}
                }
              >
                {getPreviewTitle()}
              </h3>
              <p
                className="text-sm opacity-90"
                style={
                  getDistributionType() === "branded-survey" &&
                  brandedSurveySettings
                    ? {
                        color: brandedSurveySettings.section.secondaryText,
                      }
                    : getDistributionType() === "post-purchase" &&
                      postPurchaseSettings
                    ? {
                        color: postPurchaseSettings.section.accentColor,
                        opacity: 0.8,
                      }
                    : getDistributionType() === "exit-intent" &&
                      exitIntentSettings
                    ? {
                        color: exitIntentSettings.section.secondaryTextColor,
                        opacity: 0.9,
                      }
                    : getDistributionType() === "email-campaign" &&
                      emailCampaignSettings
                    ? {
                        color: "#6b7280",
                        opacity: 0.9,
                      }
                    : {}
                }
              >
                {getPreviewSubtitle()}
              </p>
            </div>

            {discountEnabled && getDistributionType() === "exit-intent" && (
              <div className="mt-4 bg-white/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span>🎉</span>
                  <span>
                    Get{" "}
                    {discountType === "percentage"
                      ? `${discountValue}%`
                      : `$${discountValue}`}{" "}
                    off
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Survey Body */}
          <div
            className="p-6 space-y-4 max-h-96 overflow-y-auto"
            style={
              getDistributionType() === "branded-survey"
                ? getBrandedTextStyle()
                : {}
            }
          >
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  No questions added yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Add questions to see the preview
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentQuestions.map((question, questionIndex) => {
                  // Calculate the global index for proper numbering
                  const globalIndex = paginationEnabled
                    ? currentPage * questionsPerPage + questionIndex
                    : questionIndex;

                  return (
                    <div
                      key={question.id}
                      className="space-y-3 pb-4 border-b border-border last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="font-medium text-muted-foreground min-w-[24px]">
                          {globalIndex + 1}.
                        </span>
                        <div className="flex-1">
                          <div className="flex items-start gap-2">
                            <p
                              className="font-medium text-sm leading-relaxed"
                              style={
                                getDistributionType() === "branded-survey" &&
                                brandedSurveySettings
                                  ? {
                                      color:
                                        brandedSurveySettings.section
                                          .primaryText,
                                    }
                                  : {}
                              }
                            >
                              {question.title}
                            </p>
                            {question.required && (
                              <span className="text-destructive text-xs">
                                *
                              </span>
                            )}
                          </div>
                          {question.description && (
                            <p
                              className="text-xs mt-1"
                              style={
                                getDistributionType() === "branded-survey" &&
                                brandedSurveySettings
                                  ? {
                                      color:
                                        brandedSurveySettings.section
                                          .secondaryText,
                                    }
                                  : {}
                              }
                            >
                              {question.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="ml-6 space-y-2">
                        {question.type === "multiple-choice" &&
                          question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-3 h-3 border border-muted-foreground rounded-sm"></div>
                                  <span
                                    className="text-sm"
                                    style={
                                      getDistributionType() ===
                                        "branded-survey" &&
                                      brandedSurveySettings
                                        ? {
                                            color:
                                              brandedSurveySettings.section
                                                .primaryText,
                                          }
                                        : {}
                                    }
                                  >
                                    {option}
                                  </span>
                                </div>
                              ))}
                              {/* Custom Answer Field */}
                              {question.customAnswer?.enabled && (
                                <div className="mt-3">
                                  {question.customAnswer.displayMode ===
                                  "always" ? (
                                    <div className="space-y-1">
                                      <label className="text-xs text-muted-foreground">
                                        Custom Answer:
                                      </label>
                                      <Input
                                        placeholder={
                                          question.customAnswer.placeholder ||
                                          "Please specify..."
                                        }
                                        className="h-8 text-sm"
                                        disabled
                                      />
                                    </div>
                                  ) : (
                                    <div className="text-xs text-muted-foreground italic">
                                      Custom input will appear when "Others" is
                                      selected
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                        {question.type === "single-choice" &&
                          question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-3 h-3 border rounded-full"></div>
                                  <span
                                    className="text-sm"
                                    style={
                                      getDistributionType() ===
                                        "branded-survey" &&
                                      brandedSurveySettings
                                        ? {
                                            color:
                                              brandedSurveySettings.section
                                                .primaryText,
                                          }
                                        : {}
                                    }
                                  >
                                    {option}
                                  </span>
                                </div>
                              ))}
                              {/* Custom Answer Field */}
                              {question.customAnswer?.enabled && (
                                <div className="mt-3">
                                  {question.customAnswer.displayMode ===
                                  "always" ? (
                                    <div className="space-y-1">
                                      <label className="text-xs text-muted-foreground">
                                        Custom Answer:
                                      </label>
                                      <Input
                                        placeholder={
                                          question.customAnswer.placeholder ||
                                          "Please specify..."
                                        }
                                        className="h-8 text-sm"
                                        disabled
                                      />
                                    </div>
                                  ) : (
                                    <div className="text-xs text-muted-foreground italic">
                                      Custom input will appear when "Others" is
                                      selected
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                        {question.type === "dropdown" && question.options && (
                          <div className="space-y-2">
                            <div className="border border-muted-foreground rounded px-3 py-2 text-sm bg-muted/20">
                              <span
                                style={
                                  getDistributionType() === "branded-survey" &&
                                  brandedSurveySettings
                                    ? {
                                        color:
                                          brandedSurveySettings.section
                                            .secondaryText,
                                      }
                                    : {}
                                }
                              >
                                Select an option...
                              </span>
                            </div>
                          </div>
                        )}

                        {question.type === "binary-choice" &&
                          question.options && (
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
                                  <span
                                    className="text-sm"
                                    style={
                                      getDistributionType() ===
                                        "branded-survey" &&
                                      brandedSurveySettings
                                        ? {
                                            color:
                                              brandedSurveySettings.section
                                                .primaryText,
                                          }
                                        : {}
                                    }
                                  >
                                    {option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                        {(question.type === "text" ||
                          question.type === "email" ||
                          question.type === "phone") && (
                          <div className="space-y-2">
                            {question.type === "text" ? (
                              question.textInputType === "single-line" ? (
                                <Input
                                  placeholder={
                                    question.placeholder || "Your answer..."
                                  }
                                  className="h-8 text-sm"
                                  disabled
                                />
                              ) : (
                                <Textarea
                                  placeholder={
                                    question.placeholder || "Your answer..."
                                  }
                                  className="text-sm resize-none"
                                  rows={3}
                                  disabled
                                />
                              )
                            ) : (
                              <Input
                                type={
                                  question.type === "email"
                                    ? "email"
                                    : question.type === "phone"
                                    ? "tel"
                                    : "text"
                                }
                                placeholder={
                                  question.placeholder ||
                                  (question.type === "email"
                                    ? "your.email@example.com"
                                    : question.type === "phone"
                                    ? "+1 (555) 123-4567"
                                    : "Your answer...")
                                }
                                className="h-8 text-sm"
                                disabled
                              />
                            )}
                          </div>
                        )}

                        {question.type === "satisfaction" && (
                          <div className="space-y-2">
                            <div className="flex justify-center space-x-3">
                              {(
                                question.satisfactionEmojis || [
                                  "😢",
                                  "🙁",
                                  "😐",
                                  "🙂",
                                  "😄",
                                ]
                              ).map((emoji, index) => (
                                <button
                                  key={index}
                                  className="text-2xl p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors"
                                  disabled
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground px-1">
                              <span>Very Dissatisfied</span>
                              <span>Very Satisfied</span>
                            </div>
                          </div>
                        )}

                        {question.type === "point-scale" && (
                          <div className="space-y-2">
                            <div className="flex flex-wrap justify-center gap-1">
                              {Array.from(
                                {
                                  length:
                                    (question.pointScale?.max || 10) -
                                    (question.pointScale?.min || 1) +
                                    1,
                                },
                                (_, i) => (question.pointScale?.min || 1) + i
                              ).map((value) => (
                                <button
                                  key={value}
                                  className="w-8 h-8 border border-muted-foreground rounded text-xs flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
                                  disabled
                                >
                                  {value}
                                </button>
                              ))}
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{question.pointScale?.min || 1}</span>
                              <span>{question.pointScale?.max || 10}</span>
                            </div>
                          </div>
                        )}

                        {question.type === "date" && (
                          <div className="space-y-2">
                            <Input
                              type="date"
                              className="h-8 text-sm"
                              disabled
                            />
                            <div className="text-xs text-muted-foreground">
                              Format: {question.dateFormat || "MM/DD/YYYY"}
                            </div>
                          </div>
                        )}

                        {question.type === "rating" && (
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-5 h-5 text-amber-400 cursor-pointer hover:fill-current"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Pagination Controls */}
                {paginationEnabled && totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentPage === 0}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {currentPage + 1}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages - 1, prev + 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full"
                    style={
                      getDistributionType() === "branded-survey"
                        ? getButtonStyle()
                        : getDistributionType() === "post-purchase" &&
                          postPurchaseSettings
                        ? {
                            backgroundColor:
                              postPurchaseSettings.button.backgroundColor,
                            color: postPurchaseSettings.button.textColor,
                            borderRadius: `${postPurchaseSettings.button.borderRadius}px`,
                          }
                        : getDistributionType() === "exit-intent" &&
                          exitIntentSettings
                        ? {
                            backgroundColor:
                              exitIntentSettings.button.backgroundColor,
                            color: exitIntentSettings.button.textColor,
                            borderRadius: "6px",
                          }
                        : getDistributionType() === "email-campaign"
                        ? getEmailCampaignButtonStyle()
                        : {}
                    }
                  >
                    Submit Survey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {discountEnabled && (
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-lg">🎉</span>
                          <p className="text-lg font-semibold text-green-800">
                            Thank you for your feedback!
                          </p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <p className="text-sm font-medium text-gray-800 mb-2">
                            Enjoy{" "}
                            {discountType === "percentage"
                              ? `${discountValue}%`
                              : `$${discountValue}`}{" "}
                            off your next purchase!
                          </p>

                          {discountCode && (
                            <div className="bg-gray-100 rounded-md p-2 border-2 border-dashed border-gray-300">
                              <p className="text-xs text-gray-600 mb-1">Discount Code:</p>
                              <p className="font-mono font-bold text-lg text-gray-900 tracking-wider">
                                {discountCode}
                              </p>
                            </div>
                          )}

                          {discountDescription && (
                            <p className="text-xs text-gray-600 mt-2 italic">
                              {discountDescription}
                            </p>
                          )}

                          {discountExpiryDays && (
                            <p className="text-xs text-orange-600 mt-2">
                              ⏰ Expires in {discountExpiryDays} days
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-green-700">
                          {getDistributionType() === "post-purchase" || getDistributionType() === "email-campaign"
                            ? "A copy has been sent to your email"
                            : "Save this code for your next purchase"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Trust Signals */}
                  {getDistributionType() === "branded-survey" &&
                    brandedSurveySettings?.trustSignals && (
                      <div className="flex justify-center items-center space-x-4 pt-2">
                        {brandedSurveySettings.trustSignals.showSSL && (
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">
                              SSL Secure
                            </span>
                          </div>
                        )}
                        {brandedSurveySettings.trustSignals
                          .showPrivacyBadge && (
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">
                              Privacy Protected
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Progress Bar */}
          {getDistributionType() === "branded-survey" &&
            brandedSurveySettings?.progressBar.enabled &&
            brandedSurveySettings.progressBar.position === "bottom" && (
              <div
                className="w-full h-1"
                style={{
                  backgroundColor:
                    brandedSurveySettings.progressBar.backgroundColor,
                }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      brandedSurveySettings.section.accentColor ||
                      brandedSurveySettings.progressBar.color,
                    width: questions.length > 0 ? "33%" : "0%",
                  }}
                />
              </div>
            )}
        </div>

        {/* Preview Info */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Preview shows how your survey will appear to customers
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
