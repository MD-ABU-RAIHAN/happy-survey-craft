import React from "react";
import { UserTargeting, PageLocationSettings } from "./components";

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
    </div>
  );
};

export default PostPurchaseSettingsRefactored;
