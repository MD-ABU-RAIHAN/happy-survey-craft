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
import { Input } from "@/components/ui/input";
import { SectionCard } from "../../shared";
import { IntegratedCustomization } from "../branded-survey/components";
import { UserTargeting } from "../post-purchase/components";
import { Globe, Clock, Repeat } from "lucide-react";

interface OnSitePopupSettings {
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
  timing: {
    type:
      | "standard"
      | "immediate"
      | "custom-trigger"
      | "advanced-triggers";
    delay: number;
    customTriggerCode: string;
    advancedTriggers: {
      timeOnSite: {
        enabled: boolean;
        seconds: number;
      };
      idleTime: {
        enabled: boolean;
        seconds: number;
      };
      scrollDepth: {
        enabled: boolean;
        percentage: number;
      };
    };
  };
  recurrence:
    | "only-once"
    | "once-per-session";
  pageTargeting: {
    type: "all-pages" | "specific-pages";
    excludePagesEnabled: boolean;
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
      customPages: {
        enabled: boolean;
        selectedPages: string[];
      };
    };
    excludePages: {
      homePage: boolean;
      productPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
      blogPages: boolean;
      customPages: {
        enabled: boolean;
        selectedPages: string[];
      };
    };
  };
  display: {
    position: "bottom-left" | "center" | "bottom-right";
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

  const availablePages = [
    { id: "page-1", name: "About Us" },
    { id: "page-2", name: "Contact" },
    { id: "page-3", name: "FAQ" },
    { id: "page-4", name: "Terms & Conditions" },
    { id: "page-5", name: "Privacy Policy" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. User Targeting */}
      <UserTargeting
        settings={settings.userTargeting}
        onSettingsChange={updateSetting}
      />

      {/* 2. Page Targeting */}
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
              onValueChange={(value: "all-pages" | "specific-pages") =>
                updateSetting("pageTargeting.type", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-pages">All pages</SelectItem>
                <SelectItem value="specific-pages">
                  Specific pages only
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* All Pages - Show Exclude Pages Checkbox */}
          {settings.pageTargeting.type === "all-pages" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={settings.pageTargeting.excludePagesEnabled}
                  onCheckedChange={(checked) =>
                    updateSetting("pageTargeting.excludePagesEnabled", checked === true)
                  }
                />
                <Label className="text-sm font-medium">Exclude pages</Label>
              </div>

              {settings.pageTargeting.excludePagesEnabled && (
                <div className="space-y-3 pl-4 border-l-2 border-red-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={settings.pageTargeting.excludePages.homePage}
                      onCheckedChange={(checked) =>
                        updateSetting(
                          "pageTargeting.excludePages.homePage",
                          checked === true
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
                          checked === true
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
                          checked === true
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
                          checked === true
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
                          checked === true
                        )
                      }
                    />
                    <Label className="text-sm">Blog pages</Label>
                  </div>

                  {/* Custom Pages for Exclude */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={
                          settings.pageTargeting.excludePages.customPages.enabled
                        }
                        onCheckedChange={(checked) =>
                          updateSetting(
                            "pageTargeting.excludePages.customPages.enabled",
                            checked === true
                          )
                        }
                      />
                      <Label className="text-sm">Pages</Label>
                    </div>
                    {settings.pageTargeting.excludePages.customPages.enabled && (
                      <div className="pl-6 space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Select pages to exclude:
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {availablePages.map((page) => (
                            <Badge
                              key={page.id}
                              variant={
                                settings.pageTargeting.excludePages.customPages.selectedPages.includes(
                                  page.id
                                )
                                  ? "default"
                                  : "outline"
                              }
                              className="cursor-pointer text-xs"
                              onClick={() => {
                                const selected =
                                  settings.pageTargeting.excludePages.customPages
                                    .selectedPages;
                                const newSelected = selected.includes(page.id)
                                  ? selected.filter((id) => id !== page.id)
                                  : [...selected, page.id];
                                updateSetting(
                                  "pageTargeting.excludePages.customPages.selectedPages",
                                  newSelected
                                );
                              }}
                            >
                              {page.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specific Pages - Show Include Pages */}
          {settings.pageTargeting.type === "specific-pages" && (
            <div className="space-y-4 pl-4 border-l-2 border-green-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.pageTargeting.specificPages.homePage}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "pageTargeting.specificPages.homePage",
                        checked === true
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
                          checked === true
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
                        checked === true
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
                        checked === true
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
                        checked === true
                      )
                    }
                  />
                  <Label className="text-sm">Cart page</Label>
                </div>

                {/* Custom Pages for Specific */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={
                        settings.pageTargeting.specificPages.customPages.enabled
                      }
                      onCheckedChange={(checked) =>
                        updateSetting(
                          "pageTargeting.specificPages.customPages.enabled",
                          checked === true
                        )
                      }
                    />
                    <Label className="text-sm">Pages</Label>
                  </div>
                  {settings.pageTargeting.specificPages.customPages.enabled && (
                    <div className="pl-6 space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Select pages:
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {availablePages.map((page) => (
                          <Badge
                            key={page.id}
                            variant={
                              settings.pageTargeting.specificPages.customPages.selectedPages.includes(
                                page.id
                              )
                                ? "default"
                                : "outline"
                            }
                            className="cursor-pointer text-xs"
                            onClick={() => {
                              const selected =
                                settings.pageTargeting.specificPages.customPages
                                  .selectedPages;
                              const newSelected = selected.includes(page.id)
                                ? selected.filter((id) => id !== page.id)
                                : [...selected, page.id];
                              updateSetting(
                                "pageTargeting.specificPages.customPages.selectedPages",
                                newSelected
                              );
                            }}
                          >
                            {page.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* 3. Timing */}
      <SectionCard
        icon={<Clock className="w-5 h-5 text-orange-600" />}
        title="Timing"
        description="When should the widget be displayed?"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Display Trigger</Label>
            <Select
              value={settings.timing.type}
              onValueChange={(
                value:
                  | "standard"
                  | "immediate"
                  | "custom-trigger"
                  | "advanced-triggers"
              ) => updateSetting("timing.type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">
                  Standard 10 seconds after page load
                </SelectItem>
                <SelectItem value="immediate">Show immediately</SelectItem>
                <SelectItem value="custom-trigger">
                  Custom trigger (Javascript trigger for button clicks etc)
                </SelectItem>
                <SelectItem value="advanced-triggers">
                  Advanced triggers ( Timer / Idle / Scroll )
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.timing.type === "custom-trigger" && (
            <div className="space-y-2">
              <Label className="text-sm">Javascript Trigger Code</Label>
              <Input
                type="text"
                value={settings.timing.customTriggerCode}
                onChange={(e) =>
                  updateSetting("timing.customTriggerCode", e.target.value)
                }
                placeholder='asklayer.triggerSurvey("gsoMowUy88OlUviJL1mW")'
              />
              <p className="text-xs text-muted-foreground">
                Trigger using Javascript for advanced users and developers.{" "}
                <a href="#" className="text-blue-600 underline">
                  How to use this
                </a>
              </p>
            </div>
          )}

          {settings.timing.type === "advanced-triggers" && (
            <div className="space-y-4 pl-4 border-l-2 border-orange-200">
              {/* Time on Site */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.timing.advancedTriggers.timeOnSite.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "timing.advancedTriggers.timeOnSite.enabled",
                        checked === true
                      )
                    }
                  />
                  <Label className="text-sm">Time on site longer than</Label>
                </div>
                {settings.timing.advancedTriggers.timeOnSite.enabled && (
                  <div className="pl-6">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={
                          settings.timing.advancedTriggers.timeOnSite.seconds
                        }
                        onChange={(e) =>
                          updateSetting(
                            "timing.advancedTriggers.timeOnSite.seconds",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        seconds
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Idle Time */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={settings.timing.advancedTriggers.idleTime.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "timing.advancedTriggers.idleTime.enabled",
                        checked === true
                      )
                    }
                  />
                  <Label className="text-sm">Idle on site for</Label>
                </div>
                {settings.timing.advancedTriggers.idleTime.enabled && (
                  <div className="pl-6">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={settings.timing.advancedTriggers.idleTime.seconds}
                        onChange={(e) =>
                          updateSetting(
                            "timing.advancedTriggers.idleTime.seconds",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20"
                        min="0"
                      />
                      <span className="text-sm text-muted-foreground">
                        seconds
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Scroll Depth */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={
                      settings.timing.advancedTriggers.scrollDepth.enabled
                    }
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "timing.advancedTriggers.scrollDepth.enabled",
                        checked === true
                      )
                    }
                  />
                  <Label className="text-sm">Scroll depth reaches</Label>
                </div>
                {settings.timing.advancedTriggers.scrollDepth.enabled && (
                  <div className="pl-6">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={
                          settings.timing.advancedTriggers.scrollDepth.percentage
                        }
                        onChange={(e) =>
                          updateSetting(
                            "timing.advancedTriggers.scrollDepth.percentage",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20"
                        min="0"
                        max="100"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* 4. Survey Frequency */}
      <SectionCard
        icon={<Repeat className="w-5 h-5 text-purple-600" />}
        title="Survey Frequency"
        description="How often should users see this survey?"
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">Show Survey</Label>
          <Select
            value={settings.recurrence}
            onValueChange={(
              value: "only-once" | "once-per-session"
            ) => updateSetting("recurrence", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="only-once">Only once</SelectItem>
              <SelectItem value="once-per-session">
                Once per session, never again if completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      {/* 5. Display Position */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Position</Label>
        <Select
          value={settings.display.position}
          onValueChange={(
            value: "bottom-left" | "center" | "bottom-right"
          ) => updateSetting("display.position", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bottom-left">Bottom Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="bottom-right">Bottom Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 6. Customization Settings */}
      <IntegratedCustomization
        buttonSettings={settings.button}
        sectionSettings={settings.section}
        onSettingsChange={updateSetting}
      />
    </div>
  );
};

export default OnSitePopupSettingsRefactored;
