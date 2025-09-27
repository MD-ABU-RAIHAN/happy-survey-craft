import React from "react";
import SurveyUrlSection from "./branded/SurveyUrlSection";
import LogoSettings from "./branded/LogoSettings";
import IntegratedCustomization from "./branded/IntegratedCustomization";

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

interface BrandedSurveySettingsRefactoredProps {
  settings: BrandedSurveySettings;
  onSettingsChange: (settings: BrandedSurveySettings) => void;
  onResetToDefault: () => void;
  onGenerateNewUrl: () => void;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const BrandedSurveySettingsRefactored: React.FC<
  BrandedSurveySettingsRefactoredProps
> = ({
  settings,
  onSettingsChange,
  onResetToDefault,
  onGenerateNewUrl,
  onCopyUrl,
  copiedUrl,
}) => {
  const updateSetting = (key: string, value: string | number | boolean) => {
    const keys = key.split(".");
    if (keys.length === 1) {
      onSettingsChange({ ...settings, [key]: value });
    } else if (keys.length === 2) {
      const parentKey = keys[0] as keyof BrandedSurveySettings;
      const parentObject = settings[parentKey];
      if (typeof parentObject === "object" && parentObject !== null) {
        onSettingsChange({
          ...settings,
          [parentKey]: { ...parentObject, [keys[1]]: value },
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <SurveyUrlSection
        settings={{
          useCustomDomain: settings.useCustomDomain,
          customDomain: settings.customDomain,
          customUrl: settings.customUrl,
        }}
        onSettingsChange={updateSetting}
        onResetToDefault={onResetToDefault}
        onGenerateNewUrl={onGenerateNewUrl}
        onCopyUrl={onCopyUrl}
        copiedUrl={copiedUrl}
      />

      <LogoSettings
        headerLogo={settings.headerLogo}
        sideLogo={settings.sideLogo}
        onSettingsChange={updateSetting}
      />

      <IntegratedCustomization
        buttonSettings={settings.button}
        sectionSettings={settings.section}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default BrandedSurveySettingsRefactored;
