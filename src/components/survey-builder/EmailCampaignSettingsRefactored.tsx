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
import UploadInput from "./shared/UploadInput";
import IntegratedCustomization from "./branded/IntegratedCustomization";
import { Mail, Users, ShoppingCart, Upload } from "lucide-react";

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
    body: string;
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

interface EmailCampaignSettingsRefactoredProps {
  settings: EmailCampaignSettings;
  onSettingsChange: (settings: EmailCampaignSettings) => void;
}

const EmailCampaignSettingsRefactored: React.FC<
  EmailCampaignSettingsRefactoredProps
> = ({ settings, onSettingsChange }) => {
  const availableUserTags = [
    { value: "vip-customer", label: "VIP Customer" },
    { value: "first-time-buyer", label: "First-time Buyer" },
    { value: "loyalty-member", label: "Loyalty Member" },
    { value: "high-value", label: "High Value Customer" },
    { value: "mobile-user", label: "Mobile User" },
    { value: "email-subscriber", label: "Email Subscriber" },
  ];

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
    }

    onSettingsChange(newSettings);
  };

  return (
    <div className="space-y-8">
      {/* User Targeting */}
      <SectionCard
        icon={Users}
        title="User Targeting"
        description="Define which customers will receive the email survey"
        color="text-blue-600"
        bgColor="bg-blue-50"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Target Audience</Label>
            <Select
              value={settings.userTargeting.type}
              onValueChange={(value: "all-users" | "segment-users") =>
                updateSetting("userTargeting.type", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-users">All Users</SelectItem>
                <SelectItem value="segment-users">
                  Specific User Segments
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.userTargeting.type === "segment-users" && (
            <div className="space-y-4 pl-4 border-l-2 border-blue-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.userTargeting.userTag.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting("userTargeting.userTag.enabled", checked)
                    }
                  />
                  <Label className="text-sm">Filter by user tags</Label>
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
                      {availableUserTags.map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Customer Type</Label>
                <Select
                  value={settings.userTargeting.customerType}
                  onValueChange={(value: "all" | "new" | "return") =>
                    updateSetting("userTargeting.customerType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All customers</SelectItem>
                    <SelectItem value="new">New customers only</SelectItem>
                    <SelectItem value="return">
                      Returning customers only
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* Email Configuration */}
      <SectionCard
        icon={Mail}
        title="Email Configuration"
        description="Configure email timing and sender settings"
        color="text-green-600"
        bgColor="bg-green-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Delay After Purchase (days)
            </Label>
            <Input
              type="number"
              min="0"
              max="30"
              value={settings.emailConfig.delayAfter}
              onChange={(e) =>
                updateSetting(
                  "emailConfig.delayAfter",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Send From Email</Label>
            <Input
              type="email"
              value={settings.emailConfig.sendFrom}
              onChange={(e) =>
                updateSetting("emailConfig.sendFrom", e.target.value)
              }
              placeholder="noreply@yourstore.com"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Block Duplicate (days)
            </Label>
            <Input
              type="number"
              min="1"
              max="365"
              value={settings.emailConfig.blockDuplicate}
              onChange={(e) =>
                updateSetting(
                  "emailConfig.blockDuplicate",
                  parseInt(e.target.value)
                )
              }
            />
          </div>
        </div>
      </SectionCard>

      {/* Header Logo */}
      <SectionCard
        icon={Upload}
        title="Header Logo"
        description="Add your brand logo to email header"
        color="text-purple-600"
        bgColor="bg-purple-50"
        collapsible
        defaultExpanded={settings.headerLogo.enabled}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.headerLogo.enabled}
              onCheckedChange={(checked) =>
                updateSetting("headerLogo.enabled", checked)
              }
            />
            <Label className="text-sm">Enable header logo</Label>
          </div>

          {settings.headerLogo.enabled && (
            <div className="space-y-4 pl-6">
              <UploadInput
                label="Logo Image"
                value={settings.headerLogo.url}
                file={settings.headerLogo.file}
                onChange={(url, file) => {
                  updateSetting("headerLogo.url", url);
                  updateSetting("headerLogo.file", file);
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Size</Label>
                  <Select
                    value={settings.headerLogo.size}
                    onValueChange={(value: "small" | "medium" | "large") =>
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
                  <Label className="text-sm">Position</Label>
                  <Select
                    value={settings.headerLogo.position}
                    onValueChange={(value: "left" | "right" | "center") =>
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
        </div>
      </SectionCard>

      {/* Email Content */}
      <SectionCard
        icon={Mail}
        title="Email Content"
        description="Customize the email subject and body content"
        color="text-blue-600"
        bgColor="bg-blue-50"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Subject</Label>
            <Input
              value={settings.content.subject}
              onChange={(e) => updateSetting("content.subject", e.target.value)}
              placeholder="We'd love your feedback!"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Body</Label>
            <QuillEditor
              value={settings.content.body}
              onChange={(value) => updateSetting("content.body", value)}
              placeholder="Write your email content here..."
            />
          </div>
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

export default EmailCampaignSettingsRefactored;
