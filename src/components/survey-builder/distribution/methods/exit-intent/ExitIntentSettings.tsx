import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  MousePointer,
  Users,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Monitor,
  Clock,
} from "lucide-react";
import { SectionCard } from "../../shared";
import { IntegratedCustomization } from "../branded-survey/components";

interface ExitIntentSettings {
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
  displayCondition: "cart-empty" | "cart-has-products" | "show-always";
  recurrence: "only-once" | "once-per-session";
  position: "bottom-left" | "center" | "bottom-right";
  device: "all-devices" | "desktop" | "mobile";
  exitIntentTimer: {
    enabled: boolean;
    seconds: number;
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

  // Available options
  const availableTags = [
    "VIP Customer",
    "Premium User",
    "Loyal Customer",
    "First Time Buyer",
    "Frequent Shopper",
    "High Value Customer",
  ];

  const availableProducts = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
    "Product F",
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
    updateSetting(
      "userTargeting.userTag.enabled",
      tempSelectedTags.length > 0
    );
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
      {/* 1. User Targeting */}
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
                      updateSetting("userTargeting.returningCustomer", checked)
                    }
                  />
                </div>

                {/* Products Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Product purchased</Label>
                    <SlimSwitch
                      checked={
                        settings.userTargeting.productPurchase.selectedProducts
                          .length > 0
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
        )}
      </div>

      {/* 2. Survey Display Condition */}
      <SectionCard
        icon={<ShoppingCart className="w-5 h-5 text-blue-600" />}
        title="Survey Display Condition"
        description="Choose when to display the survey based on cart status"
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">Display Survey When</Label>
          <Select
            value={settings.displayCondition}
            onValueChange={(
              value: "cart-empty" | "cart-has-products" | "show-always"
            ) => updateSetting("displayCondition", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cart-empty">Cart is Empty</SelectItem>
              <SelectItem value="cart-has-products">
                Cart has Products
              </SelectItem>
              <SelectItem value="show-always">Show no matter what</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      {/* 3. Survey Frequency & Position */}
      <SectionCard
        icon={<MousePointer className="w-5 h-5 text-orange-600" />}
        title="Survey Frequency & Position"
        description="Configure how often and where the survey appears"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Survey Frequency</Label>
            <Select
              value={settings.recurrence}
              onValueChange={(value: "only-once" | "once-per-session") =>
                updateSetting("recurrence", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="only-once">Only once per visitor</SelectItem>
                <SelectItem value="once-per-session">
                  Once per session
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Position</Label>
            <Select
              value={settings.position}
              onValueChange={(
                value: "bottom-left" | "center" | "bottom-right"
              ) => updateSetting("position", value)}
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
        </div>
      </SectionCard>

      {/* 4. Device Selection */}
      <SectionCard
        icon={<Monitor className="w-5 h-5 text-green-600" />}
        title="Device Selection"
        description="Choose which devices can display this survey"
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">Show Survey On</Label>
          <Select
            value={settings.device}
            onValueChange={(value: "all-devices" | "desktop" | "mobile") =>
              updateSetting("device", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-devices">All Devices</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionCard>

      {/* 5. Exit Intent Timer */}
      <SectionCard
        icon={<Clock className="w-5 h-5 text-purple-600" />}
        title="Exit Intent Timer"
        description="Set minimum time before exit intent can trigger"
      >
        <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={settings.exitIntentTimer.enabled}
                onCheckedChange={(checked) =>
                  updateSetting("exitIntentTimer.enabled", checked === true)
                }
              />
              <Label>Enable exit intent timer</Label>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              Delay exit intent trigger until visitor spends time on site
            </p>
          </div>
        </div>
        {settings.exitIntentTimer.enabled && (
          <div className="mt-4 space-y-2">
            <Label className="text-sm font-medium">
              Enable exit intent after (seconds)
            </Label>
            <Input
              type="number"
              min="0"
              value={settings.exitIntentTimer.seconds}
              onChange={(e) =>
                updateSetting(
                  "exitIntentTimer.seconds",
                  parseInt(e.target.value) || 0
                )
              }
              placeholder="e.g., 10"
            />
            <p className="text-xs text-muted-foreground">
              Exit intent will only trigger after visitor has been on site for
              at least this many seconds
            </p>
          </div>
        )}
      </SectionCard>

      {/* 6. Customization Settings */}
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
            {availableTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  checked={tempSelectedTags.includes(tag)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTempSelectedTags([...tempSelectedTags, tag]);
                    } else {
                      setTempSelectedTags(
                        tempSelectedTags.filter((t) => t !== tag)
                      );
                    }
                  }}
                />
                <Label className="text-sm">{tag}</Label>
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
              <div key={product} className="flex items-center space-x-2">
                <Checkbox
                  checked={tempSelectedProducts.includes(product)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTempSelectedProducts([
                        ...tempSelectedProducts,
                        product,
                      ]);
                    } else {
                      setTempSelectedProducts(
                        tempSelectedProducts.filter((p) => p !== product)
                      );
                    }
                  }}
                />
                <Label className="text-sm">{product}</Label>
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

export default ExitIntentSettingsRefactored;
