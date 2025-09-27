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
import LogoSettings from "./shared/LogoSettings";
import IntegratedCustomization from "./branded/IntegratedCustomization";
import { Globe, Monitor, Upload } from "lucide-react";

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

interface OnSitePopupSettingsRefactoredProps {
  settings: OnSitePopupSettings;
  onSettingsChange: (settings: OnSitePopupSettings) => void;
}

const OnSitePopupSettingsRefactored: React.FC<
  OnSitePopupSettingsRefactoredProps
> = ({ settings, onSettingsChange }) => {
  const availableProducts = [
    { id: "prod-1", name: "Premium T-Shirt", category: "Apparel" },
    { id: "prod-2", name: "Wireless Headphones", category: "Electronics" },
    { id: "prod-3", name: "Coffee Mug Set", category: "Home & Kitchen" },
    { id: "prod-4", name: "Laptop Stand", category: "Office" },
    { id: "prod-5", name: "Yoga Mat", category: "Fitness" },
  ];

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
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      {/* Page Targeting */}
      <SectionCard
        icon={<Globe className="w-5 h-5 text-green-600" />}
        title="Page Targeting"
        description="Choose which pages the popup will appear on"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Target Pages</Label>
            <Select
              value={settings.pageTargeting.type}
              onValueChange={(
                value: "all-pages" | "specific-pages" | "exclude-pages"
              ) => updateSetting("pageTargeting.type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-pages">All pages</SelectItem>
                <SelectItem value="specific-pages">
                  Specific pages only
                </SelectItem>
                <SelectItem value="exclude-pages">
                  Exclude specific pages
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.pageTargeting.type === "specific-pages" && (
            <div className="space-y-4 pl-4 border-l-2 border-green-200">
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
                  <Label className="text-sm">Home page</Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={
                        settings.pageTargeting.specificPages.productPages
                          .enabled
                      }
                      onCheckedChange={(checked) =>
                        updateSetting(
                          "pageTargeting.specificPages.productPages.enabled",
                          checked
                        )
                      }
                    />
                    <Label className="text-sm">Product pages</Label>
                  </div>

                  {settings.pageTargeting.specificPages.productPages
                    .enabled && (
                    <div className="pl-6 space-y-2">
                      <Select
                        value={
                          settings.pageTargeting.specificPages.productPages.type
                        }
                        onValueChange={(value: "all" | "specific") =>
                          updateSetting(
                            "pageTargeting.specificPages.productPages.type",
                            value
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All product pages</SelectItem>
                          <SelectItem value="specific">
                            Specific products
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {settings.pageTargeting.specificPages.productPages
                        .type === "specific" && (
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Select products:
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {availableProducts.map((product) => (
                              <Badge
                                key={product.id}
                                variant={
                                  settings.pageTargeting.specificPages.productPages.selectedProducts.includes(
                                    product.id
                                  )
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer text-xs"
                                onClick={() => {
                                  const selected =
                                    settings.pageTargeting.specificPages
                                      .productPages.selectedProducts;
                                  const newSelected = selected.includes(
                                    product.id
                                  )
                                    ? selected.filter((id) => id !== product.id)
                                    : [...selected, product.id];
                                  updateSetting(
                                    "pageTargeting.specificPages.productPages.selectedProducts",
                                    newSelected
                                  );
                                }}
                              >
                                {product.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                  <Label className="text-sm">Blog pages</Label>
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
                  <Label className="text-sm">Collection pages</Label>
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
                  <Label className="text-sm">Cart page</Label>
                </div>
              </div>
            </div>
          )}

          {settings.pageTargeting.type === "exclude-pages" && (
            <div className="space-y-4 pl-4 border-l-2 border-red-200">
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
                  <Label className="text-sm">Home page</Label>
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
                  <Label className="text-sm">Product pages</Label>
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
                  <Label className="text-sm">Collection pages</Label>
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
                  <Label className="text-sm">Cart page</Label>
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
                  <Label className="text-sm">Blog pages</Label>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Display Settings */}
      <SectionCard
        icon={<Monitor className="w-5 h-5 text-blue-600" />}
        title="Display Settings"
        description="Configure popup display preferences"
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">Position</Label>
          <Select
            value={settings.display.position}
            onValueChange={(value: "center" | "bottom-right" | "top-center") =>
              updateSetting("display.position", value)
            }
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

      {/* Logo Settings */}
      <LogoSettings
        headerLogo={settings.headerLogo}
        sideLogo={settings.sideLogo}
        onSettingsChange={updateSetting}
        distributionType="onsite-popup"
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

export default OnSitePopupSettingsRefactored;
