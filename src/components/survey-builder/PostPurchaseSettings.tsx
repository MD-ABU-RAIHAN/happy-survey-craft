import React from "react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Tag,
  ShoppingCart,
  Monitor,
  Upload,
  Settings,
  Palette,
} from "lucide-react";

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
    enabled: boolean;
  };
}

interface PostPurchaseSettingsProps {
  settings: PostPurchaseSettings;
  onSettingsChange: (settings: PostPurchaseSettings) => void;
}

const PostPurchaseSettingsComponent: React.FC<PostPurchaseSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
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
      {/* User Targeting Section */}
      <div className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 rounded-lg p-6 space-y-4 border border-secondary-brand/10">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary-brand" />
            User Targeting
          </h5>
          <Badge
            variant="secondary"
            className="text-xs bg-secondary-brand/10 text-secondary-brand"
          >
            Step 1
          </Badge>
        </div>

        {/* Help Text */}
        <div className="bg-survey-info-light/30 border border-survey-info/20 rounded-lg p-3">
          <p className="text-xs text-survey-info flex items-start gap-2">
            <span className="text-survey-info font-bold text-sm">💡</span>
            <span>
              <strong>Tip:</strong> Start with "All Users" for maximum reach,
              then refine your targeting based on response data. Segment
              targeting can increase relevance but may reduce overall responses.
            </span>
          </p>
        </div>

        <div className="space-y-6">
          {/* Target Type Selection */}
          <div className="space-y-3">
            <Label className="font-medium">Target Audience</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="all-users"
                  name="targetType"
                  value="all-users"
                  checked={settings.userTargeting.type === "all-users"}
                  onChange={() =>
                    updateSetting("userTargeting.type", "all-users")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="all-users" className="text-sm cursor-pointer">
                  All Users
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="segment-users"
                  name="targetType"
                  value="segment-users"
                  checked={settings.userTargeting.type === "segment-users"}
                  onChange={() =>
                    updateSetting("userTargeting.type", "segment-users")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label
                  htmlFor="segment-users"
                  className="text-sm cursor-pointer"
                >
                  A Segment of Users
                </Label>
              </div>
            </div>
          </div>

          {/* Segment Options */}
          {settings.userTargeting.type === "segment-users" && (
            <div className="space-y-4 ml-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <SlimSwitch
                    checked={settings.userTargeting.userTag.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting("userTargeting.userTag.enabled", checked)
                    }
                  />
                  <Label className="text-sm">Filter by User Tag</Label>
                </div>
                {settings.userTargeting.userTag.enabled && (
                  <Select
                    value={settings.userTargeting.userTag.selectedTag}
                    onValueChange={(value) =>
                      updateSetting("userTargeting.userTag.selectedTag", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vip">VIP Customer</SelectItem>
                      <SelectItem value="premium">Premium User</SelectItem>
                      <SelectItem value="loyal">Loyal Customer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Customer Type</Label>
                <Select
                  value={settings.userTargeting.customerType}
                  onValueChange={(value) =>
                    updateSetting("userTargeting.customerType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="return">Returning Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <SlimSwitch
                    checked={settings.userTargeting.productPurchase.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "userTargeting.productPurchase.enabled",
                        checked
                      )
                    }
                  />
                  <Label className="text-sm">Filter by Product Purchase</Label>
                </div>
                {settings.userTargeting.productPurchase.enabled && (
                  <div className="space-y-2">
                    <Label className="text-xs">Select Products:</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Product A", "Product B", "Product C", "Product D"].map(
                        (product) => (
                          <div
                            key={product}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={settings.userTargeting.productPurchase.selectedProducts.includes(
                                product
                              )}
                              onCheckedChange={(checked) => {
                                const currentProducts =
                                  settings.userTargeting.productPurchase
                                    .selectedProducts;
                                const updatedProducts = checked
                                  ? [...currentProducts, product]
                                  : currentProducts.filter(
                                      (p) => p !== product
                                    );
                                updateSetting(
                                  "userTargeting.productPurchase.selectedProducts",
                                  updatedProducts
                                );
                              }}
                            />
                            <Label className="text-xs">{product}</Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
        <h5 className="font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5 text-survey-purple" />
          Display Settings
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Show Delay (seconds)</Label>
            <Input
              type="number"
              value={settings.display.delay}
              onChange={(e) =>
                updateSetting("display.delay", parseInt(e.target.value))
              }
              min={0}
              max={30}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Position</Label>
            <Select
              value={settings.display.position}
              onValueChange={(value) =>
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
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
        <h5 className="font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5 text-survey-success" />
          Appearance
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Primary Color</Label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={settings.appearance.primaryColor}
                onChange={(e) =>
                  updateSetting("appearance.primaryColor", e.target.value)
                }
                className="w-16"
              />
              <Input
                value={settings.appearance.primaryColor}
                onChange={(e) =>
                  updateSetting("appearance.primaryColor", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Background Color</Label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={settings.appearance.backgroundColor}
                onChange={(e) =>
                  updateSetting("appearance.backgroundColor", e.target.value)
                }
                className="w-16"
              />
              <Input
                value={settings.appearance.backgroundColor}
                onChange={(e) =>
                  updateSetting("appearance.backgroundColor", e.target.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Border Radius</Label>
            <Input
              type="number"
              value={settings.appearance.borderRadius}
              onChange={(e) =>
                updateSetting(
                  "appearance.borderRadius",
                  parseInt(e.target.value)
                )
              }
              min={0}
              max={20}
            />
          </div>
          <div className="space-y-2 flex items-center">
            <SlimSwitch
              checked={settings.appearance.shadow}
              onCheckedChange={(checked) =>
                updateSetting("appearance.shadow", checked)
              }
            />
            <Label className="text-sm ml-2">Drop Shadow</Label>
          </div>
        </div>
      </div>

      {/* Side Logo */}
      <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
        <div className="flex items-center justify-between">
          <Label className="font-medium">Side Logo</Label>
          <SlimSwitch
            checked={settings.sideLogo.enabled}
            onCheckedChange={(checked) =>
              updateSetting("sideLogo.enabled", checked)
            }
          />
        </div>

        {settings.sideLogo.enabled && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Logo URL</Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="https://example.com/logo.png"
                  value={settings.sideLogo.url}
                  onChange={(e) =>
                    updateSetting("sideLogo.url", e.target.value)
                  }
                />
                <Button variant="outline">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Width</Label>
                <Input
                  type="number"
                  value={settings.sideLogo.width}
                  onChange={(e) =>
                    updateSetting("sideLogo.width", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Height</Label>
                <Input
                  type="number"
                  value={settings.sideLogo.height}
                  onChange={(e) =>
                    updateSetting("sideLogo.height", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="space-y-1">
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
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPurchaseSettingsComponent;
