import React from "react";
import QuillEditor from "./shared/QuillEditor";
import "react-quill/dist/quill.snow.css";
import "../../styles/quill-custom.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Mail, Users, ShoppingCart, Upload, Type, Palette } from "lucide-react";

interface EmailCampaignSettings {
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
  emailConfig: {
    delayAfter: number;
    sendFrom: string;
    blockDuplicate: number;
  };
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right" | "center";
    minimized: boolean;
  };
  content: {
    subject: string;
    body: string; // Rich text HTML content
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    minimized: boolean;
  };
  background: {
    type: "solid" | "gradient" | "image";
    solidColor: string;
    gradientStart: string;
    gradientEnd: string;
    gradientDirection:
      | "to-r"
      | "to-l"
      | "to-t"
      | "to-b"
      | "to-br"
      | "to-bl"
      | "to-tr"
      | "to-tl";
    imageUrl: string;
    imageFile: File | null;
    imagePosition: "center" | "top" | "bottom" | "left" | "right";
    imageSize: "cover" | "contain" | "auto";
    overlay: boolean;
    overlayColor: string;
    overlayOpacity: number;
  };
}

interface EmailCampaignSettingsProps {
  settings: EmailCampaignSettings;
  onSettingsChange: (settings: EmailCampaignSettings) => void;
}

const EmailCampaignSettingsComponent: React.FC<EmailCampaignSettingsProps> = ({
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
          ...newSettings[keys[0] as keyof EmailCampaignSettings],
          [keys[1]]: value,
        },
      };
    } else if (keys.length === 3) {
      const firstKey = keys[0] as keyof EmailCampaignSettings;
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
    } else if (keys.length === 1) {
      newSettings = { ...newSettings, [keys[0]]: value };
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      {/* User Targeting Section */}
      <SectionCard
        title="User Targeting"
        icon={<Users className="w-5 h-5 text-secondary-brand" />}
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
              <strong>Tip:</strong> Email campaigns are great for follow-up
              surveys. Target specific customer segments for better response
              rates.
            </span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="font-medium">Target Audience</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="email-all-users"
                  name="emailTargetType"
                  value="all-users"
                  checked={settings.userTargeting.type === "all-users"}
                  onChange={() =>
                    updateSetting("userTargeting.type", "all-users")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label
                  htmlFor="email-all-users"
                  className="text-sm cursor-pointer"
                >
                  All Users
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="email-segment-users"
                  name="emailTargetType"
                  value="segment-users"
                  checked={settings.userTargeting.type === "segment-users"}
                  onChange={() =>
                    updateSetting("userTargeting.type", "segment-users")
                  }
                  className="w-4 h-4 text-primary"
                />
                <Label
                  htmlFor="email-segment-users"
                  className="text-sm cursor-pointer"
                >
                  A Segment of Users
                </Label>
              </div>
            </div>
          </div>

          {settings.userTargeting.type === "segment-users" && (
            <div className="space-y-4 ml-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
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
                  <Switch
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
      </SectionCard>

      {/* Email Configuration */}
      <SectionCard
        title="Email Configuration"
        icon={<Mail className="w-5 h-5 text-survey-info" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm">Send After (Days)</Label>
            <Input
              type="number"
              value={settings.emailConfig.delayAfter}
              onChange={(e) =>
                updateSetting(
                  "emailConfig.delayAfter",
                  parseInt(e.target.value)
                )
              }
              min={0}
              max={365}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Block Duplicate for (Days)</Label>
            <Input
              type="number"
              value={settings.emailConfig.blockDuplicate}
              onChange={(e) =>
                updateSetting(
                  "emailConfig.blockDuplicate",
                  parseInt(e.target.value)
                )
              }
              min={1}
              max={365}
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label className="text-sm">Send From Email</Label>
          <Input
            type="email"
            value={settings.emailConfig.sendFrom}
            onChange={(e) =>
              updateSetting("emailConfig.sendFrom", e.target.value)
            }
            placeholder="noreply@yourcompany.com"
          />
        </div>
      </SectionCard>

      {/* Header Logo */}
      <SectionCard
        title="Header Logo"
        icon={<Upload className="w-5 h-5 text-survey-purple" />}
      >
        <div className="flex items-center justify-between mb-4">
          <Label className="font-medium">Enable Header Logo</Label>
          <Switch
            checked={settings.headerLogo.enabled}
            onCheckedChange={(checked) =>
              updateSetting("headerLogo.enabled", checked)
            }
          />
        </div>

        {settings.headerLogo.enabled && (
          <div className="space-y-4">
            <UploadInput
              label="Logo URL"
              value={settings.headerLogo.url}
              onChange={(value) => updateSetting("headerLogo.url", value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Size</Label>
                <Select
                  value={settings.headerLogo.size}
                  onValueChange={(value) =>
                    updateSetting("headerLogo.size", value)
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
                  value={settings.headerLogo.position}
                  onValueChange={(value) =>
                    updateSetting("headerLogo.position", value)
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
          </div>
        )}
      </SectionCard>

      {/* Email Content */}
      <SectionCard
        title="Email Content"
        icon={<Type className="w-5 h-5 text-survey-success" />}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm">Subject Line</Label>
            <Input
              value={settings.content.subject}
              onChange={(e) => updateSetting("content.subject", e.target.value)}
              placeholder="We'd love your feedback!"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Email Body</Label>
            <div className="border rounded-md">
              <QuillEditor
                value={settings.content.body}
                onChange={(content) => updateSetting("content.body", content)}
                placeholder="Write your email content here..."
              />
            </div>
            <div className="flex items-start gap-2 mt-2">
              <p className="text-xs text-muted-foreground">
                ✨ <strong>Rich Text Editor:</strong> Format text, add links,
                create lists, and style your email content with professional
                formatting options.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Background Settings */}
      <SectionCard
        title="Background"
        icon={<Palette className="w-5 h-5 text-survey-info" />}
      >
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="font-medium">Background Type</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-solid"
                  name="backgroundType"
                  value="solid"
                  checked={settings.background.type === "solid"}
                  onChange={() => updateSetting("background.type", "solid")}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="bg-solid" className="text-sm cursor-pointer">
                  Solid Color
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-gradient"
                  name="backgroundType"
                  value="gradient"
                  checked={settings.background.type === "gradient"}
                  onChange={() => updateSetting("background.type", "gradient")}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="bg-gradient" className="text-sm cursor-pointer">
                  Gradient
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="bg-image"
                  name="backgroundType"
                  value="image"
                  checked={settings.background.type === "image"}
                  onChange={() => updateSetting("background.type", "image")}
                  className="w-4 h-4 text-primary"
                />
                <Label htmlFor="bg-image" className="text-sm cursor-pointer">
                  Image
                </Label>
              </div>
            </div>
          </div>

          {settings.background.type === "solid" && (
            <ColorPicker
              label="Background Color"
              value={settings.background.solidColor}
              onChange={(value) =>
                updateSetting("background.solidColor", value)
              }
            />
          )}

          {settings.background.type === "gradient" && (
            <div className="space-y-4 ml-6">
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Start Color"
                  value={settings.background.gradientStart}
                  onChange={(value) =>
                    updateSetting("background.gradientStart", value)
                  }
                />
                <ColorPicker
                  label="End Color"
                  value={settings.background.gradientEnd}
                  onChange={(value) =>
                    updateSetting("background.gradientEnd", value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Direction</Label>
                <Select
                  value={settings.background.gradientDirection}
                  onValueChange={(value) =>
                    updateSetting("background.gradientDirection", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="to-r">Left to Right</SelectItem>
                    <SelectItem value="to-l">Right to Left</SelectItem>
                    <SelectItem value="to-t">Bottom to Top</SelectItem>
                    <SelectItem value="to-b">Top to Bottom</SelectItem>
                    <SelectItem value="to-br">
                      Top-Left to Bottom-Right
                    </SelectItem>
                    <SelectItem value="to-bl">
                      Top-Right to Bottom-Left
                    </SelectItem>
                    <SelectItem value="to-tr">
                      Bottom-Left to Top-Right
                    </SelectItem>
                    <SelectItem value="to-tl">
                      Bottom-Right to Top-Left
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {settings.background.type === "image" && (
            <div className="space-y-4 ml-6">
              <UploadInput
                label="Background Image URL"
                value={settings.background.imageUrl}
                onChange={(value) =>
                  updateSetting("background.imageUrl", value)
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Position</Label>
                  <Select
                    value={settings.background.imagePosition}
                    onValueChange={(value) =>
                      updateSetting("background.imagePosition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Size</Label>
                  <Select
                    value={settings.background.imageSize}
                    onValueChange={(value) =>
                      updateSetting("background.imageSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cover">Cover</SelectItem>
                      <SelectItem value="contain">Contain</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Overlay</Label>
                <Switch
                  checked={settings.background.overlay}
                  onCheckedChange={(checked) =>
                    updateSetting("background.overlay", checked)
                  }
                />
              </div>
              {settings.background.overlay && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <ColorPicker
                    label="Overlay Color"
                    value={settings.background.overlayColor}
                    onChange={(value) =>
                      updateSetting("background.overlayColor", value)
                    }
                  />
                  <div className="space-y-2">
                    <Label className="text-xs">Opacity</Label>
                    <Input
                      type="number"
                      min={0}
                      max={1}
                      step={0.1}
                      value={settings.background.overlayOpacity}
                      onChange={(e) =>
                        updateSetting(
                          "background.overlayOpacity",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
          primaryText: "Email Survey",
          secondaryText: "Your feedback matters",
          accentColor: settings.background.solidColor || "#3b82f6",
          backgroundColor: settings.background.solidColor || "#ffffff",
          backgroundType: settings.background.type as
            | "solid"
            | "gradient"
            | "image",
          gradientFrom: settings.background.gradientStart || "#3b82f6",
          gradientTo: settings.background.gradientEnd || "#8b5cf6",
          gradientDirection: "to-r",
          backgroundImage: settings.background.imageUrl || "",
          backgroundImageOpacity: settings.background.overlayOpacity || 100,
          backgroundImagePosition:
            (settings.background.imagePosition as
              | "center"
              | "top"
              | "bottom"
              | "left"
              | "right") || "center",
          customCss: "",
          enableCustomCss: false,
        }}
        onSettingsChange={(key: string, value: string | boolean | number) => {
          // Transform the new structure back to the old interface
          if (key.startsWith("button.enabled")) {
            updateSetting("button.minimized", !value);
          } else if (key.startsWith("button.")) {
            updateSetting(key, value);
          } else if (key.startsWith("section.backgroundColor")) {
            updateSetting("background.solidColor", value);
          } else if (key.startsWith("section.backgroundType")) {
            updateSetting("background.type", value);
          } else if (key.startsWith("section.gradientFrom")) {
            updateSetting("background.gradientStart", value);
          } else if (key.startsWith("section.gradientTo")) {
            updateSetting("background.gradientEnd", value);
          } else if (key.startsWith("section.gradientDirection")) {
            updateSetting("background.gradientDirection", value);
          } else if (key.startsWith("section.backgroundImage")) {
            updateSetting("background.imageUrl", value);
          }
        }}
      />
    </div>
  );
};

export default EmailCampaignSettingsComponent;
