import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Monitor,
  Smartphone,
  Maximize,
  Star,
  X,
  ArrowRight,
} from "lucide-react";

interface SurveyQuestion {
  id: string;
  type: "multiple-choice" | "text" | "rating" | "nps" | "email" | "phone";
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
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
  appearance: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    borderRadius: number;
    shadow: boolean;
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
    primaryTextColor: string;
    secondaryTextColor: string;
    headingColor: string;
    linkColor: string;
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
  discountEnabled: boolean;
  discountType: "percentage" | "fixed";
  discountValue: string;
  brandedSurveySettings?: BrandedSurveySettings;
  postPurchaseSettings?: PostPurchaseSettings;
  exitIntentSettings?: ExitIntentSettings;
  emailCampaignSettings?: EmailCampaignSettings;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  questions,
  previewDevice,
  setPreviewDevice,
  distributionType,
  discountEnabled,
  discountType,
  discountValue,
  brandedSurveySettings,
  postPurchaseSettings,
  exitIntentSettings,
  emailCampaignSettings,
}) => {
  const getPreviewTitle = () => {
    switch (distributionType) {
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
    switch (distributionType) {
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
    if (distributionType === "branded-survey" && brandedSurveySettings) {
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

    switch (distributionType) {
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
    if (distributionType !== "branded-survey" || !brandedSurveySettings) {
      return {};
    }

    const { background } = brandedSurveySettings;
    const style: React.CSSProperties = {};

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
      const direction = directions[background.gradientDirection] || "to right";
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

    return style;
  };

  const getExitIntentBackgroundStyle = () => {
    if (distributionType !== "exit-intent" || !exitIntentSettings) {
      return {};
    }

    return {
      backgroundColor: exitIntentSettings.section.backgroundColor,
    };
  };

  const getPostPurchaseBackgroundStyle = () => {
    if (distributionType !== "post-purchase" || !postPurchaseSettings) {
      return {};
    }

    return {
      backgroundColor: postPurchaseSettings.appearance.backgroundColor,
      color: postPurchaseSettings.appearance.textColor,
      borderRadius: `${postPurchaseSettings.appearance.borderRadius}px`,
      boxShadow: postPurchaseSettings.appearance.shadow
        ? "0 4px 6px rgba(0, 0, 0, 0.1)"
        : "none",
    };
  };

  const getBrandedTextStyle = () => {
    if (distributionType !== "branded-survey" || !brandedSurveySettings) {
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
    if (distributionType === "branded-survey" && brandedSurveySettings) {
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

    if (distributionType === "exit-intent" && exitIntentSettings) {
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
    if (distributionType !== "email-campaign" || !emailCampaignSettings) {
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
    if (distributionType === "email-campaign" && emailCampaignSettings) {
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

          {question.type === "text" && (
            <div className="space-y-2">
              <Input
                placeholder={question.placeholder || "Your answer..."}
                className="h-8 text-sm"
                disabled
              />
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

          {question.type === "rating" && (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 text-survey-warning cursor-pointer hover:fill-current"
                />
              ))}
            </div>
          )}

          {question.type === "nps" && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {[...Array(11)].map((_, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 border border-muted-foreground rounded text-xs flex items-center justify-center hover:bg-muted"
                    disabled
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
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
        </div>
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={previewDevice === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewDevice("desktop")}
            className="h-8 px-3"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewDevice("mobile")}
            className="h-8 px-3"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant={previewDevice === "full" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewDevice("full")}
            className="h-8 px-3"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground capitalize">
          {distributionType.replace("-", " ")} Survey
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
            distributionType === "branded-survey"
              ? getBrandedBackgroundStyle()
              : distributionType === "post-purchase"
              ? getPostPurchaseBackgroundStyle()
              : distributionType === "exit-intent"
              ? getExitIntentBackgroundStyle()
              : distributionType === "email-campaign"
              ? getEmailCampaignBackgroundStyle()
              : { backgroundColor: "white" }
          }
        >
          {/* Progress Bar */}
          {distributionType === "branded-survey" &&
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
                    backgroundColor: brandedSurveySettings.progressBar.color,
                    width: questions.length > 0 ? "33%" : "0%",
                  }}
                />
              </div>
            )}

          {/* Side Logo for Branded Survey */}
          {distributionType === "branded-survey" &&
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
          {distributionType === "post-purchase" &&
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
          {distributionType === "exit-intent" &&
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
          {distributionType === "email-campaign" &&
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
              distributionType === "branded-survey" ||
              distributionType === "post-purchase"
                ? ""
                : getPreviewStyle()
            } p-6 relative`}
            style={
              distributionType === "branded-survey" ? getBrandedTextStyle() : {}
            }
          >
            {/* Header Logo for Branded Survey */}
            {distributionType === "branded-survey" &&
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

            {distributionType === "exit-intent" && (
              <button className="absolute top-4 right-4 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="space-y-2">
              <h3
                className="text-lg font-semibold"
                style={
                  distributionType === "branded-survey" && brandedSurveySettings
                    ? { color: brandedSurveySettings.section.headingColor }
                    : distributionType === "post-purchase" &&
                      postPurchaseSettings
                    ? { color: postPurchaseSettings.appearance.textColor }
                    : distributionType === "exit-intent" && exitIntentSettings
                    ? { color: exitIntentSettings.section.primaryTextColor }
                    : distributionType === "email-campaign" &&
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
                  distributionType === "branded-survey" && brandedSurveySettings
                    ? {
                        color: brandedSurveySettings.section.secondaryTextColor,
                      }
                    : distributionType === "post-purchase" &&
                      postPurchaseSettings
                    ? {
                        color: postPurchaseSettings.appearance.textColor,
                        opacity: 0.8,
                      }
                    : distributionType === "exit-intent" && exitIntentSettings
                    ? {
                        color: exitIntentSettings.section.secondaryTextColor,
                        opacity: 0.9,
                      }
                    : distributionType === "email-campaign" &&
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

            {discountEnabled && distributionType === "exit-intent" && (
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
              distributionType === "branded-survey" ? getBrandedTextStyle() : {}
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
                {questions.map((question, index) => (
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
                          <p
                            className="font-medium text-sm"
                            style={
                              distributionType === "branded-survey" &&
                              brandedSurveySettings
                                ? {
                                    color:
                                      brandedSurveySettings.section
                                        .primaryTextColor,
                                  }
                                : {}
                            }
                          >
                            {question.title}
                          </p>
                          {question.required && (
                            <span className="text-destructive text-xs">*</span>
                          )}
                        </div>
                        {question.description && (
                          <p
                            className="text-xs mt-1"
                            style={
                              distributionType === "branded-survey" &&
                              brandedSurveySettings
                                ? {
                                    color:
                                      brandedSurveySettings.section
                                        .secondaryTextColor,
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
                                    distributionType === "branded-survey" &&
                                    brandedSurveySettings
                                      ? {
                                          color:
                                            brandedSurveySettings.section
                                              .primaryTextColor,
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
                        </div>
                      )}

                      {question.type === "rating" && (
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-5 h-5 text-survey-warning cursor-pointer hover:fill-current"
                            />
                          ))}
                        </div>
                      )}

                      {question.type === "nps" && (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {[...Array(11)].map((_, i) => (
                              <button
                                key={i}
                                className="w-8 h-8 border border-muted-foreground rounded text-xs flex items-center justify-center hover:bg-muted"
                                disabled
                              >
                                {i}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Not likely</span>
                            <span>Very likely</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-4 space-y-3">
                  <Button
                    className="w-full"
                    style={
                      distributionType === "branded-survey"
                        ? getButtonStyle()
                        : distributionType === "post-purchase" &&
                          postPurchaseSettings
                        ? {
                            backgroundColor:
                              postPurchaseSettings.appearance.buttonColor,
                            color: "#ffffff",
                            borderRadius: `${postPurchaseSettings.appearance.borderRadius}px`,
                          }
                        : distributionType === "exit-intent" &&
                          exitIntentSettings
                        ? {
                            backgroundColor:
                              exitIntentSettings.button.backgroundColor,
                            color: exitIntentSettings.button.textColor,
                            borderRadius: "6px",
                          }
                        : distributionType === "email-campaign"
                        ? getEmailCampaignButtonStyle()
                        : {}
                    }
                  >
                    Submit Survey
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {discountEnabled && distributionType === "post-purchase" && (
                    <div className="text-center">
                      <div className="bg-survey-success-light rounded-lg p-3">
                        <p className="text-sm text-survey-success font-medium">
                          🎉 Get{" "}
                          {discountType === "percentage"
                            ? `${discountValue}%`
                            : `$${discountValue}`}{" "}
                          off your next order!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Discount code will be sent to your email
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Trust Signals */}
                  {distributionType === "branded-survey" &&
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
          {distributionType === "branded-survey" &&
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
                    backgroundColor: brandedSurveySettings.progressBar.color,
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
