import React from "react";
import UserTargeting from "./post-purchase/UserTargeting";
import DisplaySettings from "./post-purchase/DisplaySettings";
import AppearanceSettings from "./post-purchase/AppearanceSettings";
import SideLogo from "./post-purchase/SideLogo";
import AdvancedFeatures from "./post-purchase/AdvancedFeatures";

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

interface PostPurchaseSettingsRefactoredProps {
  settings: PostPurchaseSettings;
  onSettingsChange: (settings: PostPurchaseSettings) => void;
}

const PostPurchaseSettingsRefactored: React.FC<PostPurchaseSettingsRefactoredProps> = ({
  settings,
  onSettingsChange,
}) => {
  const updateSetting = (key: string, value: any) => {
    const keys = key.split('.');
    let newSettings = { ...settings };

    if (keys.length === 2) {
      newSettings = {
        ...newSettings,
        [keys[0]]: { ...newSettings[keys[0] as keyof PostPurchaseSettings], [keys[1]]: value }
      };
    } else if (keys.length === 3) {
      const firstKey = keys[0] as keyof PostPurchaseSettings;
      const secondKey = keys[1];
      const thirdKey = keys[2];
      newSettings = {
        ...newSettings,
        [firstKey]: {
          ...newSettings[firstKey],
          [secondKey]: { ...newSettings[firstKey][secondKey], [thirdKey]: value }
        }
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

      <AppearanceSettings
        settings={settings.appearance}
        onSettingsChange={updateSetting}
      />

      <SideLogo
        settings={settings.sideLogo}
        onSettingsChange={updateSetting}
      />

      <AdvancedFeatures
        settings={settings.advancedFeatures}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default PostPurchaseSettingsRefactored;