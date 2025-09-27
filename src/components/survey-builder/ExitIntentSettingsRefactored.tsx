import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MousePointer } from "lucide-react";
import SectionCard from "./shared/SectionCard";
import LogoSettings from "./shared/LogoSettings";
import IntegratedCustomization from "./branded/IntegratedCustomization";

interface ExitIntentSettings {
  showPopup: {
    emptyCart: boolean;
    hasProducts: boolean;
  };
  recurrence: "only-once" | "every-incomplete";
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

interface ExitIntentSettingsRefactoredProps {
  settings: ExitIntentSettings;
  onSettingsChange: (settings: ExitIntentSettings) => void;
}

const ExitIntentSettingsRefactored: React.FC<
  ExitIntentSettingsRefactoredProps
> = ({ settings, onSettingsChange }) => {
  const updateSetting = (key: string, value: any) => {
    const keys = key.split(".");
    let newSettings = { ...settings };

    if (keys.length === 1) {
      newSettings = {
        ...newSettings,
        [keys[0]]: value,
      };
    } else if (keys.length === 2) {
      newSettings = {
        ...newSettings,
        [keys[0]]: {
          ...newSettings[keys[0] as keyof ExitIntentSettings],
          [keys[1]]: value,
        },
      };
    } else if (keys.length === 3) {
      const firstKey = keys[0] as keyof ExitIntentSettings;
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
      {/* Exit Intent Trigger Settings */}
      <SectionCard
        icon={<MousePointer className="w-5 h-5 text-orange-600" />}
        title="Exit Intent Settings"
        description="Configure when and how the exit intent survey appears"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Show Popup When</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Cart is empty</Label>
                <SlimSwitch
                  checked={settings.showPopup.emptyCart}
                  onCheckedChange={(checked) =>
                    updateSetting("showPopup.emptyCart", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Cart has products</Label>
                <SlimSwitch
                  checked={settings.showPopup.hasProducts}
                  onCheckedChange={(checked) =>
                    updateSetting("showPopup.hasProducts", checked)
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Recurrence</Label>
            <Select
              value={settings.recurrence}
              onValueChange={(value: "only-once" | "every-incomplete") =>
                updateSetting("recurrence", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="only-once">
                  Show only once per visitor
                </SelectItem>
                <SelectItem value="every-incomplete">
                  Show on every incomplete session
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      {/* Logo Settings */}
      <LogoSettings
        headerLogo={settings.headerLogo}
        sideLogo={settings.sideLogo}
        onSettingsChange={updateSetting}
        distributionType="exit-intent"
      />

      {/* Customization Settings */}
      <IntegratedCustomization
        buttonSettings={settings.button}
        sectionSettings={settings.section}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default ExitIntentSettingsRefactored;
