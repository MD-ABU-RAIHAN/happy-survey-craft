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
import UploadInput from "./shared/UploadInput";
import IntegratedCustomization from "./branded/IntegratedCustomization";

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

    if (keys.length === 2) {
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
        icon={MousePointer}
        title="Exit Intent Settings"
        description="Configure when and how the exit intent survey appears"
        color="text-orange-600"
        bgColor="bg-orange-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Show Popup When</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SlimSwitch
                  checked={settings.showPopup.emptyCart}
                  onCheckedChange={(checked) =>
                    updateSetting("showPopup.emptyCart", checked)
                  }
                />
                <Label className="text-sm">Cart is empty</Label>
              </div>
              <div className="flex items-center space-x-2">
                <SlimSwitch
                  checked={settings.showPopup.hasProducts}
                  onCheckedChange={(checked) =>
                    updateSetting("showPopup.hasProducts", checked)
                  }
                />
                <Label className="text-sm">Cart has products</Label>
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

      {/* Side Logo Settings */}
      <SectionCard
        icon={MousePointer}
        title="Side Logo"
        description="Add your brand logo to the survey"
        color="text-blue-600"
        bgColor="bg-blue-50"
        collapsible
        defaultExpanded={settings.sideLogo.enabled}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <SlimSwitch
              checked={settings.sideLogo.enabled}
              onCheckedChange={(checked) =>
                updateSetting("sideLogo.enabled", checked)
              }
            />
            <Label className="text-sm">Enable side logo</Label>
          </div>

          {settings.sideLogo.enabled && (
            <div className="space-y-4 pl-6">
              <UploadInput
                label="Logo Image"
                value={settings.sideLogo.url}
                file={settings.sideLogo.file}
                onChange={(url, file) => {
                  updateSetting("sideLogo.url", url);
                  updateSetting("sideLogo.file", file);
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Size</Label>
                  <Select
                    value={settings.sideLogo.size}
                    onValueChange={(value: "small" | "medium" | "large") =>
                      updateSetting("sideLogo.size", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Position</Label>
                  <Select
                    value={settings.sideLogo.position}
                    onValueChange={(value: "left" | "right") =>
                      updateSetting("sideLogo.position", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

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
