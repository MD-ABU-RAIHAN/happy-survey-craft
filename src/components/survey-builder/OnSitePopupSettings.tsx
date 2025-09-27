import React from "react";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import SectionCard from "./shared/SectionCard";
import ColorPicker from "./shared/ColorPicker";
import UploadInput from "./shared/UploadInput";
import IntegratedCustomization from "./branded/IntegratedCustomization";
import { Globe, Monitor, Upload, Palette } from "lucide-react";

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

interface OnSitePopupSettingsProps {
  settings: OnSitePopupSettings;
  onSettingsChange: (settings: OnSitePopupSettings) => void;
}

const OnSitePopupSettingsComponent: React.FC<OnSitePopupSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const updateSetting = (
    key: string,
    value: string | boolean | number | File | null
  ) => {
    const keys = key.split(".");
    let newSettings = { ...settings };

    if (keys.length === 2) {
      newSettings = {
        ...newSettings,
        [keys[0]]: {
          ...newSettings[keys[0] as keyof OnSitePopupSettings],
          [keys[1]]: value,
        },
      };
    } else if (keys.length === 3) {
      const firstKey = keys[0] as keyof OnSitePopupSettings;
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
    } else if (keys.length === 4) {
      const firstKey = keys[0] as keyof OnSitePopupSettings;
      const secondKey = keys[1];
      const thirdKey = keys[2];
      const fourthKey = keys[3];
      newSettings = {
        ...newSettings,
        [firstKey]: {
          ...newSettings[firstKey],
          [secondKey]: {
            ...newSettings[firstKey][secondKey],
            [thirdKey]: {
              ...newSettings[firstKey][secondKey][thirdKey],
              [fourthKey]: value,
            },
          },
        },
      };
    } else if (keys.length === 1) {
      newSettings = { ...newSettings, [keys[0]]: value };
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      {/* Page Targeting Section */}
      <SectionCard
        title="Page Targeting"
        icon={<Globe className="w-5 h-5 text-secondary-brand" />}
        badge={
          <Badge
            variant="secondary"
            className="text-xs bg-secondary-brand/10 text-secondary-brand"
          >
            Step 1
          </Badge>
        }
        className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 border-secondary-brand/10"
      >
        <div className="bg-survey-info-light/30 border border-survey-info/20 rounded-lg p-3 mb-4">
          <p className="text-xs text-survey-info flex items-start gap-2">
            <span className="text-survey-info font-bold text-sm">💡</span>
            <span>
              <strong>Tip:</strong> On-site popups work best when targeted to
              specific pages. Consider visitor behavior when choosing page
              targeting.
            </span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="font-medium">Target Pages</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="all-pages"
                  name="pageTargetType"
                  value="all-pages"
                  checked={settings.pageTargeting.type === "all-pages"}
                  onChange={() =>
                    updateSetting("pageTargeting.type", "all-pages")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="all-pages" className="text-sm cursor-pointer">
                  All Pages
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="specific-pages"
                  name="pageTargetType"
                  value="specific-pages"
                  checked={settings.pageTargeting.type === "specific-pages"}
                  onChange={() =>
                    updateSetting("pageTargeting.type", "specific-pages")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label
                  htmlFor="specific-pages"
                  className="text-sm cursor-pointer"
                >
                  Specific Pages
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="exclude-pages"
                  name="pageTargetType"
                  value="exclude-pages"
                  checked={settings.pageTargeting.type === "exclude-pages"}
                  onChange={() =>
                    updateSetting("pageTargeting.type", "exclude-pages")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label
                  htmlFor="exclude-pages"
                  className="text-sm cursor-pointer"
                >
                  Exclude Pages
                </Label>
              </div>
            </div>
          </div>

          {settings.pageTargeting.type === "specific-pages" && (
            <div className="space-y-4 ml-6">
              <Label className="text-sm font-medium">
                Select Pages to Include:
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.specificPages.homePage}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.homePage",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Home Page</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      settings.pageTargeting.specificPages.productPages.enabled
                    }
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.productPages.enabled",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Product Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.specificPages.blogPages}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.blogPages",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Blog Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      settings.pageTargeting.specificPages.collectionPages
                    }
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.collectionPages",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Collection Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.specificPages.cartPage}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.cartPage",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Cart Page</Label>
                </div>
              </div>
            </div>
          )}

          {settings.pageTargeting.type === "exclude-pages" && (
            <div className="space-y-4 ml-6">
              <Label className="text-sm font-medium">
                Select Pages to Exclude:
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.excludePages.homePage}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.excludePages.homePage",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Home Page</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.excludePages.productPages}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.excludePages.productPages",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Product Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.excludePages.blogPages}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.excludePages.blogPages",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Blog Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      settings.pageTargeting.excludePages.collectionPages
                    }
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.excludePages.collectionPages",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Collection Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.excludePages.cartPage}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.excludePages.cartPage",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Cart Page</Label>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Display Settings */}
      <SectionCard
        title="Display Settings"
        icon={<Monitor className="w-5 h-5 text-survey-info" />}
      >
        <div className="space-y-2">
          <Label className="text-sm">Position</Label>
          <Select
            value={settings.display.position}
            onValueChange={(value) => updateSetting("display.position", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      {/* Side Logo Settings */}
      <SectionCard
        title="Side Logo"
        icon={<Upload className="w-5 h-5 text-survey-purple" />}
      >
        <div className="flex items-center justify-between mb-4">
          <Label className="font-medium">Enable Side Logo</Label>
          <SlimSwitch
            checked={settings.sideLogo.enabled}
            onCheckedChange={(checked) =>
              updateSetting("sideLogo.enabled", checked)
            }
          />
        </div>

        {settings.sideLogo.enabled && (
          <div className="space-y-4">
            <UploadInput
              label="Logo URL"
              value={settings.sideLogo.url}
              onChange={(value) => updateSetting("sideLogo.url", value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Size</Label>
                <Select
                  value={settings.sideLogo.size}
                  onValueChange={(value) =>
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
                <Label className="text-xs">Position</Label>
                <Select
                  value={settings.sideLogo.position}
                  onValueChange={(value) =>
                    updateSetting("sideLogo.position", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm">Minimized</Label>
              <SlimSwitch
                checked={settings.sideLogo.minimized}
                onCheckedChange={(checked) =>
                  updateSetting("sideLogo.minimized", checked)
                }
              />
            </div>
          </div>
        )}
      </SectionCard>

      {/* Integrated Customization */}
      <IntegratedCustomization
        buttonSettings={{
          enabled: !settings.button.minimized,
          backgroundColor: settings.button.backgroundColor,
          textColor: settings.button.textColor,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: "medium",
          backgroundHoverColor: settings.button.backgroundHoverColor,
          shadow: true,
        }}
        sectionSettings={{
          primaryText: "On-Site Popup",
          secondaryText: "Please take our survey",
          accentColor: settings.section.accentColor,
          backgroundColor: settings.section.backgroundColor,
          backgroundType: "solid",
          gradientFrom: "#3b82f6",
          gradientTo: "#8b5cf6",
          gradientDirection: "to-right",
          backgroundImage: "",
          backgroundImageOpacity: 100,
          backgroundImagePosition: "center",
          customCss: "",
          enableCustomCss: false,
        }}
        onSettingsChange={(key: string, value: string | boolean | number) => {
          // Transform the new structure back to the old interface
          if (key.startsWith("button.enabled")) {
            updateSetting("button.minimized", !value);
          } else if (key.startsWith("button.")) {
            updateSetting(key, value);
          } else if (key.startsWith("section.primaryText")) {
            // Ignore text changes for simplified interface
          } else if (key.startsWith("section.secondaryText")) {
            // Ignore text changes for simplified interface
          } else if (key.startsWith("section.accentColor")) {
            updateSetting("section.accentColor", value);
          } else if (key.startsWith("section.backgroundColor")) {
            updateSetting("section.backgroundColor", value);
          }
        }}
      />
    </div>
  );
};

export default OnSitePopupSettingsComponent;
