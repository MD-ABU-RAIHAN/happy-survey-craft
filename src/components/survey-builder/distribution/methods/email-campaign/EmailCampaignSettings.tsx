import React, { useState } from "react";
import { QuillEditor, SectionCard, UploadInput } from "../../shared";
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
  Clock,
  Bell,
  Upload,
  ChevronDown,
  ChevronUp,
  Info,
  Repeat,
  Palette,
} from "lucide-react";

interface EmailCampaignSettings {
  triggerTiming: {
    orderStatus: "placed" | "fulfilled" | "delivered";
    sendDelay: number;
    timeUnit: "hours" | "days" | "weeks";
  };
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTags: string[];
    };
    firstTimeBuyers: boolean;
    returningCustomer: boolean;
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
    minimumOrderValue: {
      enabled: boolean;
      amount: number;
    };
  };
  emailConfig: {
    sendFrom: string;
    blockDuplicate: number;
  };
  brandLogo: {
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
  reminder: {
    enabled: boolean;
    sendAfterDays: number;
    maxReminders: 1 | 2 | 3;
  };
  multipleSends: "once-per-email" | "once-per-order";
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
    } else if (keys.length === 1) {
      newSettings = {
        ...newSettings,
        [keys[0]]: value,
      };
    }

    onSettingsChange(newSettings);
  };

  // Handle Customer Tag Modal
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
      {/* 1. Trigger & Timing */}
      <SectionCard
        icon={<Clock className="w-5 h-5 text-orange-600" />}
        title="Trigger & Timing"
        description=""
        badge={
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Required
          </Badge>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Send Email When Order Is
            </Label>
            <Select
              value={settings.triggerTiming.orderStatus}
              onValueChange={(value: "placed" | "fulfilled" | "delivered") =>
                updateSetting("triggerTiming.orderStatus", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Send Delay</Label>
              <Input
                type="number"
                min="0"
                value={settings.triggerTiming.sendDelay}
                onChange={(e) =>
                  updateSetting(
                    "triggerTiming.sendDelay",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Time Unit</Label>
              <Select
                value={settings.triggerTiming.timeUnit}
                onValueChange={(value: "hours" | "days" | "weeks") =>
                  updateSetting("triggerTiming.timeUnit", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timing Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  Timing Recommendation
                </p>
                <p className="text-xs text-blue-700">
                  Wait 2-3 days after fulfillment for best response rates.
                  Customers need time to receive and use the product.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 2. Customer Targeting */}
      <div className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 rounded-lg p-6 space-y-4 border border-secondary-brand/10">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary-brand" />
            Customer Targeting
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
            <div className="space-y-6">
              {/* Target Type Selection */}
              <div className="space-y-3">
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
                      All Customers
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
                      A Segment of Customers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Segment Options */}
              {settings.userTargeting.type === "segment-users" && (
                <div className="space-y-4 ml-6">
                  {/* Customer Tag Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Customer Tag</Label>
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

                  {/* First-Time Buyers Section */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">First-Time Buyers</Label>
                    <SlimSwitch
                      checked={settings.userTargeting.firstTimeBuyers}
                      onCheckedChange={(checked) =>
                        updateSetting("userTargeting.firstTimeBuyers", checked)
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

              {/* Minimum Order Value Section - Always visible */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Minimum Order Value</Label>
                  <SlimSwitch
                    checked={settings.userTargeting.minimumOrderValue.enabled}
                    onCheckedChange={(checked) =>
                      updateSetting(
                        "userTargeting.minimumOrderValue.enabled",
                        checked === true
                      )
                    }
                  />
                </div>
                {settings.userTargeting.minimumOrderValue.enabled && (
                  <div className="pl-6">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Amount ($)
                      </Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={settings.userTargeting.minimumOrderValue.amount}
                        onChange={(e) =>
                          updateSetting(
                            "userTargeting.minimumOrderValue.amount",
                            parseFloat(e.target.value)
                          )
                        }
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Email Configuration */}
      <SectionCard
        icon={<Mail className="w-5 h-5 text-green-600" />}
        title="Email Configuration"
        description="Configure sender settings"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* 4. Email Content with Brand Logo */}
      <SectionCard
        icon={<Mail className="w-5 h-5 text-blue-600" />}
        title="Email Template Design"
        description=""
      >
        <div className="space-y-6">
          {/* Brand Logo */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Brand Logo (Optional)
              </Label>
              <SlimSwitch
                checked={settings.brandLogo.enabled}
                onCheckedChange={(checked) =>
                  updateSetting("brandLogo.enabled", checked)
                }
              />
            </div>

            {settings.brandLogo.enabled && (
              <div className="space-y-4 pl-6">
                <UploadInput
                  label="Upload Logo"
                  value={settings.brandLogo.url}
                  file={settings.brandLogo.file}
                  onChange={(url, file) => {
                    updateSetting("brandLogo.url", url);
                    updateSetting("brandLogo.file", file);
                  }}
                  helpText="Recommended: 200x60px, PNG or JPG"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Size</Label>
                    <Select
                      value={settings.brandLogo.size}
                      onValueChange={(value: "small" | "medium" | "large") =>
                        updateSetting("brandLogo.size", value)
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
                      value={settings.brandLogo.position}
                      onValueChange={(value: "left" | "right" | "center") =>
                        updateSetting("brandLogo.position", value)
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

          {/* Subject Line */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Subject Line</Label>
            <Input
              value={settings.content.subject}
              onChange={(e) => updateSetting("content.subject", e.target.value)}
              placeholder="How was your recent purchase, {{customer_name}}?"
            />
          </div>

          {/* Email Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Message</Label>
            <QuillEditor
              value={settings.content.body}
              onChange={(value) => updateSetting("content.body", value)}
              placeholder="Thank you for your recent purchase! We'd love to hear your feedback about {{product_name}}."
            />
          </div>
        </div>
      </SectionCard>

      {/* 5. Reminder Email (Optional) */}
      <SectionCard
        icon={<Bell className="w-5 h-5 text-purple-600" />}
        title="Reminder Email (Optional)"
        description=""
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={settings.reminder.enabled}
                  onCheckedChange={(checked) =>
                    updateSetting("reminder.enabled", checked === true)
                  }
                />
                <Label className="text-sm font-medium">
                  Send reminder if survey not completed
                </Label>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Automatically remind customers who haven't responded
              </p>
            </div>
          </div>

          {settings.reminder.enabled && (
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div className="space-y-2">
                <Label className="text-sm">Send Reminder After (Days)</Label>
                <Input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.reminder.sendAfterDays}
                  onChange={(e) =>
                    updateSetting(
                      "reminder.sendAfterDays",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Max Reminders</Label>
                <Select
                  value={settings.reminder.maxReminders.toString()}
                  onValueChange={(value: string) =>
                    updateSetting("reminder.maxReminders", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Reminder</SelectItem>
                    <SelectItem value="2">2 Reminders</SelectItem>
                    <SelectItem value="3">3 Reminders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      {/* 6. Multiple Sends */}
      <SectionCard
        icon={<Repeat className="w-5 h-5 text-teal-600" />}
        title="Multiple sends"
        description="How many times should each user receive an email?"
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="once-per-email"
              name="multipleSends"
              value="once-per-email"
              checked={settings.multipleSends === "once-per-email"}
              onChange={() => updateSetting("multipleSends", "once-per-email")}
              className="w-4 h-4 text-primary"
            />
            <Label htmlFor="once-per-email" className="text-sm cursor-pointer">
              Once per email address
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="once-per-order"
              name="multipleSends"
              value="once-per-order"
              checked={settings.multipleSends === "once-per-order"}
              onChange={() => updateSetting("multipleSends", "once-per-order")}
              className="w-4 h-4 text-primary"
            />
            <Label htmlFor="once-per-order" className="text-sm cursor-pointer">
              Once per order
            </Label>
          </div>
        </div>
      </SectionCard>

      {/* 7. Button Customization */}
      <SectionCard
        icon={<Palette className="w-5 h-5 text-purple-600" />}
        title="Button Customization"
        description="Customize the survey button appearance"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Background Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={settings.button.backgroundColor}
                onChange={(e) =>
                  updateSetting("button.backgroundColor", e.target.value)
                }
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.button.backgroundColor}
                onChange={(e) =>
                  updateSetting("button.backgroundColor", e.target.value)
                }
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Text Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={settings.button.textColor}
                onChange={(e) =>
                  updateSetting("button.textColor", e.target.value)
                }
                className="w-16 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={settings.button.textColor}
                onChange={(e) =>
                  updateSetting("button.textColor", e.target.value)
                }
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Customer Tag Modal */}
      <Dialog open={userTagModalOpen} onOpenChange={setUserTagModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Customer Tags</DialogTitle>
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
