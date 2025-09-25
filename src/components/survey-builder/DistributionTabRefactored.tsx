import React from "react";
import DistributionItem from "./distribution/DistributionItem";
import BrandedSurveySettingsRefactored from "./BrandedSurveySettingsRefactored";
import PostPurchaseSettingsRefactored from "./PostPurchaseSettingsRefactored";
import ExitIntentSettingsComponent from "./ExitIntentSettings";
import EmailCampaignSettingsComponent from "./EmailCampaignSettings";
import OnSitePopupSettingsComponent from "./OnSitePopupSettings";
import DefaultDistributionSettings from "./shared/DefaultDistributionSettings";

interface DistributionType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface BrandedSurveySettings {
  useCustomDomain: boolean;
  customDomain: string;
  customUrl: string;
  headerLogo: { enabled: boolean; url: string; width: number; height: number };
  sideLogo: { enabled: boolean; url: string; width: number; height: number };
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
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: number;
  };
  background: {
    type: "color" | "gradient" | "image";
    color: string;
    gradientFrom: string;
    gradientTo: string;
    gradientDirection: string;
    imageUrl: string;
    imageOpacity: number;
    imagePosition: string;
  };
  customCss: string;
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    borderRadius: number;
  };
  animation: {
    enabled: boolean;
    type: string;
    duration: number;
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
  display: {
    delay: number;
    position: "center" | "bottom-right" | "top-center";
    showOnPages: string[];
  };
  appearance: {
    primaryColor: string;
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    width: number;
    height: number;
    position: "left" | "right" | "center";
  };
  advancedFeatures: {
    minimized: boolean;
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
    position: "left" | "right" | "center";
    minimized: boolean;
  };
  content: {
    subject: string;
    body: string; // Rich text HTML content
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

interface OnSitePopupSettings {
  pageTargeting: {
    type: "all-pages" | "specific-pages" | "exclude-pages";
    specificPages: {
      homePage: boolean;
      productPages: {
        enabled: boolean;
        type: "all" | "specific";
        selectedProducts: string[];
      };
      blogPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
    };
    excludePages: {
      homePage: boolean;
      productPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
      blogPages: boolean;
    };
  };
  display: {
    position: "center" | "bottom-right" | "top-center";
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right" | "center";
    minimized: boolean;
  };
  button: {
    enabled: boolean;
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

interface DistributionTabRefactoredProps {
  distributionTypes: DistributionType[];
  enabledDistributions: string[];
  expandedDistributionId: string | null;
  distributionSettings: Record<string, unknown>;
  brandedSurveySettings: BrandedSurveySettings;
  postPurchaseSettings: PostPurchaseSettings;
  exitIntentSettings: ExitIntentSettings;
  emailCampaignSettings: EmailCampaignSettings;
  onSitePopupSettings: OnSitePopupSettings;
  onToggleDistribution: (id: string) => void;
  onToggleCollapsed: (id: string) => void;
  onUpdateDistributionSetting: (
    distributionId: string,
    key: string,
    value: string
  ) => void;
  onBrandedSurveySettingsChange: (settings: BrandedSurveySettings) => void;
  onPostPurchaseSettingsChange: (settings: PostPurchaseSettings) => void;
  onExitIntentSettingsChange: (settings: ExitIntentSettings) => void;
  onEmailCampaignSettingsChange: (settings: EmailCampaignSettings) => void;
  onOnSitePopupSettingsChange: (settings: OnSitePopupSettings) => void;
  onResetToDefault: () => void;
  onGenerateNewUrl: () => void;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const DistributionTabRefactored: React.FC<DistributionTabRefactoredProps> = ({
  distributionTypes,
  enabledDistributions,
  expandedDistributionId,
  distributionSettings,
  brandedSurveySettings,
  postPurchaseSettings,
  exitIntentSettings,
  emailCampaignSettings,
  onSitePopupSettings,
  onToggleDistribution,
  onToggleCollapsed,
  onUpdateDistributionSetting,
  onBrandedSurveySettingsChange,
  onPostPurchaseSettingsChange,
  onExitIntentSettingsChange,
  onEmailCampaignSettingsChange,
  onOnSitePopupSettingsChange,
  onResetToDefault,
  onGenerateNewUrl,
  onCopyUrl,
  copiedUrl,
}) => {
  const renderDistributionContent = (distribution: DistributionType) => {
    if (distribution.id === "branded-survey") {
      return (
        <BrandedSurveySettingsRefactored
          settings={brandedSurveySettings}
          onSettingsChange={onBrandedSurveySettingsChange}
          onResetToDefault={onResetToDefault}
          onGenerateNewUrl={onGenerateNewUrl}
          onCopyUrl={onCopyUrl}
          copiedUrl={copiedUrl}
        />
      );
    } else if (distribution.id === "post-purchase") {
      return (
        <PostPurchaseSettingsRefactored
          settings={postPurchaseSettings}
          onSettingsChange={onPostPurchaseSettingsChange}
        />
      );
    } else if (distribution.id === "exit-intent") {
      return (
        <ExitIntentSettingsComponent
          settings={exitIntentSettings}
          onSettingsChange={onExitIntentSettingsChange}
        />
      );
    } else if (distribution.id === "email-campaign") {
      return (
        <EmailCampaignSettingsComponent
          settings={emailCampaignSettings}
          onSettingsChange={onEmailCampaignSettingsChange}
        />
      );
    } else if (distribution.id === "onsite-popup") {
      return (
        <OnSitePopupSettingsComponent
          settings={onSitePopupSettings}
          onSettingsChange={onOnSitePopupSettingsChange}
        />
      );
    } else if (distribution.id !== "exit-intent") {
      // Default Distribution Settings (excluding exit-intent)
      const settings = (distributionSettings[distribution.id] as {
        triggerDelay: string;
        displayDuration: string;
        targetAudience: string;
      }) || {
        triggerDelay: "3",
        displayDuration: "10",
        targetAudience: "all-customers",
      };

      return (
        <DefaultDistributionSettings
          distribution={distribution}
          settings={settings}
          onSettingsChange={onUpdateDistributionSetting}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className="p-6 pt-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Distribution Settings</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select and configure multiple distribution channels for your survey
        </p>
      </div>

      <div className="space-y-4">
        {distributionTypes.map((distribution) => {
          const isEnabled = enabledDistributions.includes(distribution.id);
          const isCollapsed = expandedDistributionId !== distribution.id;

          return (
            <DistributionItem
              key={distribution.id}
              distribution={distribution}
              isEnabled={isEnabled}
              isCollapsed={isCollapsed}
              onToggleEnabled={() => onToggleDistribution(distribution.id)}
              onToggleCollapsed={() => onToggleCollapsed(distribution.id)}
            >
              {renderDistributionContent(distribution)}
            </DistributionItem>
          );
        })}
      </div>
    </div>
  );
};

export default DistributionTabRefactored;
