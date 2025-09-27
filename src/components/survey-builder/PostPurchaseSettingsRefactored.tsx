import React from "react";
import UserTargeting from "./post-purchase/UserTargeting";
import DisplaySettings from "./post-purchase/DisplaySettings";
import PageLocationSettings from "./post-purchase/PageLocationSettings";
import LogoSettings from "./shared/LogoSettings";
import IntegratedCustomization from "./branded/IntegratedCustomization";

interface PostPurchaseSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTags: string[];
    };
    newCustomer: boolean;
    returningCustomer: boolean;
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
  display: {
    delay: number;
    position: "center" | "bottom-right" | "top-center";
    showOnPages: string[];
  };
  headerLogo: {
    enabled: boolean;
    url: string;
    width: number;
    height: number;
    position: "left" | "right" | "center";
    size: "small" | "medium" | "large";
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    width: number;
    height: number;
    position: "left" | "right";
    size: "small" | "medium" | "large";
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

interface PostPurchaseSettingsRefactoredProps {
  settings: PostPurchaseSettings;
  onSettingsChange: (settings: PostPurchaseSettings) => void;
}

const PostPurchaseSettingsRefactored: React.FC<
  PostPurchaseSettingsRefactoredProps
> = ({ settings, onSettingsChange }) => {
  const updateSetting = (
    key: string,
    value: string | boolean | number | string[]
  ) => {
    const keys = key.split(".");
    let newSettings = { ...settings };

    if (keys.length === 2) {
      newSettings = {
        ...newSettings,
        [keys[0]]: {
          ...newSettings[keys[0] as keyof PostPurchaseSettings],
          [keys[1]]: value,
        },
      };
    } else if (keys.length === 3) {
      const firstKey = keys[0] as keyof PostPurchaseSettings;
      const secondKey = keys[1];
      const thirdKey = keys[2];
      newSettings = {
        ...newSettings,
        [firstKey]: {
          ...newSettings[firstKey],
          [secondKey]: {
            ...newSettings[firstKey][secondKey],
            [thirdKey]: value,
          },
        },
      };
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      <UserTargeting
        settings={settings.userTargeting}
        onSettingsChange={updateSetting}
      />

      <PageLocationSettings
        settings={settings.postPurchasePage}
        onSettingsChange={updateSetting}
      />

      <DisplaySettings
        settings={settings.display}
        onSettingsChange={updateSetting}
      />

      <LogoSettings
        headerLogo={settings.headerLogo}
        sideLogo={settings.sideLogo}
        onSettingsChange={updateSetting}
        distributionType="post-purchase"
      />

      <IntegratedCustomization
        buttonSettings={settings.button}
        sectionSettings={settings.section}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default PostPurchaseSettingsRefactored;
