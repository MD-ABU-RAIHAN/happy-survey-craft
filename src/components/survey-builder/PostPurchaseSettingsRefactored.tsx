import React from "react";
import UserTargeting from "./post-purchase/UserTargeting";
import DisplaySettings from "./post-purchase/DisplaySettings";
import SideLogo from "./post-purchase/SideLogo";
import IntegratedCustomization from "./branded/IntegratedCustomization";

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
  sideLogo: {
    enabled: boolean;
    url: string;
    width: number;
    height: number;
    position: "left" | "right" | "center";
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
  const updateSetting = (key: string, value: any) => {
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

      <DisplaySettings
        settings={settings.display}
        onSettingsChange={updateSetting}
      />

      <SideLogo settings={settings.sideLogo} onSettingsChange={updateSetting} />

      <IntegratedCustomization
        buttonSettings={settings.button}
        sectionSettings={settings.section}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default PostPurchaseSettingsRefactored;
