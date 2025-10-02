import React, { useState } from "react";
import { QuillEditor, SectionCard, UploadInput } from "../../shared";
import { IntegratedCustomization } from "../branded-survey/components";
import "react-quill/dist/quill.snow.css";
import "@/styles/quill-custom.css";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Mail,
  Users,
  ShoppingCart,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface EmailCampaignSettings {
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
  // Modal states
  const [userTagModalOpen, setUserTagModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [isUserTargetingMinimized, setIsUserTargetingMinimized] =
    useState(false);

  // Temporary states for modals
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [tempSelectedProducts, setTempSelectedProducts] = useState<string[]>(
    []
  );

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

  const updateSetting = (key: string, value: unknown) => {
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

  // Handle User Tag Modal
  const handleUserTagToggle = (checked: boolean) => {
    if (checked) {
      setTempSelectedTags(settings.userTargeting.userTag.selectedTags);
      setUserTagModalOpen(true);
    } else {
      updateSetting("userTargeting.userTag.enabled", false);
      updateSetting("userTargeting.userTag.selectedTags", []);
    }
  };

  const handleUserTagSave = () => {
    updateSetting("userTargeting.userTag.enabled", tempSelectedTags.length > 0);
    updateSetting("userTargeting.userTag.selectedTags", tempSelectedTags);
    setUserTagModalOpen(false);
  };

  const handleUserTagCancel = () => {
    setTempSelectedTags(settings.userTargeting.userTag.selectedTags);
    setUserTagModalOpen(false);
    if (settings.userTargeting.userTag.selectedTags.length === 0) {
      updateSetting("userTargeting.userTag.enabled", false);
    }
  };

  // Handle Product Modal
  const handleProductToggle = (checked: boolean) => {
    if (checked) {
      setTempSelectedProducts(
        settings.userTargeting.productPurchase.selectedProducts
      );
      setProductModalOpen(true);
    } else {
      updateSetting("userTargeting.productPurchase.enabled", false);
      updateSetting("userTargeting.productPurchase.selectedProducts", []);
    }
  };

  const handleProductSave = () => {
    updateSetting(
      "userTargeting.productPurchase.enabled",
      tempSelectedProducts.length > 0
    );
    updateSetting(
      "userTargeting.productPurchase.selectedProducts",
      tempSelectedProducts
    );
    setProductModalOpen(false);
  };

  const handleProductCancel = () => {
    setTempSelectedProducts(
      settings.userTargeting.productPurchase.selectedProducts
    );
    setProductModalOpen(false);
    if (settings.userTargeting.productPurchase.selectedProducts.length === 0) {
      updateSetting("userTargeting.productPurchase.enabled", false);
    }
  };

  return (
    <div className="space-y-8">
      {/* User Targeting */}
      <div className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 rounded-lg p-6 space-y-4 border border-secondary-brand/10">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary-brand" />
            User Targeting
          </h5>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setIsUserTargetingMinimized(!isUserTargetingMinimized)
            }
            className="h-8 w-8 p-0 hover:bg-secondary-brand/10"
          >
            {isUserTargetingMinimized ? (
              <ChevronDown className="h-4 w-4 text-secondary-brand" />
            ) : (
              <ChevronUp className="h-4 w-4 text-secondary-brand" />
            )}
          </Button>
        </div>

        {!isUserTargetingMinimized && (
          <div className="space-y-4">
            {/* Help Text */}
            <div className="bg-survey-info-light/30 border border-survey-info/20 rounded-lg p-3">
              <p className="text-xs text-survey-info flex items-start gap-2">
                <span className="text-survey-info font-bold text-sm">💡</span>
                <span>
                  <strong>Tip:</strong> Start with "All Users" for maximum
                  reach, then refine your targeting based on response data.
                  Segment targeting can increase relevance but may reduce
                  overall responses.
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
                    <Label
                      htmlFor="all-users"
                      className="text-sm cursor-pointer"
                    >
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
                  {/* User Tag Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">User Tag</Label>
                      <SlimSwitch
                        checked={
                          settings.userTargeting.userTag.selectedTags.length > 0
                        }
                        onCheckedChange={handleUserTagToggle}
                      />
                    </div>
                    {settings.userTargeting.userTag.selectedTags.length > 0 && (
                      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                        <span className="text-sm text-muted-foreground">
                          {settings.userTargeting.userTag.selectedTags.length}{" "}
                          tag(s) selected
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTempSelectedTags(
                              settings.userTargeting.userTag.selectedTags
                            );
                            setUserTagModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* New Customer Section */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">New Customer</Label>
                    <SlimSwitch
                      checked={settings.userTargeting.newCustomer}
                      onCheckedChange={(checked) =>
                        updateSetting("userTargeting.newCustomer", checked)
                      }
                    />
                  </div>

                  {/* Returning Customer Section */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Returning Customer</Label>
                    <SlimSwitch
                      checked={settings.userTargeting.returningCustomer}
                      onCheckedChange={(checked) =>
                        updateSetting(
                          "userTargeting.returningCustomer",
                          checked
                        )
                      }
                    />
                  </div>

                  {/* Products Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Product purchased</Label>
                      <SlimSwitch
                        checked={
                          settings.userTargeting.productPurchase
                            .selectedProducts.length > 0
                        }
                        onCheckedChange={handleProductToggle}
                      />
                    </div>
                    {settings.userTargeting.productPurchase.selectedProducts
                      .length > 0 && (
                      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                        <span className="text-sm text-muted-foreground">
                          {
                            settings.userTargeting.productPurchase
                              .selectedProducts.length
                          }{" "}
                          product(s) selected
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTempSelectedProducts(
                              settings.userTargeting.productPurchase
                                .selectedProducts
                            );
                            setProductModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Email Configuration */}
      <SectionCard
        icon={<Mail className="w-5 h-5 text-green-600" />}
        title="Email Configuration"
        description="Configure email timing and sender settings"
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
        icon={<Upload className="w-5 h-5 text-purple-600" />}
        title="Header Logo"
        description="Add your brand logo to email header"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Enable header logo</Label>
            <SlimSwitch
              checked={settings.headerLogo.enabled}
              onCheckedChange={(checked) =>
                updateSetting("headerLogo.enabled", checked)
              }
            />
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
        icon={<Mail className="w-5 h-5 text-blue-600" />}
        title="Email Content"
        description="Customize the email subject and body content"
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

      {/* User Tag Modal */}
      <Dialog open={userTagModalOpen} onOpenChange={setUserTagModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select User Tags</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {availableUserTags.map((tag) => (
              <div key={tag.value} className="flex items-center space-x-2">
                <Checkbox
                  checked={tempSelectedTags.includes(tag.label)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTempSelectedTags([...tempSelectedTags, tag.label]);
                    } else {
                      setTempSelectedTags(
                        tempSelectedTags.filter((t) => t !== tag.label)
                      );
                    }
                  }}
                />
                <Label className="text-sm">{tag.label}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleUserTagCancel}>
              Cancel
            </Button>
            <Button onClick={handleUserTagSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Modal */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Products Purchased</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {availableProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={tempSelectedProducts.includes(product.name)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTempSelectedProducts([
                        ...tempSelectedProducts,
                        product.name,
                      ]);
                    } else {
                      setTempSelectedProducts(
                        tempSelectedProducts.filter((p) => p !== product.name)
                      );
                    }
                  }}
                />
                <Label className="text-sm">{product.name}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleProductCancel}>
              Cancel
            </Button>
            <Button onClick={handleProductSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailCampaignSettingsRefactored;
